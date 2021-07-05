<template>
  <div>
    <div class="recom">
      <div class="head">商品推荐</div>
      <div class="bodys ">
        <div v-for="(item, index) in recom_list" :key="index" class="box1">
          <div class="recom_img">
            <img :src="item.image" alt="" />
          </div>
          <div class="recom_name">{{ item.goodsName }}</div>
          <div class="price">
            <span class="fist">${{ item.mallPrice }}</span
            ><span class="last">${{ item.price }}</span>
          </div>
          <div class="recom_buy">
            <div class="shop"><van-icon name="cart-o" /></div>
            <div class="detiles" @click="details(item.goodsId)">查看详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    recom_list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      ids:''
    };
  },
  components: {},
  methods: {
    details(id){
        this.$router.push({ path: "/Details", query: { ids: id } });
    }
  },
  mounted() {
    // console.log(this.recom_list);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.recom {
  background-color: #fff;
  height: 270px;
  overflow: hidden;
  .head {
    padding: 0px 10px;
    height: 40px;
    // background-color: #fff;
    border-bottom: 1px solid #eee;
    font-size: 19px;
    color: #565556;
    line-height: 40px;
  }
}
.bodys {
  display: flex;
  height: 230px;
  .box1 {
    border: 1px solid #eee;
    width: 123px;
    img {
      width: 120px;
      height: 120px;
    }
    .recom_name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: #c6c6c6;
    }
    .price {
      padding: 10px;
      font-size: 14px;
      .fist {
        font-size: 16px;
      }
      .last {
        margin-left: 10px;
        color: #ababab;
        text-decoration: line-through;
      }
    }
    .recom_buy {
      width: 135px;
      display: flex;
      .shop {
        width: 35px;
        background-color: #fdc94a;
        color: #fff;
        font-size: 17px;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
      }
      .detiles {
        width: 100px;
        background-color: #fc4e40;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>