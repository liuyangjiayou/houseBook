import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
    {
        path : '/',
        redirect : '/buyHouseLoan'
    },
    {
        path : '/test',
        name : 'test',
        component: () => import( '../views/test/formRules.vue'),
        meta : {
            title : '我的测试'
        },
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
        component: () => import( '../views/BuyHouseLoan/BuyHouseLoanIndex.vue'),
        meta : {
            title : '购房贷款'
        },
        children : [
            {
                path : '/buyHouseLoan',
                redirect : '/buyHouseLoan/routeDetails'
            },
            {
                path : '/buyHouseLoan/wait',
                name : 'buyHouseLoan-wait',
                component : () => import('../views/BuyHouseLoan/BuyHouseWaitSingle.vue'),
                meta : {
                    title : '待收单',
                }
            },
            {
                path : '/buyHouseLoan/route',
                name : 'buyHouseLoan-route',
                component : () => import('../views/BuyHouseLoan/BuyHouseRoute.vue'),
                meta : {
                    title : '在途单',
                }
            },
            {
                path : '/buyHouseLoan/routeDetails',
                name : 'buyHouseLoan-routeDetails',
                component : () => import('../views/BuyHouseLoan/BuyHouseRouteDetails.vue'),
                meta : {
                    title : '在途单详情',
                }  
            },
            {
                path : '/buyHouseLoan/route',
                name : 'buyHouseLoan-route',
                component : () => import('../views/BuyHouseLoan/BuyHouseRoute.vue'),
                meta : {
                    title : '在途单',
                }
            },
        ]
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
