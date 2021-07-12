<template>
  <div>
    <div>
      <child>
        <template #center>
          <div class="header">会员中心</div>
        </template>
      </child>
      <div class="mid">
        <minelog></minelog>
        <mydetails></mydetails>
        <mybottom></mybottom>
      </div>
      <layout></layout>
    </div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
import Layout from "../layout/Layout.vue";
import minelog from "../../components/minelog/Minelog";
import Mydetails from "../../components/mydetails/Mydetails.vue";
import Mybottom from "../../components/mybottom/Mybottom.vue";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: { Layout, Child, minelog, Mydetails, Mybottom },
  methods: {},

  Childmounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.header {
  font-size: 20px;
}
</style>