import { NextPage } from 'next'
import { Controller } from 'react-hook-form'
import {
  IconArticle,
  IconCheck,
  IconChevronDown,
  IconEdit,
  IconListNumbers,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'

import { useCreateChecklist } from '@/hooks/checklist/useCreateChecklist'

import { ListSeparators } from '@/utils/ListSeparators'
import { locationTypes } from '@/utils/constants/locationTypes'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { Button } from '@/components/elements/Button'
import { Select } from '@/components/elements/Select'
import { Switch } from '@/components/elements/Switch'

const CreateChecklist: NextPage = () => {
  const {
    handleCreateChecklist,
    isLoadingCreateChecklist,
    errors,
    control,
    sections,
    isActive,
    handleActiveChange,
    handleToggleEditSectionTitle,
    handleDoneEditingSectionTitle,
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
          <div className="flex flex-col gap-4 py-3 px-4">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4 w-3/6">
                {section.isEditing ? (
                  <Controller
                    control={control}
                    name={`sections.${sectionIndex}.title`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        name={sections?.[sectionIndex]?.title}
                        placeholder={`Tópico ${sectionIndex + 1}`}
                        onChange={onChange}
                        value={value}
                        formError={
                          errors.sections?.[sectionIndex]?.title?.message
                        }
                        button={
                          <button
                            onClick={() =>
                              handleDoneEditingSectionTitle(sectionIndex)
                            }
                            type="button"
                            className="flex items-center justify-center w-10 h-10 mb-1.5 rounded-full bg-gray-300 hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-30 active:bg-opacity-50"
                          >
                            <IconCheck
                              stroke={1.5}
                              className="w-6 h-6 text-gray-700"
                            />
                          </button>
                        }
                      />
                    )}
                  />
                ) : (
                  <h3 className="text-base font-medium text-gray-700">
                    {section.title}
                  </h3>
                )}
                {section.isOpen && !section.isEditing && (
                  <button
                    onClick={() => handleToggleEditSectionTitle(sectionIndex)}
                    type="button"
                    className="flex items-center justify-center w-10 h-10 mb-1.5 rounded-full bg-gray-300 hover:bg-gray-400 active:bg-gray-400 hover:bg-opacity-30 active:bg-opacity-50"
                  >
                    <IconEdit stroke={1.5} className="w-6 h-6 text-gray-700" />
                  </button>
                )}
              </div>
              {section.isOpen ? (
                <div className="flex flex-row gap-3">
                  <Button
                    title="Adicionar questão"
                    normalText
                    additionalClasses="w-60 bg-zinc-700 hover:bg-zinc-800 active:bg-zinc-900"
                    color="text-white"
                    onClick={() => handleAddQuestion(sectionIndex)}
                    icon={
                      <IconPlus stroke={1.75} className="w-5 h-5 text-white" />
                    }
                  />
                  <Button
                    title="Deletar tópico"
                    normalText
                    additionalClasses="w-56 bg-red-700 hover:bg-red-800 active:bg-red-900"
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
                  <Controller
                    key={question.id}
                    control={control}
                    name={`sections.${sectionIndex}.items.${questionIndex}.name`}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        name={
                          sections?.[sectionIndex]?.items[questionIndex]?.name
                        }
                        placeholder={`Pergunta ${questionIndex + 1}`}
                        onChange={onChange}
                        value={value}
                        formError={
                          errors.sections?.[sectionIndex]?.items?.[
                            questionIndex
                          ]?.name?.message
                        }
                        button={
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
                        }
                      />
                    )}
                  />
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
      headerRightComponent={
        <div className="flex flex-row items-center gap-2">
          <h3 className="text-md font-medium text-gray-600">Status</h3>
          <Switch isChecked={isActive} onChange={handleActiveChange} />
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          <div className="flex flex-row items-center gap-2 py-3 px-4  border-b border-gray-300">
            <IconArticle stroke={1.5} className="w-7 h-7 text-gray-700" />
            <h2 className="text-lg font-medium text-gray-700">Informações</h2>
          </div>
          <div className="flex flex-row gap-4 p-4">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChange={onChange}
                  value={value}
                  formError={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Tipo"
                  onChange={onChange}
                  value={value}
                  formError={errors.type?.message}
                  options={locationTypes}
                />
              )}
            />
          </div>
        </div>
        <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
          <div className="flex flex-row items-center justify-between py-3 px-4 border-b border-gray-300">
            <div className="flex flex-row items-center gap-2">
              <IconListNumbers stroke={1.5} className="w-7 h-7 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-700">Tópicos</h2>
            </div>
            <Button
              title="Adicionar tópico"
              normalText
              additionalClasses="h-12 w-56 bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950"
              onClick={handleAddSection}
              icon={<IconPlus stroke={1.75} className="w-6 h-6 text-white" />}
            />
          </div>
          <div>{renderSections()}</div>
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
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
