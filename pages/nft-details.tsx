import { useState, useEffect, useContext, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { NFTContext } from '../context/NFTContext'

import { NFTCard, Button, Modal, PaymentBodyCmp } from '../components'
import { SkeletonNFTDetails } from '../components/Skeleton'
import images from '../assets'
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

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [paymentModal, setPaymentModal] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [nft, setNft] = useState<nft>({
    image: '',
    tokenId: '',
    name: '',
    description: '',
    owner: '',
    price: '',
    seller: ''
  })
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) return

    setNft(router.query as SetStateAction<nft>)
    setIsLoading(false)
  }, [router.isReady])

  const checkout = async () => {
    await buyNFT(nft)
    setPaymentModal(false)
    setSuccessModal(true)
  }

  if (isLoading) return <SkeletonNFTDetails />

  return (
    <div className="relative flex min-h-screen justify-center md:flex-col">
      <div className="flexCenter relative flex-1 border-r border-nft-gray-1 p-12 dark:border-nft-black-1 md:border-r-0 md:border-b sm:px-4">
        <div className="relative h-557 w-557 sm:h-300 sm:w-full minmd:h-2/3 minmd:w-2/3">
          <Image
            src={nft.image}
            objectFit="cover"
            className="rounded-xl shadow-lg"
            layout="fill"
            priority
          />
        </div>
      </div>

      <div className="flex-1 justify-start p-12 sm:px-4 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-3xl">
            {nft.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="font-poppins text-xs font-normal text-nft-black-1 dark:text-white minlg:text-base">
            creator
          </p>
          <div className="mt-3 flex flex-row items-center">
            <div className="relative mr-2 h-12 w-12 minlg:h-20 minlg:w-20">
              <Image
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins text-xs font-semibold text-nft-black-1 dark:text-white minlg:text-base">
              {shortenAddresss(nft.seller)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="flex w-full flex-row border-b border-nft-gray-1 dark:border-nft-black-1">
            <p className="mb-2 font-poppins text-base font-medium text-nft-black-1 dark:text-white minlg:text-base">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins text-base font-normal text-nft-black-1 dark:text-white">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-row sm:flex-col">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="border border-gray-50 p-2 font-poppins text-base font-normal text-nft-black-1 dark:text-white">
              You cannot boy your own NFT
            </p>
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          )}
        </div>
      </div>

      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName="Checkout"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />
              <Button
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Succesful"
          body={
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}>
              <div className="relative h-52 w-52">
                <Image
                  src={nft.image}
                  objectFit="cover"
                  layout="fill"
                  priority
                />
              </div>
              <p className="mt-10 font-poppins text-sm font-normal text-nft-black-1 dark:text-white minlg:text-xl">
                You successfully purchased
                <span className="font-semibold">{` ${nft.name} `}</span>
                from
                <span className="font-semibold">
                  {` ${shortenAddresss(nft.seller)} `}
                </span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
          }
          handleClose={() => setPaymentModal(false)}
        />
      )}
    </div>
  )
}

export default NFTDetails
