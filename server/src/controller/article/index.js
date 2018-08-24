import base from '../../base/index.js';
import ArticleModel from '../../models/article/index.js';
import formidable from 'formidable'; 

class article extends base {
    constructor () {
        super();
        this.articleList = this.articleList.bind(this);
    }

    async articleList (ctx, next) {
        let { page = 1, pageSize = 6, status = 1, tag = '' } = ctx.query;
        try {
            const artList = await ArticleModel.findAll({
                where: {
                    art_status: status
                },
                offset: page * pageSize,
                limit: pageSize
            });
            ctx.body = {
                code: 200,
                success: true,
                data: artList
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
        const form = new formidable.IncomingForm();
        form.parse(ctx.req, (err, fields, files) => {
            if (err) {
                ctx.body = {
                    code: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                }
                return;
            }
            
        })
    }
    async articleDetail (ctx, next) {
        let { id } = ctx.params.id;
        try {
            const artDetail = await ArticleModel.find({
                where: {
                    art_id: id
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