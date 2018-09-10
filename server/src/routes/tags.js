import Router from 'koa-router';

import tags from '../controller/tags/index.js';

const router = new Router({
    prefix: '/tags'
})

router.get('/getTagsList', tags.tagsList);

export default router;