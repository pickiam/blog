import base from '../../base/index.js';
import ArticleModel from '../../models/article/index.js';
import formidable from 'formidable';
import miment from 'miment';
import marked from 'marked';
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
                offset: (page - 1) * pageSize,
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
                console.log(marked(content));
                if (!(title && content && tags)) {
                    reject({
                        code: 0,
                        message: '表单信息不全'
                    });
                    return;
                }
                try {
                    const response = await ArticleModel.create({
                        art_title: title,
                        art_status: status,
                        art_sticky: sticky,
                        art_htmlContent: marked(content),
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
        
    }
    async articleDetail (ctx, next) {
        const id = ctx.params;
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