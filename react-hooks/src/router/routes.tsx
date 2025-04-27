import {createHashRouter,Outlet} from "react-router-dom"

import HomePage from "../pages/home";
import UseLatestPage from "../play/useLatest";
import UseUnmountPage from "../play/useUnmount";

export const routes = [
  {
   path: "/",
   element: <HomePage />,
   children: [
     {
       path: "useLatest",
       element: <UseLatestPage />
     },
     {
       path: "useUnmount",
       element: <UseUnmountPage />
     }
   ]
  }
]