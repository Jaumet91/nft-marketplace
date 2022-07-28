import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../assets'
import { Button } from './'
import { SkeletonFooter } from './Skeleton'

type Props = {}

export const Footer = (props: Props) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <SkeletonFooter />

  return (
    <footer className="flexCenter bordet-t flex-col border-nft-gray-1 py-16 dark:border-nft-black-1 sm:py-8">
      <div className="flexCenter mt-5 w-full border-t border-nft-gray-1 px-16 dark:border-nft-black-1 sm:px-4">
        <div className="flexBetween mt-7 w-full flex-row sm:flex-col minmd:w-4/5">
          <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
            CryptoHue, Inc. All Rights Reserved
          </p>
          {[
            images.instagram,
            images.twitter,
            images.telegram,
            images.discord
          ].map((image, i) => (
            <div key={i} className="mx-2 cursor-pointer">
              <Image
                src={image}
                objectFit="contain"
                width={24}
                height={24}
                alt="social"
                className={theme === 'light' ? ' invert filter' : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
