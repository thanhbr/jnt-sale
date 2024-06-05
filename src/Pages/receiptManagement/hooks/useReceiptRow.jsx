import React, {useContext, useState} from 'react';
import {ReceiptManagementContext} from "../provider/context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {receiptActions} from "../provider/~initState";

const useReceiptRow = data => {
  const { pageState, pageDispatch } = useContext(ReceiptManagementContext)
  const { table } = pageState
  const modalCancel = pageState?.table?.modal?.cancelReceipt

  const [shouldOpenSubmitPaymentModal, setShouldOpenSubmitPaymentModal] =
    useState(false)

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list

  const selectedList = table.selected.list

  const isSelected = !!selectedList.find(item => item?.id === data?.id)
  const shouldOpenDetail = data?.id && detailActiveId === data.id


  const rowDetailToggle = async () => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      pageDispatch({
        type: receiptActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: { id: null },
      })
      pageDispatch({
        type: receiptActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    pageDispatch({
      type: receiptActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: data.id },
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: receiptActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: findDetail },
      })
    }

    fetchRowDetail()
  }

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cashbook/receipts/detail/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      newItem?.order_payments?.length > 0 && newItem?.order_payments.map((item, index) => {
        if (index > 0) {
          newItem.order_payments[index].has_paid = item?.total_amount - newItem.order_payments[index - 1].total_amount
        } else {
          newItem.order_payments[index].has_paid = item?.total_amount
        }
      })
      pageDispatch({
        type: receiptActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, list: [...detailList, newItem] },
      })
    }
  }

  const handlePrint = async _ => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/cashbook/receipts/print/${data.id}`,
    )
    if (response?.data?.success) {
      let frame = document.createElement('iframe')
      frame.name = 'frame'
      frame.style.position = 'absolute'
      frame.style.top = '-1000000px'
      document.body.appendChild(frame)
      let content = response?.data?.data
      const frameDoc = (frame.contentWindow) ? frame.contentWindow : (frame.contentDocument.document) ? frame.contentDocument.document : frame.contentDocument
      frameDoc.document.open()
      frameDoc.document.write(content)
      frameDoc.document.close()
      window.frames.frame.focus()
      setTimeout(function () {
        window.frames.frame.print()
        document.body.removeChild(frame)
      }, 500)
    }
  }

  const handleEditDesc = _ => {
    pageDispatch({type: receiptActions.TOGGLE_MODAL_EDIT_DESCRIPTION, payload: !pageState?.table?.modal?.editDesc?.open})
    pageDispatch({type: receiptActions.UPDATE_MODAL_EDIT_DESCRIPTION, payload: pageState?.table?.detail?.active?.description || ''})
  }

  const handleCancelReceipt = _ => pageDispatch({
    type: receiptActions.TOGGLE_MODAL_CANCEL_RECEIPT,
    payload: {
      open: !modalCancel?.open,
      id: data?.id
    }
  })

  return {
    detail: {
      id: detailActiveId,
      active: detailActive,
    },
    row: {
      data,
      isSelected,
      shouldOpenDetail,
      shouldOpenSubmitPaymentModal,
      onToggleDetail: rowDetailToggle,
      onPrint: handlePrint,
      onEditDesc: handleEditDesc,
      onCancelReceipt: handleCancelReceipt
    },
  }
}

export default useReceiptRow;