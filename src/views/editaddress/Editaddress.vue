<template>
  <div>
    <!-- 编辑地址 -->
    <child>
      <template #left> <div @click="enterback"><</div></template>
      <template #center>编辑地址</template>
    </child>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressinfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @changedefault='changedefault'
    />
  </div>
</template>

<script>
import Child from "../../components/child/Child.vue";
import area from "../../lib/area";
export default {
  name: "",
  props: {},
  data() {
    return {
      areaList: area,
      searchResult: [],
      ids: [],
      addressinfo: {},
    };
  },
  components: { Child },
  methods: {
    enterback() {
      this.$router.back();
    },
    onSave(a) {
      this.$api.postAddress({
        name: a.name,
        tel: a.tel,
        // 全部地址
        address: `${a.province}${a.city}${a.county}${a.addressDetail}`,
        isDefault: a.isDefault,
        province: a.province,
        city: a.city,
        county: a.county,
        addressDetail: a.addressDetail,
        areaCode: a.areaCode,
        id: a.id,
      }).then((res)=>{
        //   console.log(res);
          this.$router.back()
      }).catch((err)=>{
          console.log('请求失败',err);
      })
    },
    // 删除编辑地址
    onDelete() {
        this.$api.deleteAddress({id:this.addressinfo.id}).then((res)=>{
            // console.log(res);
            this.$router.back()
        }).catch((err)=>{
            console.log('请求失败');
        })
    },
    // 修改默认地址
    changedefault(val){
        console.log(val);
        this.$api.setDefaultAddress({id:this.addressinfouid}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log('请求失败',err);
        })
    }
  },
  mounted() {
    this.addressinfo = JSON.parse(this.$route.query.ids);
    //   console.log(this.addressinfo);
  },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>