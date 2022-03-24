<template>
  <el-table
    class="BeforeNone"
    :data="$store.state.LogisticstableData"
    style="width: 100%; overflow: scroll"
    :row-key="GetRowKeys"
    :expand-row-keys="expands"
    lazy
    v-loading="loading"
  >
    <logistics-details></logistics-details>

    <el-table-column label="礼品 ID" prop="OrderUnique" width="300px">
    </el-table-column>
    <el-table-column label="礼品全名" prop="CommodityFunllName">
    </el-table-column>
    <el-table-column label="用户名" prop="UserName" width="300px">
    </el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <logistics-search-input></logistics-search-input>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="HandleFinish(scope.$index)"
          v-if="scope.row.Edit"
          >完成</el-button
        >
        <el-button size="mini" @click="HandleEdit(scope.$index)" v-else
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import LogisticsDetails from "./LogisticsDetails.vue";
import Utils from "../../../../utils/utils";
import axios from "axios";

import LogisticsSearchInput from "./LogisticsSearchInput.vue";
export default {
  data() {
    return {
      input: "",
      TimeStamp: "",
      search: "",
      expands: [],
      loading: true,
      LogisticstableData: [],
      // tableData: [
      //   // {
      //   //   id: 1,
      //   //   GiftUnique: "123",
      //   //   CommodityFunllName: "12",
      //   //   UserName: "123",
      //   //   Edit: false,
      //   // },
      // ],
    };
  },
  components: {
    LogisticsDetails,
    LogisticsSearchInput,
  },
  methods: {
    GetRowKeys(row) {
      //给每一个row标记一个唯一id
      return row.id;
    },
    HandleEdit(index) {
      //编辑按钮
      this.expands = [`${index + 1}`] //解决该页面点击编辑失效问题
      this.$store.state.LogisticstableData[index].Edit = true
    },
    HandleFinish(index) {
      //完成按钮
      this.$store.state.LogisticstableData[index].Edit = false;
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/LogisticsManagement")
      .then((res) => {
        Utils.LogisticstableDataAlterFun(this, res);

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
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 3.5%;
  margin-right: 0;
  margin-bottom: 0;
  width: 80%;
}
.IntroduceImgDiv {
  display: inline-block;
  position: relative;
}
.BeforeNone::before {
  content: none;
}
</style>
