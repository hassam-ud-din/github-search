import { useEffect, useRef } from "react"
import debounce from "lodash/debounce"

type CallbackFunction = (...args: any[]) => void

const useDebounce = (callback: CallbackFunction, delay: number) => {
  const callbackRef = useRef(callback)
  const debouncedFn = useRef(
    debounce((...args: any[]) => {
      callbackRef.current(...args)
    }, delay)
  )

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const currentDebouncedFn = debouncedFn.current
    return () => {
      currentDebouncedFn.cancel()
    }
  }, [])

  return debouncedFn.current
}

export default useDebounce
