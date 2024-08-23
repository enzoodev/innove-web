import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const PageLoading: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setProgress(30)
        timeout = setTimeout(() => setProgress(60), 200)
      }
    }

    const handleComplete = () => {
      setProgress(100)
      timeout = setTimeout(() => setProgress(0), 300)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      clearTimeout(timeout)
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-cyan-800 transition-all duration-200 ease-out"
      style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
    />
  )
}
