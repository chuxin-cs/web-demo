import {useEffect, useState} from 'react'
import {useLatest} from '../ahooks'

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
            <div>
                <h2>关于 useEffect + 定时器 产生闭包的问题</h2>
                 <DemoTest/>
            </div>

        </div>
    )
}

// 用于演示为什么要用useLatest
// 这里的count永远打印0，因为闭包捕获了初始值
function Counter() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            // 这里永远打印0，闭包捕获了初始值
            console.log(count)
        }, 3000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    return <button onClick={() => setCount(c => c + 1)}>+1 </button>
}

function CounterFix() {
    const [count, setCount] = useState(0)
    const latestCount = useLatest(count)

    useEffect(() => {
        const timer = setInterval(() => {
            // 这里现在每次取的就是最新值了
            console.log(latestCount.current)
        }, 3000);

        return () => {
            clearInterval(timer)
        }
    }, [])

    return <button onClick={() => setCount(c => c + 1)}>+1</button>
}

// 运行当前demo时 先注释掉 Counter 和 CounterFix，内部有定时器，为了不影响得到最终验证，所以先注释掉
function DemoTest() {
    console.log("我是DemoTest组件，我执行了")
    const [data, setData] = useState({})

    console.log("我打印了data:", data)
    setTimeout(() => {
        console.log("我是DemoTest组件中的定时器，我执行了")
        setData({
            name: '123'
        })
    }, 17000);

    useEffect(() => {
        console.log("我其实一上来就执行了", data)
        const timer = setInterval(() => {
            console.log("===>", data)
        }, 18000);
        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <div>
            测试...{JSON.stringify(data)}
        </div>
    )
}