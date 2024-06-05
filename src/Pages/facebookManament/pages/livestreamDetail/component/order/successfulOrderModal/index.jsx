import { DeliveryOrderModal } from './deliveryOrderModal'
import { DraftOrderModal } from './draftOrderModal'
import { useEffect, useState } from 'react'

export const SuccessfulOrder = ({data, ...props}) => {
  const [orderData, setOrderData] = useState(null)
  const isAllFailed = !data?.success
  useEffect(()=>{
    setOrderData(data)
  },[data])
  return (
    <>
      {!!orderData?.is_draft && isAllFailed && <DraftOrderModal data={orderData} setModal={setOrderData}/>}
      {!!orderData?.is_delivery && isAllFailed && <DeliveryOrderModal data={orderData} setModal={setOrderData}/>}
      </>
  )
}
