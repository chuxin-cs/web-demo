import HomePage from "../pages/home";
// 使用 Vite 的 import.meta.glob 实现自动导入
const pages = import.meta.glob('../play/*.tsx', { eager: true });

// 用于存储子路由的数组
export const childrenRoutes = [];

// 遍历 pages 对象
for (const path in pages) {
  // 提取文件名，例如从 '../play/useLatest.tsx' 提取 'useLatest'
  const fileName = path.split('/').pop()?.replace('.tsx', '');
  if (fileName) {
    const PageComponent = pages[path]?.default;
    childrenRoutes.push({
      path: fileName,
      element: <PageComponent />
    });
  }
}

export const getRoutes = () => {
  return childrenRoutes;
}

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    children: childrenRoutes
  }
]