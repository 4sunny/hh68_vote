import Vue from 'vue';
import VueRouter from "vue-router"

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: "/",
        name: "home",
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'Home'
        }
    },
    {
        path:"/account",
        name: "account",
        component: () => import('@/views/Account.vue'),
        meta: {
            title: 'Account'
        }
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import('@/views/Stats.vue'),
        meta: {
            title: 'Stats'
        }
    },
    {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/Blog.vue'),
        meta: {
            title: 'Blog'
        }
    },
    {
        path: '/guide',
        name: 'guide',
        component: () => import('@/views/Guide.vue'),
        meta: {
            title: 'Guide'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/forgotpassword',
        name: 'forgotpassword',
        component: () => import('@/views/ForgotPassword.vue'),
        meta: {
            title: 'Forgot Password'
        }
    },] 
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | HH68`;
    next();
})

export default router;