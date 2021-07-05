<template>
  <div>
    <!-- 未登陆页面 -->
    <div>
      <img src="../../assets/order.gif" alt="" />
      <div class="loggin" @click="loggin">立即登陆</div>
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
    return {};
  },
  components: {
    Layout,
  },
  methods: {
    loggin(){
      this.$router.push('/Loggin')
    }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
img {
  width: 100%;
  height: 667px;
}
.loggin {
  position: absolute;
  z-index: 999;
  top: 52px;
  left: 130px;
  width: 100px;
  height: 60px;
  border: 1px solid #eee;
  text-align: center;
  line-height: 60px;
  color: red;
}
</style>