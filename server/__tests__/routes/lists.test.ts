import app from '../../app';
import db from '../../db';
import { List } from '../../db/models';
import supertest from 'supertest';

const mockLists = [
  {
    name: 'List A',
  },
  {
    name: 'List B',
  },
]

beforeEach(async () => {
  await db.sync({ force: true });
  await List.create(mockLists[0]);
  await List.create(mockLists[1]);
});

afterAll(async () => {
  await db.close();
});

describe('routes/lists', () => {

  describe('GET: /lists', () => {
    it('should return all lists', async () => {
      const response = await supertest(app)
        .get('/lists')
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe(mockLists[0].name);
      expect(response.body[1].name).toBe(mockLists[1].name);
    });
  });

  describe('POST: /lists', () => {
    it('should create and return new list', async () => {
      const response = await supertest(app)
        .post('/lists')
        .send({ name: 'List C'})
        .expect(201);

      expect(response.body.name).toBe('List C');
    });
  });

  describe('DELETE: /lists/:id', () => {
    it('should delete a single list', async () => {
      await supertest(app)
        .delete('/lists/1')
        .expect(200);

      const getAllResponse = await supertest(app)
        .get('/lists');

        expect(getAllResponse.body.length).toBe(1);
        expect(getAllResponse.body[0].name).toBe(mockLists[1].name);
    });
  });
})