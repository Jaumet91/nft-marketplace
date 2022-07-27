import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { Navbar, Footer } from '../components'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
    <Script
      src="https://kit.fontawesome.com/ab656263f4.js"
      crossOrigin="anonymous"
    />
  </ThemeProvider>
)

export default MyApp
