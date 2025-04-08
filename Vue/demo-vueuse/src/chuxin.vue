<template>
  <div class="app-container">
    <div>pos: {{ x }}, {{ y }}</div>

    
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@/hooks'
const { x, y } = useMouse()




</script>