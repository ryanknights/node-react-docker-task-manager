import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import TaskService from '../services/TaskService';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Task as TaskModel } from '../models';
import { ManageTaskModal, ManageTaskPayload } from './ManageTaskModal';

export type Props = {
  task: TaskModel;
  tasksToAction: string[];
  getLists: () => void;
  onMarkToAction: (taskId: string) => void;
}

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300,
    marginBottom: 10,
    position: 'relative',
  },
  cardTextMargin: {
    marginBottom: 10,
  },
  completeText: {
    display: 'flex',
    alignItems: 'center',
  },
  loadingSpinner: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
}));

export const Task: React.FC<Props> = ({
  task,
  tasksToAction,
  getLists,
  onMarkToAction,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  const updateTask = (data: ManageTaskPayload) => {
    setLoading(true);
    return TaskService.update(task.id, {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
    })
      .then(onUpdateModalClose)
      .then(getLists)
      .finally(() => setLoading(false));
  };
  const completeTask = () => {
    setLoading(true);
    return TaskService.complete(task.id)
      .then(getLists)
      .finally(() => setLoading(false));
  };

  const handleMarkAsAction = () => onMarkToAction(task.id);
  const onUpdateModalOpen = () => setUpdateModalOpen(true);
  const onUpdateModalClose = () => setUpdateModalOpen(false);

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        { loading && (
          <CircularProgress className={classes.loadingSpinner} size={15} />
        )}
        <CardContent>
          <Typography variant="h6">{task.title}</Typography>
          <Typography variant="body2" className={classes.cardTextMargin}>{task.description}</Typography>
          <Typography variant="body2" className={classes.cardTextMargin}>Deadline: {format(parseISO(task.deadline), 'dd/MM/yyyy HH:mm')}</Typography>
          <Typography variant="body2" gutterBottom={false} className={classes.completeText}>
            Complete? {task.complete ? <CheckIcon color="primary" /> : <CloseIcon color="error" />}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onUpdateModalOpen} disabled={loading}>Update</Button>
          <Button size="small" onClick={completeTask} disabled={task.complete || loading}>Complete</Button>
          <FormControlLabel
            control={(
              <Checkbox
                checked={tasksToAction.includes(task.id)}
                onChange={handleMarkAsAction}
                color="primary"
              />
            )}
            label="Action?"
            labelPlacement="end"
          />
        </CardActions>
      </Card>
      { updateModalOpen && (
        <ManageTaskModal
          task={task}
          onCancel={onUpdateModalClose}
          onSubmit={updateTask}
        />
      )}
    </>
  )
};