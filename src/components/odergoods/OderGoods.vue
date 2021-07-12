<template>
  <div>
    <div class="bodys" v-for="(item,index) in allgoods" :key="index">
      <div class="goods_img">
        <img :src=item.image_path alt="" />
      </div>
      <div class="goods_right">
        <div class="goods_tit">{{item.name}}</div>
        <div class="all">
          <div class="price">${{item.mallPrice}}</div>
          <div class="count">x{{item.count}}</div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    allgoods: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {
    // console.log(this.allgoods);
  },
  computed: {

  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.bodys {
  width: 100%;
  background-color: #fff;
  height: 130px;
  display: flex;
  align-items: center;
  //   justify-content: center;
  .goods_img {
    margin-left: 15px;
    width: 87px;
    height: 81px;
    img {
      width: 87px;
      height: 81px;
    }
  }
  .goods_right {
    margin-left: 15px;
    color: red;
    //   display: flex;
    .goods_tit {
      font-size: 20px;
    }
    .all {
        font-size: 18px;
      margin-top: 23px;
      width: 220px;
      display: flex;
      justify-content: space-between;
      .count {
        color: #eee;
      }
    }
  }
}
</style>