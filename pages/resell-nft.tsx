import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { NFTContext } from '../context/NFTContext'
import { Button, Input } from '../components'
import { SkeletonResellNFTs } from '../components/Skeleton'

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext)
  const router = useRouter()
  const { tokenId, tokenURI } = router.query
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI as string)

    setPrice(data.price)
    setImage(data.image)
    setIsLoading(false)
  }

  useEffect(() => {
    if (tokenURI) fetchNFT()
  }, [tokenURI])

  const resell = async () => {
    await createSale(tokenURI as string, price, true, tokenId as string)

    router.push('/')
  }

  if (isLoading || isLoadingNFT) return <SkeletonResellNFTs />

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/4 md:w-full">
        <h1 className="font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white">
          Resell NFT
        </h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleInputChange={(e) => setPrice(e.target.value)}
        />

        {image && <img src={image} className="mt-4 rounded" width={350} />}

        <div className="mt-7 flex w-full justify-end">
          <Button
            btnName="List NFT"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  )
}

export default ResellNFT
