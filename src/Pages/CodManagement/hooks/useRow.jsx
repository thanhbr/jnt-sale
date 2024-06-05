import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useRef, useState } from 'react'
import { CodContext} from '../provider/_context'
import { orderActions } from '../provider/_reducer'
import { useTranslation } from "react-i18next";

const useOrderRow = data => {
  const { showAlert } = useAlert()

  const { pageState, pageDispatch } = useContext(CodContext)
  const { t } = useTranslation()
  const { table } = pageState
  const isLoading = table.detail.loading
  const detailActive = table.detail.active
  const detailList = table.detail.list
  const selectedList = table.selected.list
  const isSelected = !!selectedList.find(
    item => item?.order_id === data?.order_id,
  )
  const shouldOpenDetail =
    data?.billcode && detailActive?.billcode === data.billcode

  // ==================== ROW ========================================
  const rowCheckboxChange = () => {
    pageDispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
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
    if (!data?.billcode) return

    if (data.billcode === detailActive?.billcode) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    const findDetail = detailList.find(item => item?.billcode === data.billcode)
    if (findDetail) {
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
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
      `${config.API}/order/delivery/detail/${data.billcode}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: orderActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, moreItem: newItem },
      })
    }
    pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false })
  }

  const copyOrderCode = () => {
    navigator.clipboard.writeText(data?.billcode)
    showAlert({ content: t("copy_billcode"), type: 'success' })
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
        dateCreated: cellCodeOrderFormatDateTime(data?.date_created),
        dateSended: cellCodeOrderFormatDateTime(data?.date_sended),
        dateGotProducts: cellCodeOrderFormatDateTime(data?.date_got_products),
      },
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
    }
  }
}

export default useOrderRow
