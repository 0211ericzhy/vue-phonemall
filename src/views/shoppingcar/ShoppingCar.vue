<template>
  <div>
    <div>
      <!-- 头部 -->
      <div class="head">购物车</div>
      <!-- 全选部分 -->
      <div class="two">
        <div class="box2">
          <input type="checkbox" v-model="checkall" @change="changedall" />
          <div v-if="flag">全选</div>
          <div v-else>取消全选</div>
        </div>
        <div class="box1">
          <div>合计:${{ Number(numbe).toFixed(2) }}</div>
          <div>请确认订单</div>
        </div>
      </div>
      <!-- 删除订单 去结算 -->
      <div class="three">
        <div @click="deleteShop">删除</div>
        <div @click="tomoney">去结算</div>
      </div>
      <!-- 货物 -->
      <div class="goods" v-for="(item, index) in list" :key="index">
        <div>
          <input
            type="checkbox"
            class="checs"
            v-model="item.check"
            @change="changed"
          />
        </div>
        <div class="goods_img">
          <img :src="item.image_path" alt="" />
        </div>
        <div class="right">
          <!-- head -->
          <div class="goods_head">{{ item.name }}</div>
          <div class="head_body">
            <div class="price">${{ item.present_price }}</div>
            <div class="count">
              <van-stepper
                v-model="item.count"
                @change="change(item.count, item.cid, item.mallPrice)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <layout></layout>
  </div>
</template>

<script>
import Layout from "../layout/Layout.vue";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      flag: true,
      checkall: false,
      list: [],
      value: "",
      allgoods: [],
    };
  },
  components: { Layout },
  methods: {
    // 数据加减
    change(val, ids, mallPrice) {
      // console.log(val);
      this.$api
        .editCart({ count: val, id: ids, mallPrice: mallPrice })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log("请求失败", err);
        });
    },
    changed() {
      // console.log(val);
      this.checkall = this.list.every((item) => {
        return item.check === true;
      });
    },
    changedall() {
      this.list.map((item1) => {
        return (item1.check = this.checkall);
      });
    },
    // 删除
    deleteShop() {
      let deletlist = this.list.filter((item) => {
        return item.check === true;
      });
      let deletss = deletlist.map((item3) => {
        return item3.cid;
      });
      console.log(deletss);
      // console.log(deletlist);
      this.$api
        .deleteShop(deletss)
        .then((res) => {
          // console.log(res);
          Dialog({ message: "删除成功" });

          this.$api
            .getCard()
            .then((res) => {
              // 重新刷新
              this.list=res.shopList
              // console.log(res.shopList);
              this.$store.commit(" getcarlength", res.shopList.length);
              localStorage.setItem("carlen", res.shopList.length);
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 结账
    tomoney() {
      this.allgoods = this.list.filter((item) => {
        return item.check === true;
      });
      // console.log(allgoods);
      if (this.allgoods.length === 0) {
        Dialog({ message: "请添加商品" });
      } else {
        // 为了判断是从详情页购买还是购物车购买
        this.allgoods.map((item) => {
          this.$set(item, "idDirect", false);
        });

        // this.$router.push({path:'/Settlement',query:{allgoods:allgoods}})
        this.$router.push({
          path: "/Settlement",
          query: { 
            allgoods: JSON.stringify(this.allgoods) 
            },
        });
      }
    },
  },
  mounted() {
    this.$api
      .getCard()
      .then((res) => {
        this.list = res.shopList;
        // console.log(this.list);
      })
      .catch((err) => {
        console.log("请求失败");
      });
    // console.log(this.username);
  },
  computed: {
    username() {
      return this.$store.state.user1;
    },
    // 总价格
    numbe() {
      let numss = 0;
      let checkedList = this.list.filter((item) => {
        return item.check;
      });
      checkedList.map((item1) => {
        return (numss += item1.present_price * item1.count);
      });
      return numss;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid grey;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
}
.two {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid grey;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .box2 {
    display: flex;
    padding: 0px 10px;
  }
  .box1 {
    width: 150px;
    text-align: center;
  }
}
.three {
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid grey;
  justify-content: flex-end;
  div {
    width: 100px;
    height: 40px;
    background-color: hotpink;
    margin: 10px;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
}
.goods {
  width: 100%;
  height: 100px;
  background-color: #fff;
  display: flex;
  .checs {
    width: 30px;
    height: 30px;
    margin-top: 27px;
  }
  .goods_img {
    width: 80px;
    height: 80px;
    background-color: pink;
    img {
      width: 80px;
      height: 80px;
    }
  }
}
.right {
  .goods_head {
    margin: 0px 0px 10px 10px;
    color: red;
    font-size: 18px;
  }
  .head_body {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    width: 223px;
    .price {
      margin-left: 20px;
      font-size: 20px;
      color: red;
    }
  }
  .count {
    display: flex;
    margin-left: 16vw;
    .spn {
      font-size: 30px;
      background-color: #eee;
      border-radius: 50px;
    }
    .spns {
      font-size: 30px;
      background-color: #eee;
      border-radius: 50px;
    }
  }
}
</style>