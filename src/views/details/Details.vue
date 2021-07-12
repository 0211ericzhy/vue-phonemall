<template>
  <div>
    <div>
      <!-- 头部 -->
      <child>
        <template #left>
          <div class="retu" @click="retur"><</div>
        </template>
        <template #right> </template>
        <!-- 输入框 -->
        <template #center> </template>
      </child>
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img :src="goods.image_path" @click="show1" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="goods.image_path" @click="show1" />
        </van-swipe-item>
      </van-swipe>
      <van-image-preview v-model="show" :images="images" @change="onChange">
        <template v-slot:index>第{{ index + 1 }}页</template>
      </van-image-preview>

      <!-- 头部 -->
      <div class="head">
        <!-- 题目 -->
        <div class="details_tit">{{ goods.name }}</div>
        <!-- 价格 -->
        <div class="price">${{ goods.orl_price }}</div>
        <!-- 运费 -->
        <div class="two">
          <div>运费：0</div>
          <div>剩余：10000</div>
          <div v-if="flag_collect === true">
            收藏：<van-icon name="like" @click="liked" />
          </div>
          <div v-else>
            取消收藏： <van-icon name="like" @click="unliked" class="liked" />
          </div>
        </div>
        <!-- 店铺 -->
        <div class="shop">
          <div class="shops">
            <van-icon name="shop" />
            有赞店铺
            <div class="office">官方</div>
          </div>
          <div class="enter_shop">进入店铺 ></div>
        </div>
        <!-- 商品详情 -->
        <div class="details_all">
          <van-tabs v-model="active">
            <van-tab title="商品详情">
              <div v-html="goods.detail"></div>
            </van-tab>
            <van-tab title="商品评论">
              <div class="comm" v-for="(item, index) in goodsone" :key="index">
                <div v-if="item.anonymous === false">
                  <div
                    v-for="(item1, index2) in item.user"
                    :key="index2"
                    class="comm2"
                    
                  >
                    <div class="user-img">
                      <img :src="item1.avatar" />
                    </div>
                    <div class="unsername">
                      <div class="uer_head">
                        <div class="usname">{{ item1.nickname }}:</div>
                        <div class="timer">{{ item.comment_time }}</div>
                      </div>
                      <div class="user-fens">
                        <van-rate v-model="item.rate" />
                      </div>
                      <div class="conent">{{ item.content }}</div>
                    </div>
                  </div>
                </div>
                <div class="comm" v-else>
                  <div class="comm2">
                    <div class="user-img">
                      <img :src="item.comment_avatar" alt="" />
                    </div>
                    <div class="unsername">
                      <div class="uer_head">
                        <div class="usname">{{ item.comment_nickname }}:</div>
                        <div class="timer">{{ item.comment_time }}</div>
                      </div>
                      <div class="user-fens">
                        <van-rate v-model="item.rate" />
                      </div>
                      <div class="conent">{{ item.content }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="首页" @click="retur" />
        <van-goods-action-icon icon="shop-o" text="购物车" />
        <van-badge :content="usercar" class="box22">
          <div class="child" />
        </van-badge>
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="checkLoggin"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickIcon"
        />
      </van-goods-action>
      <!-- 立即购物 -->
      <van-popup v-model="showss">
        <div class="showshare">
          <!-- 头部 -->
          <div class="headshow">
            <div class="head_img">
              <img :src="this.goods.image" alt="" />
            </div>
            <!--名字和价格 -->
            <div>
              <div class="goods_name">{{ this.goods.name }}</div>
              <div class="goodprice">${{ this.goods.present_price }}</div>
            </div>
            <!-- 关闭 -->
            <div class="close" @click="closex">x</div>
          </div>
          <!-- 中间部分 -->
          <div class="mid">
            <!-- 数量/限购 -->
            <div class="boxmid">
              <div class="count">购买数量:</div>
              <div class="boxleaft">
                <div class="leaft">剩余1000件</div>
                <div class="onlybuy">每个限购50件</div>
              </div>
            </div>
            <div class="zonji">
              <div class="jian" @click="jian">-</div>
              <input type="text" class="ipt" v-model="nums" />
              <div class="plus" @click="plus">+</div>
            </div>
          </div>
          <!-- buy -->
          <div class="buy" @click="checkLoggin1">立即购买</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import child from "../../components/child/Child";
import { Dialog } from "vant";
export default {
  name: "",
  props: {},
  data() {
    return {
      ids: "",
      goods: "",
      flag_collect: true,
      active: "1",
      show: false,
      index: 0,
      images: [],
      showShare: "",
      showss: false,
      nums: 1,
      idDirect: "",
      goodsone: "",
    };
  },
  components: {
    child,
  },
  methods: {
    show1() {
      this.show = true;
    },
    onChange(index) {
      this.index = index;
    },
    retur() {
      this.$router.push("/");
    },
    // 收藏
    liked() {
      if (this.username) {
        console.log(this.flag_collect);
        // 收藏商品
        this.$api
          .collection(this.goods)
          .then((res) => {
            console.log(res);
            this.flag_collect = false;
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      } else {
        Dialog({ message: "请登录" });
      }
    },
    // 取消收藏
    unliked() {
      if (this.username) {
        this.$api
          .cancelCollection({ id: this.goods.id })
          .then((res) => {
            console.log(res);
            this.flag_collect = true;
            // console.log(this.flag_collect);
          })
          .catch((err) => {
            console.log("取消失败", err);
          });
      } else {
        Dialog({ message: "请登录" });
      }
    },
    // 加入购物车
    addcar() {
      // if (this.username) {
      this.$api
        .addShop({ id: this.ids })
        .then((res) => {
          console.log(res);
          Dialog({ message: "购物车加入成功" });
          // this.content=this.carlength
          this.$api
            .getCard()
            .then((res) => {
              console.log(res.shopList.length);
              localStorage.setItem("carlen", res.shopList.length);
              this.$store.commit("getcarlength", res.shopList.length);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
      // } else {
      //   Dialog({ message: "请登录" });
      // }
    },
    // 封装
    checkLoggin() {
      this.$utils.checkLoggin({ key: this.username, next: this.addcar });
    },

    // 立即购买 进入购买
    onClickIcon() {
      this.showss = true;
      this.showShare = true;
    },
    checkLoggin1() {
      this.$utils.checkLoggin({ key: this.username, next: this.addcar });
    },
    // 立即购买
    buynow() {
      this.$set(this.goods, "idDirect", true);
      // this.$set(this.goods, "totalPrice", this.nums * this.goods.present_price);
      // 商品数量
      this.$set(this.goods, "count", this.nums);
      this.$set(this.goods, "cid", this.goods.id);
      let arr = [];
      arr.push(this.goods);
      console.log(arr);
      // if (this.username) {
      // 跳转结算页面
      this.$router.push({
        path: "/Settlement",
        query: { allgoods: JSON.stringify(arr) },
      });
      // } else {
      //   Dialog({ message: "请登陆" });
      //   this.$router.push("/Loggin");
      // }
    },
    closex() {
      this.showss = false;
      this.showShare = false;
    },
    jian() {
      if (this.nums <= 1) {
        this.nums = 1;
      } else {
        this.nums--;
      }
    },
    plus() {
      if (this.nums > 49) {
        this.nums = 50;
      } else {
        this.nums++;
      }
    },
    // 商品评论
  },
  mounted() {
    this.ids = this.$route.query.ids;
    this.$api
      .goodOne({ id: this.ids })
      .then((res) => {
        // console.log(res);
        this.goods = res.goods.goodsOne;
        // console.log(this.goods);
        this.images.push(this.goods.image);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$api
      .isCollection({ id: this.ids })
      .then((res) => {
        // console.log(res.isCollection);
        if (res.isCollection === 1) {
          // 收藏成功
          this.flag_collect = false;
          console.log(this.flag_collect);
        } else {
          this.flag_collect = true;
        }
      })
      .catch((err) => {
        "请求失败", err;
      });
    console.log(this.username);
    // 商品评论
    this.$api
      .goodOne({ id: this.ids })
      .then((res) => {
        this.goodsone = res.goods.comment;
        console.log(this.goodsone);
        // console.log(res);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {
    username() {
      return JSON.parse(this.$store.state.user1);
    },
    // 购物车长度
    usercar() {
      return this.$store.state.carlenghth;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.head {
  background-color: #fff !important;
}
.retu {
  text-align: center;
  line-height: 40px;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
}
.my-swipe {
  width: 100%;
  height: 400px;
  img {
    width: 100%;
    height: 400px;
  }
}
.head {
  // box-sizing: border-box;
  width: 100%;
  height: 80px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  // padding: 10px;
  background-color: #fff;
  .details_tit {
    font-size: 18px;
    height: 60px;
    line-height: 60px;
  }
  .price {
    font-size: 15px;
    color: red;
  }
  .two {
    display: flex;
    height: 60px;
    width: 100%;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .liked {
      color: red;
    }
  }
  .shop {
    height: 50px;
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shops {
      margin-left: 10px;
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 40px;
      // line-height: 40px;
      .office {
        margin-left: 10px;
        width: 40px;
        height: 40px;
        background-color: red;
        line-height: 40px;
        color: #fff;
        border-radius: 10px;
        text-align: center;
      }
    }
    .enter_shop {
      margin-right: 10px;
    }
  }
  .details_all {
    width: 100%;
    border-top: 1px solid #eee;
  }
}
.van-popup--center {
  top: 78%;
}
.showshare {
  width: 375px;
  height: 300px;
  background-color: #fff;
}
.headshow {
  width: 100%;
  height: 25.333vw;
  background-color: #fff;
  display: flex;
  .head_img {
    width: 27.333vw;
    height: 24vw;
    position: relative;
    top: -1px;
    img {
      width: 27.333vw;
      height: 24vw;
    }
  }
  .goods_name {
    margin-top: 10px;

    margin-left: 8px;
    font-size: 15px;
  }
  .goodprice {
    margin-left: 8px;
    margin-top: 8px;
    font-size: 18px;
    color: red;
  }
  .close {
    width: 30px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    margin-left: 3.667vw;
    position: absolute;
    top: 7px;
    right: 11px;
  }
}
.mid {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 25.333vw;
  border: 1px solid #eee;
  .boxmid {
    .count {
      font-size: 16px;
      margin-top: 10px;
    }
    .boxleaft {
      margin-top: 10px;
      display: flex;
    }
    .leaft {
      font-size: 14px;
      color: #eee;
      margin-right: 8px;
    }
    .onlybuy {
      color: red;
      font-size: 16px;
    }
  }
  .zonji {
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  .ipt {
    width: 50px !important;
    height: 30px;
    background-color: #f2f3f5;
    color: #cfc9cc;
    outline: none;
    border: 1px solid #f2f3f2;
    margin: 0px 5px;
  }
  .jian,
  .plus {
    text-align: center;
    line-height: 34px;
    height: 34px;
    width: 30px;
    background-color: #f2f3f5;
  }
}
.buy {
  margin-top: 45px;
  font-size: 25px;
  color: #ffff;
  text-align: center;
  line-height: 61px;
  width: 100%;
  height: 16.333vw;
  background-color: red;
}
.box22 {
  position: relative;
  top: -15px;
  left: -41px;
}
.comm {
  width: 100%;
  height: 150px;
  background-color: #fff;
  display: flex;
}
.comm2 {
  width: 100%;
  height: 150;
  background-color: #fff;
  display: flex;
}
.user-img {
  width: 50px;
  height: 100px;
  background-color: #fff;
  text-align: center;
  line-height: 100px;
  img {
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
  }
}
.unsername {
  width: 100%;
  height: 100px;
  .uer_head {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    .timer {
      color: #eee;
    }
  }
}
.conent {
  font-size: 20px;
  margin-top: 15px;
}
.user-fens {
  margin-top: 15px;
}
</style>