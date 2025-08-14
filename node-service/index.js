const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'microdb'
});

// Formulaire HTML
app.get('/', (req, res) => {
  res.send(`
    <h1>Ajouter une donnée</h1>
    <form action="/add" method="post">
      Nom : <input type="text" name="name" required><br>
      Valeur : <input type="number" name="value" required><br>
      <button type="submit">Envoyer</button>
    </form>
    <a href="/all">Voir toutes les données</a>
  `);
});

// Insertion en DB
app.post('/add', async (req, res) => {
  const { name, value } = req.body;
  await pool.query('INSERT INTO records(name, value) VALUES($1, $2)', [name, value]);
  res.redirect('/');
});

// Liste des données
app.get('/all', async (req, res) => {
  const result = await pool.query('SELECT * FROM records');
  let html = "<h1>Toutes les données</h1><ul>";
  result.rows.forEach(row => {
    html += `<li>${row.name} : ${row.value}</li>`;
  });
  html += "</ul><a href='/'>Retour</a>";
  res.send(html);
});

app.listen(3000, () => console.log('Node service running on port 3000'));

