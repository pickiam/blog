import Sequelize from 'sequelize';
import config from './config';
const sequelize = new Sequelize(config.dataBase, config.user, config.password, {
    host: config.url,
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4'
     },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize.authenticate().then(() => {
    console.log('数据库连接成功');
}).catch((err) => {
    console.error(err);
});

export default sequelize;