<template>
  <div>
    <div class="goshopping" @click="goshopping">去购物吧</div>
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
  components: { Layout },
  methods: {
    goshopping(){
      this.$router.push('/')
    }
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.goshopping {
  text-align: center;
  line-height: 100px;
  border: 1px solid #fff;
  width: 200px;
  height: 100px;
  font-size: 25px;
  color: red;
  margin: 50px auto;
}
</style>