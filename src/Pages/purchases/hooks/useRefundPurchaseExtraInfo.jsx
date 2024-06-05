import { useCallback, useContext, useState } from 'react'
import {PurchasesContext} from '../provider/_context'
import useGlobalContext from "../../../containerContext/storeContext";

const useRefundPurchaseExtraInfo = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {extraInfo} = pageState.refund
  const {statusInfo} = pageState.refund
  const {detail} = pageState.refund
  const {productInventory} = pageState.refund

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  extraInfo.user = GlobalState.user

  const handleNoteChange = val =>
  {
    if(val.target.value.length > 255){
      pageDispatch({
        type: 'FORM_GENERAL_INFO_VALIDATE',
        payload: { code: '' }
      })
    }else{
      pageDispatch({
        type: 'FORM_REFUND_PAYMENT_NOTE_UPDATE',
        payload: val.target.value,
      })
    }
  }


  const handleInventoryChange = _ =>
    pageDispatch({
      type: 'FORM_REFUND_INVENTORY_UPDATE',
      payload: !pageState.purchase.productInventory,
    })

  return {
    data: extraInfo,
    statusInfo,
    detail,
    productInventory,
    field_paid: pageState.field_paid,
    methods: {
      handleNoteChange,
      handleInventoryChange
    },
  }
}

export default useRefundPurchaseExtraInfo
