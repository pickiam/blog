import base from '../../base/index.js';
import tagModel from '../../models/tags/index.js';
import formidable from 'formidable'; 

class tag extends base {
    constructor () {
        super();
    }
    /**新增标签
     * 
     * @param {*} ctx 
     * @param {*} next 
     */
    async addTag (ctx, next) {
        const form = new formidable.IncomingForm();
        form.parse(ctx.req, (err, fields, files) => {
            if (err) {
                ctx.body = {
                    code: 0,
                    success: false,
                    message: '表单解析错误'
                };
                return;
            }
        })
    }
    /**
     * 删除标签
     * 
     * @param {any} ctx 
     * @param {any} next 
     * @memberof tag
     */
    async deleteTag (ctx, next) {
        let {id} = ctx.parmas.id;
        try {
            if (!id) {
                throw new Error('请传入id查询')
            }
            // 需加入关联查询，tag下存在文章内容不允许删除
            const deleteResult = await tagModel.destroy({
                where: {
                    tag_id: id
                }
            })
        } catch (error) {
            
        }
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
           

        } catch (error) {
            
        }
    }
}

export default new tag();