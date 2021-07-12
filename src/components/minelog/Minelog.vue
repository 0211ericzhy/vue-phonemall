<template>
  <div>
    <div class="box">
      <div v-if="this.username">
        <div class="logimg">
          <img :src="Userinformation.avatar" alt="" />
        </div>
        <div class="logwelcom">欢迎您:{{ Userinformation.nickname }}</div>
        <div class="out" @click="outlogging">退出登陆</div>
        <div class="icon" @click="setting"><van-icon name="setting" /></div>
      </div>
      <div v-else>
        <div class="logimgs"></div>
        <div class="logwelcoms" @click="loggin">请登录</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      Userinformation: "",
    };
  },
  components: {},
  methods: {
    //   设置用户信息
    setting() {
      this.$router.push("/Information");
    },
    loggin() {
      this.$router.push("/Loggin");
    },
    outlogging() {
      this.$api
        .loginOut()
        .then((res) => {
          console.log(res);
          this.$dialog.alert({
            message: "退出成功",
          });
          localStorage.clear();
          this.$router.push('/')
        })
        .catch((err) => {
          "请求失败", err;
        });
    },
  },
  mounted() {
    this.$api
      .user()
      .then((res) => {
        this.Userinformation = res.userInfo;
        console.log(this.Userinformation);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    username() {
      return this.$store.state.user1;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  width: 100%;
  height: 300px;
  background-color: hotpink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logimg {
    margin-left: 15.667vw;

    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    img {
      width: 100px;
      height: 100px;
      background-color: #fff;
      border-radius: 50%;
    }
  }
  .logwelcom {
    font-size: 25px;
    color: #fff;
    margin-top: 15px;
  }
  .out {
    font-size: 20px;
    color: #fff;
    margin: 8vw 0 0 17vw;
  }
  .icon {
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 17.667vw;
    right: 2.667vw;
  }
}
.logimgs {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
}
.logwelcoms {
  font-size: 25px;
  color: #fff;
  margin-top: 30px;
  margin-left: 10px;
}
</style>