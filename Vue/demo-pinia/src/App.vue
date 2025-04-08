<template>
  <div class="app-container">
    <input v-model="newTodo" placeholder="添加新任务" @keyup.enter="addTodo" />
    <button @click="handeAddTodo">添加</button>
    <ul>
      <li v-for="(todo, index) in store.todos" :key="index">
        <span
          :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }"
        >
          {{ todo.text }}
        </span>
        <button @click="removeTodo(todo.id)">删除</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '@/store';

const newTodo = ref("")
const store = useTodoStore();
const handeAddTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo(newTodo.value);
    newTodo.value = '';
  }
};

const removeTodo = (id: number) => {
  store.deleteTodo(id);
};

</script>
