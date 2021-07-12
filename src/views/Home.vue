<template>
  <div>
    <!-- 头部 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <child>
        <template #left>
          <div @click="locted(loct)">
            {{ citys }}<van-icon name="arrow-down" class="i" />
          </div>
        </template>
        <!-- <template #right> 搜索 </template> -->
        <!-- 输入框 -->
        <template #center>
          <div class="head_ipt">
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              background="#f2f2f2"
            />
          </div>
        </template>
      </child>
      <div v-if="flag === true">
        <!-- 轮播图 -->
        <carouselmap v-if="slides" :slides="slides"></carouselmap>
        <!-- 类别 -->
        <category
          v-if="category_list"
          :category_list="category_list"
        ></category>
        <!-- 公告 -->
        <div class="biliborad">
          <div class="font">内测期间 仅对公司内部配送</div>
          <div><img src="../assets/loading.gif" alt="" /></div>
        </div>
        <!-- 热门推荐 -->
        <recom v-if="recom_list" :recom_list="recom_list"></recom>
        <!-- floor1 -->
        <floor v-if="Floor1" :Floor1="Floor1" :Floor_name="Floor_name"></floor>
        <!-- floor2 -->
        <floor v-if="Floor2" :Floor1="Floor2" :Floor_name="Floor2_name"></floor>
        <!-- floor3 -->
        <floor v-if="Floor3" :Floor1="Floor3" :Floor_name="Floor3_name"></floor>
        <!-- 热门商品 -->
        <hotgoods v-if="hot_list" :hot_list="hot_list"></hotgoods>
      </div>
      <div v-if="flag === false">
        <div class="goods">
          <div v-for="(item, index) in values" :key="index">
            <div
              class="title"
              v-html="item.name"
              @click="detail(item.id)"
            ></div>
          </div>
        </div>
      </div>
      <layout></layout>
    </van-pull-refresh>
  </div>
</template>

<script>
import Carouselmap from "../components/carouselmap/Carouselmap.vue";
import Category from "../components/category/Category.vue";
import Child from "../components/child/Child.vue";
import Floor from "../components/floor/floor.vue";
import Hotgoods from "../components/hotgoods/Hotgoods.vue";
import Recom from "../components/recom.vue/Recom.vue";
import Layout from "./layout/Layout.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      value: "",
      values: "",
      page: "",
      loct: "",
      slides: null,
      category_list: null,
      recom_list: null,
      Floor1: null,
      Floor_name: null,
      Floor2: null,
      Floor2_name: null,
      Floor3: null,
      Floor3_name: null,
      hot_list: null,
      flag: true,
      ids: "",
      isLoading: false,
    };
  },
  components: { Layout, Child, Carouselmap, Category, Recom, Floor, Hotgoods },
  methods: {
    // 获取当前位置
    loction() {
      let that = this;
      AMap.plugin("AMap.CitySearch", function () {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            // console.log(result.city);
            that.$store.commit("changecity", result.city);
            localStorage.setItem("city", result.city);
          }
        });
      });
    },
    // 点击定位
    locted(val) {
      this.$router.push({ path: "/City", query: { loct: this.loct } });
      console.log(val);
    },
    detail(id) {
      this.$router.push({ path: "/Details", query: { ids: id } });
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = true;
      }, 1000);
    },
  },
  mounted() {
    // 首页数据
    this.$api
      .recommend()
      .then((res) => {
        // console.log(res.data);
        // 轮播图
        this.slides = res.data.slides;
        // console.log(this.slides);
        // 类别
        this.category_list = res.data.category;
        // console.log(this.category_list);
        // 热门推荐
        this.recom_list = res.data.recommend;
        // console.log(this.recom_list);
        // floor 1
        this.Floor1 = res.data.floor1;
        this.Floor_name = res.data.floorName.floor1;
        // floor 2
        this.Floor2 = res.data.floor2;
        this.Floor2_name = res.data.floorName.floor2;
        // floor 3
        this.Floor3 = res.data.floor3;
        console.log(this.Floor3);
        this.Floor3_name = res.data.floorName.floor3;
        // 热门商品
        this.hot_list = res.data.hotGoods;
        // console.log(this.hot_list);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
    // this.$api.search({ value: this.value, page: this.page }).then((res) => {
    //   console.log(res);
    // });
    let loc = localStorage.getItem("city");
    if (loc === null) {
      this.loction();
    }

    this.loct = this.$route.query.msg;
    // console.log(this.loct);
  },

  computed: {
    citys() {
      return this.$store.state.city;
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.flag = false;
        this.$api
          .search(val)
          .then((res) => {
            // console.log(res);
            this.values = res.data.list;
            this.values.map((item, index) => {
              item.name = item.name.replace(
                val,
                `<sapn style='color:red'>${val}</sapn>`
              );
            });
            // console.log(this.values);
          })
          .catch((err) => {
            "请求失败", err;
          });
      } else {
        this.flag = true;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.i {
  font-size: 14px;
  margin-left: 8px;
}
.head_ipt {
  // width: 250px;
  // height: 35px;
  // margin-top: 10px;
  // margin-left: 10px;
  // position: absolute;
  input {
    width: 200px;
    height: 30px;
    margin-left: 20px;
    background-color: #fff;
    border: 1px solid #eee;
  }
  .icon {
    position: relative;
    left: 12.667vw;
    top: 3px;
  }
}
.biliborad {
  width: 375px;
  height: 70px;
  padding: 0px 10px;
  // background-color: pink;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    margin-right: 20px;
    height: 60px;
    background-color: #eee;
  }
  .font {
    width: 280px;
    height: 50px;
    background-color: #df2088;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
    color: #fdea35;
    border-radius: 15px;
  }
}
// .History {
//   width: 100%;
//   height: 100px;
//   border-bottom: 1px solid #eaeaea;
// }
.goods {
  width: 100%;
}
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
