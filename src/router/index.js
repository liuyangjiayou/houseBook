import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
    {
        path : '/',
        redirect : '/home'
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
        component: () => import('../views/HouseCard/HouseCardIndex.vue'),
        meta : {
            title : '房本'
        },
        children : [
            {
                path : '/houseCard/list',
                name : 'houseCard-list',
                component : () => import('../views/HouseCard/HouseCardList.vue'),
                meta : {
                    title : '房本列表'
                },
            },
            {
                path : '/houseCard/details',
                name : 'houseCard-details',
                component : () => import('../views/HouseCard/HouseCardDetails.vue'),
                meta : {
                    title : '房本详情'
                },
            },
            {
                path : '/houseCard',
                redirect : '/houseCard/list'
            }
        ],
    },
    {
        path: '/test',
        name: 'test',
        component: () => import('../views/test.vue'),
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
