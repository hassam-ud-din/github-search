import { useEffect, useRef, useState } from "react"

type CallbackFunction = () => Promise<void>

function useInfiniteScroll(callback: CallbackFunction) {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const options = {
      root: null, // Use viewport as the root
      rootMargin: "0px",
      threshold: 1, // Use 0 threshold to trigger when the element becomes even partially visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (!loading && entry.isIntersecting && entry.target === observerRef.current) {
          setLoading(true)
          await callback()
          setLoading(false)
        }
      })
    }, options)

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [callback, loading])

  return observerRef
}

export default useInfiniteScroll
