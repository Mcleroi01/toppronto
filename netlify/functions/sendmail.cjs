const nodemailer = require("nodemailer");
const { Readable } = require('stream');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Créer un répertoire temporaire pour stocker les fichiers téléchargés
const UPLOAD_DIR = path.join(os.tmpdir(), 'netlify-uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Fonction utilitaire pour parser le formulaire multipart
function parseForm(event) {
  return new Promise((resolve, reject) => {
    if (!event.body || !event.headers || !event.headers['content-type']) {
      return reject(new Error('Invalid request format'));
    }

    const boundary = event.headers['content-type'].split('boundary=')[1];
    if (!boundary) {
      return reject(new Error('No boundary found in content-type'));
    }

    const body = Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8');
    const boundaryStr = `--${boundary}`;
    const parts = [];
    let start = body.indexOf(boundaryStr) + boundaryStr.length;
    
    // Découper correctement les parties du formulaire multipart
    while (true) {
      const end = body.indexOf(boundaryStr, start);
      if (end === -1) break;
      
      const part = body.slice(start, end).toString('binary');
      if (part.trim()) {
        parts.push(part);
      }
      start = end + boundaryStr.length;
    }
    
    const fields = {};
    const files = [];

    for (const part of parts) {
      // Séparer les en-têtes du contenu
      const headerEnd = part.indexOf('\r\n\r\n');
      if (headerEnd === -1) continue;
      
      const headers = part.slice(0, headerEnd).toString('utf8');
      const content = part.slice(headerEnd + 4, -2); // -2 pour enlever le \r\n final
      
      // Extraire le nom du champ et le nom du fichier
      const nameMatch = headers.match(/name="([^"]+)"/);
      if (!nameMatch) continue;
      
      const name = nameMatch[1];
      const filenameMatch = headers.match(/filename="([^"]+)"/);
      
      if (filenameMatch) {
        // C'est un fichier
        const filename = filenameMatch[1];
        const filePath = path.join(UPLOAD_DIR, `${Date.now()}-${filename}`);
        
        // Écrire le contenu binaire du fichier
        fs.writeFileSync(filePath, content, 'binary');
        
        // Vérifier que le fichier a bien été écrit
        const stats = fs.statSync(filePath);
        
        files.push({
          fieldName: name,
          filename: filename,
          path: filePath,
          mimetype: (headers.match(/Content-Type: ([^\r\n]+)/i) || [])[1] || 'application/octet-stream',
          size: stats.size
        });
        
        console.log(`Fichier enregistré: ${filePath}, Taille: ${stats.size} octets`);
      } else {
        // C'est un champ de formulaire normal
        fields[name] = content.toString('utf8').trim();
      }
    }

    resolve({ fields, files });
  });
}

// Configuration du transporteur email avec les variables d'environnement
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Fonction utilitaire pour logger les erreurs
const logError = (message, error) => {
  console.error(`[ERROR] ${message}`, error ? error.message : '');
  if (error && error.stack) {
    console.error(error.stack);
  }
};

// Fonction pour envoyer l'email (séparée pour le traitement en arrière-plan)
async function sendEmail(fields, files) {
  try {
    console.log('Traitement en arrière-plan démarré pour:', fields.email);
    
    const transporter = createTransporter();
    
    // Créer les pièces jointes en lisant le contenu des fichiers
    const attachments = await Promise.all(files.map(async (file) => {
      try {
        const fileContent = await fs.promises.readFile(file.path);
        return {
          filename: file.filename,
          content: fileContent,
          contentType: file.mimetype,
          encoding: 'base64'
        };
      } catch (error) {
        console.error(`Erreur lors de la lecture du fichier ${file.path}:`, error);
        return null;
      }
    }));
    
    // Filtrer les pièces jointes valides
    const validAttachments = attachments.filter(attachment => attachment !== null);
    
    const mailOptions = {
      from: `"${fields.name}" <${
        process.env.EMAIL_FROM || process.env.EMAIL_USER
      }>`,
      replyTo: fields.email,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nova candidatura: ${fields.name} - ${
        fields.jobTitle || "Sans intitulé"
      }`,
      text: `Nova inscrição recebida :\n\nNome: ${fields.name}\nEmail: ${
        fields.email
      }\nPoste: ${fields.jobTitle || "Non spécifié"}\n\nMotivação:\n${
        fields.motivation
      }\n\nPortfolio: ${fields.portfolio || "Non fourni"}`,
      html: `
        <h1>Nova inscrição recebida</h1>
        <p><strong>Nome:</strong> ${fields.name}</p>
        <p><strong>Email:</strong> ${fields.email}</p>
        <p><strong>Correio:</strong> ${fields.jobTitle || "Non spécifié"}</p>
        <h3>Motivação :</h3>
        <p>${fields.motivation.replace(/\n/g, "<br>")}</p>
        <p><strong>Portfólio:</strong> ${
          fields.portfolio
            ? `<a href="${fields.portfolio}">${fields.portfolio}</a>`
            : "Não quatro"
        }</p>
      `,
      attachments: validAttachments,
    };

    console.log('Envoi de l\'email en cours...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès, ID:', info.messageId);
    
    // Nettoyage des fichiers temporaires
    for (const file of files) {
      try {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        logError('Erreur lors de la suppression du fichier temporaire', err);
      }
    }
    
  } catch (error) {
    logError('Erreur lors de l\'envoi de l\'email en arrière-plan', error);
  }
}

// Export CommonJS pour la compatibilité Netlify
module.exports.handler = async (event) => {
  console.log('Début du traitement de la requête');
  
  // Configuration CORS
  const allowedOrigins = [
    'http://localhost:8888',
    'http://localhost:3000',
    'http://localhost:5174', // Ajout du port de développement Vite
    'https://toppronto.netlify.app',
    'https://toppronto.netlify.app/'
  ];
  
  const origin = event.headers.origin || event.headers.Origin || '';
  const isAllowedOrigin = allowedOrigins.some(allowedOrigin => 
    origin.toLowerCase().startsWith(allowedOrigin.toLowerCase())
  );

  const headers = {
    'Content-Type': 'application/json',
    ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };
  
  console.log('En-têtes CORS configurés');

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: { ...headers, 'Access-Control-Allow-Origin': origin || '*' },
      body: ''
    };
  }

  let filesToCleanup = [];
  const cleanupFiles = () => {
    for (const file of filesToCleanup) {
      try {
        if (file.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        logError('Erreur lors de la suppression du fichier temporaire', err);
      }
    }
  };

  try {
    console.log('Méthode HTTP:', event.httpMethod);
    
    if (event.httpMethod !== 'POST') {
      console.log('Méthode non autorisée, seules les requêtes POST sont acceptées');
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    console.log('Début du parsing du formulaire');
    const { fields, files } = await parseForm(event);
    filesToCleanup = files;
    console.log('Formulaire parsé avec succès, champs reçus:', Object.keys(fields).join(', '));
    console.log('Fichiers reçus:', files.map(f => f.filename).join(', '));

    const requiredFields = ['name', 'email', 'motivation'];
    const missingFields = requiredFields.filter(field => !fields[field]);
    if (missingFields.length > 0) {
      const errorMsg = `Champs manquants: ${missingFields.join(', ')}`;
      logError(errorMsg);
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: errorMsg }) };
    }

    // Vérifier les variables d'environnement
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Variables d\'environnement manquantes pour l\'envoi d\'email');
      return { 
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ 
          success: false, 
          message: 'Votre candidature a bien été reçue. Nous la traiterons dans les plus brefs délais.' 
        }) 
      };
    }
    
    // Démarrer l'envoi d'email en arrière-plan
    // Utiliser setImmediate pour ne pas bloquer la réponse
    setImmediate(() => {
      sendEmail(fields, files).catch(error => {
        console.error('Erreur dans le traitement en arrière-plan:', error);
      });
    });
    
    // Répondre immédiatement au client
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Votre candidature a bien été envoyée ! Vous recevrez bientôt un email de confirmation.' 
      })
    };

  } catch (err) {
    logError('Erreur globale du handler', err);
    cleanupFiles();
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Erreur interne du serveur. Veuillez réessayer.' })
    };
  }
};
