import { Response, Request } from 'express';
import { List, Task } from '../db/models';

export const getAllLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.findAll({
      include: Task, order: [
        ['id', 'ASC'],
        [Task, 'id', 'ASC'],
      ]
    });
    return res.send(lists);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export const createNewList = async (req: Request, res: Response) => {
  try {
    const list = await List.create({ name: req.body.name });
    return res.status(201).send(list);
  } catch (e) {
    return res.status(500).send(e);
  }
}

export const deleteList = async (req: Request, res: Response) => {
  try {
    await Task.destroy({
      where: {
        ListId: req.params.listId,
      }
    });
    await List.destroy({
      where: {
        id: req.params.listId,
      }
    });
    return res.send();
  } catch (e) {
    return res.status(500).send(e);
  }
}