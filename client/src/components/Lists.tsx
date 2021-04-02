import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List as ListModel } from '../models';
import { List } from '../components/List';

export type Props = {
  lists: ListModel[];
  getLists: () => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    overflowX: 'scroll',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
}));

export const Lists: React.FC<Props> = ({
  lists,
  getLists,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {lists.map((list: ListModel) => (
        <List
          key={list.id}
          lists={lists}
          list={list}
          getLists={getLists}
        />
      ))}
    </div>
  )
};