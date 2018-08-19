import Router from 'koa-router';
import admin from '../controller/admin/index.js'
const router = new Router({
    prefix: '/admin'
});

router.post('/login', async (ctx, next) => {
   let response =  await admin.login(ctx, next);
   ctx.body = response;
});

router.get('/admin', async (ctx, next) => {
    ctx.body = 'admin !!!!'
})

export default router;