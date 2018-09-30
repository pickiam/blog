import base from '../../base/index.js';
import tagModel from '../../models/tags/index.js';
import formidable from 'formidable'; 

class tag extends base {
    constructor () {
        super();
    }
    /**
     * 删除标签
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof tag
     */
    async deleteTag (ctx, next) {
        let {id} = ctx.params;
        try {
            if (!id) {
                throw new Error('请传入id查询');
            }
            // 需加入关联查询，tag下存在文章内容不允许删除
            const deleteResult = await tagModel.destroy({
                where: {
                    tag_id: id
                }
            });
            if (deleteResult) {
                ctx.body = {
                    code: 200,
                    success: true,
                    message: "删除成功"
                }
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                message: '未知错误，删除失败'
            }
        }
    }
    /**
     * 更新标签
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    async updateTag(ctx, next) {
       return new Promise((reslove, reject) => {
           const id = ctx.parmas.id;
           if (!id) {
               reject({
                   code: 0,
                   message: '请传入id查询'
               });
               return false;
           }
           const form = new formidable.IncomingForm();
           form.parse(ctx.req, async (err, fields, files) => {
               if (err) {
                   reject({
                       code: 0,
                       message: '解析表单失败'
                   });
                   return false;
               }
               console.log(fields);
               try {
                   const { tagStatus, tagValue } = fields;
                   let res = await tagModel.update({
                       tag_status: tagStatus,
                       tag_value: tagValue
                   }, {
                       where: {
                           tag_id: id
                       }
                   });
                   if (res) {
                       resolve({
                           code: 200,
                           success: true,
                           message: '更新成功'
                       })
                   }
               } catch (error) {
                   reject({
                       code: 0,
                       message: '更新失败'
                   })
               }
           })
           
       })
    }
    /**
     * 查询tag 下文章的count
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof tag
     */
    async tagCount (ctx, next) {
        try {
           const res = await tagModel.findAll({
               attributes: ['tag_value', 'tag_count']
           }, {
               where: {
                   tag_status: 1
               }
           })
           if (res) {
               ctx.body = {
                   code: 200,
                   success: true,
                   message: '查询成功'
               }
           }
        } catch (error) {
            ctx.body = {
                code: 0,
                message: '未知错误，查询失败'
            }
        }
    }
    /**
     * tags列表
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    async tagsList (ctx, next) {
        try {
            let tags = await tagModel.findAll();
            ctx.body = {
                code: 200,
                success: true,
                data: tags
            }
        } catch (error) {
            ctx.body = {
                code: 0,
                message: '查询tag列表失败'
            }
        }
    }
    /**添加标签
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    async addTag (ctx, next) {
        console.log(ctx.req)
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(ctx.req, async (err, fields, files) => {
                if (err) {
                    reject({
                        code: 0,
                        message: '解析表单失败'
                    })
                    return false;
                }
                console.log(fields);
                const { status = 1, tagContent } = fields;
                try {
                    const response = await tagModel.find({where: {tag_value: tagContent}});
                    console.log(response)

                    if (response) {
                        throw new Error('tag标签值已存在，无法添加')
                    };
                    const res = await tagModel.create({
                        tag_status: status,
                        tag_value: tagContent
                    });
                    if (res) {
                        resolve({
                            code: 200,
                            success: true,
                            message: '添加成功'
                        })
                    }
                } catch (error) {
                    reject({
                        code: 0,
                        message: error.message
                    })
                }
            })
        })
    }
}

export default new tag();