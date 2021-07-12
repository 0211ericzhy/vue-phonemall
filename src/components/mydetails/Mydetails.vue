<template>
  <!-- 我的详情 -->
  <div>
    <div class="box1">
      <div class="boxb">
          <div>
        <van-icon name="cash-on-deliver" />
        </div>
        待付款
      </div>
      <div class="boxb">
        <div>
          <van-icon name="bookmark-o" />
        </div>
        待发货
      </div>
      <div class="boxb">
        <div>
          <van-icon name="shop-o" />
        </div>
        待收货
      </div>
      <div class="boxb">
        <div @click="judg">
          <van-icon name="todo-list-o" />
        </div>
        评价
      </div>
      <div class="boxb">
        <div>
          <van-icon name="send-gift-o" @click="done" />
        </div>
        已完成
      </div>
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
      judg(){
          this.$router.push('/EvaluationCenter')
      },
      done(){
          this.$router.push('/AllOrders')
      }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box1 {
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .boxb {
    text-align: center;
    width: 75px;
    font-size: 20px;
  }
}
</style>