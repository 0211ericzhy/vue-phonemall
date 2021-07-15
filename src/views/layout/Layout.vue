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
    <van-tabbar
      route
      fixed
      active-color="#ee0a24"
      inactive-color="#000"
      :placeholder="true"
      @change="change"
      v-model="active"
    >
      <van-tabbar-item replace to="/" icon="home-o" active="1"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/Goods" icon="search" active="2"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/shoppingcar" icon="cart-o" active="5"
        >购物车
        <van-badge :content="usercar" class="box22">
          <div class="child" />
        </van-badge>
      </van-tabbar-item>
      <van-tabbar-item replace to="/Mine" icon="friends-o" active="6"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      active: 1,
      fromto: "",
      user: "",
      content: "",
    };
  },
  components: {},
  methods: {
    change() {
      // console.log(this.usercar);
    },
  },
  mounted() {
    if (this.username) {
      this.$api
        .getCard()
        .then((res) => {
          // console.log(res);
          this.$store.commit("getcarlength", res.shopList.length);
          localStorage.setItem("carlen", res.shopList.length);
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    }
  },
  computed: {
    // 购物车长度
    usercar() {
      // console.log(this.$store.state.carlenghth);
      return this.$store.state.carlenghth;
    },
    username() {
      // console.log(this.$store.state.user1);
      return this.$store.state.user1;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box22 {
  position: absolute;
  top: 1.6vw;
  right: 44.6vw;
}
.boxbox {
  width: 109px;
  margin-top: 6px;
}
</style>