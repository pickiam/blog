import base from '../../base/index.js';

import cateGoryModel from '../../models/category/index.js';

class category extends base {
    constructor () {
        super();
    }

    async categoryList (ctx, next) {
        try {
            let cate = await cateGoryModel.findAll();
            ctx.body = {
                code: 200,
                success: true,
                data: cate
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                code: 0,
                success: false
                
            }
        }
    }
}