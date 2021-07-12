<template>
  <div>
    <!-- 我是分类 -->

    <child>
      <template #center>
        <div>商品分类</div>
      </template>
    </child>
    <!-- 身体 -->
    <div class="box">
      <!-- 竖向 -->
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.mallCategoryName"
            @click="changefist1(index)"
            v-for="(item, index) in this.tips"
            :key="index"
          />
        </van-sidebar>
        <!-- 右边 -->
      </div>
      <!-- 头部 -->
      <div class="center boxboxbox" >
        <van-tabs v-model="active" swipe-threshold="4" @change="changetwo" lazy-render>
          <van-tab
            :title="item1.mallSubName"
            v-for="(item1, index1) in this.list"
            :key="index1"
          >
            <div
              class="goodsbox"
              v-for="(item2, index2) in goods"
              :key="index2"
              @click="retur(item2.id)"
            >
              <div class="goods_img">
                <img :src="item2.image_path" alt="" />
              </div>
              <div class="goods_right">
                <div class="tit">{{ item2.name }}</div>
                <div class="tat">
                  <div class="price">${{ item2.present_price }}</div>
                  <div class="olprice">{{ item2.orl_price }}</div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <layout></layout>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
import Layout from "../layout/Layout.vue";

export default {
  name: "",
  props: {},
  data() {
    return {
      active: 0,
      activeKey: 0,
      list: [],
      goods: [],
      homeKey:''
    };
  },
  components: { Layout, Child },
  methods: {
    // 一级
    changefist1(val) {
      console.log(val);
      this.list = this.tips[val].bxMallSubDto;
      this.active = 0;
      // 第一级默认页面
      this.$api
        .category({ id: this.list[0].mallSubId })
        .then((res) => {
          // console.log(res);
          this.goods = res.dataList;
          // console.log(this.goods);
        })
        .catch((err) => {
          "请求失败", err;
        });
    },
    // 二级
    changetwo(name, title) {
      this.$api.category({ id: this.list[name].mallSubId }).then((res) => {
        // console.log(res);
        this.goods = res.dataList;
        console.log(this.goods);
      });
    },
    // 跳转
    retur(id){
      // console.log(id);
      this.$router.push({path:'/Details',query:{ids:id}})
    }
  },

  mounted() {
    // 首页调整
    this.homeKey=this.$route.query.activeKey
    // console.log(this.homeKey);
    if(this.homeKey!== undefined){
      this.activeKey=this.homeKey
    }
    // 储存本地数据
    console.log(this.tips);
    // console.log(this.activeKey);
    // 第二级默认数据
    this.list = this.tips[this.activeKey].bxMallSubDto;
    // 默认请求
    // console.log(this.list);
    this.$api
      .category({ id: this.list[0].mallSubId })
      .then((res) => {
        // console.log(res);
        this.goods = res.dataList;
        // console.log(this.goods);
      })
      .catch((err) => {
        "请求失败", err;
      });
  },
  computed: {
    tips() {
      return JSON.parse(this.$store.state.tips);
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  display: flex;
}
.left {
  width: 80px;
  height: 600px;
  background-color: pink;
}
// .van-tabs__wrap {
//   height: 58.9px;
// }
.center {
  width: 295px;
  height: 58.9px;
  background-color: blue;
}
.van-tab {
  height: 58.9px !important;
}
.midgoods {
  width: 78.667vw;
  height: 541px;
  background-color: pink;
  position: absolute;
  right: 0px;
  top: 109px;
}
.goodsbox {
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  .goods_img {
    width: 25.667vw;
    height: 95%;
    img {
      width: 25.667vw;
      height: 95%;
    }
  }
  .goods_right {
    color: red;
    margin-left: 15px;
    .tit {
      font-size: 18px;
      width: 169px;
      height: 50px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .tat {
      display: flex;
      .price {
        font-weight: 700;
        font-size: 17px;
        width: 15vw;
      }
      .olprice {
        color: #eee;
        text-decoration: line-through;
      }
    }
  }
}
</style>