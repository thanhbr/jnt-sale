import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useState} from 'react'
import {FacebookLivestreamContext} from '../provider/_context'
import {facebookConversationActions} from '../provider/_actions'

const useOrderRow = data => {
  const {showAlert} = useAlert()

  const {pageState, pageDispatch} = useContext(FacebookLivestreamContext)
  const {table} = pageState

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
  const copyOrderCode = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(data?.video_id)
    showAlert({content: 'Đã sao chép ID livestream', type: 'success'})
  }

  const fetchRowDetail = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/detail/${data.id}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: newItem, list: [...detailList, newItem]},
      })
    }
  }

  const exportOrderExcel = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/detail/export/${data.id}`,
    )
    if (response?.data?.success && response?.data?.data?.url) {
      showAlert({content: 'Xuất excel thành công', type: 'success'})
      return response.data.data.url
    } else {
      showAlert({content: 'Xuất excel thất bại', type: 'danger'})
      return '#'
    }
  }

  const rowCheckboxChange = () =>
    pageDispatch({
      type: facebookConversationActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: isSelected
            ? selectedList.filter(item => item?.id !== data?.id)
            : [...selectedList, data],
        },
      },
    })

  const rowDetailToggle = async () => {
    if (!data?.id) return
    if (data.id === detailActiveId) {
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
        payload: {id: null},
      })
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: null},
      })
      return
    }

    pageDispatch({
      type: facebookConversationActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
      payload: {id: data.id},
    })

    const findDetail = detailList.find(item => item?.id === data.id)
    if (findDetail) {
      pageDispatch({
        type: facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: {active: findDetail},
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

  // PAYMENT
  const cellPaymentGetStatus = () => {
    const amount = Number(data?.total_amount) || 0
    const payment = Number(data?.total_payment) || 0
    if (amount <= payment) return 'success'
    if (payment > 0 && amount > payment) return 'warning'
    return 'danger'
  }

  return {
    cell: {
      codeOrder: {
        dateTime: cellCodeOrderFormatDateTime(data?.date),
        haveInventory: codeOrderhaveInventory,
      },
      payment: {status: cellPaymentGetStatus()},
    },
    detail: {
      id: detailActiveId,
      active: detailActive,
      tabs: {payment: {formatDateTime: cellCodeOrderFormatDateTime}},
    },
    row: {
      data,
      isSelected,
      shouldOpenDetail,
      shouldOpenSubmitPaymentModal,
      onCheckboxChange: rowCheckboxChange,
      onCloseSubmitPaymentModal: () => setShouldOpenSubmitPaymentModal(false),
      onCopyOrderCode: copyOrderCode,
      onExportOrderExcel: exportOrderExcel,
      onFetchDetail: fetchRowDetail,
      onOpenSubmitPaymentModal: () => setShouldOpenSubmitPaymentModal(true),
      onToggleDetail: rowDetailToggle,
    },
  }
}

export default useOrderRow
