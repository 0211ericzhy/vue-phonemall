import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:localStorage.getItem('city'),
    user1:localStorage.getItem('user')
  },
  mutations: {
    changecity(state,city1){
      state.city=city1
    },
    getuser(state,user2){
      state.user1=user2
    }

  },
  actions: {
  },
  modules: {
  }
})
