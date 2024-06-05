import initGrCustomerState from '../provider/initState'
import GrCustomerReducer from '../provider/reducer'
import {createContext, useContext, useReducer} from 'react'

const GroupCustomerContext = createContext(null)
export const GroupCusContext = ({children}) => {
  const [state, dispatch] = useReducer(GrCustomerReducer, initGrCustomerState)
  
  return (
    <div className="partner-container">
    <GroupCustomerContext.Provider value={[state, dispatch]}>
      {children}
    </GroupCustomerContext.Provider>
    </div>
  )
}

const useGroupCustomerContext = () => useContext(GroupCustomerContext)
export default useGroupCustomerContext;