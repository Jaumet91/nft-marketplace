import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../assets'

type Props = {
  activeSelect: string
  setActiveSelect: Dispatch<SetStateAction<string>>
  handleSearch: (value: string) => void
  clearSearch: () => void
}

export const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch
}: Props) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState(search)
  const [toggle, setToggle] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch)
    }, 1000)

    return () => clearTimeout(timer)
  }, [debouncedSearch])

  useEffect(() => {
    search ? handleSearch(search) : clearSearch()
  }, [search])

  return (
    <>
      <div className="flexCenter flex-1 rounded-md border border-nft-gray-2 bg-white px-4 py-3 dark:border-nft-black-2 dark:bg-nft-black-2">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === 'light' ? 'invert filter' : undefined}
        />
        <input
          type="text"
          placeholder="Search NFT here..."
          className="mx-4 w-full bg-white text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle((prevToggle) => !prevToggle)}
        className="flexBetween relative ml-4 min-w-190 cursor-pointer rounded-md border border-nft-gray-2 bg-white px-4 py-3 dark:border-nft-black-2 dark:bg-nft-black-2 sm:ml-0 sm:mt-2">
        <p className="font-poppins text-xs font-normal text-nft-black-1 dark:text-white">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === 'light' ? 'invert filter' : undefined}
        />
        {toggle && (
          <div className="absolute top-full left-0 right-0 z-10 mt-3 w-full rounded-md border-nft-gray-2 bg-white px-4 py-3 dark:border-nft-black-2 dark:bg-nft-black-2">
            {[
              'Recently listed',
              'Price (low to high)',
              'Price (high to low)'
            ].map((item) => (
              <p
                key={item}
                className="my-3 cursor-pointer font-poppins text-xs font-normal text-nft-black-1 dark:text-white"
                onClick={() => setActiveSelect(item)}>
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
