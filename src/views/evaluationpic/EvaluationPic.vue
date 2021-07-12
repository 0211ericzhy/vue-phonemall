<template>
  <div>
    <!-- 评价嗮图 -->
    <child>
      <template #left> <div @click="retuen"><</div></template>
      <template #center><div>评价嗮图</div></template>
    </child>
    <div>
      <div class="head">
        <div class="head_img">
          <img :src="list.image_path" alt="" />
        </div>
        <!-- 评分 -->
        <div class="fenshu">
          <div class="tit">商品评分</div>
          <div class="rate"><van-rate v-model="value" /></div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment">
        <!-- <input type="text" /> -->
        <textarea placeholder="说说你的购买感受" v-model="text"> </textarea>
      </div>
      <!-- 匿名评价 -->
      <div class="box1">
        <input type="checkbox" v-model="radio" />
        匿名评价
      </div>
      <!-- 完成 -->
      <div class="done">
        <button @click="done">提交</button>
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
      list: [],
      value: 0,
      // 匿名
      radio: false,
      text: "",
    };
  },
  components: { Child },
  methods: {
    retuen(){
      this.$router.back()
    },
    done() {
      if (this.value !== "" && this.text !== "") {
        this.$api
          .getcomment({
            id: this.list.cid,
            rate: this.value,
            content: this.text,
            anonymous: this.radio,
            _id: this.list._id,
            order_id: this.list.order_id,
          })
          .then((res) => {
            console.log(res);
            this.$toast(res.msg);
            this.$router.back();
          })
          .catch((err) => {
            console.log("请求失败", err);
          });
      } else {
        this.$toast("内容不能为空");
      }
    },
  },
  mounted() {
    this.list = JSON.parse(this.$route.query.item);
    console.log(this.list);
    // 请求
    // this.$api.getcomment({
    //   id: this.list.cid,
    //   rate: this.list,
    //   content,
    //   anonymous,
    //   _id,
    //   order_id,
    // });
  },
  computed: {},
  watch: {
    radio(val) {
      console.log(val);
    },
    // text(val,val1) {
    //   console.log(val);
    // },
  },
};
</script>

<style lang='scss' scoped>
.head {
  width: 100%;
  height: 200px;
  display: flex;
  justify-items: center;
  background-color: #fff;
  .head_img {
    width: 150px;
    height: 170px;
    img {
      width: 150px;
      height: 170px;
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