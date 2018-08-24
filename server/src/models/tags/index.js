import sequelize from '../../db.js';
import Sequelize from 'Sequelize';
const tag = sequelize.define('tag', {
    tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    tag_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: '状态 0 无效 1有效'
    },
    tag_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        comment: '类型'
    },
    tag_value: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: '标签值'
    },
    tag_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: '引入次数'
    },
    art_create_time: {
        type: Sequelize.DATE,
        allowNull: true
    },
    art_update_time: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'blog_tags',
    timestamps: true,
    createdAt: 'art_create_time',
    updatedAt: 'art_update_time',
    underscored: true
})

tag.sync();

export default tag;