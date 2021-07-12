<template>
  <div>
    <child>
      <template #left> <div @click="enterback"><</div></template>
      <template #center>添加地址</template>
    </child>
    <!-- 添加地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="showdelete"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @change-detail="onChangeDetail"
      tel-maxlength="11"
    />
  </div>
</template>

<script>
import { Dialog } from "vant";
import area from "../../lib/area";
import Child from "../../components/child/Child.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList: area,
      searchResult: [],
      showdelete: false,
    };
  },
  components: { Child },
  methods: {
    enterback() {
      this.$router.back();
    },
    onSave(AddressInfo) {
      this.$api
        .postAddress({
          name: AddressInfo.name,
          tel: AddressInfo.tel,
          // 全部地址
          address: `${AddressInfo.province}${AddressInfo.city}${AddressInfo.county}${AddressInfo.addressDetail}`,
          isDefault: AddressInfo.isDefault,
          province: AddressInfo.province,
          city: AddressInfo.city,
          county: AddressInfo.county,
          addressDetail: AddressInfo.addressDetail,
          areaCode: AddressInfo.areaCode,
        })
        .then((res) => {
          console.log(res);
          Dialog({ message: "添加成功" });
          this.$router.push("/Orderaddress");
        })
        .catch((err) => {
          console.log("请求失败", err);
        });
    },
    // onDelete(AddressInfo) {
    //   console.log(AddressInfo.id);
    //   this.$api.deleteAddress({id:AddressInfo.id}).then((res)=>{
    //     console.log(res);
    //   }).catch((err)=>{
    //     console.log('请求失败',err);
    //   })
    // },
    onChangeDetail() {},
  },
  mounted() {
    // this.areaList=this.area
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>