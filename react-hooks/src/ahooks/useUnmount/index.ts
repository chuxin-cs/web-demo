import {useEffect} from "react"
import useLatest from "../useLatest"

function useUnmount(fn: () => void) {
    const fnRef = useLatest(fn);
    useEffect(() => {
        return () => {
            fnRef.current()
        }
    }, [])
}

export default useUnmount;