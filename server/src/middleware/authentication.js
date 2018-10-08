
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // 获取jwt
      const token = ctx.header.authorization; 
      console.log(token)
      if (token) {
        try {
          // 解密payload，获取用户名和ID
          console.log(config.tokenSecret)
          let payload = await verify(token.split(' ')[1], config.tokenSecret);
          ctx.user = {
            name: payload.name,
            id: payload.id
          };
        } catch (err) {
          console.log('token verify fail: ', err)
        }
      }
      await next();
    } catch (err) {
      console.log(err)
      if (err.status === 401) {
        console.log(err.status)
        ctx.status = 401;
        ctx.body = {
          success: 0,
          message: '认证失败'
        };
      } else {
        err.status = 404;
        ctx.body = {
          success: 0,
          message: '404'
        };
      }
    }
  }
}