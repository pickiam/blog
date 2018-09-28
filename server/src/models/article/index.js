import sequelize from '../../db.js';
import Sequelize from 'Sequelize';

const Article = sequelize.define('article', {
    art_id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true,
        allowNull: false,
        comment: '主键id'
    }, 
    art_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: '状态 0无效 1有效'
    },
    art_sticky: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comments: '置顶 0 no 1 yes'
    },
    art_detail: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '内容'
    },
    art_create_time: {
        type: Sequelize.DATE,
        allowNull: true
    },
    art_update_time: {
        type: Sequelize.DATE,
        allowNull: false
    },
    art_category: {
        type: Sequelize.STRING,
        comment: '种类'
    },
    art_htmlDetail: {
        type: Sequelize.TEXT,
        comment: 'html内容'
    },
    art_tag: {
        type: Sequelize.STRING,
        comment: '标签'
    },
    art_title: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '标题'
    }
}, {
    tableName: 'blog_article',
    timestamps: true,
    createdAt: 'art_create_time',
    updatedAt: 'art_update_time',
    underscored: true
});

// 创建文章表
Article.sync();

export default Article;