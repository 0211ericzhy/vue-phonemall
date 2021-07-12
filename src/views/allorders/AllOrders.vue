<template>
  <div>
    <!-- 全部商品/订单 -->
    <div>
      <child>
        <template #center>
          <div>全部订单</div>
        </template>
        <template #left>
          <div @click="retur"><</div>
        </template>
      </child>
      <div v-for="(item, index) in goods" :key="index">
        <!-- 订单头部 -->
        <div class="bodys">
          <div class="header">
            订单编号啊：{{ item.order_id }}
            <div class="done">交易完成</div>
          </div>
          <!-- 货物 -->
          <div
            class="goodsstyle"
            v-for="(item1, index1) in item.order_list"
            :key="index1"
          >
            <van-card
              :num="item1.count"
              :price="item1.present_price"
              :title="item1.name"
              :thumb="item1.image_path"
            />
          </div>
          <!-- 底部 -->
          <div class="footer">
            <div>创建时间:{{ item.add_time }}</div>
            <div>收货地址：{{ item.address }}</div>
            <div>
              共{{ item.order_list.length }}商品 合计：{{ item.mallPrice }}元
            </div>
          </div>
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
      goods: [],
    };
  },
  components: { Child },
  methods: {
    retur() {
      this.$router.back();
    },
  },
  mounted() {
    this.$api
      .getMyOrder()
      .then((res) => {
        // console.log(res);
        this.goods = res.list;
        console.log(this.goods);
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
.bodys{
  margin: 10px 0px 10px 0px;
}
.header {
  padding: 0px 5px;
  width: 90%;
  height: 30px;
  background-color: #fff;
  margin: 0px auto;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .done {
    color: #d36331;
  }
}
.goodsstyle {
  width: 90%;
  background-color: #fff;
  margin: 0px auto;
  padding: 0px 5px;
}
.footer {
  width: 90%;
  background-color: #fff;
  margin: 0px auto;
  padding: 0px 5px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-items: flex-end;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
</style>