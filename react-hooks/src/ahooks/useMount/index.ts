import {useEffect} from "react"

function useMount(fn: ()=> void) {
    useEffect(() => {
        fn?.()
    },[])
}

export default useMount