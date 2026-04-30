'use client'

import { useEffect } from 'react'

export default function WebVitalsReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const report = (metric: { name: string; value: number; rating: string }) => {
        console.log(`[web-vitals] ${metric.name}:`, metric.value.toFixed(2), `(${metric.rating})`)
      }
      onCLS(report)
      onFCP(report)
      onINP(report)
      onLCP(report)
      onTTFB(report)
    })
  }, [])

  return null
}
