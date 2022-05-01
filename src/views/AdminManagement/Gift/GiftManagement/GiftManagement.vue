<template>
  <el-table
    class="BeforeNone"
    :data="$store.state.tableData"
    style="width: 100%; overflow: scroll;"
    :row-key="GetRowKeys"
    :expand-row-keys="expands"
    lazy
    v-loading="loading"
  >
    <gift-details></gift-details>

    <el-table-column label="礼品 ID" prop="GiftUnique" width="300px">
    </el-table-column>
    <el-table-column label="礼品缩略名" prop="CommodityName"> </el-table-column>
    <el-table-column label="营业注册号" prop="Registration" width="300px">
    </el-table-column>
    <el-table-column label="状态" prop="Exist" width="300px"> </el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <gift-search-input></gift-search-input>
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

        <el-button
          v-if="scope.row.Exist == '未删除'"
          style="width: 80px"
          size="mini"
          type="danger"
          @click="HandleDeleteOrRecover(scope.$index, '未删除')"
          >删除</el-button
        >
        <el-button
          v-else
          size="mini"
          type="danger"
          style="width: 80px"
          @click="HandleDeleteOrRecover(scope.$index, '已删除')"
          >恢复</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import GiftDetails from "./GiftDetails.vue";
import Utils from "../../../../utils/utils";
import axios from "axios";

import GiftSearchInput from "./GiftSearchInput.vue";

export default {
  data() {
    return {
      input: "",
      TimeStamp: "",
      search: "",
      expands: [],
      loading: true,
      tableData: [],
      // tableData: [
      //   // {
      //   //   id: 1,
      //   //   GiftUnique: "123",
      //   //   CommodityName: "12",
      //   //   Registration: "123",
      //   //   Exist: 1,
      //   //   Edit: false,
      //   // },
      //   // {
      //   //   id: 2,
      //   //   GiftUnique: "321",
      //   //   CommodityName: "21",
      //   //   Registration: "321",
      //   //   Exist:0,
      //   //   Edit: false,
      //   // },
      // ],
    };
  },
  components: {
    GiftDetails,
    GiftSearchInput,
  },
  methods: {
    GetRowKeys(row) {
      //给每一个row标记一个唯一id
      return row.id;
    },
    HandleEdit(index) {
      //编辑按钮
      if (this.$store.state.tableData[index].Edit == undefined) {
        this.$store.state.tableData[index].Edit = false;
      }

      this.$set(this.expands, 0, index + 1);
      this.$store.state.tableData[index].Edit = true;
    },
    HandleFinish(index) {
      //完成按钮
      this.$store.state.tableData[index].Edit = false;
    },
    HandleDeleteOrRecover(index, Str) {
      //删除 恢复
      let ExistState = Str == "未删除" ? 1 : 0;
      axios
        .post(Utils.ServeUrl + "/GiftManagement/GiftDeleteOrRecover", {
          GiftUnique: this.$store.state.tableData[index].GiftUnique,
          Exist: ExistState,
        })
        .then(() => {
          this.$store.state.tableData[index].Exist = ExistState
            ? "已删除"
            : "未删除";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/GiftManagement")
      .then((res) => {
        Utils.tableDataAlterFun(this, res);

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
