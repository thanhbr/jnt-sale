import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useRef, useState } from 'react'
import { PurchasesContext } from '../provider/_context'
import { actionTypes } from '../provider/_reducer'
import usePurchasesFilterForm from './useFilter'

const useOrderRow = data => {
  const { showAlert } = useAlert()
  const { functions } = usePurchasesFilterForm()

  const { pageState, pageDispatch } = useContext(PurchasesContext)
  const { table } = pageState
  const isLoading = table.detail.loading
  const detailActive = table.detail.active
  const detailList = table.detail.list
  const selectedList = table.selected.list
  const isSelected = !!selectedList.find(
    item => item?.order_id === data?.order_id,
  )
  const shouldOpenDetail =
    data?.id && detailActive?.id === data.id

  // ==================== ROW ========================================
  const rowCheckboxChange = () => {
    pageDispatch({
      type: actionTypes.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: isSelected
            ? selectedList.filter(item => item?.order_id !== data?.order_id)
            : [...selectedList, data],
        },
      },
    })
  }
  const rowDetailToggle = async () => {
    if (!data?.id) return

    if (data.id === detailActive?.id) {
      pageDispatch({
        type: actionTypes.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: actionTypes.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: findDetail },
      })
      return
    }

    fetchOrderDetail()
  }

  const fetchOrderDetail = async loading => {
    pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: !!loading })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/detail/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      
      let totalReturn = 0
      const purchaseReturn = newItem?.purchase_return || []
      if (purchaseReturn.length > 0) {
        // set total payment refund

        totalReturn = purchaseReturn.reduce(
          (p, n) => p + Number(n?.return_total_amount || 0),
          0,
        )
      }
      newItem.totalReturn = totalReturn
      pageDispatch({
        type: actionTypes.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, moreItem: newItem },
      })
    }
    pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false })
  }

  const copyOrderCode = () => {
    navigator.clipboard.writeText(data?.id)
    showAlert({ content: 'Đã sao chép mã vận đơn', type: 'success' })
  }

  // ==================== CELL ========================================
  // CODE ORDER
  const codeOrderhaveInventory = data?.has_inventory === '1'

  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }

  // PAYMENT
  const cellPaymentGetStatus = () => {
    const amount = Number(data?.total_amount) || 0
    const payment = Number(data?.total_payment) || 0
    if (amount <= payment) return 'success'
    if (payment > 0 && amount > payment) return 'warning'
    return 'danger'
  }

  const deletePurchase = async id => {
    pageDispatch({
      type: 'UPDATE_LOADING',
      payload: true
    })
    const response = await sendRequestAuth('delete',
      `${config.API}/purchase/delete/${id}`
      )

    if (response?.data?.success) {
      functions.applyPurchasesOtherFilter(null, true)
      showAlert({
        type: 'success',
        content: 'Xóa phiếu nhập hàng thành công'
      })
      pageDispatch({
        type: 'UPDATE_LOADING',
        payload: false
      })
    }else{
      showAlert({
        type: 'danger',
        content: 'Xóa phiếu nhập hàng thất bại'
      })
      pageDispatch({
        type: 'UPDATE_LOADING',
        payload: false
      })
    }
  }

  const importProductPurchase = async id => {
    pageDispatch({
      type: 'UPDATE_LOADING',
      payload: true
    })
    const response = await sendRequestAuth('post',
      `${config.API}/purchase/import-warehouse/${id}`
      )

    if (response?.data?.success) {
      functions.applyPurchasesOtherFilter(null, true)
      showAlert({
        type: 'success',
        content: 'Hàng hóa đã được nhập kho thành công'
      })
      pageDispatch({
        type: 'UPDATE_LOADING',
        payload: false
      })
    }else{
      showAlert({
        type: 'danger',
        content: 'Hàng hóa không thể nhập kho'
      })
      pageDispatch({
        type: 'UPDATE_LOADING',
        payload: false
      })
    }
  }

  const handlePrint = async id => {
    pageDispatch({
      type: 'UPDATE_LOADING',
      payload: true
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/purchase/print/${id}`
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
        pageDispatch({
          type: 'UPDATE_LOADING',
          payload: false
        })
        window.frames.frame.print()
        document.body.removeChild(frame)
      }, 1500)
    }else{
      showAlert({
        type: 'danger',
        content: 'Không thể in phiếu nhập'
      })
      pageDispatch({
        type: 'UPDATE_LOADING',
        payload: false
      })
    }
  }

  return {
    cell: {
      codeOrder: {
        dateTime: data?.dt_created ? cellCodeOrderFormatDateTime(data?.dt_created) : '---',
        haveInventory: codeOrderhaveInventory,
      },
      payment: { status: cellPaymentGetStatus() },
    },
    detail: {
      isLoading,
      active: detailActive,
      tabs: { payment: { formatDateTime: cellCodeOrderFormatDateTime } },
    },
    row: {
      isSelected,
      shouldOpenDetail,
      onCheckboxChange: rowCheckboxChange,
      onCopyOrderCode: copyOrderCode,
      onToggleDetail: rowDetailToggle,
      refreshOrderDetails: fetchOrderDetail,
      importProductPurchase, deletePurchase,
    },
    print: {
      onClick: handlePrint
    },
  }
}

export default useOrderRow
