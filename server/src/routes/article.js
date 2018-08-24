import Router from 'koa-router';

import article from '../controller/article/index.js';

const router = new Router({
    prefix: '/article'
})

router.get('/artList',article.articleList);

export default router;