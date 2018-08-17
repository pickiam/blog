const Sequelize = require('sequelize');
const sequelize = new Sequelize('myblog', 'root', 'root', {
    host: '118.24.69.214',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const User = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });
  
  // force: true 如果表已经存在，将会丢弃表
  User.sync({force: true}).then(() => {
    // 表已创建
    return User.create({
      firstName: 'John',
      lastName: 'Hancock'
    });
  });