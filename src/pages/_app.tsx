import { Fragment, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'

import { AuthContextProvider } from '@/contexts/AuthContext'
import { Routes } from '@/enums/Routes'
import { TokenRepository } from '@/infrastructure/repositories/TokenRepository'
import { queryClient } from '@/infrastructure/services/queryClient'
import { Inter } from 'next/font/google'

import { PageLoading } from '@/components/elements/PageLoading'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const auth = useRef(true)

  // useEffect(() => {
  //   const guestRoutes: Array<string> = [Routes.LOGIN, Routes.RECOVER_ACCOUNT]

  //   if (!guestRoutes.includes(router.pathname)) {
  //     const token = TokenRepository.get()
  //     const isLogged = !router.pathname.includes('auth')

  //     if (!token && isLogged) {
  //       router.push(Routes.LOGIN)
  //       auth.current = false
  //     }
  //   }
  // }, [router])

  return (
    <Fragment>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        pauseOnHover={true}
        draggable={true}
        draggableDirection="x"
        closeOnClick={true}
        transition={Slide}
        closeButton={false}
        icon={false}
        hideProgressBar={true}
        style={{ zIndex: 9999 }}
        className={'d-print-none'}
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
