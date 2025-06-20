const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup Postgres connection
const pool = new Pool({
    user: 'postgres',      // e.g. postgres
    host: 'localhost',
    database: 'booklibrary',
    password: 'anjali',
    port: 5432,
});

// Test DB connection
pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL'))
    .catch(err => console.error('❌ Connection error', err.stack));


//POST /books — Add book
app.post('/books', async (req, res) => {
    console.log('Received data:', req.body);
    const { title, author, genre, published_year } = req.body || {};
    
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    const year = published_year ? parseInt(published_year) : null;

    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, genre, published_year) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, author, genre, year]
        );
        console.log('Inserted:', result.rows[0]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error('DB Insert Error:', err);
        res.status(500).json({ error: err.message });
    }
});



app.get('/books', async (req, res) => {
    const { genre } = req.query;
    try {
        const result = genre 
            ? await pool.query('SELECT * FROM books WHERE genre = $1', [genre])
            : await pool.query('SELECT * FROM books');
        res.json(result.rows);
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

app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, published_year } = req.body;
    try {
        const result = await pool.query(
            'UPDATE books SET title = $1, author = $2, genre = $3, published_year = $4 WHERE id = $5 RETURNING *',
            [title, author, genre, published_year, id]
        );
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

app.get('/authors/:authorName/books', async (req, res) => {
    const { authorName } = req.params;
    try {
        const result = await pool.query('SELECT * FROM books WHERE author = $1', [authorName]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Start server
app.listen(5000, () => {
    console.log('🚀 Server is running on port 5000');
});








//Treasure Island" by Robert Louis Stevenson is an adventure novel first published in 1883