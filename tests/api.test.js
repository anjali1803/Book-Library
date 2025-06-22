const request = require('supertest');
const { app, pool } = require('../server');

describe('Integration: DB + API', () => {
  let createdId;

  test('POST /books → creates book', async () => {
    const res = await request(app).post('/books').send({
      title: 'Treasure Island',
      author: 'R.L. Stevenson',
      genre: 'Adventure',
      published_year: 1883
    });
    expect(res.statusCode).toBe(200);
    createdId = res.body.id;
  });

  test('DELETE /books/:id → deletes book', async () => {
    const res = await request(app).delete(`/books/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Book deleted");
  });
});

afterAll(async () => {
  await pool.end();
});
