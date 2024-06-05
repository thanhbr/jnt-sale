import React from 'react'
import { OrderOriginHeader } from './components/header'
import { OrderOriginBody } from './components/body/index.jsx'
import {OriginContext} from './hooks/_context'
import Filter from './components/filter/index'
import NotificationMessage from './components/notification'
// #lib
export const OrderOrigin = ({...props}) => 
{
  
  return (
    <OriginContext
    >
      <NotificationMessage
      />
      <section {...props}>
        <OrderOriginHeader/>
        <Filter />
        <OrderOriginBody/>
      </section>
     
    </OriginContext>
  )
}
