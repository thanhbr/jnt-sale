import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useEffect, useRef, useState} from 'react'
import {WareHouseTransferContext} from '../provider/_context'
import {warehouseTransferActions} from '../provider/_reducer'
import UseWareHouseTransferFilterForm from './useWareHouseTransferFilterForm'

const useOrderTHead = () => {
  const {showAlert} = useAlert()
  const {functions} = UseWareHouseTransferFilterForm()

  const {pageState, pageDispatch} = useContext(WareHouseTransferContext)
  const {table} = pageState
  const [printUrl, setPrintUrl] = useState('#')
  const [statusUpdateErrList, setStatusErrList] = useState([])
  const [
    shouldOpenUpdateStatusFailedModal,
    setShouldOpenUpdateStatusFailedModal,
  ] = useState(false)

  const displayList = table.display.list.filter(item => item.shipping_status_id !== "7")
  const selectedList = table.selected.list.filter(item => item.shipping_status_id !== "7")
  // CHECKBOX
  const shouldActiveCheckbox = selectedList.length > 0

  const isActive =
    displayList.length <= 0
      ? false
      : selectedList.length < displayList.length
      ? false
      : !!!displayList.find(
          item =>
            !!!selectedList.find(find => find?.order_id === item?.order_id),
        )

  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive)
      // on value is false
      newSelectedList = selectedList.filter(item => !!!displayList.find(find => find?.order_id === item?.order_id))
    else {
      // on value is true
      let addingList = []
      displayList.forEach(item => {
        if (item?.shipping_status_id === '7') return
        if (!!!selectedList.find(find => find?.order_id === item?.order_id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }

    pageDispatch({
      type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: newSelectedList}},
    })
  }

  // SELECTED ACTION DROPDOWN
  const [shouldOpenSelectedActionMenu, setShouldOpenSelectedActionMenu] =
    useState(false)
  const [shouldOpenPrint, setShouldOpenPrint] = useState(false)

  const fetchUpdateOrderStatus = async (idList, status) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/update_status`,
      JSON.stringify({
        order_ids: idList,
        status: status,
      }),
    )
    if (response?.data?.success) {
      showAlert({content: 'Cập nhật trạng thái thành công', type: 'success'})

      functions.fetchUpdateData()
    } else {
      pageDispatch({
        type: warehouseTransferActions.NOTIFICATIONS_LIST_UPDATE,
        payload: {
          notifications: {
            list: Array.isArray(response?.data?.errors?.details)
              ? response.data.errors.details.filter(item => !!!item?.success)
              : [],
          },
        },
      })
    }

    pageDispatch({
      type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: [],
        },
      },
    })
  }

  const handleBulkOrderApply = statusValue => {
    fetchUpdateOrderStatus(
      selectedList.map(item => item.order_id),
      statusValue,
    )
  }

  const handleNotifcationDelete = () => {
    pageDispatch({
      type: warehouseTransferActions.NOTIFICATIONS_LIST_UPDATE,
      payload: {
        notifications: {
          list: [],
        },
      },
    })
  }

  const printLink = useRef()
  const handlePrint = async opt => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/print-upos`,
      JSON.stringify({
        order_id: selectedList.map(item => item.order_id),
        print_size: opt?.size,
        print_type: 'shipment',
      }),
    )

    if (response?.data?.success) {
      // in
      let frame = document.createElement('iframe')
      frame.name = 'frame'
      frame.style.position = 'absolute'
      frame.style.top = '-1000000px'
      document.body.appendChild(frame)
      let content = ''
      response?.data?.data.map(item => {
        content += item
      })
      const frameDoc = frame.contentWindow
        ? frame.contentWindow
        : frame.contentDocument.document
        ? frame.contentDocument.document
        : frame.contentDocument
      frameDoc.document.open()
      frameDoc.document.write(content)
      frameDoc.document.close()
      window.frames.frame.focus()
      functions.applyWareHouseTransferOtherFilter(null,true)
      setTimeout(function () {
        window.frames.frame.print()
        document.body.removeChild(frame)
      }, 1500)

      pageDispatch({
        type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
        payload: {
          selected: {
            list: [],
          },
        },
      })
      return true
    }
  }
  const handlePrintClick = async (type, name = '') => {
    pageDispatch({type: 'UPDATE_LOADING', payload: true})
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/print-partner`,
      {
        order_id: selectedList.map(item => item.order_id),
        print_type: type,
      },
    )
    if (response?.data?.success && response?.data?.data?.url) {
      if (response.data.data.url && response.data.data.url !== '#') {
        setPrintUrl(response.data.data.url)
      }
      functions.applyWareHouseTransferOtherFilter(null,true)

      pageDispatch({
        type: warehouseTransferActions.TABLE_SELECTED_LIST_UPDATE,
        payload: {
          selected: {
            list: [],
          },
        },
      })
    } else {
      showAlert({
        content:
          'Hãy đảm bảo rằng các đơn bạn chọn in đều có cùng đơn vị vận chuyển là ' +
          name +
          '!',
        type: 'danger',
      })
    }
    pageDispatch({type: 'UPDATE_LOADING', payload: false})
  }

  return {
    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
    },
    modal: {
      updateStatus: {
        data: statusUpdateErrList,
        open: !!(
          shouldOpenUpdateStatusFailedModal && statusUpdateErrList.length > 0
        ),
        onToggle: setShouldOpenUpdateStatusFailedModal,
      },
    },
    notifications: {
      delete: handleNotifcationDelete,
    },
    selected: {
      actionMenu: {
        open: [shouldOpenSelectedActionMenu, shouldOpenPrint],
        onToggle: [setShouldOpenSelectedActionMenu, setShouldOpenPrint],
        actions: [() => handleBulkOrderApply(7)],
        printAction: [
          () => handlePrintClick('jt', 'J&T Express'),
          () => handlePrintClick('ghn80', 'GHN'),
          () => handlePrintClick('vtp', 'Viettel Post'),
          () => handlePrintClick('supership', 'SuperShip'),
          () => handlePrintClick('nhattin', 'In đơn Nhất Tín'),
          () => handlePrintClick('snappy', 'SNAPPY'),
          () => handlePrint({size: 'a4'}),
          () => handlePrint({size: 'a5'}),
          () => handlePrint({size: 'k80'}),
        ],
      },
      list: selectedList,
    },
    print: {
      link: printLink,
      url: printUrl,
      onClick: [
        () => handlePrint({size: 'a4'}),
        () => handlePrint({size: 'a5'}),
        () => handlePrint({size: 'k80'}),
      ],
    },
    loading: pageState.loading,
  }
}

export default useOrderTHead
