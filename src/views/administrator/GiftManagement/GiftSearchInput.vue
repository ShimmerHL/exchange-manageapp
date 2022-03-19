<template>
  <!-- 导入方式解决input无法输入问题 -->
  <el-autocomplete
    class="inline-input"
    style="width: 100%;"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入礼品全名"
    :trigger-on-focus="false"
    @select="handleSelect"
    :clearable="true"
  ></el-autocomplete>
</template>

<script>
import axios from "axios";
import Utils from "../../../utils/utils";

export default {
  data() {
    return {
      restaurants: [],
      state: "",
      SearchtableData: [],
    };
  },
  methods: {
    async querySearch(queryString, cb) {
      let restaurants = await new Promise((res, rej) => {
        axios
          .post(Utils.ServeUrl + "/GiftManagement/GiftManagementSearch", {
            Text: queryString,
          })
          .then((AxiosRes) => {
            console.log(AxiosRes)
            res(AxiosRes.data);
          })
          .catch((err) => [rej(err)]);
      });
      cb(restaurants);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      axios
        .post(
          Utils.ServeUrl + "/GiftManagement/GiftSearchReturnManagementData",
          {
            GiftUnique: item.GiftUnique,
          }
        )
        .then((tableDatares) => {
              Utils.tableDataAlterFun(this,tableDatares)
          axios
            .post(
              Utils.ServeUrl + "/GiftManagement/GiftSearchReturnDetailsData",
              {
                GiftUnique: item.GiftUnique,
              }
            )
            .then((formDatares) => {
              Utils.fromDataAlterFun(this,formDatares)
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
  },
};
</script>

<style>
  .inline-input input{
    border-radius:0 4px 4px 0;
  }
</style>