import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import ListService from './services/ListService';
import CircularProgress from '@material-ui/core/CircularProgress';
import { List as ListModel } from './models';
import { Lists } from './components/Lists';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 60,
  },
  title: {
    flexGrow: 1,
  },
  addForm: {
    marginBottom: 20,
  },
  nameInput: {
    marginBottom: 10,
  },
  appBar: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loadingSpinner: {
    marginLeft: 10,
  },
}));

const App: React.FC = () => {
  const [lists, setLists] = useState<ListModel[]>([]);
  const [listName, setListName] = useState('');
  const [adding, setAdding] = useState(false);
  const [fetchingLists, setFetchingLists] = useState(false);

  const getLists = () => {
    setFetchingLists(true);
    return ListService.getAll()
      .then(lists => setLists(lists))
      .finally(() => setFetchingLists(false));
  }
  const addList = () => {
    setAdding(true);
    return ListService.create(listName)
      .then(getLists)
      .then(() => setListName(''))
      .finally(() => setAdding(false));
  };

  const onListNameChange = (event: any) => setListName(event.target.value);

  useEffect(() => {
    getLists();
  }, []);

  const classes = useStyles();

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Task Board
            {fetchingLists && (
              <CircularProgress className={classes.loadingSpinner} size={20} color="secondary" />
            )}
          </Typography>
        </AppBar>
        <main>
          <div className={classes.addForm}>
            <TextField
              label="List Name"
              variant="outlined"
              value={listName}
              onChange={onListNameChange}
              fullWidth
              placeholder="My awesome list"
              size="small"
              className={classes.nameInput}
            />
            <Button onClick={addList} fullWidth color="primary" variant="contained" disabled={!listName || adding}>Add List</Button>
          </div>
          <Lists lists={lists} getLists={getLists} />
        </main>
      </div>
    </div>
  );
}

export default App;
