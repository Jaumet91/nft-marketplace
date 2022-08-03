import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import images from '../../assets'
import { MenuItems, ButtonGroup } from './'
import { SkeletonNavbar } from '../Skeleton'

const checkActive = (
  active: string,
  setActive: Dispatch<SetStateAction<string>>,
  router: NextRouter
) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') {
        setActive('Explore NFTs')
      }
      break
    case '/listed-nfts':
      if (active !== 'Listed NFTs') {
        setActive('Listed NFTs')
      }
      break
    case '/my-nfts':
      if (active !== 'My NFTs') {
        setActive('My NFTs')
      }
      break
    case '/create-nft':
      break
    default:
      setActive('')
  }
}

export const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState('Explore NFTs')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTheme('dark')
    setMounted(true)
  }, [])

  useEffect(() => {
    checkActive(active, setActive, router)
  }, [router.pathname])

  if (!mounted) return <SkeletonNavbar />

  return (
    <nav className="flexBetween fixed z-10 w-full flex-row border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div
            className="flexCenter cursor-pointer md:hidden"
            onClick={() => setActive('Explore NFTs')}>
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
          <div
            className="hidden md:flex"
            onClick={() => {
              setActive('Explore NFTs')
              setIsOpen(false)
            }}>
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

      <div className="flex flex-initial flex-row justify-end">
        <div className="mr-2 flex items-center">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween label relative h-4 w-8 cursor-pointer rounded-2xl bg-black p-1">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="ball absolute h-3 w-3 rounded-full bg-white" />
          </label>
        </div>
      </div>

      <div className="flex md:hidden">
        <MenuItems active={active} setActive={setActive} />
        <div className="ml-4">
          <ButtonGroup setActive={setActive} router={router} />
        </div>
      </div>

      <div className="ml-2 hidden md:flex">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit="contain"
            width={20}
            height={20}
            alt="cross"
            onClick={() => setIsOpen(false)}
            className={`cursor-pointer ${
              theme === 'light' ? ' invert filter' : undefined
            }`}
          />
        ) : (
          <Image
            src={images.menu}
            objectFit="contain"
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(true)}
            className={`cursor-pointer ${
              theme === 'light' ? 'invert filter' : undefined
            }`}
          />
        )}
        {isOpen && (
          <div className="nav-h fixed inset-0 top-65 z-10 flex animate-slide-in flex-col justify-between bg-white dark:bg-nft-dark">
            <div className="flex-1 p-4">
              <MenuItems
                isMobile
                active={active}
                setActive={setActive}
                setIsOpen={setIsOpen}
              />
            </div>
            <div className="border-t border-nft-gray-1 p-4 dark:border-nft-black-1">
              <ButtonGroup
                setActive={setActive}
                router={router}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
