const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'microdb'
});

app.post('/add', async (req, res) => {
  const { name, value } = req.body;
  await pool.query('INSERT INTO records(name, value) VALUES($1, $2)', [name, value]);
  res.json({ message: 'Data inserted' });
});

app.get('/all', async (req, res) => {
  const result = await pool.query('SELECT * FROM records');
  res.json(result.rows);
});

app.listen(3000, () => console.log('Node service running on port 3000'));
