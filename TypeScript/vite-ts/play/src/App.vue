<template>
  <div>
    <h1>Hello World</h1>
    <button @click="handleClick">{{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useState } from '../../dist/counter.js';

onMounted(() => {
  console.log('Hello World');
});
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count.value + 1);
};
</script>
