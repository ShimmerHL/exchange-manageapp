<template>
  <el-table-column type="expand">
    <template slot-scope="scope">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="企业注册号"> 
          <span>{{ $store.state.EnterprisefromData[scope.$index].Registration }}</span>
        </el-form-item>
        <el-form-item label="密码">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.EnterprisefromData[scope.$index].Password"
              placeholder="请输入内容"
              @change="
                EnterpriseBasicInformationChange(
                  'Password',
                  scope.$index,
                  $store.state.EnterprisefromData[scope.$index].Password
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.EnterprisefromData[scope.$index].Password }}</span>
          </p>
        </el-form-item>
      </el-form>
    </template>
  </el-table-column>
</template>

<script>
import Utils from "../../../utils/utils";
import axios from "axios";
export default {
  methods: {
    EnterpriseBasicInformationChange(Name, EnterprisefromDataIndex, ChangeText) {
      //规格 礼品全名 礼品缩略名 企业名 礼品标签修改

      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "修改",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post(
              Utils.ServeUrl + "/EnterpriseManagement/EnterpriseBasicInformationChange",
              {
                Registration:
                  this.$store.state.EnterprisefromData[EnterprisefromDataIndex].Registration,
                Name: Name,
                ChangeText: ChangeText,
              }
            )
            .then(() => {
              this.$store.state.EnterprisefromData[EnterprisefromDataIndex].Password =
                    ChangeText;
                  this.$store.state.EnterprisetableData[EnterprisefromDataIndex].Password =
                    ChangeText;
                  this.$store.state.EnterprisefromData[
                    EnterprisefromDataIndex
                  ].PasswordChange = ChangeText;
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            type: "info",
            message: "修改成功",
          });
        })
        .catch(() => {
            this.$store.state.EnterprisefromData[EnterprisefromDataIndex].Email = this.$store.state.EnterprisefromData[EnterprisefromDataIndex].PasswordChange;
          this.$message({
            type: "info",
            message: "放弃修改",
          });
        })
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/EnterpriseManagement/EnterpriseDetails")
      .then((res) => {
        Utils.EnterprisefromDataAlterFun(this, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      EnterprisefromData: [],
      // EnterprisefromData: [
      //   // {
      //   //   Registration: "321",
      //   //   Password: "321",
      //   // },
      // ],
    };
  },
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-right: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-form--inline .el-form-item__content {
  vertical-align: middle;
}
.LableIcon {
  width: 20px;
  height: 20px;
  background: #fff url("../../../assets/icon/chahao.png") no-repeat content-box;
  background-size: 20px 20px;
  border: 1px solid red;
  border-radius: 50%;
}
.CarouselPicturesIcon {
  position: absolute;
  right: 10px;
  top: 5px;
}
.SpecificationAdd {
  display: inline-block;
  cursor: pointer;
}
.SpecificationAdd:hover {
  color: red;
}
</style>
