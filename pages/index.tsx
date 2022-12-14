import { useState, useEffect, useRef, useContext } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import type { NextPage } from 'next'

import { NFTContext } from '../context/NFTContext'
import { Banner, CreatorCard, NFTCard, SearchBar } from '../components'
import images from '../assets'
// import { makeId } from '../utils/makeId'
import { SkeletonHome } from '../components/Skeleton'
import { getCreators } from '../utils/getTopCreators'
import { shortenAddresss } from '../utils/shortenAddress'

const Home: NextPage = () => {
  const { fetchNFTs } = useContext(NFTContext)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hideButtons, setHideButtons] = useState(false)
  const [nfts, setNfts] = useState<any[]>([])
  const [nftsCopy, setNftsCopy] = useState<any[]>([])
  const [activeSelect, setActiveSelect] = useState('Order by')
  const parentRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items)
      setNftsCopy(items)
      setMounted(true)
    })
  }, [])

  useEffect(() => {
    const sortedNfts = [...nfts]
    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price))
        break
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price))
        break
      case 'Recently listed':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId))
        break
      default:
        setNfts(nfts)
        break
    }
  }, [activeSelect])

  const onHandleSearch = (value: string) => {
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    )
    // eslint-disable-next-line no-unused-expressions
    filteredNfts.length ? setNfts(filteredNfts) : setNfts(nftsCopy)
  }

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy)
    }
  }

  const handleScroll = (direction: string) => {
    const { current } = scrollRef
    const scrollAmount = window.innerWidth > 1800 ? 270 : 210
    if (current) {
      switch (direction) {
        case 'left':
          current.scrollLeft -= scrollAmount
          break
        case 'right':
          current.scrollLeft += scrollAmount
          break
      }
    }
  }

  const isScrollable = () => {
    const { current } = scrollRef
    const { current: parent } = parentRef

    if (current && parent) {
      current?.scrollWidth >= parent?.offsetWidth
        ? setHideButtons(false)
        : setHideButtons(true)
    }
  }

  useEffect(() => {
    isScrollable()
    window.addEventListener('resize', isScrollable)

    return () => {
      window.removeEventListener('resize', isScrollable)
    }
  })

  const topCreators = getCreators(nftsCopy)

  if (!mounted) return <SkeletonHome />

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <Banner
          name={
            <>
              Discover, collect, and sell <br /> extraordinary NFTs
            </>
          }
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />

        {mounted && !nfts.length ? (
          <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
            That&apos;s weird... No NFTs for sale!
          </h1>
        ) : (
          <>
            <div>
              <h1 className="sx:ml-0 ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-4xl">
                Top Sellers
              </h1>
              <div
                className="relative mt-3 flex max-w-full flex-1"
                ref={parentRef}>
                <div
                  className="no-scrollbar flex w-max select-none flex-row overflow-scroll"
                  ref={scrollRef}>
                  {topCreators.map((creator, i) => (
                    <CreatorCard
                      key={creator.seller}
                      rank={i + 1}
                      creatorImage={
                        images[`creator${i + 1}` as keyof typeof images]
                      }
                      creatorName={shortenAddresss(creator.seller)}
                      creatorEths={creator.sum}
                    />
                  ))}
                  {/* {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}` as keyof typeof images]}
                  creatorName={`0x${makeId(3)}...${makeId(4)}`}
                  creatorEths={10 - i * 0.5}
                />
              ))} */}
                  {!hideButtons && (
                    <>
                      <div
                        onClick={() => handleScroll('left')}
                        className="absolute top-45 left-0 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                        <Image
                          src={images.left}
                          layout="fill"
                          objectFit="contain"
                          alt="left_arrow"
                          className={
                            theme === 'light' ? 'invert filter' : undefined
                          }
                        />
                      </div>
                      <div
                        onClick={() => handleScroll('right')}
                        className="absolute right-0 top-45 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12">
                        <Image
                          src={images.right}
                          layout="fill"
                          objectFit="contain"
                          alt="left_arrow"
                          className={
                            theme === 'light' ? 'invert filter' : undefined
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flexBetween mx-4 sm:flex-col sm:items-start xs:mx-0 minlg:mx-8">
                <h1 className="flex-1 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white sm:mb-4 minlg:text-4xl">
                  Hot NFTs
                </h1>
                <div className="flex flex-2 flex-row sm:w-full sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
                {nfts.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}

                {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  seller: `0x${makeId(3)}...${makeId(4)}`,
                  owner: `0x${makeId(3)}...${makeId(4)}`,
                  description: 'Cool NFT on Sale',
                  image: '',
                  price: (10 - i * 0.534).toFixed(2)
                }}
              />
            ))} */}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
