<template>
  <div>
    <div>
      <div class="head">热门商品</div>
      <div class="hot_body">
        <div class="hot_box" v-for="(item, index) in hot_list" :key="index">
          <div class="hot_ig">
            <img
              :src="item.image"
              @click="details(item.goodsId) "
            />
          </div>
          <div class="font">{{ item.name }}</div>
          <div class="price">
            <span class="nowprice">${{ item.price }}</span>
            <span class="oldprice">${{ item.mallPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    hot_list: {
      type: Array,
      required: true,
      ids: "",
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    details(id) {
      // console.log(id);
      this.$router.push({ path: "/Details", query: { ids: id } });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 50px;
  color: red;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
.hot_body {
  display: flex;
  width: 100%;
  flex-wrap: wrap-reverse;
  background-color: #fff;
  .hot_box {
    box-sizing: border-box;
    border: 1px solid #eee;
    width: 187px;
    height: 300px;

    .hot_ig {
      width: 187px;
      height: 170px;
      img {
        width: 187px;
        height: 170px;
      }
    }
    .font {
      height: 50px;
      padding: 0px 10px;
      font-size: 16px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height: 50px;
    }
    .price {
      width: 100%;
      font-size: 15px;
      text-align: center;
      .nowprice {
        font-size: 18px;
        color: red;
        margin: 0px 8px;
      }
      .oldprice {
        text-decoration: line-through;
      }
    }
  }
}
</style>