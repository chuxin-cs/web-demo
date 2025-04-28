<template>
  <div class="layout-container">
    <!-- nav -->
    <div class="nav">
      <el-menu :default-active="defaultActive" :default-openeds="defaultOpeneds" router class="el-menu-vertical-demo">
        <el-sub-menu index="hooks">
          <template #title>
            <span>vueuse</span>
          </template>
          <el-menu-item v-for="item in menuList" :index="item.path" :key="item.path">{{ item.path }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>

    <!-- 主体内容 -->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue"
import {childrenRoutes} from "@/router/routes"

const menuList = computed(()=>childrenRoutes)
const defaultActive = computed(()=> menuList.value?.[0]?.path)
const defaultOpeneds = computed(()=> [defaultActive.value])
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;

  .nav {
    width: 200px;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .main {
    width: calc(100% - 200px);
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>