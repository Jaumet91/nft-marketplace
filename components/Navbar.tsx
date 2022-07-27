import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import images from '../assets'

type Props = {}

export const Navbar = (props: Props) => {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flexBetween fixed z-10 w-full flex-row border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter cursor-pointer md:hidden"
            onClick={() => {}}
          >
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
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
    </nav>
  )
}
