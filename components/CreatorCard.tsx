import { useContext } from 'react'
import PropTypes from 'prop-types'
import Image, { StaticImageData } from 'next/image'

import { NFTContext } from '../context/NFTContext'
import images from '../assets'

type Props = {
  rank: number
  creatorImage: StaticImageData
  creatorName: string
  creatorEths: number
}

export const CreatorCard = ({
  rank,
  creatorImage,
  creatorName,
  creatorEths
}: Props) => {
  const { nftCurrency } = useContext(NFTContext)

  return (
    <div className="m-4 flex min-w-190 flex-col rounded-3xl border border-nft-gray-1 bg-white p-4 dark:border-nft-black-3 dark:bg-nft-black-3 minlg:min-w-240">
      <div className="flexCenter bottom-2 -right-0 h-8 w-8 rounded-full bg-nft-red-violet minlg:h-10 minlg:w-10 ">
        <p className="font-poppins text-base font-semibold text-white minlg:text-lg">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative h-20 w-20 minlg:h-28 minlg:w-28">
          <Image
            src={creatorImage}
            layout="fill"
            objectFit="cover"
            alt="creatorName"
            className="rounded-full"
          />
          <div className="absolute bottom-2 -right-0 h-4 w-4 minlg:h-7 minlg:w-7">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>

      <div className="flexCenter mt-3 flex-col text-center minlg:mt-7">
        <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
          {creatorName}
        </p>
        <p className="mt-1 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
          {creatorEths.toFixed(2)}{' '}
          <span className="font-normal">{nftCurrency}</span>
        </p>
      </div>
    </div>
  )
}

CreatorCard.propTypes = {
  rank: PropTypes.number.isRequired,
  creatorImage: PropTypes.object.isRequired,
  creatorName: PropTypes.string.isRequired,
  creatorEths: PropTypes.number.isRequired
}
