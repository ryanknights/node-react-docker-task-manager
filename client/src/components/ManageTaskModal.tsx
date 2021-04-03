import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Task as TaskModel } from '../models';

export type Props = {
  task?: TaskModel;
  onCancel: () => void;
  onSubmit: (data: ManageTaskPayload) => void;
};

export type ManageTaskPayload = {
  title: string;
  description: string;
  deadline: string;
};

export const ManageTaskModal: React.FC<Props> = ({
  task,
  onCancel,
  onSubmit,
}) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [deadline, setDeadline] = useState(format(task ? parseISO(task.deadline) : new Date(), "yyyy-MM-dd'T'hh:mm"));

  const onTitleChange = (event: any) => setTitle(event.target.value);
  const onDescriptionChange = (event: any) => setDescription(event.target.value);
  const onDeadlineChange = (event: any) => setDeadline(event.target.value);

  const handleSubmit = () => {
    const data: ManageTaskPayload = {
      title,
      description,
      deadline,
    };
    onSubmit(data);
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="lg">
      <DialogTitle>Add Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          defaultValue={title}
          onChange={onTitleChange}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          defaultValue={description}
          onChange={onDescriptionChange}
        />
        <TextField
          id="deadline"
          label="Deadline"
          type="datetime-local"
          defaultValue={deadline}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onDeadlineChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary">
          {task ? 'Update' : 'Add'} Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}