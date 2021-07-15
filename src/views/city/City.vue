<template>
  <div>
    <!-- 头部 -->
    <child>
      <template #left>
        <div @click="back"><</div>
      </template>
      <template #center>
        <div class>城市列表</div>
      </template>
    </child>
    <!-- 搜索框 -->
    <div>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        background="#f2f2f2"
      />
    </div>
    <!-- 当前城市 -->
    <div class="now">
      <div class="now——font">当前城市</div>
      <div class="now_body">
        <div>{{ citys }}</div>
      </div>
    </div>
    <!-- 热门城市 -->
    <div class="now1">
      <div class="now——font">热门城市</div>
      <div class="now_body">
        <div
          v-for="(item, index) in hot_citys"
          :key="index"
          @click="didi(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <van-index-bar>
      <div v-for="(value, key, index) in all_citys" :key="index">
        <!-- {{ key }} -->
        <van-index-anchor :index="key"/>
         <van-cell
          v-for="(item, index) in value"
          :title="item.name"
          :key="index"
          @click="didi(item.name)"
        />
    
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import city from "../../lib/city";
import child from "../../components/child/Child";
export default {
  name: "",
  props: {},
  data() {
    return {
      hot_citys: city.data.hotCities,
      all_citys: city.data.cities,
      spll: "",
      all_c: "",
      value: "",
      now_loct: "",
    };
  },
  components: {
    child,
  },
  methods: {
    back() {
      this.$router.back();
    },
    didi(id) {
      console.log(id);
      this.$store.commit('changecity',id)
      localStorage.setItem('city',id)
      this.$router.push("/");
    },
  },
  mounted() {
    // console.log(this.hot_citys);
    // console.log(this.all_citys);
    this.now_loct = this.$route.query.loct;
    // console.log(this.now_loct);
    // this.spll = Object.keys(this.all_citys);
    // console.log(this.spll);
    // this.all_c = Object.values(this.all_citys);
    // console.log(this.all_c);
    console.log(this.citys);
  },
  computed: {
    citys(){
      return this.$store.state.city
    }
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.now {
  width: 100%;
  height: 100px;
  .now——font {
    font-size: 18px;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
  }
  .now_body {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    background-color: #fff;
    padding: 10px;
    div {
      width: 100px;
      height: 40px;
      border: 1px solid #eee;
      line-height: 40px;
      text-align: center;
    }
  }
}
.now1 {
  width: 100%;
  height: 200px;
  .now——font {
    font-size: 18px;
    height: 40px;
    padding-left: 10px;
    line-height: 40px;
  }
  .now_body {
    display: flex;
    flex-wrap: wrap-reverse;
    box-sizing: border-box;
    width: 100%;
    height: 130px;
    background-color: #fff;
    padding: 10px;
    div {
      margin-right: 10px;
      width: 100px;
      height: 40px;
      border: 1px solid #eee;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>