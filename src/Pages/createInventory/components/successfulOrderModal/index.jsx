import { DeliveryOrderModal } from './deliveryOrderModal'
import { DraftOrderModal } from './draftOrderModal'
import { useEffect, useState } from 'react'

export const SuccessfulOrder = ({data, ...props}) => {
  const [orderData, setOrderData] = useState(null)
  useEffect(()=>{
    setOrderData(data)
  },[data])

  return (
    <>
      {!!orderData?.is_draft && <DraftOrderModal data={orderData} setModal={setOrderData}/>}
      {!!orderData?.is_delivery&& <DeliveryOrderModal data={orderData} setModal={setOrderData}/>}
      </>
  )
}
