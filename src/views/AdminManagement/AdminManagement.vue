<template>
  <el-container :style="{HeightDiv}" style="height: 100%">
    <el-aside
      style="
        display: flex;
        width: none;
        background-color: rgb(238, 241, 246);
        z-index:999;
      "
    >
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!--  :default-openeds="['1']" -->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>礼品</template>
          <router-link to="/AdminManagement/GiftManagement">
            <el-menu-item index="1-1"> 礼品管理 </el-menu-item>
          </router-link>
          <!-- <router-link to="/AdminManagement/CustomGifts">
            <el-menu-item index="1-2" @click="HeightAlter"> 添加礼品 </el-menu-item>
          </router-link> -->
        </el-submenu>
        
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户</template>
          <router-link to="/AdminManagement/UserManagement">
            <el-menu-item index="2-1"> 用户管理 </el-menu-item>
          </router-link>
          <router-link to="/AdminManagement/LogisticsManagement">
            <el-menu-item index="2-2"> 物流管理 </el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>企业</template>
          <router-link to="/AdminManagement/EnterpriseManagement">
            <el-menu-item index="3-1"> 企业用户管理 </el-menu-item>
          </router-link>
          <router-link to="/AdminManagement/CustomQuery">
            <el-menu-item index="3-2"> 定制查询 </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>

    <router-view />
  </el-container>
</template>
<script>
export default {
  data() {
    return {HeightDiv:0};
  },
  methods: {
    HeightAlter(){
      this.HeightDiv = document.body.clientHeight + document.body.clientHeight * 0.5
      console.log(this.HeightDiv)
    }
  },
  created(){
    this.HeightDiv = document.body.clientHeight
  }
};
</script>
