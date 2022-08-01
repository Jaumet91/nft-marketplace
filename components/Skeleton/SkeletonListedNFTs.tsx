import { SkeletonHomeNFTs } from './SkeletonHomeNFTs'

export const SkeletonListedNFTs = () => (
  <div className="flex min-h-screen animate-pulse p-16 sm:p-4">
    <div className="w-full flex-col p-12 sm:px-4 minmd:w-4/5">
      <div className="mb-10 h-4 w-48 rounded-full bg-gray-200 dark:bg-slate-600"></div>
      <div className="flex w-52 animate-pulse space-x-10">
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
      </div>
    </div>
  </div>
)
