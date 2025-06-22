const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'booklibrary',
  password: 'anjali18',
  port: 5432,
});

// --- Your API routes ---
app.post('/books', async (req, res) => {
  const { title, author, genre, published_year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const year = published_year ? parseInt(published_year) : null;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, genre, year]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/books/:id', async (req, res) => {
const { id } = req.params;
try {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
    res.status(404).json({ error: 'Book not found' });
    } else {
    res.json({ message: 'Book deleted' });
    }
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
});

// Start server only if run directly
if (require.main === module) {
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
}

// Export app and pool for tests
module.exports = { app, pool };
