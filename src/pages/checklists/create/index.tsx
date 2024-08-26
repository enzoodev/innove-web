import { NextPage } from 'next'
import {
  IconArticle,
  IconChevronDown,
  IconEdit,
  IconListNumbers,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'

import { useCreateChecklist } from '@/hooks/checklist/useCreateChecklist'

import { ListSeparators } from '@/utils/ListSeparators'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'

const CreateChecklist: NextPage = () => {
  const {
    handleCreateChecklist,
    isLoadingCreateChecklist,
    register,
    errors,
    sections,
    isActive,
    handleActiveChange,
    handleToggleEditSectionTitle,
    handleAddQuestion,
    handleDeleteQuestion,
    handleOpenSection,
    handleAddSection,
    handleDeleteSection,
  } = useCreateChecklist()

  const renderSections = () => {
    return sections.map((section, sectionIndex, array) => {
      const hasSeparator = ListSeparators.getHasSeparator(sectionIndex, array)

      return (
        <div key={section.id}>
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <div className="flex flex-row items-center gap-2">
                  {section.isEditing ? (
                    <Input
                      key={section.id}
                      placeholder={`Tópico ${sectionIndex + 1}`}
                      formError={
                        errors.sections?.[sectionIndex]?.title?.message
                      }
                      name={sections?.[sectionIndex]?.title}
                      autoFocus
                      register={register}
                    />
                  ) : (
                    <h3 className="text-base font-medium text-gray-700">
                      {section.title}
                    </h3>
                  )}
                  {section.isOpen && (
                    <button
                      onClick={() => handleToggleEditSectionTitle(sectionIndex)}
                      type="button"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 bg-opacity-70 hover:bg-opacity-90 active:bg-opacity-100"
                    >
                      <IconEdit
                        stroke={1.5}
                        className="w-5 h-5 text-gray-700"
                      />
                    </button>
                  )}
                </div>
              </div>
              {section.isOpen ? (
                <div className="flex flex-row gap-3">
                  <Button
                    title="Adicionar pergunta"
                    itsCancelButton
                    additionalClasses="w-60 bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-900"
                    color="text-white"
                    onClick={() => handleAddQuestion(sectionIndex)}
                    icon={
                      <IconPlus stroke={1.5} className="w-5 h-5 text-white" />
                    }
                  />
                  <Button
                    title="Deletar tópico"
                    itsCancelButton
                    additionalClasses="w-60 bg-red-700 hover:bg-red-800 active:bg-red-900"
                    color="text-white"
                    onClick={() => handleDeleteSection(sectionIndex)}
                    icon={
                      <IconTrash stroke={1.5} className="w-5 h-5 text-white" />
                    }
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleOpenSection(sectionIndex)}
                  className="w-10 h-10 bg-gray-300 border border-gray-400 rounded-full flex items-center justify-center"
                >
                  <IconChevronDown
                    stroke={1.5}
                    className="text-gray-700 w-7 h-7"
                  />
                </button>
              )}
            </div>
            {section.isOpen && (
              <div className="flex flex-col gap-4">
                {section.items.map((question, questionIndex) => (
                  <div key={question.id}>
                    <Input
                      key={question.id}
                      placeholder={`Pergunta ${questionIndex + 1}`}
                      formError={
                        errors.sections?.[sectionIndex]?.items?.[questionIndex]
                          ?.name?.message
                      }
                      name={
                        sections?.[sectionIndex]?.items[questionIndex]?.name
                      }
                      autoFocus
                      register={register}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteQuestion(sectionIndex, question.id)
                      }
                      className="w-10 h-10 bg-gray-300 border border-gray-400 rounded-full flex items-center justify-center"
                    >
                      <IconTrash
                        stroke={1.5}
                        className="text-gray-700 w-6 h-6"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {hasSeparator && <hr className="border-t border-gray-300" />}
        </div>
      )
    })
  }

  return (
    <LayoutApp
      title="Cadastrar Checklist"
      headTitle="Checklists - Innove"
      hasCreateButton={false}
      //   headerRightComponent={}
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          <div className="flex flex-row items-center gap-2 py-3 px-4 border-b border-gray-300">
            <IconArticle stroke={1.5} className="w-7 h-7 text-gray-700" />
            <h2 className="text-lg font-medium text-gray-700">Informações</h2>
          </div>
          <div className="flex flex-row gap-4 p-4"></div>
        </div>
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2 py-3 px-4 border-b border-gray-300">
              <IconListNumbers stroke={1.5} className="w-7 h-7 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-700">Tópicos</h2>
            </div>
            <Button
              title="Adicionar tópico"
              itsCancelButton
              additionalClasses="w-60 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
              onClick={handleAddSection}
              icon={<IconPlus stroke={1.5} className="w-5 h-5 text-white" />}
            />
          </div>
          <div>{renderSections()}</div>
        </div>
      </div>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <Button
          title="Salvar checklist"
          type="submit"
          additionalClasses="w-80 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
          isLoading={isLoadingCreateChecklist}
          onClick={handleCreateChecklist}
        />
      </div>
    </LayoutApp>
  )
}

export default CreateChecklist
