import { useEffect } from "react"
import debounce from "lodash/debounce"

const useDebouncedCallback = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  useEffect(() => {
    const debouncedFn = debounce(callback, delay)

    return () => {
      debouncedFn.cancel()
    }
  }, [callback, delay])
}

export default useDebouncedCallback
