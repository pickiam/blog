import sequelize from '../../db.js';
import Sequelize from 'Sequelize';

const cateGory = sequelize.define('cateGory', {
    cg_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cg_title: {
        type: Sequelize.STRING,
        comment: ''
    },
    cg_type: {
        type: Sequelize.STRING,
        comment: ''
    },
    cg_create_time: {
        type: Sequelize.DATE
    },
    cg_update_time: {
        type: Sequelize.DATE
    }
}, {
    tableName: 'blog_ag',
    timestamps: true,
    createdAt: 'cg_create_time',
    updatedAt: 'cg_update_time',
    underscored: true
});

cateGory.sync();

export default cateGory
