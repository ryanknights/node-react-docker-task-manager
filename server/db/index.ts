import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || '',
  process.env.MYSQL_USER || '',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST_IP,
    dialect: 'mysql'
  },
);

export async function setupDb() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database has been setup and connected successfully.');
  } catch (error) {
    console.error('Unable to setup the database');
    throw error;
  }
}

export default sequelize;

