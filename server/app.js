import Koa from 'koa';
import cors from 'koa2-cors';
import http from 'http';
import kwt from 'koa-jwt';
import authorization from './src/middleware/authentication.js'
import initSocket from './src/utils/sockitIo.js';
import { artilceInfo } from './src/utils/redisToMysql.js'
import config from './src/config/index.js'
const app = new Koa();
import router from './src/routes/index.js'
// app.use((ctx, next) => {
//     if (ctx.req.method === 'OPTIONS') {
//         ctx.status = 200;
//     } else {
//         next();
//     }
// })
app.use(cors());
app.use(kwt({ secret:config.tokenSecret }).unless({
    path:[/^\/admin\/login/, /^\/article\/artList/, /^\/article\/artDetail/, /^\/tags\/getTagsList/]
}))
app.use(authorization());

router(app);

const server = http.createServer(app.callback()).listen(6060);

initSocket(server);
// initSocket(server);
artilceInfo.redisToMysqlTask();
