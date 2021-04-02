import { Express } from 'express';
import lists from './lists';
import tasks from './tasks';

export default (app: Express ) => {
  app.use('/lists', lists);
  app.use('/tasks', tasks);
}