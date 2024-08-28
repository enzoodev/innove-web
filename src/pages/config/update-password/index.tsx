import { NextPage } from 'next'

import { useUpdatePassword } from '@/hooks/auth/useUpdatePassword'

const UpdatePassword: NextPage = () => {
  const { register, errors, handleUpdatePassword, isLoadingUpdatePassword } =
    useUpdatePassword()

  return <div>Update Password</div>
}

export default UpdatePassword
