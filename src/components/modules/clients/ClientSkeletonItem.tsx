import { memo } from 'react'

export const ClientSkeletonItem = memo(function Component() {
  return (
    <output className="w-full animate-pulse flex flex-row px-4 py-3 gap-4">
      <div className="bg-gray-300 rounded-full w-12 h-12 p-6 flex self-start" />
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-300 rounded-full w-40 sm:48 lg:w-64" />
          <div className="h-2.5 bg-gray-300 rounded-full w-32 sm:40 lg:w-48" />
        </div>
        <div className="flex flex-row items-center gap-6 sm:gap-4">
          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="h-2.5 bg-gray-300 rounded-full w-16 md:w-24" />
            <div className="h-2.5 bg-gray-300 rounded-full w-24 md:w-32" />
          </div>
        </div>
      </div>
    </output>
  )
})
