import Router from 'koa-router';

import article from '../controller/article/index.js';

const router = new Router({
    prefix: '/article'
});

router.post('/addArticle', async (ctx, next) => {
    try {
        let response = await article.addArticle(ctx, next);
        ctx.body = response;
    } catch (error) {
        ctx.body = error;
    }

});
router.put('/updateArticle/:id', async (ctx, next) => {
    try {
        let response = await article.updateArtitcle(ctx, next);
        ctx.body = reponse;
    } catch (error) {
        ctx.body = error;
    }
})
router.get('/artList',article.articleList);

router.get('/artDetail/:id', article.articleDetail);

export default router;