import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={ ()=> setCount(count+1) }>{{count}}</button>
      <button onClick={ ()=> setCount((value)=> value+1) }></button>
    </>
  )
}

export default App
