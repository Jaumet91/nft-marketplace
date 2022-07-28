import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type { NextPage } from 'next'

import { Banner, CreatorCard } from '../components'
import images from '../assets'
import { makeId } from '../utils/makeId'
import { SkeletonHome } from '../components/Skeleton'

const Home: NextPage = () => {
  const { theme } = useTheme()
  const parentRef = useRef(null)
  const scrollRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <SkeletonHome />

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          name="Discover, collect, and sell extraordinary NFTs"
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />
        <div>
          <h1 className="sx:ml-0 ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-4xl">
            Best Creators
          </h1>
          <div className="relative mt-3 flex max-w-full flex-1" ref={parentRef}>
            <div
              className="no-scrollbar flex w-max select-none flex-row overflow-scroll"
              ref={scrollRef}>
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}` as keyof typeof images]}
                  creatorName={`0x${makeId(3)}...${makeId(3)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              <div
                onClick={() => {}}
                className="absolute top-45 left-0 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                <Image
                  src={images.left}
                  layout="fill"
                  objectFit="contain"
                  alt="left_arrow"
                  className={theme === 'light' ? 'invert filter' : undefined}
                />
              </div>
              <div
                onClick={() => {}}
                className="absolute right-0 top-45 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                <Image
                  src={images.right}
                  layout="fill"
                  objectFit="contain"
                  alt="left_arrow"
                  className={theme === 'light' ? 'invert filter' : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
