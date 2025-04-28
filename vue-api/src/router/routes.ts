import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const pages = import.meta.glob("@/pages/**/*.vue", {eager: true});
// 用于存储子路由的数组
export const childrenRoutes = [];

// 存储第一个页面的文件名
let firstFileName: string | undefined;

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
    if(!firstFileName){
      firstFileName = fileName
    }
  }
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: `/${firstFileName}`,
    children: [
      ...childrenRoutes,
      {
        // 匹配所有未定义的路由
        path: '/:pathMatch(.*)*',
        redirect: `/${firstFileName}`
      }
    ]
  },
];