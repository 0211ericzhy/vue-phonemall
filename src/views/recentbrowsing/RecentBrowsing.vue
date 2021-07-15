<template>
  <div>
    <!-- 最近浏览 -->
    <child>
      <template #center>
        <div>浏览记录</div>
      </template>
      <template #left>
        <div @click="retue"><</div>
      </template>
    </child>
    <div v-if="arr === null">暂时没有浏览记录</div>
    <div v-else>
      <div v-for="(item, index) in arr" :key="index">
        <van-card
          num="1"
          :price="item.present_price"
          :title="item.name"
          :thumb="item.image_path"
        />
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
      arr: [],
    };
  },
  components: { Child },
  methods: {
    retue() {
      this.$router.back();
    },
  },
  mounted() {
    if (this.username) {
      this.arr = this.$utils.getHistory({
        key: `${this.username.username}browse`,
      });
    }

    console.log(this.arr);
  },
  computed: {
    username() {
      return JSON.parse(this.$store.state.user1);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>