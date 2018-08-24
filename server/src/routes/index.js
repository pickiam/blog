
import admin from './admin.js'
import article from './article.js';
export default app => {
    app.use(admin.routes());
    app.use(admin.allowedMethods());
    app.use(article.routes());
    app.use(article.allowedMethods());
}