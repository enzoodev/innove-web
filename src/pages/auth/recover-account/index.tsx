import { useRecoverAccount } from '@/hooks/auth/useRecoverAccount'
import { NextPage } from 'next'

const RecoverAccount: NextPage = () => {
  const { register, errors, handleRecoverAccount, isLoadingRecoverAccount } =
    useRecoverAccount()

  return <div>Recover Account</div>
}

export default RecoverAccount
