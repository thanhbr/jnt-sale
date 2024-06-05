import { Pagination } from 'common/pagination'
import { StickyFooter } from 'common/stickyFooter'
import { Delivery } from 'Pages/DeliveryNote'
import { initialDelivery } from 'Pages/DeliveryNote/store/initial'
import reducerDelivery from 'Pages/DeliveryNote/store/reducer'
import { useDelivery } from 'Pages/DeliveryNote/useDelivery/useDelivery'
import React, { useContext, useReducer } from 'react'
import "./Paginate.scss"
export default function Paginate() {
    const {state,dispatch}=useContext(Delivery)
    const { onChangePage, handleAmountChange} = useDelivery()
  return (
    <>
      {state.meta.total < 20 ? '' :  <StickyFooter>
    <div className='delevery__paginate'>
      <Pagination
         active={state.meta.start != 0 ? Math.floor(state.meta.start / state.meta?.per_page) : 0}
         amount={state.meta?.per_page || 10}
         total={Math.ceil(state.meta?.total / state.meta?.per_page)}
         totalItems={state.meta?.total ? state.meta?.total : 0}
         onAmountChange={handleAmountChange}
         onPageChange={onChangePage}
      />
    </div>
   </StickyFooter>}
    </>
   
  )
}
