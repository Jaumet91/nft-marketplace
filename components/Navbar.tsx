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
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b bg-white dark:bg-nft-dark border-nft-gray-1 dark:border-nft-black-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div>
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
