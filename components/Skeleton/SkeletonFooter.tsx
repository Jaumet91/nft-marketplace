export const SkeletonFooter = () => {
  return (
    <footer className="flexCenter bordet-t w-screen flex-col justify-between py-16 sm:py-8">
      <div className="flex w-full flex-row px-16 md:flex-col sm:px-4 minmd:w-4/5">
        <div className="flexStart flex-1 animate-pulse flex-col">
          <div className="flex items-center">
            <div className="flex h-8 w-8 cursor-pointer rounded-lg bg-gray-300 dark:bg-slate-700"></div>
            <div className="ml-1 flex h-2.5 w-24 cursor-pointer rounded-lg bg-gray-200 dark:bg-slate-600 md:hidden"></div>
          </div>
          <div className="roundedp-4 mt-5 w-56 max-w-sm  shadow ">
            <div className="mb-2.5 h-2 rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="mb-2.5 h-2 rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="h-2 rounded-full  bg-gray-300 dark:bg-slate-700"></div>
          </div>
        </div>

        <div className="flexBetweenStart ml-52 flex flex-1 animate-pulse space-x-32 md:ml-0 md:mt-8 md:space-x-0">
          <div className="flex-1 items-start justify-start">
            <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-slate-600"></div>
            <div className="mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="mb-2.5 h-2 max-w-[500px] rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-300 dark:bg-slate-700"></div>
            <div className="h-2 max-w-[360px] rounded-full bg-gray-300 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>

      <div className="flexBetweenStart mt-44 w-screen animate-pulse justify-between  px-16 sm:mx-0 sm:flex-col sm:items-center minmd:px-64">
        <div className="flexStart mr-3 h-3 w-80 rounded-full bg-gray-200 dark:bg-slate-600"></div>
        <div className="flexStart flex w-52 cursor-pointer space-x-3 rounded-lg sm:mt-5 sm:justify-center">
          <div className="flex h-8 w-8 rounded-lg bg-gray-300 dark:bg-slate-700"></div>
          <div className="flex h-8 w-8 rounded-lg bg-gray-300 dark:bg-slate-700"></div>
          <div className="flex h-8 w-8 rounded-lg bg-gray-300 dark:bg-slate-700"></div>
          <div className="flex h-8 w-8 rounded-lg bg-gray-300 dark:bg-slate-700"></div>
        </div>
      </div>
    </footer>
  )
}
