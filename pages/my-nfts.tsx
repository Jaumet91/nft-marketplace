import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { NFTContext } from '../context/NFTContext'

import { NFTCard, Banner } from '../components'
import { SkeletonMyNFTs } from '../components/Skeleton'
import images from '../assets'
import { shortenAddresss } from '../utils/shortenAddress'

const myNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext)
  const [nfts, setNfts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (isLoading) {
    return <SkeletonMyNFTs />
  }

  return (
    <div className="min-h-screen w-full flex-col items-center justify-start">
      <div className="flexCenter w-full flex-col">
        <Banner
          name="Your Nifty NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center w-full"
        />
        <div className="flexCenter z-0 -mt-20 flex-col">
          <div className="flexCenter h-40 w-40 rounded-full bg-nft-black-2 p-1 sm:h-36 sm:w-36">
            <Image
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="mt-6 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white">
            {shortenAddresss(currentAccount)}
          </p>
        </div>
      </div>
      {!isLoading && !nfts.length ? (
        <div className="flexCenter p-16 sm:p-4">
          <h1 className="font-poppins text-3xl font-extrabold text-nft-black-1 dark:text-white">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="flexCenter w-full flex-col p-12 sm:px-4 minmd:w-4/5">
          <div className="flex w-full flex-1 flex-row px-4 sm:flex-col sm:px-0 minlg:px-8">
            SearchBar
          </div>
          <div className="mt-3 flex w-full flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default myNFTs
