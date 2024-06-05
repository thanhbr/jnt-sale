import {createContext, useReducer} from 'react'
import {ShippingTrackingBody} from './components/body'
import {ShippingTrackingHeader} from './components/header'
import {actions, initialState, reducer} from './_reducer'

export const ShippingTrackingContext = createContext(null)
const PageProvider = ShippingTrackingContext.Provider

export const ShippingTracking = ({...props}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <PageProvider value={{pageState: state, pageDispatch: dispatch}}>
      <section {...props} >
        <ShippingTrackingHeader />
        <ShippingTrackingBody />
      </section>
    </PageProvider>
  )
}