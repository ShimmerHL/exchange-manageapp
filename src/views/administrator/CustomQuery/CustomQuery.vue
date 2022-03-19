<template>
  <el-table
    class="BeforeNone" 
    :data="$store.state.CustomQuerytableData"
    style="width: 100%; overflow: scroll"
    :row-key="GetRowKeys"
    :expand-row-keys="expands"
    lazy
    v-loading="loading"
  >
    <custom-query-details></custom-query-details>
    
    <el-table-column label="礼品 ID" prop="GiftUnique" width="300px">
    </el-table-column>
    <el-table-column label="礼品缩略名" prop="CommodityName"> </el-table-column>
    <el-table-column label="营业注册号" prop="Registration" width="300px">
    </el-table-column>
    <el-table-column label="状态" prop="Exist" width="100px"> </el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <custom-query-search-input></custom-query-search-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import Utils from "../../../utils/utils";
import axios from "axios";

import CustomQuerySearchInput from "./CustomQuerySearchInput.vue";
import CustomQueryDetails from "./CustomQueryDetails.vue";

export default {
  data() {
    return {
      input: "",
      TimeStamp: "",
      search: "",
      expands: [],
      loading: true,
      CustomQuerytableData: [],
      // CustomQuerytableData: [
      //   // {
      //   //   id: 1,
      //   //   GiftUnique: "123",
      //   //   CommodityName: "12",
      //   //   Registration: "123",
      //   //   Exist: 1,
      //   // },
      //   // {
      //   //   id: 2,
      //   //   GiftUnique: "321",
      //   //   CommodityName: "21",
      //   //   Registration: "321",
      //   //   Exist:0,
      //   // },
      // ],
    };
  },
  components: {
    CustomQuerySearchInput,
    CustomQueryDetails,
  },
  methods: {
    GetRowKeys(row) {
      //给每一个row标记一个唯一id
      return row.id;
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/CustomQuery")
      .then((res) => {
        Utils.CustomQuerytableDataAlterFun(this, res);

        this.loading = false; //关闭loading
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand .el-form-item {
  margin-left: 3.5%;
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
.BeforeNone::before {
  content: none;
}
.el-table__row td{
  height: 53px;
}

</style>
