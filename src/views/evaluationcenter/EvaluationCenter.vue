<template>
  <div>
    <!-- 评论中心 -->
    <child>
      <template #center>
        <div>评论中心</div>
      </template>
      <template #left>
        <div @click="retu"><</div>
      </template>
    </child>
    <!-- 头部 -->
    <div>
      <div class="head_img">
        <img src="../../assets/evaluate.jpg" alt="" />
      </div>
      <!-- 选择 -->
      <van-tabs @click="onClick" v-model="active">
        <van-tab title=" 待评价">
          <van-pull-refresh v-model="refreshing"  disabled>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
             
            >
              <div v-for="(item, index) in list" :key="index" class="wite">
                <div class="wit_img">
                  <img :src="item.image_path" alt="" />
                </div>
                <div>
                  <!-- 标题 -->
                  <div class="tit">{{ item.name }}</div>
                  <!-- 评价 -->
                  <div class="btn_cont">
                    <button @click="gotopic(item)">评论晒图</button>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="以评价">
          <van-pull-refresh v-model="refreshing" disabled>
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad1"
            >
              <div v-for="(item, index) in listed" :key="index" class="wite">
                <div class="wit_img">
                  <img :src="item.goods[0].image_path" alt="" />
                </div>
                <div>
                  <!-- 标题 -->
                  <div class="tit">{{ item.goods[0].name }}</div>
                  <!-- 评价 -->
                  <div class="btn_cont">
                    <button @click="gotopicd(item)">查看详情</button>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
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
      active: "",
      listed: [],
      loading: false,
      finished: false,
      refreshing: false,
      num: 0,
      page: 1,
      page1: 1,
      num1: 0,
    };
  },
  components: { Child },
  methods: {
    retu() {
      this.$router.back();
    },
    onClick(name) {
      if (name === 0) {
        this.$api
          .tobeEvaluated()
          .then((res) => {
            // console.log(res);
            this.list = res.data.list;
            console.log(this.list);
          })
          .catch((err) => {
            console.log("请求失败");
          });
      } else if (name === 1) {
        this.$api
          .alreadyEvaluated()
          .then((res) => {
            // console.log(res);
            this.listed = res.data.list;
            console.log(this.listed);
          })
          .catch((err) => {
            console.log("请求失败");
          });
      }
    },
    gotopic(item) {
      console.log(item);
      this.$router.push({
        path: "EvaluationPic",
        query: { item: JSON.stringify(item) },
      });
    },
    gotopicd(item) {
      this.$router.push({
        path: "EvaluationDetails",
        query: { item: JSON.stringify(item) },
      });
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        this.loading = false;
        this.page++;
        this.$api
          .tobeEvaluated(this.page)
          .then((res) => {
            // console.log(res);

            this.list = this.list.concat(res.data.list);
            this.num = res.data.count;
            console.log(this.list);
          })
          .catch((err) => {
            console.log("请求失败");
          });
        if (this.list.length >= this.num) {
          this.finished = true;
        }
      }, 1000);
    },
    onLoad1() {
      setTimeout(() => {
        if (this.refreshing) {
          this.listed = [];
          this.refreshing = false;
        }
        this.loading = false;
        this.page1++;
        this.$api
          .alreadyEvaluated()
          .then((res) => {
            // console.log(res);
            this.listed = res.data.list;
            console.log(this.listed);
          })
          .catch((err) => {
            console.log("请求失败");
          });
        if (this.listed.length >= this.num1) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  mounted() {
    this.$api
      .tobeEvaluated(this.page)
      .then((res) => {
        // console.log(res);

        this.list = this.list.concat(res.data.list);
        this.num = res.data.count;
        console.log(this.list);
      })
      .catch((err) => {
        console.log("请求失败");
      });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.head_img {
  width: 100%;
  height: 180px;
  background-color: pink;
  z-index: -2;
  img {
    width: 100%;
    height: 180px;
    background-color: pink;
    z-index: -2;
  }
}
.wite {
  width: 100%;
  height: 150px;
  display: flex;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  // line-height: 150px;
  // justify-content: space-between;
  .wit_img {
    width: 100px;
    height: 110px;
    img {
      width: 100px;
      height: 110px;
    }
  }
  .tit {
    margin-left: 15px;
    width: 100%;
    height: 30px;
    font-size: 17px;
  }
  .btn_cont {
    margin-top: 20px;
    margin-left: 41.667vw;
    width: 100%;
    height: 50px;
    line-height: 50px;
    button {
      width: 100px;
      height: 40px;
      border-radius: 15px;
      border: 1px solid red;
      color: red;
      line-height: 40px;
      background-color: #fff;
    }
  }
}
</style>