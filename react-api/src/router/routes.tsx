import {getPages} from "@/utils"
import LayoutPage from "@/layout"

// react api 路由配置
const pages = import.meta.glob("../pages/api/*.tsx", { eager: true })
export const childrenApiRoutes = getPages(pages);


// react demo 路由配置
import TodoList from "@/pages/demo/TodoList/index.tsx";
const childrenDemoRoutes = [
  {
    path: "TodoList",
    element: <TodoList />,
  },
]

export const getRoutes = () => {
  return {
    api: childrenApiRoutes,
    demo: childrenDemoRoutes,
  };
}

export const routes = [
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      ...childrenApiRoutes,
      ...childrenDemoRoutes,
    ]
  }
]