<template>
  <div>
    <div>
      <child>
        <template #center>
          <div>收藏中心</div>
        </template>
        <template #left>
          <div @click="retur"><</div>
        </template>
      </child>
      <div v-for="(item, index) in this.collect" :key="index">
        <van-card
          :price="item.present_price"
          :title="item.name"
          :thumb="item.image_path"
        >
          <template #footer>
            <van-button size="mini" @click="remover(item.cid, index)">
              <div>x</div>
            </van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      collect: [],
    };
  },
  components: { Child },
  methods: {
    retur() {
      this.$router.back();
    },
    // 取消收藏
    remover(id, index) {
      this.$api
        .cancelCollection({ id: id })
        .then((res) => {
          // console.log(res);
          // console.log(index);
          // 删除数组
          this.collect.splice(index, 1);
          this.$toast(res.msg);
        })
        .catch((err) => {
          console.log("取消失败", err);
        });
    },
  },
  mounted() {
    this.$api
      .getCollection()
      .then((res) => {
        console.log(res);
        this.collect = res.data.list;
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>