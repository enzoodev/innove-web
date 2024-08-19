import React, { memo, useMemo } from 'react'
import Link from 'next/link'
import { IconSettings, IconChecklist } from '@tabler/icons-react'

import { Routes } from '@/enums/Routes'

type Props = {
  item: TChecklist
}

export const ChecklistItem: React.NamedExoticComponent<Props> = memo(
  function Component({ item }) {
    const numberOfQuestions = useMemo(
      () =>
        item.topics.reduce((prev, curr) => {
          return prev + curr.questions.length
        }, 0),
      [item.topics],
    )

    return (
      <div className="flex flex-row items-center justify-between px-4 py-3 gap-4">
        <div className="flex flex-1 flex-row gap-4">
          <div className="w-12 h-12 flex self-start items-center justify-center bg-cyan-800 rounded-full">
            <IconChecklist stroke={1.5} className="text-white w-7 h-7" />
          </div>
          <div className="flex flex-1 flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-gray-800 break-word sm:max-w-none text-base font-bold break-words">
                {item.name}
              </span>
              <span className="text-gray-700 rounded-full py-1 px-3 bg-gray-300 flex self-start text-xs font-semibold">
                {numberOfQuestions}{' '}
                {numberOfQuestions === 1 ? 'pergunta' : 'perguntas'}
              </span>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm lg:text-base">
                  Tópicos
                </span>
                <span className="text-gray-600 text-sm lg:text-base font-semibold">
                  {item.topics.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={`${Routes.CHECKLISTS}/${item.idchecklist}`}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 bg-opacity-70 hover:bg-opacity-90 active:bg-opacity-100"
        >
          <IconSettings stroke={1.5} className="text-gray-700 w-7 h-7" />
        </Link>
      </div>
    )
  },
)
