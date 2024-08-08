import { NextPage } from 'next'
import { useClients } from '@/hooks/useClients'

const Clients: NextPage = () => {
  const {
    clients,
    isLoadingGetClients,
    isOpenCreateClientModal,
    isOpenUpdateClientModal,
    toggleOpenCreateClientModal,
    toggleOpenUpdateClientModal,
  } = useClients()

  return (
    <div>
      <h1>Clients</h1>
    </div>
  )
}

export default Clients
