import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const PageLoading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: unknown) => {
      if (url !== router.asPath) {
        setIsLoading(true)
      }
    }

    const handleComplete = (url: unknown) => {
      if (url === router.asPath) {
        setIsLoading(false)
      }
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  if (!isLoading) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white py-3 px-5 rounded-full border border-gray-300">
      <div className="w-3 h-3 bg-cyan-800 rounded-full animate-blink-1"></div>
      <div className="w-3 h-3 bg-cyan-800 rounded-full animate-blink-2"></div>
      <div className="w-3 h-3 bg-cyan-800 rounded-full animate-blink-3"></div>
      <div className="w-3 h-3 bg-cyan-800 rounded-full animate-blink-4"></div>
    </div>
  )
}
