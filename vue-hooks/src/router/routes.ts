import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const pages = import.meta.glob("@/pages/**/*.vue", {eager: true});
// 用于存储子路由的数组
export const childrenRoutes = [];

// 遍历 pages 对象
for (const path in pages) {
  // 提取文件名，例如从 '../play/useLatest.vue' 提取 'useLatest'
  const fileName = path.split('/').pop()?.replace('.vue', '');
  if (fileName) {
    const PageComponent = pages[path]?.default;
    console.log(PageComponent);
    childrenRoutes.push({
      path: fileName,
      component: PageComponent 
    });
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: childrenRoutes
  },
];