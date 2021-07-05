<template>
  <div>
    <div class="head">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div>
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
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
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  height: 50px;
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 16px;
  color: #333333;
}
.left{
    position: absolute;
    left: 20px;
    
}
.right{
    position: absolute;
    right: 20px;
}
</style>