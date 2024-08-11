import { memo } from 'react'

export const ClientSkeletonItem = memo(function Component() {
  return (
    <div
      role="status"
      className="w-full animate-pulse flex flex-row px-4 py-3 gap-4"
    >
      <div className="bg-gray-300 rounded-full w-12 h-12" />
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-3 bg-gray-300 rounded-full w-64" />
          <div className="h-2.5 bg-gray-300 rounded-full w-48" />
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-col items-end gap-2">
            <div className="h-2.5 bg-gray-300 rounded-full w-24" />
            <div className="h-2.5 bg-gray-300 rounded-full w-32" />
          </div>
          <div className="hidden lg:flex flex flex-col items-end gap-2">
            <div className="h-2.5 bg-gray-300 rounded-full w-24" />
            <div className="h-2.5 bg-gray-300 rounded-full w-32" />
          </div>
        </div>
      </div>
    </div>
  )
})
