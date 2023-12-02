import { createApp } from 'vue/dist/vue.esm-bundler.js';
import * as VueRouter from 'vue-router';
import './style.css'
import App from './App.vue'

const routes = [
    {
        path: '/',
        component: () => import('./views/users.vue')
    },
    {
        path: '/sendmsg',
        component: () => import('./views/sendmsg.vue')
    },
    {
        path: '/setimg',
        component: () => import('./views/setimg.vue')
    },
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)
app.mount('#app')
