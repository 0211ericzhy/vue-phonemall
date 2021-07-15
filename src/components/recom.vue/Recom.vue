<template>
  <div>
    <div class="recom">
      <div class="head">商品推荐</div>
      <div class="bodys" ref="wrapper">
        <div ref="cont" class="cont">
          <div v-for="(item, index) in recom_list" :key="index" class="box1">
            <div class="recom_img">
              <img :src="item.image" alt="" />
            </div>
            <div class="recom_name">{{ item.goodsName }}</div>
            <div class="price">
              <span class="fist">${{ item.mallPrice }}</span
              ><span class="last">${{ item.price }}</span>
            </div>
            <div class="recom_buy">
              <div class="shop" @click="checkLoggin(item.goodsId)">
                <van-icon name="cart-o" />
              </div>
              <div class="detiles" @click="details(item.goodsId)">
                查看详情
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {
    recom_list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      ids: "",
    };
  },
  components: {},
  methods: {
    details(id) {
      this.$router.push({ path: "/Details", query: { ids: id } });
    },
    // 加入购物车
    addcar(id) {
      this.$api
        .addShop({ id })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$toast("添加成功");
            // 实时更新
            this.$api.getCard().then((res) => {
              // console.log(res);
              this.$store.commit("getcarlength", res.shopList.length);
              localStorage.setItem("carlen", res.shopList.length);
            });
          } else {
            this.$toast("添加失败");
          }
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // 封装的方法去判断用户是否登陆
    checkLoggin(id) {
      this.$utils.checkLoggin({ key: this.user, next: this.addcar, item: id });
      // key 存在本地的用户名的名字  next 存在用户情况下进入的下步操作  item加入购物车的id传给addcar
    },
    // beter-score
    verScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            startX: 0, // 配置的详细信息请参考better-scroll的官方文档，这里不再赘述
            click: true,
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
          });
        } else {
          this.scroll.refresh(); //如果dom结构发生改变调用该方法
        }
      });
    },
  },
  mounted() {
    // console.log(this.recom_list);
    // console.log(this.user);
    this.verScroll();
  },
  computed: {
    user() {
      return this.$store.state.user1;
    },
  },
  watch: {},
};
</script>

<style lang='scss' scoped>
.recom {
  background-color: #fff;
  height: 270px;
  overflow: hidden;
  .head {
    padding: 0px 10px;
    height: 40px;
    // background-color: #fff;
    border-bottom: 1px solid #eee;
    font-size: 19px;
    color: #565556;
    line-height: 40px;
  }
}
.bodys {
  display: flex;
  height: 230px;
  .cont {
    display: flex;
    flex: 1;
  }
  .box1 {
    border: 1px solid #eee;
    width: 123px;
    img {
      width: 120px;
      height: 120px;
    }
    .recom_name {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 14px;
      color: #c6c6c6;
    }
    .price {
      padding: 10px;
      font-size: 14px;
      .fist {
        font-size: 16px;
      }
      .last {
        margin-left: 10px;
        color: #ababab;
        text-decoration: line-through;
      }
    }
    .recom_buy {
      width: 135px;
      display: flex;
      .shop {
        text-align: center;
        line-height: 20px;
        width: 35px;
        background-color: #fdc94a;
        color: #fff;
        font-size: 17px;
        justify-content: center;
        justify-items: center;
        align-items: center;
        align-content: center;
      }
      .detiles {
        width: 100px;
        background-color: #fc4e40;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>