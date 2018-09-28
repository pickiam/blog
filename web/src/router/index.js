import Vue from 'vue'
import Router from 'vue-router';
import Main from '../views/Main.vue'
Vue.use(Router)
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { name: 'login', path: '/login', component: () => import('../views/login.vue') },
            { name: 'home', path: '/home', redirect: '/blog/blogList', component: () => import('../views/home.vue')},
            {
                name: 'Main',
                path: '/blog',
                component: Main,
                children: [
                    {name: 'index', path: 'index', component: () => import('../views/home.vue')},
                    {name: 'edit', path: 'edit', component: () => import('../views/edit.vue')},
                    {name: 'tag', path: 'tag', component: () => import('../views/tag.vue')},
                    {name: 'blogList', path: 'blogList', component: () => import('../views/blogList.vue')},
                    {name: 'blogDetail', path: 'blogDetail/:id', component: () => import('../views/blogDetail.vue')}
                ]
            }
        ]
    })
}
