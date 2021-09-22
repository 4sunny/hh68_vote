import Vue from 'vue';
import VueRouter from "vue-router"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

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
    },
    {
        path: '/createuser',
        name: 'createuser',
        component: () => import('@/views/CreateUser.vue'),
        meta:{
            title: 'Create User'
        },
        beforeEnter(to, from, next) {
                firebase.auth().onAuthStateChanged(() => {
                    if (firebase.auth().currentUser.uid === "68AnWo2Wt1X8zhNfN4aoFcOBlDj1") {  
                        console.log(firebase.auth().currentUser.uid)
                        next();
                    } 
                    else {
                        next('/home');
                    }
                });
            }
    }
,] 
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | HH68`;
    next();
})

export default router;