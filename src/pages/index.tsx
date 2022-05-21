/* eslint-disable react-hooks/exhaustive-deps */
import { RentACarApp } from '@appTypes/app'
import { DBManager } from '@utils/DBManager'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const { replace, isReady } = useRouter()
  useEffect(() => {
    replace('/vehicles')
  }, [isReady])

  return <div>redirecting</div>
}
export default Home
