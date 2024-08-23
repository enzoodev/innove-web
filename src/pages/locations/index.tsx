import { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { IconPlus } from '@tabler/icons-react'

import { useToggle } from '@/hooks/shared/useToggle'
import { useGetLocations } from '@/hooks/location/useGetLocations'
import { useDropdownLocations } from '@/hooks/location/useDropdownLocations'

import { LayoutApp } from '@/components/layout/LayoutApp'
import { Input } from '@/components/elements/Input'
import { LocationDropDown } from '@/components/modules/location/LocationDropDown'
import { CreateLocationPopoverPanelOption } from '@/components/modules/location/CreateLocationPopoverPanelOption'
import { CreateAreaModal } from '@/components/modules/location/CreateArea'
import { CreateConstructionModal } from '@/components/modules/location/CreateConstruction'
import { CreateEquipmentModal } from '@/components/modules/location/CreateEquipment'
import { UpdateAreaModal } from '@/components/modules/location/UpdateArea'
import { UpdateConstructionModal } from '@/components/modules/location/UpdateConstruction'
import { UpdateEquipmentModal } from '@/components/modules/location/UpdateEquipment'
import { DeleteLocationModal } from '@/components/modules/location/DeleteLocationModal'

const Location: NextPage = () => {
  const { locations, isLoadingGetLocations, searchText, setSearchText } =
    useGetLocations()
  const { openedType, openDropdown } = useDropdownLocations()

  const [isOpenCreateAreaModal, toggleOpenCreateAreaModal] = useToggle()
  const [isOpenCreateConstructionModal, toggleOpenCreateConstructionModal] =
    useToggle()
  const [isOpenCreateEquipmentModal, toggleOpenCreateEquipmentModal] =
    useToggle()
  const [isOpenUpdateAreaModal, toggleOpenUpdateAreaModal] = useToggle()
  const [isOpenUpdateConstructionModal, toggleOpenUpdateConstructionModal] =
    useToggle()
  const [isOpenUpdateEquipmentModal, toggleOpenUpdateEquipmentModal] =
    useToggle()
  const [isOpenDeleteLocationModal, toggleOpenDeleteLocationModal] = useToggle()

  const [location, setLocation] = useState({
    id: 0,
    name: '',
    type: {
      id: 0,
      key: '' as unknown as TLocationTypeKey,
    },
  })

  const handleSelectLocation = useCallback(
    (local: TLocationArea | TLocationConstruction | TLocationEquipment) => {
      setLocation({
        id: local.id,
        name: local.nome,
        type: {
          id: local.tipo.id,
          key: local.tipo.name,
        },
      })
    },
    [],
  )

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
      customCreateButton={
        <Popover className="relative">
          <PopoverButton className="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-800 hover:bg-cyan-900 active:bg-cyan-950 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <IconPlus stroke={1.75} className="w-7 h-7 text-white" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col bg-gray-100 border border-gray-300 shadow-md rounded-lg"
          >
            <CreateLocationPopoverPanelOption
              title="Área"
              type="Area"
              description="Cadastre uma nova área para inspeção."
              onClick={toggleOpenCreateAreaModal}
            />
            <div className="border-t border-gray-300" />
            <CreateLocationPopoverPanelOption
              title="Obra"
              type="Obra"
              description="Cadastre uma nova obra para inspeção."
              onClick={toggleOpenCreateConstructionModal}
            />
            <div className="border-t border-gray-300" />
            <CreateLocationPopoverPanelOption
              title="Equipamento"
              type="Equipamento"
              description="Cadastre um novo equipamento para inspeção."
              onClick={toggleOpenCreateEquipmentModal}
            />
          </PopoverPanel>
        </Popover>
      }
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
      <div className="bg-gray-100 rounded-md border border-gray-300 shadow-[0_3px_10px_rgb(0,0,0,0.1)]">
        <LocationDropDown
          title="Áreas"
          isOpen={openedType === 'area'}
          onOpen={() => openDropdown('area')}
        >
          {renderAreas()}
        </LocationDropDown>
        {openedType === 'area' && <div className="border-t border-gray-300" />}
        <LocationDropDown
          title="Obras"
          isOpen={openedType === 'construction'}
          onOpen={() => openDropdown('construction')}
        >
          {renderConstructions()}
        </LocationDropDown>
        {openedType === 'construction' && (
          <div className="border-t border-gray-300" />
        )}
        <LocationDropDown
          title="Equipamentos"
          isOpen={openedType === 'equipment'}
          onOpen={() => openDropdown('equipment')}
        >
          {renderEquipments()}
        </LocationDropDown>
      </div>
      <CreateAreaModal
        isOpen={isOpenCreateAreaModal}
        onClose={toggleOpenCreateAreaModal}
      />
      <CreateConstructionModal
        isOpen={isOpenCreateConstructionModal}
        onClose={toggleOpenCreateConstructionModal}
      />
      <CreateEquipmentModal
        isOpen={isOpenCreateEquipmentModal}
        onClose={toggleOpenCreateEquipmentModal}
      />
      <UpdateAreaModal
        isOpen={isOpenUpdateAreaModal}
        onClose={toggleOpenUpdateAreaModal}
        locationId={location.id}
        locationTypeId={location.type.id}
      />
      <UpdateConstructionModal
        isOpen={isOpenUpdateConstructionModal}
        onClose={toggleOpenUpdateConstructionModal}
        locationId={location.id}
        locationTypeId={location.type.id}
      />
      <UpdateEquipmentModal
        isOpen={isOpenUpdateEquipmentModal}
        onClose={toggleOpenUpdateEquipmentModal}
        locationId={location.id}
        locationTypeId={location.type.id}
      />
      <DeleteLocationModal
        isOpen={isOpenDeleteLocationModal}
        onClose={toggleOpenDeleteLocationModal}
        item={location}
      />
    </LayoutApp>
  )
}

export default Location
