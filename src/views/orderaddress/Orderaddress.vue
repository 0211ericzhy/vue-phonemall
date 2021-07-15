<template>
  <div>
    <!-- 订单地址 -->
    <child>
      <template #left> <div @click="enterback"><</div></template>
      <template #center>订单地址</template>
    </child>
    <div>
      <div v-if="list.length === 0">
        <van-address-list disabled-text="暂无收获地址～～" @add="onAdd" />
      </div>
      <div v-else>
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="onAdd"
          @edit="onEdit"
          @select="select"
        />
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
      chosenAddressId: "",
      list: [],
    };
  },
  components: { Child },
  methods: {
    enterback() {
      this.$router.back();
    },
    // 编辑
    onEdit(item) {
      console.log(item);
      this.$router.push({path:"/Editaddress",query:{ids:JSON.stringify(item)}});
    },
    // 点击新增按钮时触发

    onAdd() {
      this.$router.push("/Addaddress");
    },
    // 选择地址
    // select(index){
    //   console.log(index);
    //   this.$router.push({path})
    // }
  },
  mounted() {
    // 总地址
    this.$api
      .getAddress()
      .then((res) => {
        this.list = res.address;
        this.list.map((item)=>{
          this.$set(item,'id',item._id)
        })
        console.log(this.list);
      })
      .catch((err) => {
        console.log("请求失败", err);
      });
    // 默认地址
    this.$api
      .getDefaultAddress()
      .then((res) => {
        console.log(res);
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
.van-address-list__disabled-text {
  font-size: 30px;
}
</style>