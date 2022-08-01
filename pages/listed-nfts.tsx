import { useState, useEffect, useContext } from 'react'

import { NFTContext } from '../context/NFTContext'
import { NFTCard } from '../components'
import { SkeletonListedNFTs } from '../components/Skeleton'

const ListedNFTs = () => {
  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext)
  const [nfts, setNfts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchItemsListed').then((items) => {
      setNfts(items)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <SkeletonListedNFTs />
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter min-h-screen p-16 sm:p-4">
        <h1 className="font-poppins text-3xl font-extrabold text-nft-black-1 dark:text-white">
          No NFTs Listed for Sale
        </h1>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white sm:ml-2">
            NFTs Listed for Sale
          </h2>
          <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListedNFTs
