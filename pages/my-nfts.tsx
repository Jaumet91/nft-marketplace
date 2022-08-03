import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'

import { NFTContext } from '../context/NFTContext'
import { NFTCard, Banner, SearchBar } from '../components'
import { SkeletonMyNFTs } from '../components/Skeleton'
import images from '../assets'
import { shortenAddresss } from '../utils/shortenAddress'

const myNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext)
  const [nfts, setNfts] = useState<any[]>([])
  const [nftsCopy, setNftsCopy] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeSelect, setActiveSelect] = useState<string>('Order by')

  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items) => {
      setNfts(items)
      setNftsCopy(items)
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    const sortedNfts = [...nfts]
    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price))
        break
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price))
        break
      case 'Recently listed':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId))
        break
      default:
        setNfts(nfts)
        break
    }
  }, [activeSelect])

  const onHandleSearch = (value: string) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    )
    // eslint-disable-next-line no-unused-expressions
    filteredNfts.length ? setNfts(filteredNfts) : setNfts(nftsCopy)
  }

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy)
    }
  }

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
      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className="flexCenter p-16 sm:p-4">
          <h1 className="font-poppins text-3xl font-extrabold text-nft-black-1 dark:text-white">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="flexCenter w-full flex-col p-12 sm:px-4 minmd:w-4/5">
          <div className="flex w-full flex-1 flex-row px-4 sm:flex-col sm:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 flex w-full flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default myNFTs
