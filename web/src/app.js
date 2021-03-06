import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import animate from 'animate.css'
import { createRouter } from './router';
import createStore  from './store';
import { sync } from 'vuex-router-sync';
Vue.use(ElementUI);

Vue.use(animate);
export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
//   router.beforeEach(async (to, from, next) => {
//     if (to.meta.requiresAuth && to.meta.requiresAuth === true) {
       
//     } else {
//         next();
//     }
// });
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, router, store }
}