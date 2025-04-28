import type { RouteRecordRaw } from "vue-router"
import { createRouter,createWebHashHistory } from "vue-router"

import { routes } from "./routes"
import Layout from "@/layout/index.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes : routes as unknown as RouteRecordRaw[]
})