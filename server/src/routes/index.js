
import admin from './admin.js'
import article from './article.js';
import tags from './tags.js'
export default app => {
    app.use(admin.routes());
    app.use(admin.allowedMethods());
    app.use(article.routes());
    app.use(article.allowedMethods());
    app.use(tags.routes());
    app.use(tags.allowedMethods());
}