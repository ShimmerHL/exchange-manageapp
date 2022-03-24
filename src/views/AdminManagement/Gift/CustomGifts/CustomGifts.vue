<template>
  <div class="CustomGiftsBox">
    <div class="ImgBox">
      <div class="ImgText">轮播图片</div>
      <!-- <div
        v-for="(value, index) in fromData.CarouselPictures"
        :key="value.id"
        class="ImgDiv"
      >
        <p style="display: inline-block" v-if="value.CarouselPicturesUrl">
          <i
            class="DeleteIcon LableIcon"
            @click="CarouselPicturesDelete(value.id, index)"
          ></i>
          <img
            style="width: 150px; height: 120px; margin-right: 20px"
            :src="value.CarouselPicturesUrl"
            alt=""
          />
        </p>
        <p class="LableAdd" v-else>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="CarouselPicturesUploadFile"
          >
            <i
              class="el-icon-plus avatar-uploader-icon"
              @click="UploadRecord(value.id, index)"
            ></i>
          </el-upload>
        </p>
      </div> -->
      <div>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
    </div>

    <div class="SpecificationBox">
      <div class="SpecificationBoxText">规格</div>
      <div class="SpecificationBoxAdd">
        <div
          v-for="(value, index) in fromData.Specification"
          :key="value.id"
          style="display: inline-block; margin-right: 20px"
        >
          <p class="SpecificationAdd" v-if="value.InputState">
            <el-input
              v-model="value.SpecificationText"
              @change="SpecificationInput('SpecificationText', value.id, index)"
              placeholder="请输入内容"
            ></el-input>
            <i
              class="LableIcon"
              style="
                display: inline-block;
                vertical-align: middle;
                margin-left: 10px;
              "
              @click="SpecificationDelete(value.id, index)"
            ></i>
          </p>
          <p v-else>
            <span @click="SpecificationAdd(index)">点击添加规格</span>
          </p>
        </div>
      </div>
    </div>

    <div class="ImgBox">
      <div class="ImgText">详情图片</div>
      <div
        v-for="(value, index) in fromData.IntroduceImg"
        :key="value.id"
        class="ImgDiv"
      >
        <p style="display: inline-block" v-if="value.IntroduceImgUrl">
          <i
            class="DeleteIcon LableIcon"
            @click="CarouselPicturesDelete(value.id, index)"
          ></i>
          <img
            style="width: 150px; height: 120px; margin-right: 20px"
            :src="value.IntroduceImgUrl"
            alt=""
          />
        </p>
        <p class="LableAdd" v-else>
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :http-request="IntroduceImgUploadFile"
          >
            <i
              class="el-icon-plus avatar-uploader-icon"
              @click="UploadRecord(value.id, index)"
            ></i>
          </el-upload>
        </p>
      </div>
    </div>

    <div class="CommodityFunllNameBox InputBox">
      <div class="TextDiv">礼品全名</div>
      <div>
        <p>
          <el-input
            v-model="fromData.CommodityFunllName"
            placeholder="请输入内容"
          ></el-input>
        </p>
      </div>
    </div>

    <div class="CommodityNameBox InputBox">
      <div class="TextDiv">礼品缩略名</div>
      <div>
        <p>
          <el-input
            v-model="fromData.CommodityName"
            placeholder="请输入内容"
          ></el-input>
        </p>
      </div>
    </div>

    <div class="BusinessNameBox InputBox">
      <div class="TextDiv">企业名</div>
      <div>
        <p>
          <el-input
            v-model="fromData.BusinessName"
            placeholder="请输入内容"
          ></el-input>
        </p>
      </div>
    </div>

    <div class="RegistrationBox InputBox">
      <div class="TextDiv">营业注册号</div>
      <div>
        <p>
          <el-input
            v-model="fromData.CommodityFunllName"
            placeholder="请输入内容"
          ></el-input>
        </p>
      </div>
    </div>

    <div class="RegistrationBox InputBox">
      <div class="TextDiv">礼品标签</div>
      <div>
        <p>
          <el-select v-model="fromData.Label" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </p>
      </div>
    </div>
    <div class="RegistrationBox InputBox">
      <div class="TextDiv">数量</div>
      <div>
        <el-input-number
          v-model="fromData.Remaining"
          @change="handleChange"
          label="描述文字"
        ></el-input-number>
      </div>
    </div>

    <div style="width: 100%; text-align: center">
      <el-button style="margin: auto" type="danger" round>提交</el-button>
    </div>
  </div>
</template>

<style lang="less">
@import "./css/CustomGifts";
</style>

<script>
import Utils from "../../../../utils/utils";
import axios from "axios";
export default {
  methods: {
    handleChange(value) {
      console.log(value);
    },
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
      console.log(params.file);
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
    },
    UploadRecord(fromDataIndex, Id, Index) {
      //记录上传图片的格子直接插入json避免重新刷新页面
      this.UploadRecordData = [fromDataIndex, Index, Id];
    },
    CarouselPicturesDelete(Id, Index) {
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
            this.$set(this.$store.state.fromData[Id].CarouselPictures, Index, {
              id: Id,
              CarouselPicturesUrl: "",
            });
            this.$message({
              type: "info",
              message: "删除成功",
            });
            return;
          }

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
    SpecificationDelete(Id, Index) {
      //删除规格
      let Name = "Specification" + (Index + 1);

      this.$confirm("确认删除!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "放弃",
      })
        .then(() => {
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
    SpecificationAdd(Index) {
      //添加规格
      this.fromData.Specification[Index].InputState = true;
    },
    SpecificationInput(str, Id, Index) {
      let Name = "Specification" + Id;
      //规格确认修改
      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "保存",
        cancelButtonText: "放弃",
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "添加成功",
          });
        })
        .catch(() => {
          this.fromData.Specification[Index].SpecificationText = "";
          this.fromData.Specification[Index].InputState = false;

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
    SubmitFromData() {
      console.log(this.fromData);
    },
  },
  data() {
    return {
      ScrollHeight: document.documentElement.scrollTop,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      options: [
        { value: 1, label: "家电" },
        { value: 2, label: "家居" },
        { value: 3, label: "生活用品" },
        { value: 4, label: "护肤产品" },
        { value: 5, label: "其他" },
      ],
      fromData: {
        CarouselPictures: [
          { id: 1, CarouselPicturesUrl: "http://localhost:3000" },
          { id: 2, CarouselPicturesUrl: "" },
          { id: 3, CarouselPicturesUrl: "http://localhost:3000" },
          { id: 4, CarouselPicturesUrl: "http://localhost:3000" },
          { id: 5, CarouselPicturesUrl: "http://localhost:3000" },
        ],
        Specification: [
          {
            id: 1,
            SpecificationText: "",
            InputState: false,
          },
          { id: 2, InputState: false },
          {
            id: 3,
            SpecificationText: "",
            InputState: false,
          },
          {
            id: 4,
            SpecificationText: "",
            InputState: false,
          },
          {
            id: 5,
            SpecificationText: "http://localhost:3000",
            InputState: false,
          },
        ],
        IntroduceImg: [
          { id: 1, IntroduceImgUrl: "http://localhost:3000" },
          { id: 2, IntroduceImgUrl: "" },
          { id: 3, IntroduceImgUrl: "http://localhost:3000" },
          { id: 4, IntroduceImgUrl: "http://localhost:3000" },
          { id: 5, IntroduceImgUrl: "http://localhost:3000" },
        ],
        BusinessName: "321",
        BusinessNameChange: "",
        CommodityFunllName: "321",
        CommodityName: "21",
        Registration: "321",
        Label: 5,
        Remaining: 2,
      },
    };
  },
};
</script>
