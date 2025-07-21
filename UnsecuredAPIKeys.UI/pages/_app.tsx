import type { AppProps } from 'next/app'
import * as Sentry from "@sentry/nextjs"
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import { trackPageView } from '@/utils/analytics'
import "@/styles/globals.css"

const ClientProvider = dynamic(() => import("@/components/ClientProvider"), {
  ssr: false
})

// Initialize Sentry
Sentry.init({
  dsn: "https://b5212b9f779f5e18eacc275eb8cb889a@o4508716166152192.ingest.us.sentry.io/4509237282930688",
  sendDefaultPii: true,
  integrations: [],
  tracePropagationTargets: [
    "https://api.unsecuredapikeys.com",
    "https://unsecuredapikeys.com",
  ],
  // Session Replay
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.0,
})

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    console.log('[GA] Initializing page tracking system')
    
    // Track initial page view
    const handleRouteChange = (url: string) => {
      console.log(`[GA] Route changed to: ${url}`)
      trackPageView(url)
    }

    // Track the current page on mount
    console.log(`[GA] Tracking initial page: ${router.asPath}`)
    handleRouteChange(router.asPath)

    // Track route changes
    router.events.on('routeChangeComplete', handleRouteChange)
    console.log('[GA] Route change listener attached')

    // Cleanup function to remove event listener
    return () => {
      console.log('[GA] Cleaning up route change listener')
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, router.asPath])

  return (
    <ErrorBoundary>
      <ClientProvider>
        <Component {...pageProps} />
      </ClientProvider>
    </ErrorBoundary>
  )
}

export default MyApp
