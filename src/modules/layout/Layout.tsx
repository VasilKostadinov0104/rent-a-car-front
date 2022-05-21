import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import HeaderContainer from './Header/HeaderContainer'

export default function Layout({ Component, pageProps, links }: any) {
  const router = useRouter()
  const [toastTheme, setToastTheme] = useState('light')
  useEffect(() => {
    function listner() {
      const theme = localStorage.getItem('theme')
      setToastTheme(theme)
    }
    window.addEventListener('storage', listner)

    return () => window.removeEventListener('storage', listner)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          key={router.route.concat(animation.name) + Math.random()}
          // @ts-ignore
          variants={animation.variants}
          // @ts-ignore
          transition={animation.transition}
          initial="initial"
          animate="animate"
          exit="exit"
          id="layout"
          className="flex flex-col min-h-[100vh]"
        >
          <HeaderContainer />
          <m.main
            key={router.route.concat(animation.name) + 'main'}
            variants={slideup.variants}
            transition={slideup.transition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-[calc(100vh-50px)] border-t flex flex-col"
          >
            <Component {...pageProps} />
          </m.main>

          <ToastContainer
            theme={
              toastTheme == 'light'
                ? 'light'
                : toastTheme == 'dark'
                ? 'dark'
                : null
            }
          />
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  )
}

const animation = {
  name: 'fadeIn',
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  transition: {
    duration: 0.3,
  },
}
const slideup = {
  name: 'slideup',
  variants: {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  },
  transition: {
    duration: 0.5,
  },
}
