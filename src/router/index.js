import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { resolve } from 'url';

Vue.use(VueRouter)

const routes = [
    {
        path : '/',
        redirect : '/buyHouseLoan'
    },
    {
        path : '/home',
        name : 'home',
        component: Home,
        meta : {
            title : '经纪人信息'
        },
    },
    {
        path : '/buyHouseLoan',
        name : 'buyHouseLoan',
        component: () => import( '../views/BuyHoustLoan.vue'),
        meta : {
            title : '购房贷款 '
        }
    },
    {
        path : '/houseCard',
        name : 'houseCard',
        component: () => import('../views/HouseCard.vue'),
        meta : {
            title : '房本管理'
        }
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta : {
            title : '第二个页'
        }
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
