import { useCallback, useState } from 'react'
import { NextPage } from 'next'

import { useToggle } from '@/hooks/shared/useToggle'
import { useGetLocations } from '@/hooks/location/useGetLocations'
import { useDropdownLocations } from '@/hooks/location/useDropdownLocations'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { LocationDropDown } from '@/components/modules/location/LocationDropDown'

const Location: NextPage = () => {
  const { locations, isLoadingGetLocations, searchText, setSearchText } =
    useGetLocations()
  const { openedType, openDropdown } = useDropdownLocations()

  const [isOpenCreateModal, toggleOpenCreateModal] = useToggle()
  const [isOpenUpdateModal, toggleOpenUpdateModal] = useToggle()
  const [isOpenDeleteModal, toggleOpenDeleteModal] = useToggle()
  const [location, setLocation] = useState({
    id: 0,
    name: '',
  })

  const renderAreas = useCallback(() => {
    if (isLoadingGetLocations) {
      return <div>Carregando...</div>
    }

    if (locations.area.length === 0) {
      return <div>Nenhuma área encontrada</div>
    }

    return locations.area.map((area) => <div key={area.id}>{area.nome}</div>)
  }, [isLoadingGetLocations, locations.area])

  const renderConstructions = useCallback(() => {
    if (isLoadingGetLocations) {
      return <div>Carregando...</div>
    }

    if (locations.construction.length === 0) {
      return <div>Nenhuma construção encontrada</div>
    }

    return locations.construction.map((construction) => (
      <div key={construction.id}>{construction.nome}</div>
    ))
  }, [isLoadingGetLocations, locations.construction])

  const renderEquipments = useCallback(() => {
    if (isLoadingGetLocations) {
      return <div>Carregando...</div>
    }

    if (locations.equipment.length === 0) {
      return <div>Nenhuma equipamento encontrada</div>
    }

    return locations.equipment.map((equipment) => (
      <div key={equipment.id}>{equipment.nome}</div>
    ))
  }, [isLoadingGetLocations, locations.equipment])

  return (
    <LayoutApp
      title="Inspeções"
      headTitle="Inspeções - Innove"
      onCreate={toggleOpenCreateModal}
      headerRightComponent={
        <div className="w-full sm:w-72 lg:w-96">
          <Input
            placeholder="Qual inspeção você procura?"
            hasLabel={false}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search"
            autoFocus
            spellCheck={false}
            additionalClasses="bg-gray-300 placeholder-gray-500"
          />
        </div>
      }
    >
      <div className="rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        <LocationDropDown
          title="Áreas"
          isOpen={openedType === 'area'}
          onOpen={() => openDropdown('area')}
        >
          {renderAreas()}
        </LocationDropDown>
        <LocationDropDown
          title="Obras"
          isOpen={openedType === 'construction'}
          onOpen={() => openDropdown('construction')}
        >
          {renderConstructions()}
        </LocationDropDown>
        <LocationDropDown
          title="Equipamentos"
          isOpen={openedType === 'equipment'}
          onOpen={() => openDropdown('equipment')}
        >
          {renderEquipments()}
        </LocationDropDown>
      </div>
    </LayoutApp>
  )
}

export default Location
