import { DataTypes } from 'sequelize';
import sequelize from '../';

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Task;