import { Fragment, useEffect, useRef } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'

import { AuthContextProvider } from '@/contexts/AuthContext'
import { Routes } from '@/enums/Routes'
import { TokenRepository } from '@/repositories/TokenRepository'
import { queryClient } from '@/services/queryClient'

import { PageLoading } from '@/components/elements/PageLoading'

import '@/styles/globals.css'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const auth = useRef(true)

  useEffect(() => {
    const guestRoutes: Array<string> = [Routes.LOGIN, Routes.RECOVER_ACCOUNT]

    if (!guestRoutes.includes(router.pathname)) {
      const token = TokenRepository.get()

      const isValidToken = !token || token === ''
      const isLogged = !router.pathname.includes('auth')

      if (isValidToken && isLogged) {
        router.push('/auth/signin')
        auth.current = false
      }
    }
  }, [router])

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
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
          </Head>
          <Component {...pageProps} />
        </QueryClientProvider>
      </AuthContextProvider>
    </Fragment>
  )
}

export default App
