import Koa from 'koa';
import cors from 'koa2-cors';
import http from 'http';
import kwt from 'koa-jwt'
import initSocket from './src/utils/sockitIo.js';
import { artilceInfo } from './src/utils/redisToMysql.js'
import config from './src/config/index.js'
const app = new Koa();
import router from './src/routes/index.js'

app.use(kwt({ secret:config.tokenSecret }).unless({
    path:[/^\/admin\/login/]
}))
app.use(cors());
router(app);

const server = http.createServer(app.callback()).listen(6060);

initSocket(server);
// initSocket(server);
artilceInfo.redisToMysqlTask();
