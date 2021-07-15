<template>
  <div>
    <!-- 评价详情 -->
    <child>
      <template #left> <div @click="retue"><</div></template>
      <template #center><div>评论详情</div></template>
    </child>
    <!-- 用户信息，评分，时间 -->
    <div class="head">
      <div class="use-img">
        <img :src="user1.avatar" alt="" />
      </div>
      <!-- 用户名和评分 -->
      <div class="user">
        <div class="username">{{ user1.nickname }}</div>
        <div class="rate"><van-rate v-model="list.rate" /></div>
      </div>
      <!-- 创建时间 -->
      <div class="timer">
        {{ list.comment_time }}
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="content">评价内容{{ list.content }}</div>
    <!-- 商品 -->
    <div class="goods">
      <div class="goods-img">
        <img :src="list.goods[0].image" alt="" />
      </div>
      <div class="tit">{{ list.goods[0].name }}</div>
      <!-- 购物车 -->
      <div class="shoppcar" @click="done">
        <van-icon name="cart-o" />
      </div>
    </div>
    <!-- 返回 -->
    <button class="btn" @click="retue">返回</button>
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      list: '',
      value: 0,
      text: "",
      radio: "",
      user1: {},
      id:{}
    };
  },
  components: { Child },
  methods: {
    retue() {
      this.$router.back();
    },
    done() {
      console.log(this.list);
      // let id ={}
      //  id = this.list.goods.map((item) => {
      //   return item.id;
      // });
      this.id =this.list.goods[0].id
      console.log(this.id);
      this.$api
        .addShop({ id: this.id})
        .then((res) => {
          console.log(res);
          // Dialog({ message: "购物车加入成功" });

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
          console.log(请求失败);
        });
    },
  },
  mounted() {
    // 评论详情数据
    let listed =this.$route.query.item
    this.list = JSON.parse(listed);
    console.log(this.list);
    // 用户信息
    console.log(this.user);
    this.user1 = JSON.parse(this.user);
    console.log(this.user1);
  },
  computed: {
    // 用户信息
    user() {
      return this.$store.state.user1;
    },
  },
  watch: {
    radio2(val) {
      console.log(val);
    },
  },
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 150px;
  display: flex;
  justify-items: center;
  background-color: #fff;
  display: flex;
  align-items: center;
  .use-img {
    width: 24vw;
    height: 24.333vw;
    border-radius: 50%;
    border: 1px solid #eee;
    img {
      width: 24vw;
      height: 24.333vw;
      border-radius: 50%;
    }
  }
  .fenshu {
    font-size: 18px;
    margin: 50px 0px 0px 50px;
    .rate {
      margin-top: 15px;
    }
  }
}
.user {
  width: 120px;
  margin-left: 20px;
  .username {
    margin-bottom: 15px;
  }
}
.timer {
  width: 100%;
  flex-wrap: nowrap;
  margin-left: 15px;
}
.content {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  background-color: #fff;
}
.goods {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  .goods-img {
    width: 120px;
    height: 120px;
    img {
      width: 120px;
      height: 120px;
    }
  }
  .goods {
    font-size: 16px;
  }
  .shoppcar {
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fee6e2;
    margin-left: 10px;
    color: red;
  }
}
.btn {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #20bf64;
  color: #fff;
  border: 1px solid #eee;
}

.comment {
  width: 100%;
  height: 300px;
  background-color: #fff;
  textarea {
    width: 100%;
    height: 300px;
    background-color: #f7f8fa;
    border: 1px solid #eee;
  }
}
.box1 {
  margin-top: 10px;
}
.done {
  margin-left: 20px;
  margin-top: 10px;
  width: 90%;
  height: 50px;
  background-color: #20bf64;
  button {
    color: #fff;
    background-color: #20bf64;
    width: 100%;
    height: 50px;
    border: 1px solid #20bf64;
  }
}
</style>