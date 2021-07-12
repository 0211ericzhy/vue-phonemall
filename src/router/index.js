import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
    }
  },
  // 分类
  {
    path: '/Goods',
    name: 'Goods',
    component: () => import('../views/goods/Goods.vue'),
    meta: {
      title: '货物分类',
    }
  },
  // 有货物购物车
  {
    path: '/ShoppingCar',
    name: 'ShoppingCar',
    component: () => import('../views/shoppingcar/ShoppingCar.vue'),
    meta: {
      title: '购物车',
    }
  },
  // 未登陆购物车
  {
    path: '/Unshoppingcar',
    name: 'Unshoppingcar',
    component: () => import('../views/unshoppingcar/Unshoppingcar.vue'),
    meta: {
      title: '购物车',
    }
  },
  // 无货物购物车
  {
    path: '/Noshoppingcar',
    name: 'Noshoppingcar',
    component: () => import('../views/noshopingcar/Noshoppingcar.vue'),
    meta: {
      title: '购物车',
    }
  },
  {
    path: '/Settlement',
    name: 'Settlement',
    component: () => import('../views/settlement/Settlement.vue'),
    meta: {
      title: '结算',
    }
  },
  // 订单地址
  {
    path: '/Orderaddress',
    name: 'Orderaddress',
    component: () => import('../views/orderaddress/Orderaddress.vue'),
    meta: {
      title: '订单地址',
    }
  },
  // 添加地址
  {
    path: '/Addaddress',
    name: 'Addaddress',
    component: () => import('../views/addaddress/Addaddress.vue'),
    meta: {
      title: '订单地址',
    }
  },
  // 我的
  {
    path: '/Mine',
    name: 'Mine',
    component: () => import('../views/mine/Mine.vue'),
    meta: {
      title: '我的',
    }
  },
  // 登陆注册
  {
    path: '/Loggin',
    name: 'Loggin',
    component: () => import('../views/loggin/Loggin.vue'),
    meta: {
      title: '我的',
    }
  },
  // 详情页
  {
    path: '/Details',
    name: 'Details',
    component: () => import('../views/details/Details.vue'),
    meta: {
      title: '商品详情页',
    }
  },
  // 评论中心
  {
    path: '/EvaluationCenter',
    name: 'EvaluationCenter',
    component: () => import('../views/evaluationcenter/EvaluationCenter.vue'),
    meta: {
      title: '评论中心',
    }
  },
  // 评论晒图
  {
    path: '/EvaluationPic',
    name: 'EvaluationPic',
    component: () => import('../views/evaluationpic/EvaluationPic.vue'),
    meta: {
      title: '评论晒图',
    }
  },
  // 评论详情
  {
    path: '/EvaluationDetails',
    name: 'EvaluationDetails',
    component: () => import('../views/evaluationdetails/EvaluationDetails.vue'),
    meta: {
      title: '评论详情',
    }
  },
  // 全部订单
  {
    path: '/AllOrders',
    name: 'AllOrders',
    component: () => import('../views/allorders/AllOrders.vue'),
    meta: {
      title: '全部订单',
    }
  },
  // 收藏
  {
    path: '/Collection',
    name: 'Collection',
    component: () => import('../views/collection/Collection.vue'),
    meta: {
      title: '收藏',
    }
  },
  // 最近浏览
  {
    path: '/RecentBrowsing',
    name: 'RecentBrowsing',
    component: () => import('../views/recentbrowsing/RecentBrowsing.vue'),
    meta: {
      title: '最近浏览',
    }
  },
  // 选择城市
  {
    path: '/City',
    name: 'City',
    component: () => import('../views/city/City.vue'),
    meta: {
      title: '城市',
    }
  },
  // 修改个人中心
  {
    path: '/Information',
    name: 'Information',
    component: () => import('../views/information/Information.vue'),
    meta: {
      title: '个人中心',
    }
  },
  // 编辑地址
  {
    path: '/Editaddress',
    name: 'Editaddress',
    component: () => import('../views/editaddress/Editaddress.vue'),
    meta: {
      title: '编辑地址',
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
