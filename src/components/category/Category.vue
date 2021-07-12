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
          @click="retu(index)"
        />
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
    return {
      retu(index) {
        console.log(index);
        this.$router.push({
          path: "/Goods",
          query: {
            activeKey: index,
          },
        });
      },
    };
  },
  components: {},
  methods: {},
  mounted() {
    console.log(this.category_list);
    this.$store.commit("getips", JSON.stringify(this.category_list));
    localStorage.setItem("tips", JSON.stringify(this.category_list));
  },
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