import Image from 'next/image'
import { shortenAddresss } from '../utils/shortenAddress'

type nft = {
  image: string
  tokenId: string
  name: string
  description: string
  owner: string
  price: string
  seller: string
}

type Props = {
  nft: nft
  nftCurrency: string
}

export const PaymentBodyCmp = ({ nft, nftCurrency }: Props) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
        Item
      </p>
      <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
        Subtotal
      </p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flexStartCenter flex-1">
        <div className="relative h-28 w-28">
          <Image src={nft.image} layout="fill" priority objectFit="cover" />
        </div>
        <div className="flexCenterStart ml-5 flex-col">
          <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
            {shortenAddresss(nft.seller)}
          </p>
          <p className="font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl">
            {nft.name}
          </p>
        </div>
      </div>

      <div>
        <p className="font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins text-base font-normal text-nft-black-1 dark:text-white minlg:text-xl">
        Total
      </p>
      <p className="font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
        {nft.price} <span className="font-semibold">{nftCurrency}</span>
      </p>
    </div>
  </div>
)
