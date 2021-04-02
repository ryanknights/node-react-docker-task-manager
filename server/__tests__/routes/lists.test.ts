import app from '../../app';
import db from '../../db';
import supertest from 'supertest';

beforeAll(async () => {
  await db.sync({ force: true });
});

describe('routes/lists', () => {
  it('should succeed', async () => {
    await supertest(app)
      .get('/lists')
      .expect(200);
  });
})