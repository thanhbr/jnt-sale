import { createContext, useContext, useReducer, useState } from 'react'

import Reducer from 'GlobalReducer'
import GlobalState from 'GlobalState'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [store, setStore] = useState()
  const [state, dispatch] = useReducer(Reducer, GlobalState)
  const [loading, changeLoading] = useState(false)
  return (
    <AppContext.Provider 
      value={{
        store,
        state,
        setStore,
        dispatch,
        loading,
        changeLoading
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}
export default useAppContext