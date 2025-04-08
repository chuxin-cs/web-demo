import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

// 定义TodoItem接口
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// 使用defineStore定义一个store
export const useTodoStore = defineStore('todo', () => {
  let todos = reactive<TodoItem[]>([]);
  const completedTodos = computed(() => todos.filter((todo) => todo.completed));
  const uncompletedTodos = computed(() =>
    todos.filter((todo) => !todo.completed)
  );
  // 添加新的todo项
  const addTodo = (text: string) => {
    todos.push({
      id: Date.now(),
      text,
      completed: false,
    });
  };
  const deleteTodo = (id: number) => {
    const newTodos = reactive([...todos.filter((todo) => todo.id !== id)]);
    todos.length = 0; // 清空原数组
    todos.push(...newTodos); // 将新数组元素添加到原数组
  };

  return {
    todos,
    completedTodos,
    uncompletedTodos,
    addTodo,
    deleteTodo,
  };
});
