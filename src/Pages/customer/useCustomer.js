import { deleteData, postData } from 'api/api'
import { getUrlCustomerActive, getUrlDeleteCustomer } from 'api/url'
import { removeAcent } from 'common/fieldText/_functions'
import { useContext } from 'react'
import { CustomerContext } from '.'

const useCustomer = () => {
  const {dispatch, state} = useContext(CustomerContext)
  const { filter } = state

  const changeCustomerStatus = async inputData => {
    // dispatch({type: 'SET_LOADING', payload: true})
    const {data: resData} = await postData(getUrlCustomerActive(), inputData)
    const {success, message, meta, errors} = resData
    if (success && meta) {
      // dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_ORDER_UPDATE_STATUS_MESSAGE', payload: message})
      return {
        status: true,
        message,
      }
    } else if (!success && errors) {
      return {
        status: false,
        message: errors?.message,
        errorData: errors?.details,
      }
    }
  }
  const changeDeleteCustomer = async inputData => {
    // dispatch({type: 'SET_LOADING', payload: true})
    const {data: resData} = await deleteData(getUrlDeleteCustomer(inputData))
    const {success, message} = resData
    if (success) {
      // dispatch({type: 'SET_LOADING', payload: false})
      return {
        status: true,
        message,
      }
    } else if (!success) {
      return {
        status: false,
        message: message,
      }
    }
  }

    // ===== ===== ===== ===== =====
  // SHIPPING STATUS
  // ===== ===== ===== ===== =====
  const shippingKeyword = state.shippingStatus.keyword
  const shippingStatusList = state.shippingStatus.list
  const shippingStatusListOrigin = state.shippingStatus.listOrigin
  const shippingStatusTab = state.shippingStatus.tab
  const shippingStatusValue = state.shippingStatus.value

  const handleShippingStatusChange = data => {
    const find = shippingStatusValue.find(item => item.id === data.id)
    const shippingStatusListData =
      shippingStatusTab === 'checked'
        ? shippingStatusValue.filter(item => item.id !== data.id)
        : shippingStatusList
    const shippingStatusValueData = find
      ? shippingStatusValue.filter(item => item.id !== data.id)
      : [...shippingStatusValue, data]

    dispatch({
      type: 'FILTER_SHIPPING_STATUS_UPDATE',
      payload: {
        list: shippingStatusListData,
        value: shippingStatusValueData,
      },
    })
  }

  const handleClearShippingStatus = () => {
    dispatch({type: 'FILTER_SHIPPING_STATUS_CLEAR_VALUE'})
  }
 
  const handleShippingStatusKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const findList =
      shippingStatusTab === 'checked'
        ? shippingStatusValue
        : shippingStatusListOrigin

    const shippingStatusListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_SHIPPING_STATUS_KEYWORD_UPDATE',
      payload: {
        keyword: data?.value || '',
        list: shippingStatusListData,
      },
    })
  }

  const handleShippingStatusTabChange = tab => {
    const formatDataValue = shippingKeyword
      ? removeAcent(shippingKeyword?.toLowerCase())
      : ''

    const findList =
      tab === 'checked' ? shippingStatusValue : shippingStatusListOrigin

    const shippingStatusListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_SHIPPING_STATUS_TAB_UPDATE',
      payload: {list: shippingStatusListData, tab},
    })
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  return {
    changeDeleteCustomer,
    changeCustomerStatus,
    shippingStatus: {
      list: shippingStatusList,
      tab: shippingStatusTab,
      value: shippingStatusValue,
      onChange: handleShippingStatusChange,
      onKeywordChange: handleShippingStatusKeywordChange,
      onTabChange: handleShippingStatusTabChange,
      onClearValue: handleClearShippingStatus,
    },
  }
}

export default useCustomer
