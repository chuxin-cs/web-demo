<template>
  <div class="app-container">
    <h6>vueuse</h6>
    <div>pos: {{ x }}, {{ y }}</div>
    <hr/>
    <h6>初心</h6>
    <ChuXin />
  </div>
</template>

<script setup lang="ts">
import ChuXin from './chuxin.vue';

import { useMouse } from '@vueuse/core';
const { x, y } = useMouse();
</script>
