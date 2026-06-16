import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '@styles/main.css'
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import '@styles/base.css'
import '@styles/components.css'
import '@styles/utilities.css'
import Head from '@components/common/head'
import ListProvider from '@components/ListProvider'
import UIProvider from '@components/UIProvider'
import * as gtag from '@lib/gtag'

function RouteLoading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => setLoading(true)
    const done = () => setLoading(false)
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
  }, [router.events])

  return (
    <div
      className="route-loading-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        background: 'var(--accent)',
        zIndex: 9999,
        transition: 'width 0.3s ease, opacity 0.3s ease',
        width: loading ? '80%' : '0%',
        opacity: loading ? 1 : 0,
      }}
    />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <UIProvider>
      <ListProvider>
        <RouteLoading />
        <Head />
        <Component {...pageProps} />
      </ListProvider>
    </UIProvider>
  )
}

export default MyApp
