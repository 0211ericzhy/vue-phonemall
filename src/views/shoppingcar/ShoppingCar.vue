<template>
  <div>
    <div>
      <!-- 头部 -->
      <div class="head">购物车</div>
      <!-- 全选部分 -->
      <div class="two">
        <div class="box2">
          <input type="checkbox" v-model="checkall" />
          <div v-if="flag">全选</div>
          <div v-else>取消全选</div>
        </div>
        <div class="box1">
          <div>合计:${{}}</div>
          <div>请确认订单</div>
        </div>
      </div>
      <!-- 删除订单 去结算 -->
      <div class="three">
        <div>删除</div>
        <div>去结算</div>
      </div>
      <!-- 货物 -->
      <div>
        <div><input type="checkbox" /></div>
        <div class="goods_img">
          <img src="" alt="" />
        </div>
        <div>
          <!-- head -->
          <div class="goods_head"></div>
          <div class="head_body">
            <div class="price">${{}}</div>
            <div>
              <span>-</span> <span><input type="text" /></span>+ <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <layout></layout>
  </div>
</template>

<script>
import Layout from "../layout/Layout.vue";

export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
      checkall: "",
    };
  },
  components: { Layout },
  method: {},
  mounted() {
    this.$api.getCard().then((res)=>{
      console.log(res);
    }).catch((err=>{
      console.log(err);
    }));
    console.log(this.username);
  },
  computed: {
    username(){
      return this.$store.state.user1
    }
  },
  watch: {
    checkall(val) {
      console.log(val);
    },
  },
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid grey;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
}
.two {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid grey;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .box2 {
    display: flex;
    padding: 0px 10px;
  }
  .box1 {
    width: 150px;
    text-align: center;
  }
}
.three {
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid grey;
  justify-content: flex-end;
  div {
    width: 100px;
    height: 40px;
    background-color: hotpink;
    margin: 10px;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
}
</style>