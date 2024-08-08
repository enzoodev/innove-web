import React, { memo } from 'react'

type Props = {
  title: string
}

export const Header: React.NamedExoticComponent<Props> = memo(
  function Component({ title }) {
    return (
      <header className="">
        <h1 className="">{title}</h1>
      </header>
    )
  },
)
