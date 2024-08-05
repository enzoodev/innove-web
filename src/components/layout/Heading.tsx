import React, { memo } from 'react'
import Image from 'next/image'

type Props = {
  title: string
}

export const Heading: React.NamedExoticComponent<Props> = memo(
  function Component({ title }) {
    return (
      <div className="heading d-flex align-items-center justify-content-between justify-content-lg-start flex-wrap">
        <Image
          src="/img/brand/innove.svg"
          alt="Rosinha"
          width="160"
          height="40"
          className="heading--brand d-none d-print-block"
        />
        <h1 className="heading--title h3 my-0 me-3">{title}</h1>
      </div>
    )
  },
)
