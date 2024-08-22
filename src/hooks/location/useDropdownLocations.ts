import { useCallback, useReducer } from 'react'

type TLocationType = 'construction' | 'area' | 'equipment'

type State = {
  openDropdown: TLocationType
}

type Action = {
  type: 'OPEN_DROPDOWN'
  payload: TLocationType
}

const initialState: State = {
  openDropdown: 'area',
}

const dropdownReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_DROPDOWN':
      return {
        ...state,
        openDropdown: action.payload,
      }
    default:
      return state
  }
}

export const useDropdownLocations = () => {
  const [state, dispatch] = useReducer(dropdownReducer, initialState)

  const openDropdown = useCallback((type: TLocationType) => {
    dispatch({ type: 'OPEN_DROPDOWN', payload: type })
  }, [])

  return {
    openDropdown,
    openedType: state.openDropdown,
  }
}
