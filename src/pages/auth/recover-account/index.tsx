import { NextPage } from 'next'

import { useRecoverAccount } from '@/hooks/auth/useRecoverAccount'

const RecoverAccount: NextPage = () => {
  const { register, errors, handleRecoverAccount, isLoadingRecoverAccount } =
    useRecoverAccount()

  return <div>Recover Account</div>
}

export default RecoverAccount
