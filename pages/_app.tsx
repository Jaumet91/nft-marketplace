import Script from 'next/script'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

import { NFTProvider } from '../context/NFTContext'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="min-h-screen bg-white dark:bg-nft-dark">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
      <Script
        src="https://kit.fontawesome.com/ab656263f4.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  </NFTProvider>
)

export default MyApp
