import { Sequelize } from 'sequelize';

import environmentConfig from './config';
const env = process.env.NODE_ENV || 'development';

console.log('Postgres DB Connection Config Loaded');

const postgresSequelize = new Sequelize(environmentConfig[env]);

postgresSequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default postgresSequelize;