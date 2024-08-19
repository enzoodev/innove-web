import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { LayoutApp } from '@/components/layout/LayoutApp'

const UpdateChecklist: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <LayoutApp
      title="Checklists"
      headTitle="Checklists - Innove"
      hasCreateButton={false}
    >
      {id}
    </LayoutApp>
  )
}

export default UpdateChecklist
