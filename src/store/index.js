import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: localStorage.getItem('city'),
    user1: localStorage.getItem('user'),
    carlenghth: localStorage.getItem('carlen'),
    // 类目一级
    tips:localStorage.getItem('tips')
  },
  mutations: {
    // 城市
    changecity(state, city1) {
      state.city = city1
    },
    // 登陆
    getuser(state, user) {
      state.user1 = user
    },
    // 购物车长度
    getcarlength(state, carlen2) {
      state.carlenghth = carlen2
    } ,
    // 收藏
    // getcllect1(state, collect2) {
    //   state.collectall = collect2
    // }
    // 类目
    getips(state,tips2){
      state.tips=tips2
    }
  },
  actions: {
  },
  modules: {
  }
})
