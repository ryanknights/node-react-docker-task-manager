import app from '../../app';
import db from '../../db';
import { Task } from '../../db/models';
import supertest from 'supertest';

const mockTasks = [
  {
    title: 'Task A',
    description: 'Description A',
    deadline: '2020-05-24T10:30:00.000Z',
    complete: false,
  },
  {
    title: 'Task B',
    description: 'Description B',
    deadline: '2020-06-24T10:30:00.000Z',
    complete: true,
  },
];

beforeEach(async () => {
  await db.sync({ force: true });
  await Task.create(mockTasks[0]);
  await Task.create(mockTasks[1]);
});

afterAll(async () => {
  await db.close();
});

describe('routes/tasks', () => {

  describe('GET: /tasks', () => {
    it('should return all lists', async () => {
      const response = await supertest(app)
        .get('/tasks')
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0].title).toBe(mockTasks[0].title);
      expect(response.body[1].title).toBe(mockTasks[1].title);
    });
  });

  describe('POST: /tasks', () => {
    it('should create and return new task', async () => {
      const newTask = {
        title: 'Task C',
        description: 'Description C',
        deadline: '2020-12-25T10:30:00.000Z',
        complete: true,
        ListId: 1,
      }
      const response = await supertest(app)
        .post('/tasks')
        .send(newTask)
        .expect(201);

      expect(response.body.title).toBe(newTask.title);
      expect(response.body.description).toBe(newTask.description);
      expect(response.body.deadline).toBe(newTask.deadline);
      expect(response.body.complete).toBe(newTask.complete);
    });
  });

  /* TODO
  router.delete('/', deleteTasks);
  router.put('/move', moveTasks);
  router.get(':taskId', getTask);
  router.delete('/:taskId', deleteTask);
  router.put('/:taskId', updateTask);
  router.put('/:taskId/complete', completeTask);
  */
});