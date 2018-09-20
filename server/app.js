import Koa from 'koa';
import cors from 'koa2-cors';
import http from 'http';
import initSocket from './src/utils/sockitIo.js'
const app = new Koa();

import router from './src/routes/index.js'

app.use(cors());
router(app);

const server = http.createServer(app.callback()).listen(6060);

// initSocket(server);