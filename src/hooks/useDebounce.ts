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
    return () => {
      debouncedFn.current.cancel()
    }
  }, [])

  return debouncedFn.current
}

export default useDebounce
