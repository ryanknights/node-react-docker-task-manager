import express from 'express';
import {
  createNewTask,
  deleteTasks,
  deleteTask,
  moveTasks,
  updateTask,
  completeTask,
} from '../controllers/tasks';

const router = express.Router();

router.post('/', createNewTask);
router.delete('/', deleteTasks);
router.put('/move', moveTasks);
router.delete('/:taskId', deleteTask);
router.put('/:taskId', updateTask);
router.put('/:taskId/complete', completeTask);

export default router;