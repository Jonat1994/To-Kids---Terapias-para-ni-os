import { useEffect, useState, useRef } from 'react'

function AnimatedCounter({ targetValue, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          // Parse the target value (remove + and non-numeric characters)
          const numericValue = parseInt(targetValue.replace(/\D/g, ''))
          
          const startTime = Date.now()
          const animationDuration = duration

          const animate = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / animationDuration, 1)
            const currentValue = Math.floor(progress * numericValue)
            setCount(currentValue)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(numericValue)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [targetValue, hasAnimated, duration])

  // Format the display to match the original style (+50, +200, 5+, 10+)
  const formatDisplay = () => {
    if (targetValue.startsWith('+')) {
      return `+${count}`
    }
    return `${count}+`
  }

  return <div ref={ref}>{formatDisplay()}</div>
}

export default AnimatedCounter
