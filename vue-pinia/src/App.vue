<script setup lang="ts">
import {useUserStore} from "@/store"

const userStore = useUserStore()
</script>

<template>
  <div>
    <h1>pinia 学习</h1>

    <!-- 用户user.ts -->
    <h2>用户：user</h2>
    <p>name: {{ userStore.user.name }}</p>
    <input type="text" v-model="userStore.user.name">
    <p>age: {{ userStore.user.age }}</p>


  </div>
</template>