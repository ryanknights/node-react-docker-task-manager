import { Response, Request } from 'express';
import { Task } from '../db/models';
import { TasksService } from '../services/TasksService';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll({
      order: [
        ['id', 'ASC'],
      ]
    });
    return res.send(tasks);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      complete: req.body.complete,
      ListId: req.body.listId,
    });
    return res.status(201).send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const deleteTasks = async (req: Request, res: Response) => {
  try {
    await Task.destroy({
      where: {
        id: JSON.parse(req.body.taskIds),
      },
    });
    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    return res.send(task);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.taskId,
      },
    });
    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const moveTasks = async (req: Request, res: Response) => {
  try {
    await Task.update({ ListId: req.body.listId }, {
      where: {
        id: JSON.parse(req.body.taskIds),
      },
    });
    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatePayload: Record<string, any> = {};
    if (req.body.title) {
      updatePayload.title = req.body.title;
    }
    if (req.body.description) {
      updatePayload.description = req.body.description;
    }
    if (req.body.deadline) {
      updatePayload.deadline = req.body.deadline;
    }

    Task.update(updatePayload, {
      where: {
        id: req.params.taskId,
      },
    });

    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const completeTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    await Task.update({ complete: true }, {
      where: {
        id: taskId,
      },
    });
    TasksService.sendEmailOnComplete(taskId);
    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
};