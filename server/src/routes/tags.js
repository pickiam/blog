import Router from 'koa-router';

import tags from '../controller/tags/index.js';

const router = new Router({
    prefix: '/tags'
})

router.get('/getTagsList', tags.tagsList);

router.post('/addTag', async (ctx, next) => {
    try {
        let response =  await tags.addTag(ctx, next);
        ctx.body = response;
    } catch (error) {
        ctx.body = error
    }
 });

 router.get('/tagsCount', tags.tagCount);

 router.delete('/deleteTag/:id', tags.deleteTag);

 router.put('/updateTag/:id', async (ctx, next) => {
     try {
         let response = await tags.updateTag(ctx, next);
         ctx.body = response;
     } catch (error) {
         ctx.body = error;
     }
 })
export default router;