import '@/styles/globals.scss'
import '@/styles/shadcn.css'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '@/layouts'
import type { AppProps } from 'next/app'

type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const Toaster = dynamic(() => import('react-hot-toast').then((mod) => mod.Toaster), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  return (
    <>
      <Toaster position="top-center" containerStyle={{ top: 100 }} />
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
