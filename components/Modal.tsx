import { useRef } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

import images from '../assets'

export const Modal = () => {
  const modalRef = useRef(null)
  const { theme } = useTheme()

  return (
    <div className="flexCenter animated fadeIn fixed inset-0 z-10 bg-overlay-black">
      <div
        ref={modalRef}
        className="flex w-2/5 flex-col rounded-lg bg-white dark:bg-nft-dark md:w-11/12 minlg:w-2/4">
        <div className="mt-4 mr-4 flex justify-end minlg:mt-6 minlg:mr-6">
          <div
            className="relative h-3 w-3 cursor-pointer minlg:h-6 minlg:w-6"
            onClick={() => {}}>
            <Image
              src={images.cross}
              layout="fill"
              className={`cursor-pointer ${
                theme === 'light' ? ' invert filter' : undefined
              }`}
            />
          </div>
        </div>

        <div className="flexCenter w-full p-4 text-center">
          <h2 className="font-poppins text-2xl font-normal text-nft-black-1 dark:text-white">
            Header Title
          </h2>
        </div>
        <div className="border-t border-b border-nft-gray-1 p-10 dark:border-nft-black-3 sm:px-4">
          Body
        </div>
        <div className="flexCenter p-4">Footer</div>
      </div>
    </div>
  )
}
