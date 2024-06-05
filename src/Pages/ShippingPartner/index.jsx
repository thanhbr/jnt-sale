import React, {createContext} from 'react'
import { ShippingPartnerHeader } from './components/header'
import { ShippingPartnerBody } from './components/partner/index.jsx'
import {ShippingPartnerContext} from './hooks/partnerContext'
// #lib
export const ShippingPartner = ({...props}) => {
  
  return (
    <ShippingPartnerContext
    >
      <section {...props}>
        <ShippingPartnerHeader/>
        <ShippingPartnerBody/>
      </section>
    
    </ShippingPartnerContext>
  )
}
