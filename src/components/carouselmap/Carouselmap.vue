<template>
  <div>
    <div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in slides" :key="index">
          <img :src="item.image" alt="" @click="details(item.goodsId)" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    details(id) {
      // console.log(id);
      this.$utils.saveHistory({ data: id, attr: "name" });
      this.$router.push({ path: "/Details", query: { ids: id } });
    },
  },
  mounted() {
    // console.log(this.slides);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.my-swipe {
  width: 375px;
  height: 72vw;
  img {
    width: 375px;
    height: 72vw;
  }
}
</style>