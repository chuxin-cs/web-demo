import {useState} from "react"
import { useMount } from "@/ahooks";

const MyComponent = () => {
  useMount(()=>{
    alert("组件挂载了!!!")
  })
}

export default function UseMountPage() {
  const [state, toggle] = useState(false);
  return (
    <>
       <button type="button" onClick={()=>toggle(!state)}>
        {state ? 'unmount' : 'mount'}
      </button>
      { state && <MyComponent /> }
    </>
  )
}