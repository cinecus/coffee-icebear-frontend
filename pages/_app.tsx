import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { Provider } from 'react-redux';
import store from '../store/store';
import { SessionProvider, useSession, signIn } from 'next-auth/react';

function MyApp({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return <Provider store={store}>
    <SessionProvider session={session}>
{Component.auth ? (
  <Auth>
    <Layout>
  <Component {...pageProps} />
  </Layout>
  </Auth>
) : (
  <Layout>
  <Component {...pageProps} />
  </Layout>
)}
</SessionProvider>
  
  </Provider>
}

export default MyApp


function Auth({ children }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === "loading") return
    if (!isUser) signIn()
  }, [isUser, status])

  if (isUser) {
    return children
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}