import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { isString, isNumber } from "lodash-es";

// 定义用户状态的类型
interface UserState {
  name: string;
  age: number;
}

// 定义用户存储的常量
const USER_STORE_KEY = 'user';
const DEFAULT_USER: UserState = {
  name: '张三',
  age: 18
};

// 定义用户存储
export const useUserStore = defineStore(USER_STORE_KEY, () => {
  // 使用 ref 来存储用户状态
  const user = ref<UserState>({ ...DEFAULT_USER });

  // 定义计算属性，用于获取用户的姓名长度
  const userNameLength = computed(() => user.value.name.length);

  // 定义一个方法，用于更新用户信息
  const updateUser = (newUser: Partial<UserState>) => {
    if (newUser.name !== undefined && !isString(newUser.name)) {
      throw new Error('用户姓名必须是字符串类型');
    }
    if (newUser.age !== undefined && !isNumber(newUser.age)) {
      throw new Error('用户年龄必须是数字类型');
    }
    Object.assign(user.value, newUser);
  };

  // 定义一个方法，用于重置用户信息到默认值
  const resetUser = () => {
    user.value = { ...DEFAULT_USER };
  };

  // 监听用户状态的变化，并在控制台输出日志
  watch(user, (newUser) => {
    console.log('用户信息已更新:', newUser);
  }, { deep: true });

  return {
    user,
    userNameLength,
    updateUser,
    resetUser
  };
});
