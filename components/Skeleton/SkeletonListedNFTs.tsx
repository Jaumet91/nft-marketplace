import { SkeletonHomeNFTs } from './SkeletonHomeNFTs'

export const SkeletonListedNFTs = () => (
  <div className="min-h-screen animate-pulse p-16 sm:p-4 ">
    <div className="flex-col p-12 sm:px-0 minmd:w-4/5">
      <div className="mb-10 h-4 w-48 rounded-full bg-gray-200 dark:bg-slate-600"></div>
      <div className="flex w-full animate-pulse space-x-10 overflow-hidden">
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
        <SkeletonHomeNFTs />
      </div>
    </div>
  </div>
)
