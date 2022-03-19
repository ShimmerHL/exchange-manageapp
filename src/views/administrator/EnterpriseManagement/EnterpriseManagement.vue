<template>
  <el-table
    class="BeforeNone"
    :data="$store.state.EnterprisetableData"
    style="width: 100%; overflow: scroll;"
    :row-key="GetRowKeys"
    :expand-row-keys="expands"
    lazy
    v-loading="loading"
  >
     <enterprise-details></enterprise-details>

    <el-table-column label="营业注册号" prop="Registration" > </el-table-column>
    <el-table-column label="密码" prop="Password"> </el-table-column>
    <el-table-column align="right" >
      <template slot="header" >
          <search-input></search-input>
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
import EnterpriseDetails from "./EnterpriseDetails.vue";
import Utils from "../../../utils/utils";
import axios from "axios";

import SearchInput from "./SearchInput.vue"

export default {
  data() {
    return {
      input: "",
      TimeStamp: "",
      search: "",
      expands: [],
      loading: true,
      EnterprisetableData:[]
      // EnterprisetableData: [ 
      //   // {
      //   //   id: 1,
      //   //   Registration: "123",
      //   //   Password: "12",
      //   //   Edit: false,
      //   // },
    }
  },
  components: {
    EnterpriseDetails,SearchInput
  },
  methods: {
    GetRowKeys(row) {
      //给每一个row标记一个唯一id
      return row.id;
    },
    HandleEdit(index) {
      //编辑按钮
      if(this.$store.state.EnterprisetableData[index].Edit == undefined){
        this.$store.state.EnterprisetableData[index].Edit = false
      }

      this.$set(this.expands, 0, index + 1);
      this.$store.state.EnterprisetableData[index].Edit = true;
    },
    HandleFinish(index) {
      //完成按钮
      this.$store.state.EnterprisetableData[index].Edit = false;
    }
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/EnterpriseManagement")
      .then((res) => {

        Utils.EnterprisetableDataAlterFun(this,res)
        
       this.loading = false  //关闭loading
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
