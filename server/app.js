import Koa from 'koa';
import cors from 'koa2-cors';
import http from 'http';
import kwt from 'koa-jwt';
import koaStatic from 'koa-static';
import path from 'path';
import authorization from './src/middleware/authentication.js'
import initSocket from './src/utils/sockitIo.js';
import { artilceInfo } from './src/utils/redisToMysql.js'
import config from './src/config/index.js'
const app = new Koa();
import router from './src/routes/index.js'


app.use(cors());
app.use(koaStatic(path.join(__dirname, './src/upload')))

app.use(kwt({ secret:config.tokenSecret }).unless({
    path:[/^\/admin\/login/, /^\/admin\/uploadImg/, /^\/article\/artList/, /^\/article\/artDetail/, /^\/tags\/getTagsList/]
}))
app.use(authorization());

router(app);
const server = http.createServer(app.callback()).listen(6060);

initSocket(server);

artilceInfo.redisToMysqlTask();
