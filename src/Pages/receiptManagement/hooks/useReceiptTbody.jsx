import React, {useContext, useState} from 'react';
import {ReceiptManagementContext} from "../provider/context";
import {receiptActions} from "../provider/~initState";
import toast from "../../../Component/Toast";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";

const useReceiptTbody = () => {
  const {pageState, pageDispatch} = useContext(ReceiptManagementContext)
  const paginationPage = pageState?.table?.pagination
  const displayList = pageState?.table?.display
  const modalDesc = pageState?.table?.modal?.editDesc
  const modalCancel = pageState?.table?.modal?.cancelReceipt
  const detailList = pageState?.table.detail.list

  const handleToggleEditModal = _ => {
    pageDispatch({type: receiptActions.TOGGLE_MODAL_EDIT_DESCRIPTION, payload: !pageState?.table?.modal?.editDesc?.open})
    pageDispatch({type: receiptActions.UPDATE_MODAL_EDIT_DESCRIPTION, payload: ''})
  }

  const handleChangeNote = value => pageDispatch({type: receiptActions.UPDATE_MODAL_EDIT_DESCRIPTION, payload: value})

  const handleUpdateNote = async _ => {
    const detailActive = {...pageState?.table?.detail?.active, description: pageState?.table?.modal?.editDesc?.data?.trim()}
    const dataPost = {
      object_type : detailActive?.object_type,
      object_id : detailActive?.object_id,
      receipt_code : detailActive?.receipt_code,
      receipt_type_id : detailActive?.receipt_type_id,
      payment_method_id : detailActive?.payment_method_id,
      total_amount : detailActive?.amount,
      dt_record : detailActive?.dt_record,
      reference_code : detailActive?.receipt_code,
      description : detailActive?.description,
    }

    const response = await sendRequestAuth('post',`${config.API}/cashbook/receipts/update/${detailActive?.id}`, dataPost)
    if(response?.data?.success) {
      pageDispatch({
        type: receiptActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: detailActive, list: detailList}
      })
      toast.success('Cập nhật mô tả phiếu thu thành công')
    }
  }

  const shouldShowCreateBtn = pageState?.table?.listDefault?.length === 0


  const handleToggleCancelModal = _ =>
    pageDispatch({type: receiptActions.TOGGLE_MODAL_CANCEL_RECEIPT,
      payload: {
        open: !modalCancel?.open,
        id: ''
      }})

  const submitCancelModal = async _ => {
    const response = await sendRequestAuth('post',`${config.API}/cashbook/receipts/cancel/${modalCancel?.id}`)
    if(response?.data?.success) {
      toast.success('Đã hủy phiếu thu thành công')
      const receipts = displayList?.list?.map(item => {
        if(+item.id === +modalCancel?.id) item.status = '2'
        return item
      })
      pageDispatch({type: receiptActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: receipts, loading: false}})
    } else {
      toast.error('Đã hủy phiếu thu thất bại')
    }
  }

  return {
    displayList,
    modalDesc,
    modalCancel,
    methods: {
      handleToggleEditModal,
      handleChangeNote,
      handleUpdateNote,

      handleToggleCancelModal,
      submitCancelModal,
    },
    shouldShowCreateBtn
  }
}

export default useReceiptTbody