import {useState} from "react"
import { useUnmount } from '../ahooks'

export default function UseUnmountPage() {
  const [show, setShow] = useState(true)
  return (
    <div>
     <button type="button" onClick={()=>setShow(!show)}>
       {show ? 'unmount' : 'mount'}
     </button>
      { show && <MyComponent /> }
    </div>
  )
}

const MyComponent = () => {
  useUnmount(()=>{
    alert("组件卸载了!!!")
  })
}