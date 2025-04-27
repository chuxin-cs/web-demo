import { useEffect, useState } from 'react'
import { useLatest } from '../ahooks'

export default function UseLatestPage() {
  return (
    <div>
      <h1>useLatest</h1>
      <div>
        <h2>不使用 useLatest</h2>
        <Counter/>
      </div>
      <div>
        <h2>使用 useLatest</h2>
        <CounterFix/>
      </div>
    </div>
  )
}

// 用于演示为什么要用useLatest
// 这里的count永远打印0，因为闭包捕获了初始值
function Counter(){
  const [count,setCount] = useState(0)

  useEffect(()=>{
    const timer = setInterval(()=>{
      // 这里永远打印0，闭包捕获了初始值
      console.log(count)
    },3000);

    return ()=>{
      clearInterval(timer)
    }
  }, [])

  return <button onClick={() => setCount(c => c+1)}>+1 </button>
}

function CounterFix() {
  const [count,setCount] = useState(0)
  const latestCount = useLatest(count)

  useEffect(()=>{
    const timer = setInterval(()=>{
      // 这里永远打印0，闭包捕获了初始值
      console.log(latestCount.current)
    },3000);

    return ()=>{
      clearInterval(timer)
    }
  }, [])

  return <button onClick={() => setCount(c => c+1)}>+1</button>
}