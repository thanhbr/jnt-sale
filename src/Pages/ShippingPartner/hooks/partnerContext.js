import initPartnerState from '../provider/initState'
import ShippingPartnerReducer from '../provider/reducer'
import {createContext, useContext, useReducer} from 'react'

const PartnerContext = createContext()
export const ShippingPartnerContext = ({children}) => {
  const [state, dispatch] = useReducer(ShippingPartnerReducer, initPartnerState)
  return (
    <div className="partner-container">
    <PartnerContext.Provider value={[state, dispatch]}>
      {children}
    </PartnerContext.Provider>
    </div>
  )
}

const usePartnerContext = () => useContext(PartnerContext)
export default usePartnerContext;