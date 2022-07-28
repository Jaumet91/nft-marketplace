import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../../assets'
import { Button } from '..'
import { SkeletonFooter } from '../Skeleton'
import { FooterLinks } from './'

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
      <div className=" sm:py- flex w-full flex-row px-16 md:flex-col sm:px-4 minmd:w-4/5">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">
              CryptoHue
            </p>
          </div>
          <p className="mt-6 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
            Get the latest Updates
          </p>
          <div className="flexBetween mt-6 w-357 rounded-md border border-nft-gray-2 bg-white dark:border-nft-black-2 dark:bg-nft-black-2 md:w-full minlg:w-557">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full w-full flex-1 rounded-md bg-white px-4 text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white minlg:text-lg"
            />
            <div className="flex-initial">
              <Button
                btnName="Email me"
                classStyles="rounded-md"
                handleClick={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="flexBetweenStart ml-10 flex-1 flex-wrap md:ml-0 md:mt-8">
          <FooterLinks
            heading="CryptoHue"
            items={['Explore', 'How it Works', 'Contact Us']}
          />
          <FooterLinks
            heading="Support"
            items={[
              'Help Center',
              'Terms of Service',
              'Legal',
              'Privacy Policy'
            ]}
          />
        </div>
      </div>

      <div className="flexCenter mt-5 w-full border-t border-nft-gray-1 px-16 dark:border-nft-black-1 sm:px-4">
        <div className="flexBetween mt-7 w-full flex-row sm:flex-col minmd:w-4/5">
          <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
            CryptoHue, Inc. All Rights Reserved
          </p>
          <div className="flex flex-row sm:mt-4">
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
      </div>
    </footer>
  )
}
