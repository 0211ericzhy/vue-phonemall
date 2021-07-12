<template>
  <div>
    <div class="box1">
      <div @click="alloder" ><van-icon name="coupon-o" /> 全部订单</div>
      <div @click="clocct"><van-icon name="comment-o"  /> 收藏商品</div>
      <div @click="mangloct"><van-icon name="balance-list-o"  @click="add"/>地址管理</div>
      <div @click="recent"><van-icon name="warning-o"  /> 最近浏览</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    // 地址管理
    add(){
      this.$router.push('/Orderaddress')
    },
    alloder() {
      if (this.username) {
        this.$router.push("/AllOrders");
      } else {
        Dialog({ message: "请登录" });
      }
    },
    clocct() {
      if (this.username) {
        this.$router.push("/Collection");
      } else {
        Dialog({ message: "请登录" });
      }
    },
    mangloct() {
      if (this.username) {
        this.$router.push("/Orderaddress");
      } else {
        Dialog({ message: "请登录" });
      }
    },
    recent() {
      if (this.username) {
        this.$router.push("/RecentBrowsing");
      } else {
        Dialog({ message: "请登录" });
      }
      
    },
  },
  mounted() {},
  computed: {
    username() {
      return this.$store.state.user1;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box1 {
  width: 100%;
  height: 100%;
  background-color: #fff;
  font-size: 20px;
  div {
    padding: 0px 10px;
    width: 100%;
    height: 50px;
    border: 1px solid #eee;
    line-height: 50px;
  }
}
</style>