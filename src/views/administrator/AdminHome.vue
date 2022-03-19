<template>
  <el-container style="height: 100%">
    <el-aside
      style="
        width: none;
        display: flex;
        background-color: rgb(238, 241, 246);
        transition: 1s;
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
          <router-link to="/GiftManagement">
            <el-menu-item index="1-1"> 礼品管理 </el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户</template>
          <router-link to="/UserManagement">
            <el-menu-item index="2-1"> 用户管理 </el-menu-item>
          </router-link>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>企业</template>
          <router-link to="/EnterpriseManagement">
            <el-menu-item index="3-1"> 企业用户管理 </el-menu-item>
          </router-link>
          <router-link to="/CustomQuery">
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
    return {};
  },
  methods: {},
};
</script>
