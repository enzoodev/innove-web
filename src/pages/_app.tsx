import { Fragment, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'

import { TokenService } from '@/services/TokenService'
import { queryClient } from '@/services/queryClient'

import { AuthContextProvider } from '@/contexts/AuthContext'

import { Routes } from '@/enums/Routes'

import { PageLoading } from '@/components/elements/PageLoading'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const guestRoutes: Array<string> = [Routes.LOGIN, Routes.RECOVER_ACCOUNT]

    if (!guestRoutes.includes(router.pathname)) {
      const hasToken = TokenService.has()
      const isInAuthRoutes = router.pathname.includes('auth')

      if (!hasToken && !isInAuthRoutes) {
        router.push(Routes.LOGIN)
      }
    }
  }, [router])

  return (
    <Fragment>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        pauseOnHover
        draggable
        draggableDirection="x"
        closeOnClick
        transition={Slide}
        closeButton
      />
      <PageLoading />
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <div id="app" className={`${inter.className}`}>
            <Component {...pageProps} />
          </div>
        </AuthContextProvider>
      </QueryClientProvider>
    </Fragment>
  )
}

export default App
