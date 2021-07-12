<template>
  <div>
    <!-- 修改资料 -->
    <div>
      <child>
        <template #center>
          <div class="header">个人中心</div>
        </template>
        <template #left>
          <div @click="enter"><</div>
        </template>
      </child>
      <!-- 身体 -->
      <div class="bodys">
        <!-- 头像 -->
        <div class="useimg">
          <div>头像</div>
          <div class="img">
            <img :src="this.list.avatar" alt="" />
          </div>
        </div>
        <!-- 用户名 -->
        <div class="box1">
          <div class="box2">用户名</div>
          <div class="user"><input type="text" v-model="list.username" /></div>
        </div>
        <!-- name -->
        <div class="box1">
          <div class="box2">名称</div>
          <div class="username">
            <input type="text" v-model="list.nickname" />
          </div>
        </div>
        <!-- 性别 -->
        <div class="box1">
          <div class="box2">性别</div>
          <div class="sex"><input type="text" v-model="list.gender" /></div>
        </div>
        <!-- 邮箱 -->
        <div class="box1">
          <div class="box2">邮箱</div>
          <div class="eaml">
            <input type="text" v-model="eaml" placeholder="请输入邮箱" />
          </div>
        </div>
        <!-- 出生年月 -->
        <div class="box1">
          <div class="box2">出生年月</div>
          <div><input type="text" v-model="this.list.birth" /></div>
        </div>
        <!-- 保存 -->
        <div class="last">
          <div><button class="btnbox" @click="change">保存</button></div>
          <div><button @click="enter">取消</button></div>
        </div>
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
      list: "",
      user: "",
      username: "",
      sex: "",
      eaml: "",
      birth: "",
    };
  },
  components: { Child },
  methods: {
    enter() {
      this.$router.back();
    },
    // 保存
    change() {
      localStorage.setItem("user", JSON.stringify(this.list));
      this.$router.back();
    },
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("user"));
    this.$set(
      this.list,
      "birth",
      `${this.list.year}年${this.list.month}月${this.list.day}日`
    );
    console.log(this.list);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bodys {
  padding-top: 1px;
  width: 100%;
  height: 667px;
  background-color: #fff;
  .useimg {
    margin-top: 30px;
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    border-top: 1px solid #eee;
    img {
      height: 55px;
      width: 60px;
    }
  }
  .box1 {
    display: flex;
    width: 100%;
    height: 50px;
    border-top: 1px solid #eee;
    input {
      height: 86%;
      width: 154%;
      border: 0px;
    }
  }
  .box2 {
    margin-left: 8px;
    width: 90px;
    text-align: left;
    line-height: 54px;
  }
  .last {
    margin-top: 30px;
    width: 100%;
    height: 200px;
    text-align: center;
    button {
      margin: 10px 0px;
      width: 280px;
      height: 70px;
      background-color: #fff;
      border: 1px solid #eee;
    }
    .btnbox {
      background-color: #20bf64;
      color: #fff;
    }
  }
}
</style>