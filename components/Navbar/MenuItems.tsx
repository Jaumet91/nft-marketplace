import { Dispatch, SetStateAction } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

type Props = {
  isMobile?: boolean
  active: string
  setActive: Dispatch<SetStateAction<string>>
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

export const MenuItems = ({
  isMobile,
  active,
  setActive,
  setIsOpen
}: Props) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return '/'
      case 1:
        return '/listed-nfts'
      case 2:
        return '/my-nfts'
      default:
        return '/'
    }
  }

  return (
    <ul
      className={`flexCenter list-none flex-row ${
        isMobile && 'h-full flex-col'
      }`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item)
            if (isMobile && setIsOpen !== undefined) setIsOpen(false)
          }}
          className={`mx-3 flex flex-row items-center font-poppins text-base font-semibold hover:text-nft-dark dark:hover:text-white ${
            active === item
              ? 'text-nft-black-1 dark:text-white'
              : 'text-nft-gray-2 dark:text-nft-gray-3'
          }`}>
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  )
}

MenuItems.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired
}
