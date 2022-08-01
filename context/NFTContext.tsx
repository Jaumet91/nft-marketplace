import { useState, useEffect, createContext } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'
import { create as ipfsHttpClient, Options } from 'ipfs-http-client'

import { MarketAddress, MarketAddressABI } from './constants'
import { NextRouter } from 'next/router'

interface NFTContextProps {
  nftCurrency: string
  connectWallet: () => Promise<void>
  currentAccount: string
  uploadToIPFS: (file: File) => Promise<string | undefined>
  createNFT: (
    formInput: {
      price: string
      name: string
      description: string
    },
    fileUrl: string | undefined,
    router: NextRouter
  ) => Promise<void>
}

interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
}

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0' as Options)

const fetchContract = (signerOrProvider: ethers.providers.JsonRpcSigner) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider)

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

  const uploadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      return url
    } catch (error) {
      console.error('Error uploading file to IPFS.')
    }
  }

  const createNFT = async (
    formInput: {
      price: string
      name: string
      description: string
    },
    fileUrl: string | undefined,
    router: NextRouter
  ) => {
    const { name, description, price } = formInput
    // eslint-disable-next-line no-useless-return
    if (!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({ name, description, image: fileUrl })

    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`

      await createSale(url, price)
      router.push('/')
    } catch (error) {
      console.log(error)
      console.error('Error uploading file to IPFS.')
    }
  }

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling?,
    id?
  ) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // ether to wei
    const price = ethers.utils.parseUnits(formInputPrice, 'ether')
    const contract = fetchContract(signer)
    const listingPrice = await contract.getListingPrice()

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString()
    })

    await transaction.wait()
  }

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT
      }}>
      {children}
    </NFTContext.Provider>
  )
}
