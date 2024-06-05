import GlobalState from '../GlobalState'
import GlobalReducer from '../GlobalReducer'
import {createContext, useContext, useReducer} from 'react'

const GlobalContext = createContext()
export const Store = ({children}) => {
  const [state, dispatch] = useReducer(GlobalReducer, GlobalState)
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => useContext(GlobalContext)
export default useGlobalContext;



