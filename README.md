 ## 目录：
 
 [1、前言](#1前言)<br/>
 [2、服务端技术栈](#2服务端的技术栈)<br/>
 [3、web前端技术栈](#3web前端的技术栈)<br/>
 [4、服务部署](#4服务部署)<br/>
 [5、总结](#5总结)<br/>
 
 ### 1、前言

 时间好快，毕业两年有余，在此期间，我曾多次在内心问过自己，在这两年的职业生涯里，自己还算合格嘛？每日上下班，无不例外经过阿里、网易。我那时总是在想，那里边有我的同行，可是我的水平确不及大神们的1/2甚至1/3。我从来不是一个妄自菲薄的人，他们是优秀的。人家都说优秀的程序员总有那么一块自留地来记录自己的成长。为了向他们看齐，于是打算写博客来记录自己的成长，如果还能发光发热，那便更加舒服哈哈！
 
 ### 2、服务端技术栈
 立志成为一名大前端，不了解node怎么可以
 
 - web框架koa(相关的中间件)
 - mysql数据库(orm sequelize)
 - websocket(socket.io)
 - redis

 ```
.
│  .babelrc
│  .dockerignore
│  .eslintignore
│  .eslintrc.js
│  .gitignore
│  API.md
│  app.js
│  blog.md
│  Dockerfile                           docker配置
│  index.js                             入口文件
│  package-lock.json
│  package.json
│  
└─src
    │  db.js                            sequelize配置信息                 
    │  
    ├─base
    │      index.js                     基础类
    │      
    ├─config
    │      index.js                     配置文件
    │      
    ├─controller                        控制器业务处理
    │  │  index.js
    │  │  
    │  ├─admin
    │  │      index.js
    │  │      
    │  ├─article
    │  │      index.js
    │  │      
    │  ├─cateGory
    │  │      index.js
    │  │      
    │  └─tags
    │          index.js
    │          
    ├─middleware
    │      authentication.js            tokenError中间件
    │      
    ├─models                            数据库模型
    │  │  index.js
    │  │  
    │  ├─admin
    │  │      index.js
    │  │      
    │  ├─article
    │  │      index.js
    │  │      
    │  ├─category
    │  │      index.js
    │  │      
    │  └─tags
    │          index.js
    │          
    ├─routes                            路由中心
    │      admin.js
    │      article.js
    │      index.js
    │      tags.js
    │      
    ├─upload                            文件上传目录
    └─utils
            redis.js                    redis配置信息
            redisToMysql.js             reids->mysql 定时任务
            sockitIo.js                 socket.io
```  
 服务端的技术栈如上述，基本功能jsonwebtoken和koa-jwt鉴权，koa-static静态服务，ioredis的redis服务，socket.io的webscoket实现实时保存文章，sequelize orm 操作数据库,formidable处理表单处理和文件上传,node-schedule定时任务。功能其实不怎么完善，日后慢慢增加。

 #### 问题

 - koa中间件的执行顺序
 - koa post请求明明进入controller却提示404错误
 - redis 外网连接不上(已修改配置文件，防火墙关闭)
 
 ### 3、web前端技术栈
 
 - vue的服务端渲染(vue全家桶，ui库element.ui)
 - canvas(绘制背景和水波图)
 - websocket(socket.io.client的客户端实现)

 ```
.
│  .babelrc
│  .editorconfig
│  .gitignore
│  .npmrc
│  LICENSE
│  package-lock.json
│  package.json
│  README.md
│  server.js                            服务启动文件
│  
├─build
│      setup-dev-server.js
│      vue-loader.config.js
│      webpack.base.config.js
│      webpack.client.config.js
│      webpack.server.config.js
│      
├─src
│  │  app.js
│  │  App.vue
│  │  entry-client.js                   客户端入口文件
│  │  entry-server.js                   服务端入口文件
│  │  index.template.html
│  │  
│  ├─api
│  │      index.js                      api集合
│  │      
│  ├─config                             配置信息
│  │      env.js                        环境信息
│  │      fetch.js                      axios的简单配置
│  │      
│  ├─router
│  │      index.js                      路由主文件
│  │      
│  ├─static
│  │  ├─edit                            markdown编辑器相关
│  │  │  │  edit.css
│  │  │  │  edit.js
│  │  │  │  marked.js
│  │  │  │  
│  │  │  └─fonts
│  │  │          icomoon.woff
│  │  │          
│  │  └─images
│  │          bg.gif
│  │          
│  ├─store                              store文件
│  │      index.js
│  │      
│  └─views                              页面vue文件
│          artMan.vue
│          blogDetail.vue
│          blogList.vue
│          edit.vue
│          home.vue
│          login.vue
│          Main.vue                     主vue文件
│          tag.vue
│          
└─static
    └─img
            logo.png
            
```

听起来服务端渲染高大上，其实也就那么一回事  [vue服务端官网](https://ssr.vuejs.org/)    [官方Demo](https://github.com/vuejs/vue-hackernews-2.0/)文档大而全，照着文档走一遍基本就没啥问题，另外canvas真的很神奇，需要深入学习。


#### 问题

- 服务端渲染，不存在window和document对象
- asyncData 需返回promise对象
- 代码健壮性，例如处理promise函数，无论是使用async和await,还是pormise(...).then都需要catch
- 前端文件上传的方式
- canvas的深入学习

 ### 4、服务部署

 - docker
 - nginx
 - pm2     

 #### 问题

 - 代码更改，docker的工作流
 - nginx的基本配置信息
 - https     


### 5、总结

需要记录自己的成长