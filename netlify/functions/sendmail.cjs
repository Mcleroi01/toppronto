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

const { Readable } = require('stream');

// Fonction pour parser le formulaire avec formidable (version simplifiée et robuste)
function parseForm(event) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: UPLOAD_DIR,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      multiples: true,
      keepExtensions: true,
    });

    const fields = {};
    const files = [];

    form.on('field', (field, value) => {
      fields[field] = Array.isArray(value) ? value[0] : value;
    });

    form.on('file', (field, file) => {
      if (file.originalFilename && file.originalFilename.trim() !== '') {
        files.push({
          fieldname: field,
          filename: file.originalFilename,
          path: file.filepath,
          mimetype: file.mimetype,
          size: file.size,
        });
      }
    });

    form.on('error', (err) => {
      logError('Erreur lors du parsing du formulaire', err);
      reject(err);
    });

    form.on('end', () => {
      resolve({ fields, files });
    });

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType) {
      return reject(new Error('Le header Content-Type est manquant.'));
    }

    // Simuler l'objet `req` attendu par form.parse() en créant un Readable stream
    try {
      const bodyBuffer = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64')
        : Buffer.from(event.body, 'latin1');

      const req = Readable.from(bodyBuffer);
      req.headers = { 'content-type': contentType };

      form.parse(req);
    } catch (err) {
      logError('Erreur lors de la préparation du parsing', err);
      reject(err);
    }
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

// Export CommonJS pour la compatibilité Netlify
module.exports.handler = async (event) => {
  // Configuration CORS
  const allowedOrigins = [
    'http://localhost:8888',
    'http://localhost:3000',
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
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const { fields, files } = await parseForm(event);
    filesToCleanup = files;

    const requiredFields = ['name', 'email', 'motivation'];
    const missingFields = requiredFields.filter(field => !fields[field]);
    if (missingFields.length > 0) {
      const errorMsg = `Champs manquants: ${missingFields.join(', ')}`;
      logError(errorMsg);
      return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: errorMsg }) };
    }

    const attachments = files.map(file => ({
      filename: file.filename,
      path: file.path,
      contentType: file.mimetype,
    }));

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
      attachments,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');

    cleanupFiles();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Votre candidature a bien été envoyée !' })
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
