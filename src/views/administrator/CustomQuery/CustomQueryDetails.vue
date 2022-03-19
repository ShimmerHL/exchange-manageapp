<template>
  <el-table-column type="expand" >
    <template slot-scope="scope">
      <el-form label-position="left" inline class="demo-table-expand" >
        <el-form-item label="礼品 ID">
          <span>{{ $store.state.CustomQueryfromData[scope.$index].GiftUnique }}</span>
        </el-form-item>
        <el-form-item label="轮播图片">
          <div
            v-for="value in $store.state.CustomQueryfromData[scope.$index]
              .CarouselPictures"
            :key="value.id"
            class="IntroduceImgDiv"
            style="display: inline-block"
          >
            <p  v-if="value.CarouselPicturesUrl">
              <img
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="value.CarouselPicturesUrl"
                alt=""
              />
            </p>
          </div>
        </el-form-item>
        <el-form-item label="规格">
          <div
            v-for="value in $store.state.CustomQueryfromData[scope.$index]
              .Specification"
            :key="value.id"
            style="display: inline-block; margin-right: 20px"
          >
            <p style="display: inline-block" >
              <span style="vertical-align: middle" >{{
                value.SpecificationText
              }}</span>
            </p>
          </div>
        </el-form-item>
        <el-form-item label="介绍图片">
          <div
            v-for="value in $store.state.CustomQueryfromData[scope.$index]
              .IntroduceImg"
            :key="value.id"
            class="IntroduceImgDiv"
            style="display: inline-block;"
          >
            <p v-if="value.IntroduceImgUrl">
              <img
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="value.IntroduceImgUrl"
                alt=""
              />
            </p>
          </div>
        </el-form-item>
        <el-form-item label="礼品全名">
          <p style="display: inline-block">
            <span>{{
              $store.state.CustomQueryfromData[scope.$index].CommodityFunllName
            }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品缩略名">
          <p style="display: inline-block">
            <span>{{ $store.state.CustomQueryfromData[scope.$index].CommodityName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="企业名">
          <p style="display: inline-block">
            <span>{{ $store.state.CustomQueryfromData[scope.$index].BusinessName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="营业注册号">
          <p style="display: inline-block">
            <span>{{ $store.state.CustomQueryfromData[scope.$index].Registration }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品标签">
          <p style="display: inline-block">
            <span v-if="$store.state.CustomQueryfromData[scope.$index].Label == 1"
              >家电
            </span>
            <span v-if="$store.state.CustomQueryfromData[scope.$index].Label == 2"
              >家居
            </span>
            <span v-if="$store.state.CustomQueryfromData[scope.$index].Label == 3"
              >生活用品</span
            >
            <span v-if="$store.state.CustomQueryfromData[scope.$index].Label == 4"
              >护肤产品</span
            >
            <span v-if="$store.state.CustomQueryfromData[scope.$index].Label == 5"
              >其他</span
            >
          </p>
        </el-form-item>
        <el-form-item label="剩余数量">
          <p style="display: inline-block">
            <span>{{ $store.state.CustomQueryfromData[scope.$index].Remaining }}</span>
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
  },
  mounted() {
    axios
      .get(Utils.ServeUrl + "/CustomQuery/CustomQueryDetails")
      .then((res) => {
        Utils.CustomQueryfromDataAlterFun(this, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      CustomQueryfromData: [],
      // CustomQueryfromData: [
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
      //   //   CommodityFunllName: "321",
      //   //   CommodityName: "21",
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
.el-form--inline .el-form-item__content {
  vertical-align: middle;
}
</style>
