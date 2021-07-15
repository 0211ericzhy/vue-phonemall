<template>
  <div>
    <!-- 登陆/注册页面 -->
    <div class="bgc">
      <!--主体 -->
      <div class="bodys">
        <div class="header">登陆/注册</div>
        <!-- 表单 -->
        <div class="loggin">
          <van-form>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
              v-model="password"
              name="密码"
              label="密码"
              placeholder="密码"
                type="password"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
              v-model="phone"
              name="手机号码"
              label="手机号码"
              placeholder="仅注册手机号码"
            />
            <div class="msm">
              <span>短信验证码</span>
              <input type="text" placeholder="仅注册需要" />
              <!-- 反正触发提交事件 -->
              <button native-type="button">发送验证码</button>
            </div>
            <!-- 验证码 -->
            <div class="htm">
              <van-field
                v-model="verification"
                name="验证码"
                label="验证码"
                placeholder="验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
              />
              <div v-html="this.msg" @click="change"></div>
            </div>
          </van-form>
          <!-- 登陆注册 -->
          <div class="log">
            <van-button type="primary" @click="loggin">登陆</van-button>
            <van-button type="warning" @click="register">注册</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from "vant";

export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      password: "",
      // 验证码
      verification: "",
      msg: "",
      phone: "",
    };
  },
  components: {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    loggin() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify: this.verification,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            Notify({ type: "success", message: "登陆成功" });
            // 储存到vuex
            console.log(111);
            // console.log(JSON.stringify(res.userInfo));
            // localStorage.setItem('bjj','090')
            this.$store.commit("getuser", JSON.stringify(res.userInfo));
            localStorage.setItem("user", JSON.stringify(res.userInfo));
            this.$router.push("/");
          } else {
            Notify({ type: "danger", message: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register() {
      this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify: this.verification,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            Notify({ type: "success", message: "注册成功" });
            // 储存到vuex
            console.log(111);
            console.log(JSON.stringify(res.userInfo));
            this.$store.commit("getuser", JSON.stringify(res.userInfo));
            localStorage.setItem("user", JSON.stringify(res.userInfo));
            this.$router.push("/");
          } else {
            Notify({ type: "danger", message: res.msg });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    change() {
      this.$api
        .verify()
        .then((res) => {
          // console.log(res);

          this.msg = res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.$api
      .verify()
      .then((res) => {
        // console.log(res);

        this.msg = res;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {},
  watch: {
    username(val) {
      console.log();
    },
  },
};
</script>

<style lang='scss' scoped>
.bgc {
  width: 375px;
  height: 667px;
  background-image: url("../../assets/login.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .bodys {
    padding: 10px;
    width: 90vw;
    height: 140.333vw;
    background-color: #fff;
    .header {
      width: 100%;
      height: 80px;
      font-size: 28px;
    }
    .loggin {
      margin-top: 20px;
      .van-cell {
        margin-bottom: 10px;
        height: 50px;
        border-bottom: 1px solid #eee;
      }
      .msm {
        height: 50px;
        border-bottom: 1px solid #eee;
        display: flex;
        // justify-content: center;
        align-items: center;
        padding: 10px;
        span {
          width: 6.2em;
          margin-right: 3.2vw;
          color: #646566;
          text-align: left;
          word-wrap: break-word;
        }
        input {
          width: 90px;
          outline: none;
          border: 0px;
        }
        button {
          width: 90px;
          height: 40px;
          background-color: #20bf64;
          color: #fff;
          font-size: 13px;
          border: 1px solid #eee;
        }
      }
      .htm {
        display: flex;
        .van-cell {
          width: 250px;
        }
      }
    }
    .log {
      margin-top: 15px;
      width: 100%;
      button {
        width: 100px;
        margin-left: 15px;
      }
    }
  }
}
</style>