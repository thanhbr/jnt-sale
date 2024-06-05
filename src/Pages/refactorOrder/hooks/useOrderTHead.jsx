import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useState} from 'react'
import {OrderContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import useOrderFilterForm from './useOrderFilterForm'

const useOrderTHead = () => {
  const {showAlert} = useAlert()
  const {functions} = useOrderFilterForm()

  const {pageState, pageDispatch} = useContext(OrderContext)
  const {notifications, filter, table} = pageState

  const [statusUpdateErrList, setStatusErrList] = useState([])
  const [
    shouldOpenUpdateStatusFailedModal,
    setShouldOpenUpdateStatusFailedModal,
  ] = useState(false)
  const [globalLoading, setGlobalLoading] = useState(false)

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
          item => !!!selectedList.find(find => find?.id === item?.id),
        )

  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive)
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.id === item?.id),
      )
    else {
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.id === item?.id))
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
      const hasError = Array.isArray(response?.data?.errors?.details)

      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE,
        payload: {
          notifications: {
            list: hasError
              ? response.data.errors.details.filter(item => !!!item?.success)
              : [],
          },
        },
      })

      if (hasError && response?.data?.errors?.details?.find(x => x.success)) {
        functions.fetchUpdateData()
      }
    }

    pageDispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {
        selected: {
          list: [],
        },
      },
    })

    return response
  }

  const handleBulkOrderApply = statusValue => {
    setGlobalLoading(true)

    const response = fetchUpdateOrderStatus(
      selectedList.map(item => item.id),
      statusValue,
    )

    response.then(() => {
      setGlobalLoading(false)
    })

    return response
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

  return {
    globalLoading: {value: globalLoading, set: setGlobalLoading},
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
        open: shouldOpenSelectedActionMenu,
        onToggle: setShouldOpenSelectedActionMenu,
        actions: [
          () => handleBulkOrderApply(1),
          () => handleBulkOrderApply(7),
          () => handleBulkOrderApply(15),
        ],
      },
      list: selectedList,
    },
  }
}

export default useOrderTHead
