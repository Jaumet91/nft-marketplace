export const SkeletonNFTDetails = () => {
  return (
    <div className="relative flex min-h-screen justify-center md:flex-col">
      <div className="flexCenter relative flex-1 border-r border-nft-gray-1 p-12 dark:border-nft-black-1 md:border-r-0 md:border-b sm:px-4">
        <div className="relative flex h-557 w-557 animate-pulse items-center justify-center rounded-xl bg-gray-300 dark:bg-slate-700 sm:h-300 sm:w-full minmd:h-2/3 minmd:w-2/3">
          <svg
            className="h-12 w-12 text-gray-400 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512">
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 justify-start p-12 sm:px-4 sm:pb-4">
        <div className="flex-col">
          <div className="mt-2 h-4 w-72 rounded-full bg-gray-200 dark:bg-slate-600"></div>
          <div className="mt-10 flex items-center">
            <svg
              className="h-14 w-14 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"></path>
            </svg>
            <div>
              <div className="mb-2 h-2.5 w-32 rounded-full bg-gray-300 dark:bg-slate-700"></div>
              <div className="h-2 w-28 rounded-full bg-gray-300 dark:bg-slate-700"></div>
            </div>
          </div>
          <div className="mt-10 h-2 w-40 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-80 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-48 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-80 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-48 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mt-2 h-2 w-96 rounded-full bg-gray-300 dark:bg-slate-700"></div>
          <div className="mr-2 mt-8 flex h-9 w-44 animate-pulse cursor-pointer rounded-xl bg-gray-300 dark:bg-slate-700 md:w-full"></div>
        </div>
      </div>
    </div>
  )
}
