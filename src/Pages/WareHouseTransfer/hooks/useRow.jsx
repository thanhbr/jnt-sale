import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useRef, useState } from 'react'
import { WareHouseTransferContext } from '../provider/_context'
import { warehouseTransferActions } from '../provider/_reducer'
import useDeliveryFilterForm from './useWareHouseTransferFilterForm'

const useOrderRow = data => {
  const { showAlert } = useAlert()
  const {functions} = useDeliveryFilterForm()

  const { pageState, pageDispatch } = useContext(WareHouseTransferContext)
  const { table } = pageState
  const isLoading = table.detail.loading
  const detailActive = table.detail.active || []
  const detailList = table.detail.list
  const selectedList = table.selected.list
  const isSelected = !!selectedList.find(
    item => item?.order_id === data?.order_id,
  )
  const shouldOpenDetail =
    data?.code && detailActive.length > 0 && detailActive[0]?.code === data.code

  // ==================== ROW ========================================
  const rowCheckboxChange = () => {
    pageDispatch({
      type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
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
    if (!data?.code) return

    if (data.code === detailActive[0]?.code) {
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: null },
      })
      return
    }

    const findDetail = detailList.find(item => item[0]?.code === data.code)

    if (findDetail) {
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_DETAIL_UPDATE,
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
      `${config.API}/warehouse/transfer/detail/${data.code}`,
    )

    if (!!response?.data?.success) {
      const newItem = response?.data?.data
      pageDispatch({
        type: warehouseTransferActions.TABLE_DISPLAY_DETAIL_UPDATE,
        payload: { active: newItem, moreItem: newItem },
      })
    }
    pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false })
  }

  const copyOrderCode = () => {
    navigator.clipboard.writeText(data?.code)
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

  const handlePrint = async opt => {
    if(opt?.size === 'jt') {
      pageDispatch({type: 'UPDATE_LOADING', payload: true})
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/print-partner`,
        {
          order_id: JSON.parse("[" + data?.order_id + "]"),
          print_type: 'jt',
        },
      )
      if (response?.data?.success && response?.data?.data?.url) {
        if (response.data.data.url && response.data.data.url !== '#') {
          let linkDVVC = document.createElement('a')
          linkDVVC.href = response.data.data.url
          linkDVVC.target = '_blank'
          document.body.appendChild(linkDVVC);
          linkDVVC.click()
          functions.applyDeliveryOtherFilter(null,true)
        }
      } else {
        showAlert({
          content: `Hãy đảm bảo rằng các đơn bạn chọn in đều có cùng đơn vị vận chuyển!`,
          type: 'danger',
        })
      }
      pageDispatch({type: 'UPDATE_LOADING', payload: false})
    } else {
      const response = await sendRequestAuth(
        'post',
        `${config.API}/order/print-upos`,
        JSON.stringify({
          order_id: [data.order_id],
          print_size: opt?.size,
          print_type: 'shipment',
        }),
      )
      if (response?.data?.success) {
        let frame = document.createElement('iframe')
        frame.name = "frame"
        frame.style.position = "absolute"
        frame.style.top = "-1000000px"
        document.body.appendChild(frame)
        let content = ''
        response?.data?.data.map((item) => {content += item})
        const frameDoc = (frame.contentWindow) ? frame.contentWindow : (frame.contentDocument.document) ? frame.contentDocument.document : frame.contentDocument
        frameDoc.document.open()
        frameDoc.document.write(content)
        frameDoc.document.close()
        window.frames.frame.focus()
        functions.applyDeliveryOtherFilter(null,true)
        setTimeout(function() {
          window.frames.frame.print()
          document.body.removeChild(frame)
        }, 1500)
        return true
      }
    }
  }

  return {
    cell: {
      codeOrder: {
        dateTime: cellCodeOrderFormatDateTime(data?.dt_created),
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
    },
    print: {
      onClick: [
        () => handlePrint({ size: 'jt' }),
        () => handlePrint({ size: 'a4' }),
        () => handlePrint({ size: 'a5' }),
        () => handlePrint({ size: 'k80' }),
      ]
    },
  }
}

export default useOrderRow
