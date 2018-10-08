import base from '../../base/index.js';
import ArticleModel from '../../models/article/index.js';
import formidable from 'formidable';
import sequelize from 'sequelize'
import miment from 'miment';
import marked from 'marked';
class article extends base {
    constructor () {
        super();
        this.articleList = this.articleList.bind(this);
        this.updateArtitcle = this.updateArtitcle.bind(this);
    }

    async articleList (ctx, next) {
        let { page = 1, pageSize = 6, tag = '' } = ctx.query;
        try {
            let artList, count;
            if (ctx.query.status) {
                artList = await ArticleModel.findAll({
                    where: {
                        art_status: ctx.query.status
                    },
                    offset: (page - 1) * pageSize,
                    limit: pageSize
                });
                count = await ArticleModel.findAll({
                    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']],
                    where: {
                        art_status: ctx.query.status
                    }
                })
            } else {
                artList = await ArticleModel.findAll({
                    offset: (page - 1) * pageSize,
                    limit: pageSize
                });
                count = await ArticleModel.findAll({
                    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']]
                })
            }
            ctx.body = {
                code: 200,
                success: true,
                data: artList,
                count: count[0]
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 0,
                success: false
            }
        }
    }
    async addArticle (ctx, next) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(ctx.req, async (err, fields, files) => {
                if (err) {
                    reject({
                        code: 0,
                        message: '表单解析错误'
                    })
                };
                const { title, content, tags, status = 1, sticky = 0} = fields;
                const htmlContent = marked(content)
                if (!(title && content && tags)) {
                    reject({
                        code: 0,
                        message: '表单信息不全'
                    });
                    return;
                }
                console.log(miment().format());
                try {
                    const response = await ArticleModel.create({
                        art_title: title,
                        art_status: status,
                        art_sticky: sticky,
                        art_htmlDetail: htmlContent,
                        art_detail: content,
                        art_create_time: miment().format(),
                        art_update_time: miment().format(),
                        art_tag: tags.join()
                        // art_title: title
                    });
                    if (response) {
                        resolve({
                            code: 200,
                            success: true,
                            data: response,
                            message: '保存成功'
                        })
                    }
                } catch (error) {
                    console.log(error);
                    reject({
                        code: 0,
                        message: '未知错误，保存失败'
                    })
                }
            })
        })
    }
    async updateArtitcle (ctx, next) {
        const id = ctx.params.id;
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(ctx.req, async (err, fields, files) => {
                if (err) {
                    reject({
                        code: 0,
                        message: '解析表单失败'
                    })
                }
                const { title, content, tags, status, sticky } = fields;
                console.log(fields)
                try {
                    const params = [['title', 'art_title'], ['content', 'art_detail'], ['tags', 'art_tag'], ['status', 'art_status'], ['sticky','art_sticky']]
                    let transferResult = this.transfer(fields, params);
                    let updateKey = null;
                    if (transferResult.art_detail) {
                        updateKey = Object.assign({}, transferResult, {art_htmlDetail: marked(transferResult.art_detail)}, {art_update_time: miment.format()})
                    }else {
                        updateKey = Object.assign({}, transferResult, {art_update_time: miment().format()}) 
                    }
                    let response = await ArticleModel.update( updateKey, {
                        where: {
                            art_id: id
                        }
                    })
                    resolve({
                        code: 200,
                        success: true,
                        message: '更新成功'
                    })
                } catch (error) {
                    console.log(error);
                    reject({
                        code: 0,
                        message: '更新失败'
                    })
                }
            })
        })
    }
    async articleDetail (ctx, next) {
        const id = ctx.params.id;
        try {
            const artDetail = await ArticleModel.findOne({
                where: {
                    art_id: +id
                }
            });
            if (!artDetail) {
                throw new Error('文章不存在');
            } else {
                ctx.body = {
                    code: 200,
                    success: true,
                    data: artDetail,
                };
            }
           
        } catch (error) {
            console.log(error);
            ctx.body ={
                code: 0,
                success: false,
                message: error.message
            };
        }
    }

}

export default new article();