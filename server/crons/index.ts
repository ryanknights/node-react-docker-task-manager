import { Express } from 'express';
import { Op } from 'sequelize';
import cron from 'node-cron';
import { TasksService } from '../services/TasksService';
import { Task } from '../db/models';

export default (app: Express) => {
  // Send email for tasks with overdue deadline
  cron.schedule('* * * * *', async () => {
    console.log('Finding overdue tasks');
    const tasks = await Task.findAll({
      where: {
        complete: false,
        deadline: {
          [Op.lt]: new Date(),
        }
      }
    });
    console.log(`Found ${tasks.length} overdue tasks`);
    tasks.forEach((task: any) => TasksService.sendEmailOnOverdue(task.id));
  });
};