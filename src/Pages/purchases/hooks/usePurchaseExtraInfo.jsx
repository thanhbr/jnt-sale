import { useCallback, useContext, useState } from 'react'
import {PurchasesContext} from '../provider/_context'
import useGlobalContext from "../../../containerContext/storeContext";

const usePurchaseExtraInfo = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {extraInfo} = pageState.purchase
  const {generalInfo} = pageState.purchase
  const {statusInfo} = pageState.purchase
  const {detail} = pageState.purchase
  const {productInventory} = pageState.purchase

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  extraInfo.user = GlobalState.user

  const handleNoteChange = val => {

    if(val.target.value.length > 255){
      pageDispatch({
        type: 'FORM_GENERAL_INFO_VALIDATE',
        payload: { note: 'Nội dung ghi chú chỉ được phép nhập tối đa 255 ký tự' }
      })
    }else{
      pageDispatch({
        type: 'FORM_PAYMENT_NOTE_UPDATE',
        payload: val.target.value,
      })
      pageDispatch({
        type: 'FORM_GENERAL_INFO_VALIDATE',
        payload: { note: '' }
      })
    }
  }


  const handleInventoryChange = _ =>
    pageDispatch({
      type: 'FORM_INVENTORY_UPDATE',
      payload: !pageState.purchase.productInventory,
    })

  return {
    data: extraInfo,
    statusInfo,
    generalInfo,
    detail,
    productInventory,
    field_paid: pageState.field_paid,
    methods: {
      handleNoteChange,
      handleInventoryChange
    },
  }
}

export default usePurchaseExtraInfo
