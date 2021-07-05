<template>
  <div>
    <div class="box">
      <van-grid :border="false">
        <van-grid-item
          :icon="item.image"
          :text="item.mallCategoryName"
          v-for="(item, index) in category_list"
          :key="index"
          class="box1"
        />
        <!-- <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" /> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category_list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
   
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  margin-top: 20px;
}
.van-grid {
  flex-wrap: nowrap;
  .box1 {
    width: 10px;
  }
}
</style>