import { NextRouter } from 'next/router'

type nft = {
  image: string
  tokenId: string
  name: string
  description: string
  owner: string
  price: string
  seller: string
}

export interface NFTContextProps {
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
  fetchNFTs: () => Promise<any[]>
  fetchMyNFTsOrListedNFTs: (type?: string) => Promise<any[]>
  buyNFT: (nft: nft) => Promise<void>
  createSale: (
    url: string,
    formInputPrice: string,
    isReselling?: boolean,
    id?: string
  ) => Promise<void>
}

export interface props {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
}

export interface items {
  tokenId: any
  seller: string
  owner: string
  price: number
}
