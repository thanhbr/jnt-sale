import { DeliveryEditOrderModal } from './deliveryOrderModal'
import { DraftEditOrderModal } from './draftOrderModal'
import { useEffect, useState } from 'react'

export const SuccessfulEditOrder = ({data, ...props}) => {
  const [orderData, setOrderData] = useState(null)
  useEffect(()=>{
    setOrderData(data)
  },[data])

  return (
    <>
      {!!orderData?.is_draft && <DraftEditOrderModal data={orderData} setModal={setOrderData}/>}
      {!!orderData?.is_delivery&& <DeliveryEditOrderModal data={orderData} setModal={setOrderData}/>}
    </>
  )
}