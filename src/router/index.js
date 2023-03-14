import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import Question from '@/views/question/index.vue'
import Video from '@/views/video/index.vue'
import My from '@/views/my/index.vue'
import Search from '@/views/search/index.vue'
import Article from '@/views/article/index.vue'
import Userinfo from '@/views/user-info/index.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/',
        // name: 'layout',
        component: Layout,
        children: [
            {
                path: '',//为空默认子路由
                name: 'home',
                component: Home,
            }, {
                path: 'question',
                name: 'question',
                component: Question,
            }, {
                path: 'video',
                name: 'video',
                component: Video,
            }, {
                path: 'my',
                name: 'my',
                component: My,
            }
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '/article/:articleid',  //动态路由
        name: 'article',
        component: Article,
        props: true  //开启props传参   把路由参数映射到组件的props中
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: Userinfo
    },
]

const router = new VueRouter({
    routes
})

export default router