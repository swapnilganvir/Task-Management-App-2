import express from 'express';
import {
  addTask,
  listTask,
  removeTask,
  editTask,
} from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.post('/add', addTask);
taskRouter.post('/list', listTask);
taskRouter.post('/remove', removeTask);
taskRouter.post('/edit', editTask);

export default taskRouter;
