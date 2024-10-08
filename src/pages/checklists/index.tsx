import { useCallback } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { IconEditOff } from '@tabler/icons-react'

import { useGetChecklists } from '@/hooks/checklist/useGetChecklists'

import { Routes } from '@/enums/Routes'

import { ListSeparators } from '@/utils/ListSeparators'
import { generateId } from '@/utils/generateId'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { ListEmpty } from '@/components/elements/ListEmpty'
import { ChecklistItem } from '@/components/modules/checklists/ChecklistItem'
import { ChecklistSkeletonItem } from '@/components/modules/checklists/ChecklistSkeletonItem'

const Checklists: NextPage = () => {
  const { checklists, isLoadingGetChecklists, searchText, setSearchText } =
    useGetChecklists()
  const router = useRouter()

  const handleCreateChecklist = useCallback(() => {
    router.push(Routes.CREATE_CHECKLIST)
  }, [router])

  const renderItems = useCallback(() => {
    if (isLoadingGetChecklists) {
      return (
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          {Array.from({ length: 6 }).map((_, index, array) => {
            const hasSeparator = ListSeparators.getHasSeparator(index, array)
            return (
              <div key={generateId()}>
                <ChecklistSkeletonItem />
                {hasSeparator && <hr className="border-t border-gray-300" />}
              </div>
            )
          })}
        </div>
      )
    }

    if (checklists.length === 0) {
      return (
        <ListEmpty
          renderIcon={() => (
            <IconEditOff stroke={1.5} className="w-7 h-7 text-gray-700" />
          )}
          title="Nenhum checklist encontrado."
        />
      )
    }

    return (
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        {checklists.map((item, index, array) => {
          const hasSeparator = ListSeparators.getHasSeparator(index, array)
          return (
            <div key={item.idchecklist}>
              <ChecklistItem item={item} />
              {hasSeparator && <hr className="border-t border-gray-300" />}
            </div>
          )
        })}
      </div>
    )
  }, [checklists, isLoadingGetChecklists])

  return (
    <LayoutApp
      title="Checklists"
      headTitle="Checklists - Innove"
      onCreate={handleCreateChecklist}
      headerRightComponent={
        <div className="w-full sm:w-72 lg:w-96">
          <Input
            placeholder="Qual checklist você procura?"
            hasLabel={false}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search"
            spellCheck={false}
            additionalClasses="bg-gray-300 placeholder-gray-500"
          />
        </div>
      }
    >
      {renderItems()}
    </LayoutApp>
  )
}

export default Checklists
