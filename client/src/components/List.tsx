import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { List as ListModel } from '../models';
import ListService from '../services/ListService';
import TaskService from '../services/TaskService';
import { MoveTasksModal, MoveTasksPayload } from './MoveTasksModal';
import { ManageTaskModal, ManageTaskPayload } from './ManageTaskModal';
import { Tasks } from './Tasks';

export type Props = {
  lists: ListModel[],
  list: ListModel;
  getLists: () => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300,
    minWidth: 300,
    marginRight: 20,
    padding: 20,
  },
  buttonMargin: {
    marginBottom: 10,
  },
}));

export const List: React.FC<Props> = ({
  lists,
  list,
  getLists,
}) => {
  const [tasksToAction, setTasksToAction] = useState<string[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [moveTasksModalOpen, setMoveTasksModalOpen] = useState(false);

  const classes = useStyles();

  const deleteList = () => {
    return ListService.delete(list.id)
      .then(getLists);
  };
  const deleteTasks = () => {
    return TaskService.bulkDelete(tasksToAction)
      .then(() => {
        setTasksToAction([]);
        getLists();
      });
  };

  const moveTasks = (data: MoveTasksPayload) => {
    return TaskService.move(data.listId, data.taskIds)
      .then(() => {
        onMoveTasksModalClose();
        setTasksToAction([]);
        getLists();
      });
  };
  const addTask = (data: ManageTaskPayload) => {
    return TaskService.create(list.id, data)
      .then(onAddModallose)
      .then(getLists);
  };
  const onMarkToAction = (taskId: string) => {
    const index = tasksToAction.findIndex((t) => t === taskId);
    const newTasksToAction = tasksToAction.slice();
    if (index === -1) {
      newTasksToAction.push(taskId);
    } else {
      newTasksToAction.splice(index, 1);
    }
    setTasksToAction(newTasksToAction);
  };

  const onAddModalOpen = () => setAddModalOpen(true);
  const onAddModallose = () => setAddModalOpen(false);
  const onMoveTasksModalOpen = () => setMoveTasksModalOpen(true);
  const onMoveTasksModalClose = () => setMoveTasksModalOpen(false);

  return (
    <Paper variant="outlined" className={classes.container}>
      <Typography variant="h6">
        {list.name} - {list.Tasks.length} task(s)
      </Typography>
      <Button
        onClick={deleteList}
        color="secondary"
        variant="contained"
        size="small"
        fullWidth
        className={classes.buttonMargin}
      >
        Delete List
      </Button>
      <Button
        onClick={onAddModalOpen}
        color="primary"
        variant="contained"
        size="small"
        fullWidth
        className={classes.buttonMargin}
      >
        Add New Task
      </Button>
      <ButtonGroup variant="contained" color="primary" fullWidth aria-label="contained primary button group">
        <Button
          onClick={deleteTasks}
          color="secondary"
          variant="contained"
          size="small"
          disabled={!tasksToAction.length}
        >
          Delete {tasksToAction.length} Task(s)
        </Button>
        <Button
          onClick={onMoveTasksModalOpen}
          color="primary"
          variant="contained"
          size="small"
          disabled={!tasksToAction.length}
        >
          Move {tasksToAction.length} Task(s)
        </Button>
      </ButtonGroup>
      <Tasks
        tasks={list.Tasks}
        tasksToAction={tasksToAction}
        getLists={getLists}
        onMarkToAction={onMarkToAction}
      />
      { addModalOpen && (
        <ManageTaskModal
          onCancel={onAddModallose}
          onSubmit={addTask}
        />
      )}
      { moveTasksModalOpen && (
        <MoveTasksModal
          lists={lists}
          currentList={list}
          taskIds={tasksToAction}
          onCancel={onMoveTasksModalClose}
          onSubmit={moveTasks}
        />
      )}
    </Paper>
  );
};