import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useEffect, useRef, useState} from 'react'
import {DeliveryContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import UsePartSignFilterForm from './usePartSignFilterForm'
import {useTranslation} from "react-i18next";

const useOrderTHead = () => {
  const {showAlert} = useAlert()
  const {functions} = UsePartSignFilterForm()
  const { t } = useTranslation()

  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {panels, table} = pageState
  const [printUrl, setPrintUrl] = useState('#')
  const [statusUpdateErrList, setStatusErrList] = useState([])
  const [
    shouldOpenUpdateStatusFailedModal,
    setShouldOpenUpdateStatusFailedModal,
  ] = useState(false)

  const displayList = table.display.list
  const selectedList = table.selected.list
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
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.order_id === item?.order_id),
      )
    else {
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.order_id === item?.order_id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }

    pageDispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
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
      showAlert({content: t("status_update"), type: 'success'})

      functions.fetchUpdateData()
    } else {
      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE,
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
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
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
      type: orderActions.NOTIFICATIONS_LIST_UPDATE,
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
      setTimeout(function () {
        window.frames.frame.print()
        document.body.removeChild(frame)
      }, 1500)
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
      if (response.data.data.url && response.data.data.url !== '#')
        setPrintUrl(response.data.data.url)
    } else {
      showAlert({
        content:
          t("selected_orders_same_shipping_carrier") +
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
      originLength: parseInt(panels.orderTotal, 10),
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
