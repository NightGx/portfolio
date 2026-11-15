import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 1. Autoriser uniquement les requêtes venant de ton site
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));

app.use(express.json());

// 2. Limiter à 5 messages toutes les 15 minutes par IP pour éviter le spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes, merci de patienter avant de renvoyer un message.' }
});

// 3. Route POST de réception
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Validation basique
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }

  // Formatage du message pour Discord
  const payload = {
    username: 'Portfolio Recrutement',
    embeds: [
      {
        title: '💼 Nouveau message reçu',
        color: 0x5865F2, // Bleu Discord
        fields: [
          { name: 'Nom / Contact', value: String(name).slice(0, 100), inline: true },
          { name: 'Email', value: String(email).slice(0, 100), inline: true },
          { name: 'Message', value: String(message).slice(0, 2000) }
        ],
        timestamp: new Date().toISOString()
      }
    ]
  };

  try {
    const discordResponse = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (discordResponse.ok) {
      return res.status(200).json({ success: true });
    }

    console.error('Erreur API Discord :', discordResponse.statusText);
    return res.status(502).json({ error: 'Erreur retournée par Discord.' });
  } catch (err) {
    console.error('Erreur réseau :', err);
    return res.status(500).json({ error: 'Impossible de joindre Discord.' });
  }
});

app.listen(PORT, () => {
  console.log(`Relais contact démarré sur http://localhost:${PORT}`);
});
