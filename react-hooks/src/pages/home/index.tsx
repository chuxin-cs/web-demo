import { Outlet } from "react-router-dom";
import Layouts from "./layout";
import { Layout } from "antd";
import "./index.less"

function HomePage(){
  return (
    <Layout>
      <div className="content">
        <div className="nav">
          <Layouts/>
        </div>
        <div className="main">
          <Outlet/>
        </div>
      </div>
    </Layout>
  )
}
export default HomePage;