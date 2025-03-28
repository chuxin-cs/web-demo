<template>
  <div class="todo-list-container">
    <TodoInput @add-todo="addTodo" />
    <List :list="todoData.list" @toggleTodo="toggleTodo" @deleteTodo="deleteTodo" />
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import List from './List.vue'
import TodoInput from './TodoInput.vue'
import type {TodoItem} from './types'


// 定义数据
let todoData = reactive({ list: [] });
const addTodo = (todoText: string) => {
  todoData.list.push({
    id: new Date().getTime(),
    text: todoText,
    completed: false
  })
}
// 切换任务的完成状态
const toggleTodo = (item: TodoItem) => {
  item.completed = !item.completed;
}
// 删除指定任务
const deleteTodo = (item: TodoItem) => {
  const index = todoData.list.findIndex((todo) => todo.id === item.id);
  if (index!== -1) {
    todoData.list.splice(index, 1);
  }
}


</script>