import initGrCustomerState from '../provider/initState'
import GrCustomerReducer from '../provider/reducer'
import {createContext, useContext, useReducer} from 'react'

const OrderOriginContext = createContext(null)
export const OriginContext = ({children}) => {
  const [state, dispatch] = useReducer(GrCustomerReducer, initGrCustomerState)

  return (
    <div className="partner-container">
      <OrderOriginContext.Provider value={[state, dispatch]}>
        {children}
      </OrderOriginContext.Provider>
    </div>
  )
}

const useOrderOriginContext = () => useContext(OrderOriginContext)
export default useOrderOriginContext;