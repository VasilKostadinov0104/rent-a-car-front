/* eslint-disable react-hooks/exhaustive-deps */
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function PublicComponent({ children }: any) {
  const [isAuth, setIsAuth] = useState(false)
  const jwt = Cookies.get('user')

  useEffect(() => {
    jwt && setIsAuth(true)
  }, [])

  if (isAuth) {
    return null
  }

  return children
}
