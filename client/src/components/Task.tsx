import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import TaskService from '../services/TaskService';
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
  },
}));

export const Task: React.FC<Props> = ({
  task,
  tasksToAction,
  getLists,
  onMarkToAction,
}) => {
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const classes = useStyles();

  const updateTask = (data: ManageTaskPayload) => {
    return TaskService.update(task.id, {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
    })
      .then(onUpdateModalClose)
      .then(getLists);
  };
  const completeTask = () => {
    return TaskService.complete(task.id)
      .then(getLists);
  };

  const handleMarkAsAction = () => onMarkToAction(task.id);
  const onUpdateModalOpen = () => setUpdateModalOpen(true);
  const onUpdateModalClose = () => setUpdateModalOpen(false);

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <CardContent>
          <Checkbox
            checked={tasksToAction.includes(task.id)}
            onChange={handleMarkAsAction}
            color="primary"
          />
          <CardActionArea>
            <Typography>{task.title}</Typography>
            <Typography>{task.description}</Typography>
            <Typography>{task.deadline}</Typography>
            Complete: {task.complete ? 'Yes' : 'No'}
          </CardActionArea>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onUpdateModalOpen}>Update</Button>
          <Button size="small" onClick={completeTask} disabled={task.complete}>Complete</Button>
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