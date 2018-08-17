import Koa from 'koa';
const app = new Koa();
import router from './src/routes/index.js'
router(app);
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
});

app.use(async ctx => {
    ctx.body = 'hello World';
})

app.listen(4444);