import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    position: 'relative',
  },
  buttonMargin: {
    marginBottom: 10,
  },
  loadingSpinner: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const deleteList = () => {
    setLoading(true);
    return ListService.delete(list.id)
      .then(getLists)
      .finally(() => setLoading(false));
  };
  const deleteTasks = () => {
    setLoading(true);
    return TaskService.bulkDelete(tasksToAction)
      .then(() => {
        setTasksToAction([]);
        getLists();
      })
      .finally(() => setLoading(false));
  };

  const moveTasks = (data: MoveTasksPayload) => {
    setLoading(true);
    return TaskService.move(data.listId, data.taskIds)
      .then(() => {
        onMoveTasksModalClose();
        setTasksToAction([]);
        getLists();
      })
      .finally(() => setLoading(false));
  };
  const addTask = (data: ManageTaskPayload) => {
    setLoading(true);
    return TaskService.create(list.id, data)
      .then(onAddModallose)
      .then(getLists)
      .finally(() => setLoading(false));
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
      { loading && (
        <CircularProgress className={classes.loadingSpinner} size={15} />
      )}
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
        disabled={loading}
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
        disabled={loading}
      >
        Add New Task
      </Button>
      <ButtonGroup variant="contained" color="primary" fullWidth aria-label="contained primary button group">
        <Button
          onClick={deleteTasks}
          color="secondary"
          variant="contained"
          size="small"
          disabled={!tasksToAction.length || loading}
        >
          Delete {tasksToAction.length} Task(s)
        </Button>
        <Button
          onClick={onMoveTasksModalOpen}
          color="primary"
          variant="contained"
          size="small"
          disabled={!tasksToAction.length || loading}
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