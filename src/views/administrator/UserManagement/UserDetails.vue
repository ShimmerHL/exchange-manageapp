<template>
  <el-table-column type="expand">
    <template slot-scope="scope">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="用户openid">
          <span>{{ $store.state.UserfromData[scope.$index].Useropenid }}</span>
        </el-form-item>
        <el-form-item label="礼品全名">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.UserfromData[scope.$index].UserName"
              placeholder="请输入内容"
              @change="
                UserBasicInformationChange(
                  'UserName',
                  scope.$index,
                  $store.state.UserfromData[scope.$index].UserName
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.UserfromData[scope.$index].UserName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="性别">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-tooltip placement="right">
              <div slot="content">0为女性<br />1为男性<br /></div>
              <el-select
                v-model="$store.state.UserfromData[scope.$index].Sex"
                placeholder="请选择"
                @change="
                  UserBasicInformationChange(
                    'Sex',
                    scope.$index,
                    $store.state.UserfromData[scope.$index].Sex
                  )
                "
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-tooltip>
          </p>
          <p style="display: inline-block" v-else>
            <span v-if="$store.state.UserfromData[scope.$index].Sex == 1"
              >男性
            </span>
            <span v-if="$store.state.UserfromData[scope.$index].Sex == 0"
              >女性
            </span>
          </p>
        </el-form-item>
        <el-form-item label="邮箱">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.UserfromData[scope.$index].Email"
              placeholder="请输入内容"
              @change="
                UserBasicInformationChange(
                  'Email',
                  scope.$index,
                  $store.state.UserfromData[scope.$index].Email
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.UserfromData[scope.$index].Email }}</span>
          </p>
        </el-form-item>
        <el-form-item label="手机号">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.UserfromData[scope.$index].Phone"
              placeholder="请输入内容"
              @change="
                UserBasicInformationChange(
                  'Phone',
                  scope.$index,
                  $store.state.UserfromData[scope.$index].Phone
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.UserfromData[scope.$index].Phone }}</span>
          </p>
        </el-form-item>
        <el-form-item label="出生年月日">
          <p style="display: inline-block">
            <el-date-picker
              v-model="$store.state.UserfromData[scope.$index].DateBirth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="UserBasicInformationChange('DateBirth',scope.$index,$store.state.UserfromData[scope.$index].DateBirth)"
              >
            </el-date-picker>
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
    UserBasicInformationChange(Name, UserfromDataIndex, ChangeText) {
      //规格 礼品全名 礼品缩略名 企业名 礼品标签修改

      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "修改",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post(
              Utils.ServeUrl + "/UserManagement/UserBasicInformationChange",
              {
                Useropenid:
                  this.$store.state.UserfromData[UserfromDataIndex].Useropenid,
                Name: Name,
                ChangeText: ChangeText,
              }
            )
            .then(() => {
              switch (Name) {
                case "UserName":
                  this.$store.state.UserfromData[UserfromDataIndex].UserName =
                    ChangeText;
                  this.$store.state.UsertableData[UserfromDataIndex].UserName =
                    ChangeText;
                  break;
                case "Email":
                  this.$store.state.UserfromData[UserfromDataIndex].Email =
                    ChangeText;
                  this.$store.state.UsertableData[UserfromDataIndex].Email =
                    ChangeText;
                  this.$store.state.UserfromData[
                    UserfromDataIndex
                  ].EmailChange = ChangeText;
                  break;
                case "Phone":
                  this.$store.state.UserfromData[UserfromDataIndex].Phone =
                    ChangeText;
                  this.$store.state.UserfromData[
                    UserfromDataIndex
                  ].PhoneChange = ChangeText;
                  break;
              }
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
          switch (Name) {
            case "UserName":
              this.$store.state.UserfromData[UserfromDataIndex].UserName =
                this.$store.state.UserfromData[UserfromDataIndex].UserChange;
              break;
            case "Email":
              this.$store.state.UserfromData[UserfromDataIndex].Email = this.$store.state.UserfromData[UserfromDataIndex].EmailChange;
              break;
            case "Phone":
              this.$store.state.UserfromData[UserfromDataIndex].Phone =
                this.$store.state.UserfromData[UserfromDataIndex].PhoneChange;
              break;
          }
          this.$message({
            type: "info",
            message: "放弃修改",
          });
        })
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/UserManagement/UserDetails")
      .then((res) => {
        Utils.UserfromDataAlterFun(this, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      UserfromData: [],
      // UserfromData: [
      //   // {
      //   //   Useropenid: "321",
      //   //   UserName: "321",
      //   //   Sex: 1,
      //   //   Email: "",
      //   //   Phone: "",
      //   //   DateBirth: "2015-08-31",
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
