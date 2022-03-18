<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      style="
        width: none;
        display: flex;
        background-color: rgb(238, 241, 246);
        transition: 1s;
      "
    >
      <el-menu :default-openeds="['2']">
        <!--  :default-openeds="['1']" -->
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>礼品</template>
          <el-menu-item index="1-1">
            <router-link to="/GiftManagement">礼品管理</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>用户</template>

          <el-menu-item index="2-1">
            <router-link to="/UserManagement">用户管理</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>企业</template>
          <el-menu-item index="3-1">企业用户管理</el-menu-item>
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
};
</script>
