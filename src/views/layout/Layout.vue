<template>
  <div>
    <router-view />
    <!-- <van-tabbar>
    <van-tabbar-item route fixed active-color="#ee0a24" inactive-color="#000"
      >
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/Loggin" icon="search">分类</van-tabbar-item>
      <van-tabbar-item replace to="/Loggin" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/Loggin" icon="friends-o">购物车</van-tabbar-item>
    </van-tabbar> -->
    <van-tabbar route fixed active-color="#ee0a24" inactive-color="#000"  :placeholder='true'>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/Goods" icon="search">分类</van-tabbar-item>
      <van-tabbar-item replace :to="fromto" icon="cart-o" @click="shopcar">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/Mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      fromto:'',
      user:''
    };
  },
  components: {},
  methods: {
    shopcar(){
      if(this.user){
        this.fromto='/shoppingcar'
      }else{
        this.fromto='/Unshoppingcar'
      }
    }
  },
  mounted() {
    this.user=localStorage.getItem('user')
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>