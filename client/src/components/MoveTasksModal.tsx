import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { List as ListModel } from '../models';

export type Props = {
  lists: ListModel[];
  currentList: ListModel;
  taskIds: string[];
  onCancel: () => void;
  onSubmit: (data: MoveTasksPayload) => void;
};

export type MoveTasksPayload = {
  taskIds: string[];
  listId: string;
};

const useStyles = makeStyles((theme) => ({
  selectContainer: {
    minWidth: 300,
  }
}));

export const MoveTasksModal: React.FC<Props> = ({
  lists,
  currentList,
  taskIds,
  onCancel,
  onSubmit,
}) => {
  const [newListId, setNewListId] = useState('');

  const classes = useStyles();

  const onFormChange = (event: any) => setNewListId(event.target.value);

  const handleSubmit = () => {
    const data: MoveTasksPayload = {
      taskIds,
      listId: newListId,
    };
    onSubmit(data);
  };

  const listOptions = lists.filter((list: ListModel) => list.id !== currentList.id)
    .map((list) => <MenuItem value={list.id}>{list.name}</MenuItem>);

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="lg">
      <DialogTitle>Move {taskIds.length} Task(s)</DialogTitle>
      <DialogContent>
        <FormControl id="move-tasks-label" className={classes.selectContainer}>
          <InputLabel>New List</InputLabel>
          <Select
            labelId="move-tasks-label"
            id="move-tasks"
            value={newListId}
            onChange={onFormChange}
            fullWidth
          >
            {listOptions}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary">
          Move Tasks
        </Button>
      </DialogActions>
    </Dialog>
  )
}