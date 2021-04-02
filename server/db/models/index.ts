import List from './List';
import Task from './Task';

Task.belongsTo(List);
List.hasMany(Task);

export { List, Task };