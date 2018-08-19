import Koa from 'koa';
import cors from 'koa2-cors';
const app = new Koa();

import router from './src/routes/index.js'

app.use(cors());
router(app);

app.listen(4444);