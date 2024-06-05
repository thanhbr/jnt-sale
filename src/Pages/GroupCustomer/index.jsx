import React from 'react'
import { GroupCustomerHeader } from './components/header'
import { GroupCustomerBody } from './components/body/index.jsx'
import {GroupCusContext} from './hooks/_context'
import Filter from './components/filter/index'
import NotificationMessage from './components/notification'
// #lib
export const GroupCustomer = ({...props}) => 
{
  
  return (
    <GroupCusContext
    >
      <NotificationMessage
      />
      <section {...props}>
        <GroupCustomerHeader/>
        <Filter />
        <GroupCustomerBody/>
      </section>
     
    </GroupCusContext>
  )
}
