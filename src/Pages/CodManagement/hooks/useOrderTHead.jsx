import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import {useContext, useEffect, useRef, useState} from 'react'
import {CodContext} from '../provider/_context'
import {orderActions} from '../provider/_reducer'
import useCodFilterForm from './useCodFilterForm'
import {COD_STATUS_COMPARING} from '../interfaces/_constants'
import { useTranslation } from "react-i18next";

const useOrderTHead = () => {
  const {showAlert} = useAlert()
  const {functions} = useCodFilterForm()
  const { t } = useTranslation()

  const {pageState, pageDispatch} = useContext(CodContext)
  const { panels, table} = pageState
  const [statusUpdateErrList, setStatusErrList] = useState([])
  const [
    shouldOpenUpdateStatusFailedModal,
    setShouldOpenUpdateStatusFailedModal,
  ] = useState(false)

  const displayList = table.display.list
  const selectedList = table.selected.list
  // CHECKBOX
  const shouldActiveCheckbox = selectedList.length > 0

  const displayListSelect =  displayList.filter(
    item => COD_STATUS_COMPARING.includes(item.shipping_status_id) == true && item.comparing_check != 1
  );
  const isActive =
      displayListSelect.length <= 0
      ? false
      : selectedList.length < displayListSelect.length
      ? false
      : !!!displayList.find(
          item =>
            !!!selectedList.find(find => find?.order_id === item?.order_id) && COD_STATUS_COMPARING.includes(item.shipping_status_id) == true && item.comparing_check != 1
        )
  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive){
      newSelectedList = selectedList.filter(
        item => !!!displayList.find(find => find?.order_id === item?.order_id) && COD_STATUS_COMPARING.includes(item.shipping_status_id) == true && item.comparing_check != 1
      )
      }else {
      let addingList = []
    
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.order_id === item?.order_id) && COD_STATUS_COMPARING.includes(item.shipping_status_id) == true && item.comparing_check != 1)
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }

    pageDispatch({
      type: orderActions.TABLE_SELECTED_LIST_UPDATE,
      payload: {selected: {list: newSelectedList}},
    })
  }

  const fetchUpdateComparingStatus = async (idList, status) => { 
    pageDispatch({type: 'UPDATE_LOADING', payload: true})
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/delivery/cod-comparing-check`,
      JSON.stringify({
        orderIds: idList,
        status: 1,
      }),
    )
    if (response?.data?.success) {
      await functions.fetchReloadData()
      showAlert({content:  t("update_status_cod_checked_success"), type: 'success'})
      pageDispatch({type: 'UPDATE_LOADING', payload: false})
      
    } else {
      pageDispatch({
        type: orderActions.NOTIFICATIONS_LIST_UPDATE_FAIL,
        payload: {
          notifications: {
            listFail: Array.isArray(response?.data?.errors?.details)
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

  const handleComparingApply = () => {
    fetchUpdateComparingStatus(
      selectedList.map(item => item.order_id),
    )
  }
  const handleComparingCheckbox = (order_id) => {
    fetchUpdateComparingStatus(
     [order_id]
    )
  }

  const handleNotifcationDelete = () => {
    pageDispatch({
      type: orderActions.NOTIFICATIONS_LIST_UPDATE_FAIL,
      payload: {
        notifications: {
          listFail: [],
        },
      },
    })
    pageDispatch({
      type: orderActions.NOTIFICATIONS_LIST_UPDATE_SUCCESS,
      payload: {
        notifications: {
          listSuccsess: [],
        },
      },
    })
  }


  return {
    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
      originLength: parseInt(panels.orderTotal, 10),
      onChange: handleComparingCheckbox
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
      actions: handleComparingApply,
      list: selectedList,
    },
    loading: pageState.loading,
  }
}

export default useOrderTHead
