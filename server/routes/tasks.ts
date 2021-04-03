import express from 'express';
import {
  createNewTask,
  deleteTasks,
  deleteTask,
  getTask,
  moveTasks,
  updateTask,
  completeTask,
  getTasks,
} from '../controllers/tasks';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createNewTask);
router.delete('/', deleteTasks);
router.put('/move', moveTasks);
router.get(':taskId', getTask);
router.delete('/:taskId', deleteTask);
router.put('/:taskId', updateTask);
router.put('/:taskId/complete', completeTask);

export default router;