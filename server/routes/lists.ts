import express from 'express';
import { getAllLists, createNewList, deleteList } from '../controllers/lists';

const router = express.Router();

router.get('/', getAllLists);
router.post('/', createNewList);
router.delete('/:listId', deleteList);

export default router;