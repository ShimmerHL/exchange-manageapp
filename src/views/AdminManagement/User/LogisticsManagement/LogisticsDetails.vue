<template>
  <el-table-column type="expand">
    <template slot-scope="scope">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="订单 ID">
          <!-- this.$store.state. -->
          <span>{{
            $store.state.LogisticsfromData[scope.$index].OrderUnique
          }}</span>
        </el-form-item>
        <el-form-item label="缩略图">
              <img
                style="width: 100px; height: 100px; margin-right: 20px"
                :src="$store.state.LogisticsfromData[scope.$index]
              .Thumbnail"
                alt=""
              />
        </el-form-item>
        <el-form-item label="礼品全名">
          <p style="display: inline-block">
            <span>{{
              $store.state.LogisticsfromData[scope.$index].CommodityFunllName
            }}</span>
          </p>
        </el-form-item>
        <el-form-item label="订单状态">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-tooltip placement="right">
              <div slot="content">
                0已完成<br /> 1待发货<br /> 2待收货<br /> 3售后中<br />
              </div>
              <el-select
                v-model="$store.state.LogisticsfromData[scope.$index].LogisticsStatus"
                placeholder="请选择"
                @change="
                  LogisticsBasicInformationChange(
                    'LogisticsStatus',
                    scope.$index,
                    $store.state.LogisticsfromData[scope.$index].LogisticsStatus
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
            <span v-if="$store.state.LogisticsfromData[scope.$index].LogisticsStatus == 0"
              >已完成
            </span>
            <span v-if="$store.state.LogisticsfromData[scope.$index].LogisticsStatus == 1"
              >待发货
            </span>
            <span v-if="$store.state.LogisticsfromData[scope.$index].LogisticsStatus == 2"
              >待收货</span
            >
            <span v-if="$store.state.LogisticsfromData[scope.$index].LogisticsStatus == 3"
              >售后中</span
            >
          </p>
        </el-form-item>
        <el-form-item label="状态更新时间">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-date-picker
              v-model="$store.state.LogisticsfromData[scope.$index].StateTime"
              type="datetime"
              placeholder="选择日期时间"
              @change=" LogisticsBasicInformationChange(
                    'StateTime',
                    scope.$index,
                    $store.state.LogisticsfromData[scope.$index].StateTime
                  )"
            >
            </el-date-picker>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.LogisticsfromData[scope.$index].StateTime }}</span>
          </p>
        </el-form-item>
        <el-form-item label="接收者名称">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.LogisticsfromData[scope.$index].Receiver"
              placeholder="请输入内容"
              @change="
                LogisticsBasicInformationChange(
                  'Receiver',
                  scope.$index,
                  $store.state.LogisticsfromData[scope.$index].Receiver
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.LogisticsfromData[scope.$index].Receiver }}</span>
          </p>
        </el-form-item>
        <el-form-item label="接收者手机号">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.LogisticsfromData[scope.$index].Phone"
              placeholder="请输入内容"
              @change="
                LogisticsBasicInformationChange(
                  'Phone',
                  scope.$index,
                  $store.state.LogisticsfromData[scope.$index].Phone
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.LogisticsfromData[scope.$index].Phone }}</span>
          </p>
        </el-form-item>
        <el-form-item label="接收地址">
          <p style="display: inline-block" v-if="scope.row.Edit">
            <el-input
              v-model="$store.state.LogisticsfromData[scope.$index].RegionAndAddress"
              placeholder="请输入内容"
              @change="
                LogisticsBasicInformationChange(
                  'RegionAndAddress',
                  scope.$index,
                  $store.state.LogisticsfromData[scope.$index].RegionAndAddress
                )
              "
            ></el-input>
          </p>
          <p style="display: inline-block" v-else>
            <span>{{ $store.state.LogisticsfromData[scope.$index].RegionAndAddress }}</span>
          </p>
        </el-form-item>
        <el-form-item label="企业名">
          <p style="display: inline-block">
            <span>{{ $store.state.LogisticsfromData[scope.$index].BusinessName }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品兑换码">
          <p style="display: inline-block">
            <span>{{ $store.state.LogisticsfromData[scope.$index].RedemptionCode }}</span>
          </p>
        </el-form-item>
        <el-form-item label="下单时间">
          <p style="display: inline-block">
            <span>{{ $store.state.LogisticsfromData[scope.$index].OrderTime }}</span>
          </p>
        </el-form-item>
        <el-form-item label="礼品 ID">
          <p style="display: inline-block">
            <span>{{ $store.state.LogisticsfromData[scope.$index].GiftUnique }}</span>
          </p>
        </el-form-item>
        <el-form-item label="用户 ID">
          <p style="display: inline-block">
            <span>{{ $store.state.LogisticsfromData[scope.$index].Useropenid }}</span>
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
    LogisticsBasicInformationChange(Name, fromDataIndex, ChangeText) {
      // 修改
      this.$confirm("确认修改!", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "修改",
        cancelButtonText: "放弃",
      })
        .then(() => {
          axios
            .post(
              Utils.ServeUrl + "/LogisticsManagement/LogisticsBasicInformationChange",
              {
                OrderUnique:
                  this.$store.state.LogisticsfromData[fromDataIndex].OrderUnique,
                Name: Name,
                ChangeText: ChangeText,
              }
            )
            .then(() => {
              switch (Name) {
                case "LogisticsStatus":
                  this.$store.state.LogisticsfromData[fromDataIndex].LogisticsStatus =
                    ChangeText;
                  this.$store.state.LogisticsfromData[
                    fromDataIndex
                  ].LogisticsStatusChange = ChangeText;
                  break;
                case "StateTime":
                  this.$store.state.LogisticsfromData[fromDataIndex].StateTime =
                    ChangeText;
                  this.$store.state.LogisticsfromData[
                    fromDataIndex
                  ].StateTimeChange = ChangeText;
                  break;
                case "Receiver":
                  this.$store.state.LogisticsfromData[fromDataIndex].Receiver =
                    ChangeText;
                  this.$store.state.LogisticsfromData[
                    fromDataIndex
                  ].ReceiverChange = ChangeText;
                  break;
                case "Phone":
                  this.$store.state.LogisticsfromData[fromDataIndex].Phone =
                    ChangeText;
                  this.$store.state.LogisticsfromData[fromDataIndex].PhoneChange =
                    ChangeText;
                  break;
                case "RegionAndAddress":
                  this.$store.state.LogisticsfromData[fromDataIndex].RegionAndAddress =
                    ChangeText;
                  this.$store.state.LogisticsfromData[fromDataIndex].RegionAndAddressChange =
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
            case "LogisticsStatus":
              this.$store.state.LogisticsfromData[fromDataIndex].LogisticsStatus =
                this.$store.state.LogisticsfromData[
                  fromDataIndex
                ].LogisticsStatusChange;
              break;
            case "Receiver":
              this.$store.state.LogisticsfromData[fromDataIndex].Receiver =
                this.$store.state.LogisticsfromData[fromDataIndex].ReceiverChange;
              break;
            case "Phone":
              this.$store.state.LogisticsfromData[fromDataIndex].Phone =
                this.$store.state.LogisticsfromData[fromDataIndex].PhoneChange;
              break;
            case "RegionAndAddress":
              this.$store.state.LogisticsfromData[fromDataIndex].RegionAndAddress =
                this.$store.state.LogisticsfromData[fromDataIndex].RegionAndAddressChange;
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
      .get(Utils.ServeUrl + "/LogisticsManagement/LogisticsDetails")
      .then((res) => {
        Utils.LogisticsfromDataAlterFun(this, res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      fromData: [],
      options: [
        { value: 0, label: "已完成" },
        { value: 1, label: "待发货" },
        { value: 2, label: "待收货" },
        { value: 3, label: "售后中" },
      ],
      // fromData: [
      //   // {
            // OrderUnique: "123",
            // LogisticsStatus:  0,
            // LogisticsStatusChange:  0,
            // StateTime:  1990-01-01 00:00:00,
            // Receiver: "123",
            // ReceiverChange:  Data[i].Receiver,
            // Phone: "13481527573",
            // PhoneChange: 13481527573,
            // RegionAndAddress: "广东省 广州市 海珠区 北部湾大学",
            // RegionAndAddressChange: "广东省 广州市 海珠区 北部湾大学",
            // CommodityFunllName: COSTA经典保温杯咖啡杯大容量不锈钢带盖随行杯男外带车载便携水杯 黑色 380ml,
            // Thumbnail: /public/images/123/p2UiLwzEeXKkrCvJ1644783610425/1644783610438.jpg,
            // BusinessName: 某某某,
            // RedemptionCode: xK9czv7p0Zdj1gRl,
            // OrderTime: 2022-01-14 07:05:12,
            // OrderUnique: p2UiLwzEeXKkrCvJ1644783610425,
            // Useropenid: ocQuS5acRgny8phIbPWnrG-SH-Vc,
            // StatusInformation: 订单已完成
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
