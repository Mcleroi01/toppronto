const nodemailer = require("nodemailer");
const { IncomingForm } = require('formidable');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Créer un répertoire temporaire pour stocker les fichiers téléchargés
const UPLOAD_DIR = path.join(os.tmpdir(), 'netlify-uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Fonction pour parser le formulaire avec formidable
function parseForm(event) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: UPLOAD_DIR,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      multiples: true,
      keepExtensions: true
    });

    const fields = {};
    const files = [];

    form.on('field', (field, value) => {
      fields[field] = value;
    });

    form.on('file', (field, file) => {
      // Ne traiter que si un fichier a été téléchargé
      if (file.originalFilename && file.originalFilename !== '') {
        files.push({
          fieldname: field,
          filename: file.originalFilename,
          path: file.filepath,
          mimetype: file.mimetype,
          size: file.size
        });
      }
    });

    form.on('error', (err) => {
      console.error('Erreur lors du parsing du formulaire:', err);
      reject(err);
    });

    form.on('end', () => {
      resolve({ fields, files });
    });

    try {
      // Créer un mock de la requête HTTP attendue par formidable
      const contentType = event.headers['content-type'] || event.headers['Content-Type'] || '';
      const boundary = contentType.split('boundary=')[1];
      
      if (!boundary) {
        throw new Error('Boundary manquant dans le Content-Type');
      }

      // Décoder le corps de la requête si nécessaire
      const body = event.isBase64Encoded 
        ? Buffer.from(event.body, 'base64').toString('binary')
        : event.body;

      // Créer un flux de données mock pour formidable
      const mockReq = {
        headers: {
          'content-type': contentType
        },
        on: function(event, callback) {
          if (event === 'data') {
            // Émettre les données en plusieurs parties pour simuler un flux
            const chunkSize = 1024; // 1KB par chunk
            for (let i = 0; i < body.length; i += chunkSize) {
              const chunk = body.slice(i, i + chunkSize);
              callback(Buffer.from(chunk, 'binary'));
            }
          } else if (event === 'end') {
            setTimeout(callback, 0);
          }
          return this;
        }
      };

      // Parser le formulaire avec le mock de requête
      form.parse(mockReq);
    } catch (err) {
      console.error('Erreur lors du traitement de la requête:', err);
      reject(err);
    }
  });
}

// Configuration du transporteur email avec les variables d'environnement
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
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

// Export CommonJS pour la compatibilité Netlify
module.exports.handler = async (event, context) => {
  console.log('=== NOUVELLE REQUÊTE ===');
  console.log('Méthode:', event.httpMethod);
  
  // Configuration CORS
  const allowedOrigins = [
    'http://localhost:8888',
    'http://localhost:3000',
    'https://toppronto.netlify.app',
    'https://toppronto.netlify.app/'
  ];

  const origin = event.headers.origin || event.headers.Origin || '';
  const isAllowedOrigin = allowedOrigins.some(allowedOrigin => 
    origin.toLowerCase() === allowedOrigin.toLowerCase()
  );

  const headers = {
    'Content-Type': 'application/json',
    ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

  // Gérer la pré-requête OPTIONS pour CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  // Vérifier la méthode HTTP après avoir géré OPTIONS
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  return new Promise(async (resolve) => {
    console.log('Début du traitement de la requête');
    
    try {
      // Parser le formulaire avec formidable
      const { fields, files } = await parseForm(event);
      
      // Vérifier les champs requis
      const requiredFields = ['name', 'email', 'motivation'];
      const missingFields = requiredFields.filter(field => !fields[field]);
      
      if (missingFields.length > 0) {
        const errorMsg = `Champs manquants: ${missingFields.join(', ')}`;
        console.error(errorMsg);
        return resolve({
          statusCode: 400,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: errorMsg 
          })
        });
      }
      
      // Préparer les pièces jointes
      const attachments = [];
      for (const file of files) {
        try {
          const fileContent = fs.readFileSync(file.path);
          attachments.push({
            filename: file.filename,
            content: fileContent,
            contentType: file.mimetype
          });
        } catch (err) {
          console.error(`Erreur lors de la lecture du fichier ${file.filename}:`, err);
        }
      }
        
      // Envoyer l'email
      try {
        const transporter = createTransporter();
        const mailOptions = {
          from: `"${fields.name}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
          replyTo: fields.email,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `Nouvelle candidature: ${fields.name} - ${fields.jobTitle || 'Sans intitulé'}`,
          text: `Nouvelle candidature reçue :\n\nNom: ${fields.name}\nEmail: ${fields.email}\nPoste: ${fields.jobTitle || 'Non spécifié'}\n\nMotivation:\n${fields.motivation}\n\nPortfolio: ${fields.portfolio || 'Non fourni'}`,
          html: `
            <h1>Nouvelle candidature reçue</h1>
            <p><strong>Nom:</strong> ${fields.name}</p>
            <p><strong>Email:</strong> ${fields.email}</p>
            <p><strong>Poste:</strong> ${fields.jobTitle || 'Non spécifié'}</p>
            <h3>Motivation :</h3>
            <p>${fields.motivation.replace(/\n/g, '<br>')}</p>
            <p><strong>Portfolio:</strong> ${fields.portfolio ? `<a href="${fields.portfolio}">${fields.portfolio}</a>` : 'Non fourni'}</p>
          `,
          attachments
        };

        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès');
        
        // Nettoyer les fichiers temporaires
        for (const file of files) {
          try {
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (err) {
            console.error('Erreur lors de la suppression du fichier temporaire:', err);
          }
        }
        
        resolve({
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            success: true,
            message: 'Votre candidature a bien été envoyée !' 
          })
        });
        
      } catch (err) {
        console.error('Erreur lors de l\'envoi de l\'email:', err);
        
        // Nettoyer les fichiers temporaires en cas d'erreur
        for (const file of files) {
          try {
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (cleanupErr) {
            console.error('Erreur lors du nettoyage des fichiers temporaires:', cleanupErr);
          }
        }
        
        resolve({
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            success: false,
            error: 'Une erreur est survenue lors de l\'envoi de votre candidature.' 
          })
        });
      }
    } catch (err) {
      console.error('Erreur lors du traitement de la requête:', err);
      
      // Nettoyer les fichiers temporaires en cas d'erreur
      if (files && files.length > 0) {
        for (const file of files) {
          try {
            if (file.path && fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          } catch (cleanupErr) {
            console.error('Erreur lors du nettoyage des fichiers temporaires:', cleanupErr);
          }
        }
      }
      
      resolve({
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          success: false,
          error: 'Erreur interne du serveur' 
        })
      });
    }
  });
};
