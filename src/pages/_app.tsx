import type { AppProps } from 'next/app'
import Head from 'next/dist/shared/lib/head'
import { useRouter } from 'next/router'

import 'react-toastify/dist/ReactToastify.css'

import Layout from '../modules/layout/Layout'
import '../styles/globals.css'
import '../styles/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Layout Component={Component} />
    </>
  )
}

export default MyApp
