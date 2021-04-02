import { DataTypes } from 'sequelize';
import sequelize from '../';

const List = sequelize.define('List', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export default List;