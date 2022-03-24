<template>
  <el-table
    class="BeforeNone"
    :data="$store.state.UsertableData"
    style="width: 100%; overflow: scroll;"
    :row-key="GetRowKeys"
    :expand-row-keys="expands"
    lazy
    v-loading="loading"
  >
    <user-details></user-details>

    <el-table-column label="用户Openid" prop="Useropenid" > </el-table-column>
    <el-table-column label="用户名" prop="UserName"> </el-table-column>
    <el-table-column label="手机号" prop="Phone" width="200px"> </el-table-column>
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
import UserDetails from "./UserDetails.vue";
import Utils from "../../../../utils/utils";
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
      UsertableData:[]
      // UsertableData: [ 
      //   // {
      //   //   id: 1,
      //   //   Useropenid: "123",
      //   //   UserName: "12",
      //   //   Phone: 1,
      //   //   Edit: false,
      //   // },
    }
  },
  components: {
    UserDetails,SearchInput
  },
  methods: {
    GetRowKeys(row) {
      //给每一个row标记一个唯一id
      return row.id;
    },
    HandleEdit(index) {
      //编辑按钮
      if(this.$store.state.UsertableData[index].Edit == undefined){
        this.$store.state.UsertableData[index].Edit = false
      }

      this.$set(this.expands, 0, index + 1);
      this.$store.state.UsertableData[index].Edit = true;
    },
    HandleFinish(index) {
      //完成按钮
      this.$store.state.UsertableData[index].Edit = false;
    }
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/UserManagement")
      .then((res) => {

        Utils.UsertableDataAlterFun(this,res)
        
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
