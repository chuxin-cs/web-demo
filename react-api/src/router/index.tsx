import {routes} from "./routes"
import {createHashRouter, RouterProvider} from "react-router-dom"

function Router(){
  const router = createHashRouter(routes)
  return <RouterProvider router={router} />
}

export default Router;