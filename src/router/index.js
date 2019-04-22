import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/store'
import * as types from './../store/types';

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

if (window.localStorage.getItem('appId')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}
const routes = [{
    path: '/',
    name: 'home',
    component: resolve => require(['../components/repair/worklists.vue'], resolve),
    meta: { keepAlive: true}, // 需要被缓存,

  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../components/repair/login.vue'], resolve)
  },
  {
    path: '/errPage',
    name: 'errPage',
    component: resolve => require(['../components/repair/errPage.vue'], resolve)
  },
  {
    path: '/myInfo/index',
    name: 'myIndex',
    component: resolve => require(['../components/myInfo/index.vue'], resolve)
  },
  {
    path: '/myInfo/myInfo',
    name: 'myInfo',
    component: resolve => require(['../components/myInfo/myInfo.vue'], resolve)
  },

  {
    path: '/repair/orderdetails',
    name: 'orderdetails',
    component: resolve => require(['../components/repair/orderdetails.vue'], resolve)
  },
  {
    path: '/repair/Followupstate',
    name: 'Followupstate',
    component: resolve => require(['../components/repair/Followupstate.vue'], resolve)
  },
  {
    path: '/repair/Lossstate',
    name: 'Lossstate',
    component: resolve => require(['../components/repair/Lossstate.vue'], resolve)
  },
  {
    path: '/repair/Carrepairstate',
    name: 'Carrepairstate',
    component: resolve => require(['../components/repair/Carrepairstate.vue'], resolve)
  },
  {
    path: '/repair/Turninacar',
    name: 'Turninacar',
    component: resolve => require(['../components/repair/Turninacar.vue'], resolve)
  },
  {
    path: '/repair/Followuprecord',
    name: 'Followuprecord',
    component: resolve => require(['../components/repair/Followuprecord.vue'], resolve)
  },
  {
    path: '/repair/Maintenance',
    name: 'Maintenance',
    component: resolve => require(['../components/repair/Maintenance.vue'], resolve)
  },
  {
    path: '/repair/Conductor',
    name: 'Conductor',
    component: resolve => require(['../components/repair/Conductor.vue'], resolve)
  },
  {
    path: '/repair/Lossrecord',
    name: 'Lossrecord',
    component: resolve => require(['../components/repair/Lossrecord.vue'], resolve)
  },
  {
    path: '/repair/Close',
    name: 'Close',
    component: resolve => require(['../components/repair/Close.vue'], resolve)
  },
  {
    path: '/message/index',
    name: 'message',
    component: resolve => require(['../components/message/index.vue'], resolve)
  },
  {
    path: '/dataAnalyze',
    name:'dataAnalyze',
    component: resolve => require(['../components/dataAnalyze/index.vue'], resolve)
  },
 
]

var __dirname = process.env.DIR_NAME;

const router = new Router({
  base: __dirname,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
  } else {
    next();
  }
})

export default router;
