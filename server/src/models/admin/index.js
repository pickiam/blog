import sequelize from '../../db.js';
import Sequelize from 'Sequelize'
const Admin = sequelize.define('admin', {
    ad_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
        comment: '主键id'
    },
    ad_username: {
        type: Sequelize.STRING, 
        allowNull: false,
        comment: '用户名'
    },
    ad_password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '密码'
    },
    ad_updated_time: {
        type: Sequelize.DATE,
        comment: '创建时间'
    },
    ad_created_time: {
        type: Sequelize.DATE,
        comment: '更新时间'
    }
}, {
    tableName: 'blog_admin',
    timestamps: true,
    createdAt: 'ad_created_time',
    updatedAt: 'ad_updated_time',
    underscoped: true
});

export default Admin;