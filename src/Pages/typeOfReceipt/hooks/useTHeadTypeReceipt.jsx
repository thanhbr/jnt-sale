import React, {useContext, useState} from 'react';
import {TypeReceiptContext} from "../provider/_context";
import {typeReceiptActions} from "../provider/_actions";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";

const useTHeadTypeReceipt = () => {
  const {pageState, pageDispatch} = useContext(TypeReceiptContext)
  const table = pageState?.table
  const displayList = table.display.list
  const selectedList = table.selected.list
  const modalInactive = pageState?.modal?.inactiveStatus

  // CHECKBOX
  const shouldActiveCheckbox = selectedList.length > 0

  const isActive =
    displayList?.length <= 0
      ? false
      : selectedList?.length < displayList?.filter(item => +item.is_default !== 1).length
      ? false
      : !!!displayList?.filter(item => +item.is_default !== 1)?.find(
        item => !!!selectedList?.find(find => (+find?.id === +item?.id)),
      )

  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive) {
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.id === item?.id),
      )
    }
    else {
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.id === item?.id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList].filter(item => +item?.is_default !== 1)
    }

    pageDispatch({
      type: typeReceiptActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: newSelectedList}},
    })
  }

  // SELECTED ACTION DROPDOWN
  const [shouldOpenSelectedActionMenu, setShouldOpenSelectedActionMenu] =
    useState(false)


  const handleSwitchStatus = async type => {
    setShouldOpenSelectedActionMenu(false)
    if(modalInactive.debounce) {
      if(+type.id === 0) {
        pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN, payload: {open: true, data: selectedList}})
      } else {
        pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: false})
        setTimeout(() => pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: true}), 2000)
        const dataPost = {
          id: selectedList?.map(item => item?.id),
          status: 1,
        }
        const response = await sendRequestAuth(
          'post',
          `${config.API}/cashbook/receipts-type/active`, JSON.stringify(dataPost),
        ).catch(() => toast.error('Thay đổi trạng thái loại phiếu thu thất bại'))

        if(response?.data?.success) {
          pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST,
            payload: {list: pageState?.table?.display?.list?.map(item => {
                if(!!selectedList?.find(it => +item?.id === +it?.id)) item.status = 1
                return item
              })}, loading: false})
          pageDispatch({
            type: typeReceiptActions.TABLE_SELECTED_LIST_UPDATE,
            payload: {selected: {list: []}},
          })
          toast.success('Kích hoạt loại phiếu thu thành công')
        } else {
          toast.error('Kích hoạt loại phiếu thu thất bại')
        }
      }
    }
  }

  const handleCloseConfirmInactive = _ => {
    pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN, payload: {open: false, data: []}})
  }

  const acceptanceCloseConfirmInactive = async _ => {
    if(modalInactive.debounce) {
      pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: false})
      setTimeout(() => pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE, payload: true}), 2000)

      const dataPost = {
        id: modalInactive?.data?.map(item => item?.id),
        status: 0,
      }
      const response = await sendRequestAuth(
        'post',
        `${config.API}/cashbook/receipts-type/active`, JSON.stringify(dataPost),
      ).catch(() => toast.error('Thay đổi trạng thái loại phiếu thu thất bại'))

      if(response?.data?.success) {
        pageDispatch({type: typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST,
          payload: {list: pageState?.table?.display?.list?.map(item => {
              if(!!modalInactive?.data?.find(it => +item?.id === +it?.id)) item.status = 0
              return item
            })}, loading: false})
        pageDispatch({type: typeReceiptActions.MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN, payload: {open: false, data: []}})
        pageDispatch({type: typeReceiptActions.TABLE_SELECTED_LIST_UPDATE, payload: {selected: {list: []}}})
        toast.success('Ngưng sử dụng loại phiếu thu thành công')
      } else {
        toast.error('Ngưng sử dụng loại phiếu thu thất bại')
      }
    }
  }

  return {
    table,
    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
    },
    selected: {
      actionMenu: {
        open: shouldOpenSelectedActionMenu,
        onToggle: setShouldOpenSelectedActionMenu,
        actions: [
          // () => handleBulkOrderApply(1),
          // () => handleBulkOrderApply(7),
          // () => handleBulkOrderApply(15),
        ],
      },
      list: selectedList,
      handleSwitchStatus,
    },
    method: {
      modalInactive,
      handleCloseConfirmInactive,
      acceptanceCloseConfirmInactive,
    }
  }
}

export default useTHeadTypeReceipt;