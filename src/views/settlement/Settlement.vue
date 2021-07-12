<template>
  <div>
    <!-- 结算页面 -->
    <div>
      <child>
        <template #left> <div @click="enterback"><</div></template>
        <template #center>订单结算</template>
      </child>
      <!-- 地址 -->
      <fistaddress @defaultAdd="defaultAdd"></fistaddress>
      <!-- 商品信息 -->
      <oder-goods :allgoods="allgoods" v-if="allgoods"></oder-goods>
      <!-- 提交订单 -->
      <van-submit-bar
        :price="this.nums"
        button-text="提交订单"
        @submit="onSubmit"
        :decimal-length="2"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
import Fistaddress from "../../components/fistaddress/Fistaddress.vue";
import OderGoods from "../../components/odergoods/OderGoods.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      allgoods: null,
      disabled: true,
      allgoods: [],
      detel: "",
      cid: [],
      // 详情页跳转
      goods: null,
    };
  },
  components: { Child, Fistaddress, OderGoods },
  methods: {
    enterback() {
      this.$router.back();
    },
    onSubmit() {
      this.$api
        .placeOrder({
          address: this.detel.address,
          tel: this.detel.tel,
          orderId: this.cid,
          totalPrice: this.nums / 100,
          idDirect: this.allgoods[0].idDirect,
          count: this.allgoods[0].count,
        })
        .then((res) => {
          console.log(res);
          this.$toast(res.msg);
          this.$router.push("/");
          this.$api
            .getCard()
            .then((res1) => {
              // 重新刷新
              console.log(res1);
              this.list = res1.shopList;
              this.$store.commit("getcarlength", res1.shopList.length);
              localStorage.setItem("carlen", res1.shopList.length);
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        })
        .catch((err) => {
          console.log("请求失败");
        });
    },
    defaultAdd(val) {
      this.detel = val;

      console.log(this.detel);
      if (val === null) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
  },
  mounted() {
    // 详情页
    this.allgoods = JSON.parse(this.$route.query.allgoods);
    console.log(this.allgoods);
    // 拿到提交订单id
    this.allgoods.map((item) => {
      return this.cid.push(item.cid);
    });
    console.log(11);
    console.log(this.cid);
    // 从管理地址调转过来
    // let defaultAddd=this.$route.query.defaultAdd
    // if(defaultAddd!==null){
    //   his.dete=defaultAddd
    // }
    
  },
  computed: {
    nums() {
      let num = 0;
      this.allgoods.map((item) => {
        num += item.present_price * item.count;
        return num;
      });
      return num * 100;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>