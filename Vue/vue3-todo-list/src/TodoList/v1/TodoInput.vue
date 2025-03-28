<template>
  <div class="input-container">
    <input type="text" placeholder="Add a new todo..." v-model="todoText" />
    <button @click="addTodo">添加</button>
  </div>
</template>

<script setup lang="ts">
import {ref,defineEmits} from "vue"

const todoText = ref<string>('')
const emit = defineEmits(['addTodo'])

const addTodo = ()=>{
  emit("addTodo",todoText.value)
  clearTodoValue();
}
const clearTodoValue = ()=>{
  todoText.value = ''
}

</script>