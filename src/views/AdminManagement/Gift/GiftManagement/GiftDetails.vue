<template>
  <el-table-column type="expand">
    <template slot-scope="scope">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="礼品 ID">
          <!-- this.$store.state. -->
          <span>{{ $store.state.fromData[scope.$index].GiftUnique }}</span>
        </el-form-item>
        <el-form-item label="轮播图片">
          <div
            v-for="(value, index) in $store.state.fromData[scope.$index]
              .CarouselPictures"
            :key="value.id"
            class="IntroduceImgDiv"
          >
            <p style="display: inline-block" v-if="value.CarouselPicturesUrl">
              <el-tooltip
                v-if="index == 0"
                class="item"
                effect="dark"
                content="该图片删除后若不上传新图片则回滚"
                placement="top"
              >
                <i
                  class="CarouselPicturesIcon LableIcon"
                  @click="CarouselPicturesDelete(scope.$index, value.id, index)"
                  v-if="scope.row.Edit"
                ></i>
              </el-tooltip>
              <i
                class="CarouselPicturesIcon LableIcon"
                @click="CarouselPicturesDelete(scope.$index, value.id, index)"
                v-if="scope.row.Edit && index !== 0"
              ></i>
              <img
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="value.CarouselPicturesUrl"
                alt=""
              />
            </p>
            <p class="LableAdd" v-else-if="scope.row.Edit">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="CarouselPicturesUploadFile"
              >
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  @click="UploadRecord(scope.$index, value.id, index)"
                ></i>
              </el-upload>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="规格">
          <div
            v-for="(value, index) in $store.state.fromData[scope.$index]
              .Specification"
            :key="value.id"
            style="display: inline-block; margin-right: 20px"
          >
            <p style="display: inline-block" v-if="value.SpecificationText">
              <span style="vertical-align: middle" v-if="!scope.row.Edit">{{
                value.SpecificationText
              }}</span>
              <el-input
                v-model="value.SpecificationText"
                style="display: inline-block; width: 210px"
                v-if="scope.row.Edit"
                @change="
                  SpecificationInput(
                    'SpecificationText',
                    scope.$index,
                    value.id,
                    index
                  )
                "
                placeholder="请输入内容"
              ></el-input>
              <i
                class="LableIcon"
                style="
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 10px;
                "
                @click="SpecificationDelete(scope.$index, value.id, index)"
                v-if="scope.row.Edit"
              ></i>
            </p>
            <p class="SpecificationAdd" v-else-if="scope.row.Edit">
              <el-input
                v-model="value.SpecificationTextChange"
                v-if="value.InputState"
                @change="
                  SpecificationInput(
                    'SpecificationTextChange',
                    scope.$index,
                    value.id,
                    index
                  )
                "
                placeholder="请输入内容"
              ></el-input>
              <span v-else @click="SpecificationAdd(scope.$index, index)"
                >点击添加规格</span
              >
            </p>
          </div>
        </el-form-item>
        <el-form-item label="介绍图片">
          <div
            v-for="(value, index) in $store.state.fromData[scope.$index]
              .IntroduceImg"
            :key="value.id"
            class="IntroduceImgDiv"
          >
            <p style="display: inline-block" v-if="value.IntroduceImgUrl">
              <i
                class="CarouselPicturesIcon LableIcon"
                @click="IntroduceImgDelete(scope.$index, value.id, index)"
                v-if="scope.row.Edit"
              ></i>
              <img
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="value.IntroduceImgUrl"
                alt=""
              />
            </p>
            <p class="LableAdd" v-else-if="scope.row.Edit">
              <el-upload
                class="avatar-uploader"
                action=""
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :http-request="IntroduceImgUploadFile"
              >
                <i
                  class="el-icon-plus avatar-uploader-icon"
                  @click="UploadRecord(scope.$index, value.id, index)"
                ></i>
              </el-upload>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="礼品全名">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.fromData[scope.$index].CommodityFunllName"
              placeholder="请输入内容"
              @change="
                GiftBasicInformationChange(
                  'CommodityFunllName',
                  scope.$index,
                  $store.state.fromData[scope.$index].CommodityFunllName
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{
              $store.state.fromData[scope.$index].CommodityFunllName
            }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品缩略名">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.fromData[scope.$index].CommodityName"
              placeholder="请输入内容"
              @change="
                GiftBasicInformationChange(
                  'CommodityName',
                  scope.$index,
                  $store.state.fromData[scope.$index].CommodityName
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.fromData[scope.$index].CommodityName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="企业名">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.fromData[scope.$index].BusinessName"
              placeholder="请输入内容"
              @change="
                GiftBasicInformationChange(
                  'BusinessName',
                  scope.$index,
                  $store.state.fromData[scope.$index].BusinessName
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.fromData[scope.$index].BusinessName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="营业注册号">
          <p style="display: inline-block">
            <span>{{ $store.state.fromData[scope.$index].Registration }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品标签">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-tooltip placement="right">
              <div slot="content">
                1为家电<br />2为家居<br />
                3为生活用品<br />
                4为护肤产品<br />5为其他
              </div>
              <el-select
                v-model="$store.state.fromData[scope.$index].Label"
                placeholder="请选择"
                @change="
                  GiftBasicInformationChange(
                    'Label',
                    scope.$index,
                    $store.state.fromData[scope.$index].Label
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
            <span v-if="$store.state.fromData[scope.$index].Label == 1"
              >家电
            </span>
            <span v-if="$store.state.fromData[scope.$index].Label == 2"
              >家居
            </span>
            <span v-if="$store.state.fromData[scope.$index].Label == 3"
              >生活用品</span
            >
            <span v-if="$store.state.fromData[scope.$index].Label == 4"
              >护肤产品</span
            >
            <span v-if="$store.state.fromData[scope.$index].Label == 5"
              >其他</span
            >
          </p>
        </el-form-item>
        <el-form-item label="剩余数量">
          <p style="display: inline-block">
            <span>{{ $store.state.fromData[scope.$index].Remaining }}</span>
          </p>
        </el-form-item>
      </el-form>
    </template>
  </el-table-column>
</template>

<script>
import Utils from "../../../../utils/utils";
import axios from "axios";
export default {
  methods: {
    beforeAvatarUpload(file) {
      //判断图片大小与格式
      const isJpgPng =
        file.type === "image/jpeg"
          ? true
          : file.type === "image/png"
          ? true
          : false;
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJpgPng) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }

      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJpgPng && isLt1M;
    },
    CarouselPicturesUploadFile(params) {
      // 轮播自定义图片上传
      let FromData = new FormData();
      FromData.append("Img", params.file);
      FromData.append("Name", "CarouselPictures" + this.UploadRecordData[2]);
      FromData.append(
        "GiftUnique",
        this.$store.state.fromData[this.UploadRecordData[0]].GiftUnique
      );
      axios
        .post(Utils.ServeUrl + "/GiftManagement/ImageStoragePath", {
          GiftUnique:
            this.$store.state.fromData[this.UploadRecordData[0]].GiftUnique,
          Registration:
            this.$store.state.fromData[this.UploadRecordData[0]].Registration,
        })
        .then(() => {
          axios
            .post(Utils.ServeUrl + "/GiftManagement/UpLoadImg", FromData)
            .then((res) => {
              this.$set(
                this.$store.state.fromData[this.UploadRecordData[0]]
                  .CarouselPictures,
                this.UploadRecordData[1],
                {
                  id: this.UploadRecordData[2],
                  CarouselPicturesUrl: Utils.ServeUrl + res.data,
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    IntroduceImgUploadFile(params) {
      //详情自定义图片上传
      let FromData = new FormData();
      FromData.append("Img", params.file);
      FromData.append("Name", " IntroduceImg" + this.UploadRecordData[2]);
      FromData.append(
        "GiftUnique",
        this.$store.state.fromData[this.UploadRecordData[0]].GiftUnique
      );

      axios
        .post(Utils.ServeUrl + "/GiftManagement/ImageStoragePath", {
          GiftUnique:
            this.$store.state.fromData[this.UploadRecordData[0]].GiftUnique,
          Registration:
            this.$store.state.fromData[this.UploadRecordData[0]].Registration,
        })
        .then(() => {
          axios
            .post(Utils.ServeUrl + "/GiftManagement/UpLoadImg", FromData)
            .then((res) => {
              this.$set(
                this.$store.state.fromData[this.UploadRecordData[0]]
                  .IntroduceImg,
                this.UploadRecordData[1],
                {
                  id: this.UploadRecordData[2],
                  IntroduceImgUrl: Utils.ServeUrl + res.data,
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    UploadRecord(fromDataIndex, Id, Index) {
      //记录上传图片的格子直接插入json避免重新刷新页面
      this.UploadRecordData = [fromDataIndex, Index, Id];
    },
    CarouselPicturesDelete(fromDataIndex, Id, Index) {
      //删除轮播图片
      let Name = "CarouselPictures" + (Index + 1);
      this.$confirm("确认删除!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "放弃",
      })
        .then(() => {
          if (Index == 0) {
            //暂时性删除页面的第一张 当上传后会直接替换路径
            this.$set(
              this.$store.state.fromData[fromDataIndex].CarouselPictures,
              Index,
              {
                id: Id,
              }
            );
            this.$message({
              type: "info",
              message: "删除成功",
            });
            return;
          }
          axios
            .post(
              Utils.ServeUrl + "/GiftManagement/DeleteCarouselPicturesOrImg",
              {
                GiftUnique:
                  this.$store.state.fromData[fromDataIndex].GiftUnique,
                Name: Name,
              }
            )
            .then(() => {
              this.$set(
                this.$store.state.fromData[fromDataIndex].CarouselPictures,
                Index,
                {
                  id: Id,
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            type: "info",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "放弃删除",
          });
        });
    },
    SpecificationDelete(fromDataIndex, Id, Index) {
      //删除规格
      let Name = "Specification" + (Index + 1);

      this.$confirm("确认删除!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post(
              Utils.ServeUrl + "/GiftManagement/DeleteCarouselPicturesOrImg",
              {
                GiftUnique:
                  this.$store.state.fromData[fromDataIndex].GiftUnique,
                Name: Name,
              }
            )
            .then(() => {
              this.$set(
                this.$store.state.fromData[fromDataIndex].Specification,
                Index,
                {
                  id: Id,
                  SpecificationText: "",
                  InputState: false,
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            type: "info",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "放弃删除",
          });
        });
    },
    SpecificationAdd(fromDataIndex, Index) {
      //添加规格
      this.$store.state.fromData[fromDataIndex].Specification[
        Index
      ].InputState = true;
    },
    SpecificationInput(str, fromDataIndex, Id, Index) {
      let Name = "Specification" + Id;
      //规格确认修改
      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃",
      })
        .then(() => {
          if (str == "SpecificationTextChange") {
            axios
              .post(
                Utils.ServeUrl + "/GiftManagement/GiftBasicInformationChange",
                {
                  GiftUnique:
                    this.$store.state.fromData[fromDataIndex].GiftUnique,
                  Name: Name,
                  ChangeText:
                    this.$store.state.fromData[fromDataIndex].Specification[
                      Index
                    ].SpecificationTextChange,
                }
              )
              .then(() => {
                this.$store.state.fromData[fromDataIndex].Specification[
                  Index
                ].SpecificationText =
                  this.$store.state.fromData[fromDataIndex].Specification[
                    Index
                  ].SpecificationTextChange;
                this.$store.state.fromData[fromDataIndex].Specification[
                  Index
                ].SpecificationTextChange = "";
                this.$store.state.fromData[fromDataIndex].Specification[
                  Index
                ].InputState = false;
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .post(Utils.ServeUrl + "/GiftManagement/GiftBasicInformation", {
                GiftUnique:
                  this.$store.state.fromData[fromDataIndex].GiftUnique,
                Name: Name,
                ChangeText:
                  this.$store.state.fromData[fromDataIndex].Specification[Index]
                    .SpecificationText,
              })
              .then(() => {
                return;
              })
              .catch((err) => {
                console.log(err);
              });
          }

          this.$message({
            type: "info",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.$store.state.fromData[fromDataIndex].Specification[
            Index
          ].SpecificationTextChange = "";
          this.$store.state.fromData[fromDataIndex].Specification[
            Index
          ].InputState = false;
          this.$message({
            type: "info",
            message: "放弃修改",
          });
        });
    },
    IntroduceImgDelete(fromDataIndex, Id, Index) {
      //删除详情图片
      let Name = "IntroduceImg" + (Index + 1);

      this.$confirm("确认删除!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post(
              Utils.ServeUrl + "/GiftManagement/DeleteCarouselPicturesOrImg",
              {
                GiftUnique:
                  this.$store.state.fromData[fromDataIndex].GiftUnique,
                Name: Name,
              }
            )
            .then(() => {
              this.$set(
                this.$store.state.fromData[fromDataIndex].IntroduceImg,
                Index,
                {
                  id: Id,
                }
              );
            })
            .catch((err) => {
              console.log(err);
            });

          this.$message({
            type: "info",
            message: "删除成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "放弃删除",
          });
        });
    },
    GiftBasicInformationChange(Name, fromDataIndex, ChangeText) {
      //规格 礼品全名 礼品缩略名 企业名 礼品标签修改
      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "修改",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post( 
              Utils.ServeUrl + "/GiftManagement/GiftBasicInformationChange",
              {
                GiftUnique:
                  this.$store.state.fromData[fromDataIndex].GiftUnique,
                Name: Name,
                ChangeText: ChangeText,
              }
            )
            .then(() => {
              switch (Name) {
                case "CommodityFunllName":
                  this.$store.state.fromData[fromDataIndex].CommodityFunllName =
                    ChangeText;
                  this.$store.state.fromData[
                    fromDataIndex
                  ].CommodityFunllNameChange = ChangeText;
                  break;
                case "CommodityName":
                  this.$store.state.fromData[fromDataIndex].CommodityName =
                    ChangeText;
                    this.$store.state.tableData[fromDataIndex].CommodityName =
                    ChangeText;
                  this.$store.state.fromData[
                    fromDataIndex
                  ].CommodityNameChange = ChangeText;
                  break;
                case "BusinessName":
                  this.$store.state.fromData[fromDataIndex].BusinessName =
                    ChangeText;
                  this.$store.state.fromData[fromDataIndex].BusinessNameChange =
                    ChangeText;
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
            case "CommodityFunllName":
              this.$store.state.fromData[fromDataIndex].CommodityFunllName =
                this.$store.state.fromData[
                  fromDataIndex
                ].CommodityFunllNameChange;
              break;
            case "CommodityName":
              this.$store.state.fromData[fromDataIndex].CommodityName =
                this.$store.state.fromData[fromDataIndex].CommodityNameChange;
              break;
            case "BusinessName":
              this.$store.state.fromData[fromDataIndex].BusinessName =
                this.$store.state.fromData[fromDataIndex].BusinessNameChange;
              break;
          }
          this.$message({
            type: "info",
            message: "放弃修改",
          });
        });
    },
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/GiftManagement/GiftDetails")
      .then((res) => {
        Utils.fromDataAlterFun(this, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      imageUrl: "",
      UploadRecordData: [], //scope index id
      options: [
        { value: 1, label: "家电" },
        { value: 2, label: "家居" },
        { value: 3, label: "生活用品" },
        { value: 4, label: "护肤产品" },
        { value: 5, label: "其他" },
      ],
      fromData: [],
      // fromData: [
      //   // {
      //   //   GiftUnique: "321",
      //   //   CarouselPictures: [
      //   //     { id: 1, CarouselPicturesUrl: "http://localhost:3000" },
      //   //     { id: 2, CarouselPicturesUrl: "" },
      //   //     { id: 3, CarouselPicturesUrl: "http://localhost:3000" },
      //   //     { id: 4, CarouselPicturesUrl: "http://localhost:3000" },
      //   //     { id: 5, CarouselPicturesUrl: "http://localhost:3000" },
      //   //   ],
      //   //   Specification: [
      //   //     {
      //   //       id: 1,
      //   //       SpecificationText: "http://localhost:3000",
      //   //       SpecificationTextChange: "",
      //   //       InputState: false,
      //   //     },
      //   //     { id: 2, SpecificationText: "", InputState: false },
      //   //     {
      //   //       id: 3,
      //   //       SpecificationText: "http://localhost:3000",
      //   //       SpecificationTextChange: "",
      //   //       InputState: false,
      //   //     },
      //   //     {
      //   //       id: 4,
      //   //       SpecificationText: "http://localhost:3000",
      //   //       SpecificationTextChange: "",
      //   //       InputState: false,
      //   //     },
      //   //     {
      //   //       id: 5,
      //   //       SpecificationText: "http://localhost:3000",
      //   //       SpecificationTextChange: "",
      //   //       InputState: false,
      //   //     },
      //   //   ],
      //   //   IntroduceImg: [
      //   //     { id: 1, IntroduceImgUrl: "http://localhost:3000" },
      //   //     { id: 2, IntroduceImgUrl: "" },
      //   //     { id: 3, IntroduceImgUrl: "http://localhost:3000" },
      //   //     { id: 4, IntroduceImgUrl: "http://localhost:3000" },
      //   //     { id: 5, IntroduceImgUrl: "http://localhost:3000" },
      //   //   ],
      //   //   BusinessName: "321",
      //   //   BusinessNameChange: "",
      //   //   CommodityFunllName: "321",
      //   //   CommodityFunllNameChange: "",
      //   //   CommodityName: "21",
      //   //   CommodityNameChange: "",
      //   //   Registration: "321",
      //   //   Label: 1,
      //   //   Remaining: 2,
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
  background: #fff url("../../../../assets/icon/chahao.png") no-repeat content-box;
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
