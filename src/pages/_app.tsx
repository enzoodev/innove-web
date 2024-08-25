import { Fragment } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slide, ToastContainer } from 'react-toastify'

import { queryClient } from '@/services/queryClient'

import { AuthContextProvider } from '@/contexts/AuthContext'

import { PageLoading } from '@/components/elements/PageLoading'

import 'react-toastify/dist/ReactToastify.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
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
