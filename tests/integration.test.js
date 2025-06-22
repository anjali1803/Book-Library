const request = require('supertest');
const { app, pool } = require('../server');

describe('Integration: DB + API', () => {
  let id;

  test('POST /books → creates a book', async () => {
    const res = await request(app)
      .post('/books')
      .send({
        title: "Integration Test Book",
        author: "Tester",
        genre: "Fiction",
        published_year: 2024
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Integration Test Book");
    expect(res.body.author).toBe("Tester");
    id = res.body.id;
  });

  test('GET /books/:id → fetches book', async () => {
    const res = await request(app).get(`/books/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(id);
    expect(res.body.title).toBe("Integration Test Book");
  });

  test('DELETE /books/:id → deletes book', async () => {
    const res = await request(app).delete(`/books/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Book deleted");
  });
});

// Close DB connection after all tests
afterAll(async () => {
  await pool.end();
});
