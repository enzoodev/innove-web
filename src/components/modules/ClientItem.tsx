import { PhotoFormatter } from '@/utils/PhotoFormatter'
import Image from 'next/image'
import React, { memo } from 'react'

type Props = {
  item: TClient
}

export const ClientItem: React.NamedExoticComponent<Props> = memo(
  function Component({ item }) {
    const photoUri = PhotoFormatter.formatUri(item.anexo.icon)

    return (
      <div>
        <Image src={photoUri} alt="Innove" width="160" height="40" />
        <h1>{item.name}</h1>
        <p>{item.cnpj}</p>
      </div>
    )
  },
)
