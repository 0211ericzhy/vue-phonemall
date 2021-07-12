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
      <van-tabbar-item replace to="/" icon="home-o" active='1'>首页</van-tabbar-item>
      <van-tabbar-item replace to="/Goods" icon="search" active='2'>分类</van-tabbar-item>
      <div v-if="falg === 0" class="boxbox">
        <van-tabbar-item replace to="/Unshoppingcar" icon="cart-o" active='3'
          >购物车
          <van-badge :content="usercar" class="box22">
            <div class="child" />
          </van-badge>
        </van-tabbar-item>
      </div>
      <div v-else-if="falg === 1" class="boxbox">
        <van-tabbar-item replace to="/Noshoppingcar" icon="cart-o" active='4'
          >购物车
          <van-badge :content="usercar" class="box22">
            <div class="child" />
          </van-badge>
        </van-tabbar-item>
      </div>
      <div v-else class="boxbox">
        <van-tabbar-item replace to="/shoppingcar" icon="cart-o" active='5'
          >购物车
          <van-badge :content="usercar" class="box22">
            <div class="child" />
          </van-badge>
        </van-tabbar-item>
      </div>

      <van-tabbar-item replace to="/Mine" icon="friends-o" active='6'
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
      // 购物车判断
      falg: 0,
    };
  },
  components: {},
  methods: {
    change() {
      console.log(this.usercar);
    },
  },
  mounted() {
    this.change();
    if (this.username) {
      if (Number(this.usercar) === 0) {
        // this.fromto = "/Noshoppingcar";
        this.falg = 1;
      } else {
        // this.fromto = "/shoppingcar";
        this.falg = 2;
      }
    } else {
      this.falg = 0;
      // this.fromto = "/Unshoppingcar";
    }
  },
  computed: {
    // 购物车长度
    usercar() {
      return this.$store.state.carlenghth;
    },
    username() {
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
.boxbox{
  width: 109px;
  margin-top: 6px;
}
</style>