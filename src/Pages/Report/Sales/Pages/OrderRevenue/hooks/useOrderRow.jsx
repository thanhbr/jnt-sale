import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useState } from 'react'
import { OrderContext } from '../provider/_context'
import { orderActions } from '../provider/_reducer'

const useOrderRow = data => {
  const { showAlert } = useAlert()

  const { pageState, pageDispatch } = useContext(OrderContext)
  const { table } = pageState

  const [shouldOpenSubmitPaymentModal, setShouldOpenSubmitPaymentModal] =
    useState(false)

  const detailActive = table.detail.active
  const detailActiveId = table.detail.id
  const detailList = table.detail.list

  const selectedList = table.selected.list

  const isSelected = !!selectedList.find(item => item?.id === data?.id)

  const codeOrderhaveInventory = data?.has_inventory === '1'

  const shouldOpenDetail = data?.id && detailActiveId === data.id

  // ==================== ROW ========================================

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/report/sales/order-details-report/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = {
        order_details : response?.data?.data,
        id : data.id
      }
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, list: [...detailList, newItem] },
      })
    }
  }

  const rowDetailToggle = async () => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: { id: null },
      })
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    pageDispatch({
      type: orderActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: { id: data.id },
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: findDetail },
      })
    }

    fetchRowDetail()
  }

  // ==================== CELL ========================================
  // CODE ORDER
  const cellCodeOrderFormatDateTime = dateTimeParam => {
    const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
    const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
    const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
    const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
    const hm = `${hms[0]}:${hms[1]}`
    return `${dmy} ${hm}`.trim()
  }

  return {
    cell: {
      codeOrder: {
        dateTime: cellCodeOrderFormatDateTime(data?.date),
        haveInventory: codeOrderhaveInventory,
      },
    },
    detail: {
      id: detailActiveId,
      active: detailActive,
      tabs: { payment: { formatDateTime: cellCodeOrderFormatDateTime } },
    },
    row: {
      data,
      isSelected,
      shouldOpenDetail,
      shouldOpenSubmitPaymentModal,
      onCloseSubmitPaymentModal: () => setShouldOpenSubmitPaymentModal(false),
      onFetchDetail: fetchRowDetail,
      onOpenSubmitPaymentModal: () => setShouldOpenSubmitPaymentModal(true),
      onToggleDetail: rowDetailToggle,
    },
  }
}

export default useOrderRow
