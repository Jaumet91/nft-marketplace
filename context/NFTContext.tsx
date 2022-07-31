import { useState, useEffect, createContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'

import { MarketAddress, MarketAddressABI } from './constants'

interface NFTContextProps {
  nftCurrency: string
  connectWallet: () => Promise<void>
  currentAccount: string
}

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
}

export const NFTContext = createContext<NFTContextProps>({} as NFTContextProps)

export const NFTProvider = ({ children }: props) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const nftCurrency = 'ETH'

  const checkItWalletIsConnected = async () => {
    // Metamask injects ethereum object
    if (!window.ethereum) return alert('Please install Metamask.')
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })

    accounts.length
      ? setCurrentAccount(accounts[0])
      : console.log('No accounts found.')
  }

  useEffect(() => {
    checkItWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install Metamask.')
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    setCurrentAccount(accounts[0])
    window.location.reload()
  }

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  )
}
