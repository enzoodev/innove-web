import { LayoutApp } from '@/components/layout/LayoutApp'
import { NextPage } from 'next'

const Config: NextPage = () => {
  return (
    <LayoutApp
      title="Configurações"
      headTitle="Configurações - Innove"
      searchText={''}
      setSearchText={() => {}}
    >
      <div>
        <h1>Configurações</h1>
      </div>
    </LayoutApp>
  )
}

export default Config
