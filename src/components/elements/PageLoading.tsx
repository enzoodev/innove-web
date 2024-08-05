import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

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
  })

  return (
    <div
      className={[
        isLoading ? 'page-loading is--loading' : 'page-loading',
        'd-print-none',
      ].join(' ')}
    >
      <div>
        <span />
      </div>
    </div>
  )
}
