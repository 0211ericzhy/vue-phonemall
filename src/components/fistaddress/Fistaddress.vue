<template>
  <div>
    <div class="bodys">
      <div v-if="this.defaultAdd === null">
        <div class="null">没有默认地址请选择地址</div>

        <div class="number">
          <div class="phon"></div>
          <div class="inert" @click="enter">></div>
        </div>
      </div>
      <div v-else class="bodys">
        <div class="incon">
          <van-icon name="location-o" />
        </div>
        <div class="center">
          <div class="addrname">收获地址:{{ defaultAdd.name }}</div>
          <div class="addres">收获地址：{{ defaultAdd.address }}</div>
          <div class="poin">(收获不方便，可以选择免费收获服务)</div>
        </div>
        <div class="number">
          <div class="phon">{{ defaultAdd.tel }}</div>
          <div class="inert" @click="enter">></div>
        </div>
      </div>
    </div>
    <img src="../../assets/caitiao.jpg" alt="" />
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      // 默认是否有地址
      defaultAdd: "",
    };
  },
  components: {},
  methods: {
    enter() {
      this.$router.push("/Orderaddress");
    },
  },

  mounted() {
    // 默认是否有地址
    this.$api
      .getDefaultAddress()
      .then((res) => {
        this.defaultAdd = res.defaultAdd;
        // console.log(this.defaultAdd);
        this.$emit("defaultAdd", this.defaultAdd);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.bodys {
  width: 100%;
  height: 130px;
  background-color: #fff;
  display: flex;
  .incon {
    font-size: 15.333vw;
    line-height: 130px;
  }
  .center {
    margin-left: 8px;
    .addrname {
      margin-top: 15px;
      font-size: 4.333vw;
    }
    .addres {
      margin-top: 15px;
      font-size: 3.8vw;
    }
    .poin {
      margin-top: 15px;
      font-size: 16px;
      color: #f8cba0;
    }
  }
  .number {
    // display: flex;
    position: absolute;
    right: 20px;
    top: 64px;
    .phon {
      display: flex;
      font-size: 16px;
    }
    .inert {
      margin-top: 30px;
      font-size: 20px;
      position: absolute;
      right: -3px;
      top: 7px;
      font-size: 28px;
    }
  }
}
img {
  width: 100%;
  height: 3px;
  position: absolute;
  top: 181px;
}
.null {
  font-size: 20px;
  color: red;
  margin: 53px;
}
</style>