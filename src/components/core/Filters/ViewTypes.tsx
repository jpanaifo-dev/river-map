'use client'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { useFilterFromUrl } from '@/hooks'

interface IOptViews {
  key: string
  name: string
}

interface IProps {
  options: IOptViews[]
}

export const ViewTypes = (props: IProps) => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { options } = props

  const view = getParams('view', '')

  const handleView = (view: string) => {
    updateFilter('view', view)
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col gap-1">
          {options.map((opt, i) => (
            <Button
              key={i}
              variant={view === opt.key ? 'default' : 'link'}
              onClick={() => handleView(opt.key)}
              size="sm"
              className="border"
            >
              {opt.name}
            </Button>
          ))}
        </div>
      </Suspense>
    </>
  )
}
