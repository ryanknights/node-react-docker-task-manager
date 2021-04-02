import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import ListService from './services/ListService';
import { List as ListModel } from './models';
import { Lists } from './components/Lists';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
  },
  title: {
    flexGrow: 1,
  },
  addForm: {
    marginBottom: 10,
  },
}));

const App: React.FC = () => {
  const [lists, setLists] = useState<ListModel[]>([]);
  const [listName, setListName] = useState('');

  const getLists = () => {
    return ListService.getAll()
      .then(lists => setLists(lists));
  }
  const addList = () => {
    return ListService.create(listName)
      .then(getLists)
      .then(() => setListName(''));
  };

  const onListNameChange = (event: any) => setListName(event.target.value);

  useEffect(() => {
    getLists();
  }, []);

  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="absolute">
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Task Board
          </Typography>
        </AppBar>
        <main>
          <div className={classes.addForm}>
            <TextField label="List Name" variant="outlined" value={listName} onChange={onListNameChange} fullWidth placeholder="My awesome list" />
            <Button onClick={addList} fullWidth color="primary" variant="contained" disabled={!listName}>Add List</Button>
          </div>
          <Lists lists={lists} getLists={getLists} />
        </main>
      </div>
    </div>
  );
}

export default App;
