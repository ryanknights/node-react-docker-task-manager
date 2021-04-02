import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Task as TaskModel} from '../models';
import { Task } from './Task';

export type Props = {
  tasks: TaskModel[];
  tasksToAction: string[];
  getLists: () => void;
  onMarkToAction: (taskId: string) => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 20,
  },
}));

export const Tasks: React.FC<Props> = ({
  tasks,
  tasksToAction,
  onMarkToAction,
  getLists,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {tasks.map((task: TaskModel) => (
        <Task
          key={task.id}
          task={task}
          tasksToAction={tasksToAction}
          onMarkToAction={onMarkToAction}
          getLists={getLists}
        />
      ))}
    </div>
  );
};