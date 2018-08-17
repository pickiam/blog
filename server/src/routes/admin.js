import Router from 'koa-router';

const router = new Router({
    prefix: '/admin'
});

router.get('/home', async (ctx, next) => {
    ctx.body = 'register route success'
});

router.get('/admin', async (ctx, next) => {
    ctx.body = 'admin !!!!'
})

export default router;