type Props = {}

export const SkeletonNavbar = (props: Props) => {
  return (
    <nav className="flexBetween fixed w-full flex-row border-nft-black-1 bg-nft-dark p-4">
      <div className="flex flex-1 animate-pulse flex-row items-center justify-start">
        <div className="flex h-8 w-8 cursor-pointer rounded-lg bg-slate-700"></div>
        <div className="ml-1 flex h-2.5 w-24 cursor-pointer rounded-lg bg-slate-600 md:hidden"></div>
      </div>

      <div className="mx-3 flex h-5 w-11 flex-initial animate-pulse flex-row justify-end rounded-xl bg-slate-600"></div>

      <div className="flex max-w-[310px] animate-pulse space-x-6 md:hidden">
        <div className="h-2.5  w-full rounded-lg bg-slate-600"></div>
        <div className="h-2.5  w-72 rounded-lg bg-slate-700"></div>
        <div className="h-2.5 w-48 rounded-lg bg-slate-600"></div>
      </div>

      <div className="mr-2 ml-8 flex h-9 w-24 animate-pulse cursor-pointer rounded-xl bg-slate-700 md:hidden"></div>
      <div className="animate-pulse flex-col">
        <div className="mb-1 hidden h-1 rounded-full bg-slate-700 md:block md:w-7"></div>
        <div className="mb-1 hidden h-1 rounded-full bg-slate-700 md:block md:w-7"></div>
        <div className="hidden h-1 rounded-full bg-slate-700 md:block md:w-7"></div>
      </div>
    </nav>
  )
}
