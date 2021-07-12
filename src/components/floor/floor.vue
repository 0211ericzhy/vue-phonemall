<template>
  <div class="floor">
    <div>
      <div class="head">
        <div v-if="Floor_name === '休闲食品'" class="floo">1F</div>
        <div v-if="Floor_name === '新鲜水果'" class="floo">2F</div>
        <div v-if="Floor_name === '营养奶品'" class="floo">3F</div>
        <div>{{ Floor_name }}</div>
      </div>
      <div class="bodys">
        <div class="head_left">
          <div class="big_left">
            <img :src="Floor1[0].image" alt="" @click="details(Floor1[0].goodsId)" />
          </div>
          <div class="bot">
            <img :src="Floor1[4].image" alt="" @click="details(Floor1[4].goodsId)"  />
          </div>
        </div>
        <div class="head_right">
          <div class="fist">
            <img :src="Floor1[1].image" alt="" @click="details(Floor1[1].goodsId)"  />
          </div>
          <div class="sec">
            <img :src="Floor1[2].image" alt="" @click="details(Floor1[2].goodsId)"  />
          </div>
          <div class="last">
            <img :src="Floor1[3].image" alt=""  @click="details(Floor1[3].goodsId)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    Floor1: {
      type: Array,
      required: true,
    },
    Floor_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ids:''
    };
  },
  components: {},
  methods: {
    details(id) {
      // console.log(id);
      this.$router.push({ path: "/Details", query: { ids: id } });
    },
  },
  mounted() {
    // console.log(this.Floor1);
    // console.log(this.Floor_name);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.floor {
  width: 100%;
  height: 400px;
  .head {
    line-height: 50px;
    width: 100%;
    height: 50px;
    color: red;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .floo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: red;
      font-size: 14px;
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
  .bodys {
    background-color: #fff;
    width: 100%;
    height: 350px;
    display: flex;
    .head_left {
      width: 200px;
      height: 350px;
      .big_left {
        width: 200px;
        height: 232px;
        img {
          width: 200px;
          height: 232px;
        }
      }
      .bot {
        width: 200px;
        height: 188px;
        img {
          width: 200px;
          height: 118px;
        }
      }
    }
    .head_right {
      width: 175px;
      height: 350px;
      //   background-color: pink;
      div {
        width: 175px;
        height: 117px;
        img {
          width: 175px;
          height: 116.5px;
        }
      }
    }
  }
}
</style>