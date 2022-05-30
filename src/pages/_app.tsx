import { cron } from '@utils/cron'
import { DBManager } from '@utils/DBManager'
import type { AppProps } from 'next/app'
import Head from 'next/dist/shared/lib/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import Layout from '../modules/layout/Layout'
import '../styles/globals.css'
import '../styles/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const db = new DBManager()
  const [cronUpdateCounter, setCronUpdateCounter] = useState(0)
  useEffect(() => {
    cron(db)
    //every 60 seconds the cron scasns for updates in db, it also updates the state
    const timeout = setInterval(
      () => cron(db).then(() => setCronUpdateCounter((ps) => ps++)),
      60000
    )

    return () => clearInterval(timeout)
  }, [])

  return (
    <>
      <Head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Layout Component={Component} key={cronUpdateCounter} />
      <ToastContainer />
    </>
  )
}

export default MyApp
