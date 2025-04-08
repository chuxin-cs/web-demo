import { App } from 'vue';


export const piniaSymbol = (Symbol('pinia'))


export function createPinia() {
  let _p = [];
  const state = {};

  const pinia = {
    // 注册
    install(app: App) {
      pinia._a = app;
      // 注册pinia  后续可通过 inject 拿到pinia实例
      app.provide(piniaSymbol, pinia)
      // Vue2.0的写法：this.$pinia
      app.config.globalProperties.$pinia = pinia
    },
    // 插件
    _p,
    // vue实例
    _a: null,
    // 状态
    state,
  };
  return pinia;
}

export function defineStore() {
  return {};
}
