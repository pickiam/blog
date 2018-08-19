import base from '../../base/index.js';
import formidable from 'formidable'; 
import crypto from 'crypto';
import adminModel from '../../models/admin/index.js'
class admin extends base {
    constructor () {
        super();
        this.login = this.login.bind(this);
        this.encryption = this.encryption.bind(this);
    }
    async login (ctx, next) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm();
            form.parse(ctx.req, async (err, fields, files) => {
                if (err) {
                    resolve({
                        code: 0,
                        type: 'FORM_DATA_ERROR',
                        message: '表单信息错误'
                    })
                    return ;
                }
                const {userName, passWord} = fields;
                try {
                    if (!userName) {
                        throw new Error('用户名参数错误');
                    } else if (!passWord) {
                        throw new Error('密码参数错误')
                    }
                } catch (error) {
                    resolve({
                        code: 0,
                        message: error.message
                    });
                    return;
               } 
                const newPassWord = this.encryption(passWord);
                try {
                    const admin = await adminModel.find({where: {
                        ad_username: userName
                    }});
                    if (!admin) {
                        throw new Error('用户不存在');
                    } else if (newPassWord.toString() !== admin.ad_password.toString()) {
                        throw new Error('用户密码不正确');
                    } else {
                        ctx.body = {
                            code: 200,
                            success: true,
                            message: 'login successfun'
                        }
                    }
                } catch (error) {
                    console.log(error)
                    resolve({
                        code: 0,
                        message: error.message
                    })
                }
            })
        })
 
    }

    encryption (password) {
        const newPassWord = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newPassWord;
    }

    Md5 (password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}

export default new admin();