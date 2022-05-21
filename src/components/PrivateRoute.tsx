/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Custom404 from '../pages/404'

export default function PrivateRoute({ children, ...properties }: any) {
  const [isAuth, setIsAuth] = useState(false)
  const jwt = Cookies.get('user')
  const router = useRouter()
  useEffect(() => {
    jwt && setIsAuth(true)
    if (!jwt) router?.push('/')
  }, [])

  if (!isAuth) {
    return (
      <div className="h-full flex-grow min-h-[60vh] flex items-center justify-center">
        <Custom404 />
      </div>
    )
  }

  return (
    <div id="privateRoute" {...properties}>
      {children}
    </div>
  )
}
