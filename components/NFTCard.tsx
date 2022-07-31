import { useContext } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Link from 'next/link'

import images from '../assets'
import { NFTContext } from '../context/NFTContext'

type Props = {
  nft: {
    i: number
    name: string
    seller: string
    owner: string
    description: string
    image: any // TODO: Change in the future
    price: string // TODO: Change in the future
  }
}

export const NFTCard = ({ nft }: Props) => {
  const { nftCurrency } = useContext(NFTContext)

  return (
    <Link href={{ pathname: '/nft-details', query: nft }}>
      <div className="m-4 min-w-215 max-w-max flex-1 cursor-pointer rounded-2xl bg-white p-4 shadow-md dark:bg-nft-black-3 sm:my-2 sm:mx-2 sm:w-full sm:min-w-155 xs:max-w-none minmd:min-w-256 minlg:m-8 minlg:min-w-327">
        <div className="relative h-52 w-full overflow-hidden rounded-2xl sm:h-36 xs:h-56 minmd:h-60 minlg:h-300">
          <Image
            src={nft.image || images[`nft${nft.i}` as keyof typeof images]}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 flex-row xs:mt-3 xs:flex-col xs:items-start minlg:mt-3">
            <p className="font-poppins text-xs font-semibold text-nft-black-1 dark:text-white minlg:text-lg">
              {nft.price} <span className="normal">{nftCurrency}</span>
            </p>
            <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-lg">
              {nft.seller}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

NFTCard.propTypes = {
  nft: PropTypes.object.isRequired
}
