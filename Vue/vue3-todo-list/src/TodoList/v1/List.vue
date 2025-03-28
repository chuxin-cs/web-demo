<template>
  <div>
    <ul>
      <li v-for="item of list" :key="item.id">
        <input type="checkbox" :checked="item.completed" @click="toggleTodo(item)" />
        <span :style="{ textDecoration: item.completed ? 'line-through' : 'none' }">{{ item.text }}</span>
        <button @click="deleteTodo(item)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from './types'
import { defineProps, defineEmits } from "vue"

// 明确props中list数组的元素类型为TodoItem
const props = defineProps<{
  list: TodoItem[]
}>()

// 明确emits事件的参数类型
const emit = defineEmits<{
  (event: 'deleteTodo', item: TodoItem): void
  (event: 'toggleTodo', item: TodoItem): void
}>()

const toggleTodo = (item: TodoItem) => {
  emit("toggleTodo", item)
}

const deleteTodo = (item: TodoItem) => {
  emit("deleteTodo", item)
}

</script>