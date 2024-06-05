import React, {useContext, useState} from 'react';
import {TypeReceiptContext} from "../provider/_context";
import {typeReceiptActions} from "../provider/_actions";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";

const useRowTypeReceipt = data => {
  const {pageState, pageDispatch} = useContext(TypeReceiptContext)
  const table = pageState?.table
  const selectedList = table.selected.list
  const modalInactive = pageState?.modal?.inactiveStatus
  const isSelected = !!selectedList.find(
    item => item?.id === data?.id,
  )

  const handleCheckbox = _ => {
    pageDispatch({
      type: typeReceiptActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: isSelected
            ? selectedList.filter(item => item?.id !== data?.id)
            : [...selectedList, data],
        },
      },
    })
  }

  const handleSwitchStatus = async data => {
    if(modalInactive.debounce) {

      let dataReceipt = data
      if(typeof data === 'object') {
        dataReceipt = [data]
      }
      if(+data?.status === 1) {
        pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN, payload: {open: true, data: dataReceipt}})
      } else {
        pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: false})
        setTimeout(() => pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: true}), 2000)
        const dataPost = {
          id: dataReceipt?.map(item => item?.id),
          status: 1,
        }
        const response = await sendRequestAuth(
          'post',
          `${config.API}/cashbook/receipts-type/active`, JSON.stringify(dataPost),
        ).catch(() => toast.error('Thay đổi trạng thái loại phiếu thu thất bại'))

        if(response?.data?.success) {
          pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST,
            payload: {list: pageState?.table?.display?.list?.map(item => {
                if(!!dataReceipt?.find(it => +item?.id === +it?.id)) item.status = 1
                return item
              })}, loading: false})
          toast.success('Kích hoạt loại phiếu thu thành công')
        } else {
          toast.error('Kích hoạt loại phiếu thu thất bại')
        }
      }
    }
  }

  return {
    row: {
      isSelected,
      handleCheckbox,
      handleSwitchStatus,
    }
  }
}

export default useRowTypeReceipt;