import { useState, useEffect, createContext } from 'react'
import { NextRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'
import { create as ipfsHttpClient, Options } from 'ipfs-http-client'

import { NFTContextProps, props, items } from './interfaces'
import { MarketAddress, MarketAddressABI } from './constants'

type nft = {
  image: string
  tokenId: string
  name: string
  description: string
  owner: string
  price: string
  seller: string
}

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0' as Options)

const fetchContract = (
  signerOrProvider:
    | ethers.providers.JsonRpcSigner
    | ethers.providers.JsonRpcProvider
) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider)

export const NFTContext = createContext<NFTContextProps>({} as NFTContextProps)

export const NFTProvider = ({ children }: props) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [isLoadingNFT, setisLoadingNFT] = useState(false)
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
    isReselling?: boolean,
    id?: string
  ) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    // ether to wei
    const price = ethers.utils.parseUnits(formInputPrice, 'ether')
    const contract = fetchContract(signer)
    const listingPrice = await contract.getListingPrice()

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString()
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString()
        })

    setisLoadingNFT(true)
    await transaction.wait()
  }

  const fetchNFTs = async () => {
    setisLoadingNFT(false)

    const provider = new ethers.providers.JsonRpcProvider()
    const contract = fetchContract(provider)

    const data = await contract.fetchMarketItems()
    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: items) => {
          const tokenURI = await contract.tokenURI(tokenId)
          const {
            data: { image, name, description }
          } = await axios.get(tokenURI)

          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          )

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI
          }
        }
      )
    )
    return items
  }

  const fetchMyNFTsOrListedNFTs = async (type?: string) => {
    setisLoadingNFT(false)

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = fetchContract(signer)

    const data =
      type === 'fetchItemsListed'
        ? await contract.fetchItemsListed()
        : await contract.fetchMyNFTs()

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: items) => {
          const tokenURI = await contract.tokenURI(tokenId)
          const {
            data: { image, name, description }
          } = await axios.get(tokenURI)

          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          )

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI
          }
        }
      )
    )
    return items
  }

  const buyNFT = async (nft: nft) => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = fetchContract(signer)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')

    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price
    })

    setisLoadingNFT(true)
    await transaction.wait()
    setisLoadingNFT(false)
  }

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        isLoadingNFT
      }}>
      {children}
    </NFTContext.Provider>
  )
}
