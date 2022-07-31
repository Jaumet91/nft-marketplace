import { useState, useEffect, createContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'

import { MarketAddress, MarketAddressABI } from './constants'

interface NFTContextProps {
  nftCurrency: string
}

export const NFTContext = createContext<NFTContextProps>({} as NFTContextProps)

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
}

export const NFTProvider = ({ children }: props) => {
  const nftCurrency = 'ETH'
  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  )
}
