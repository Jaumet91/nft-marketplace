import { useState, useEffect, useContext } from 'react'

import { NFTContext } from '../context/NFTContext'
import { NFTCard } from '../components'
import { SkeletonListedNFTs } from '../components/Skeleton'

const ListedNFTs = () => {
  const [nfts, setNfts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (isLoading) {
    return <SkeletonListedNFTs />
  }

  // if (!isLoading && nfts.length === 0) {
  //   return (
  //     <div className="flexCenter min-h-screen p-16 sm:p-4">
  //       <h1 className="font-poppins text-3xl font-extrabold text-nft-black-1 dark:text-white">
  //         No NFTs Listed for Sale
  //       </h1>
  //     </div>
  //   )
  // }

  return (
    <div className="flex min-h-screen justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="font-poppins text-3xl font-extrabold text-nft-black-1 dark:text-white">
            NFTs Listed for Sale
          </h2>
        </div>
      </div>
    </div>
  )
}

export default ListedNFTs
