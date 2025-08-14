const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'microdb'
});

app.use(bodyParser.urlencoded({ extended: true }));

// Formulaire HTML
app.get('/', (req, res) => {
  res.send(`
    <h1>Enregistrer une valeur</h1>
    <form action="/submit" method="POST">
      <label>Nom :</label><br>
      <input type="text" name="name" required><br>
      <label>Valeur :</label><br>
      <input type="number" name="value" required><br><br>
      <button type="submit">Envoyer</button>
    </form>
  `);
});

// Enregistrement des données
app.post('/submit', async (req, res) => {
  const { name, value } = req.body;
  try {
    await pool.query(
      'INSERT INTO entries (name, value) VALUES ($1, $2)',
      [name, parseFloat(value)]
    );
    //res.send('Valeur enregistrée avec succès !');
    res.send(`
      <p style="color: green;">✅ Valeur enregistrée avec succès !</p>
      <a href="/">↩ Revenir au formulaire</a>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'enregistrement');
  }
});

app.listen(port, () => {
  console.log(`Node.js service running on port ${port}`);
});
