import {getData, postData} from 'api/api'
import {getUrlOrder, getUrlOrderUpdateStatus} from 'api/url'
import {OrderContext} from 'LayoutWrapper'
import {useContext} from 'react'
export const useOrder = () => {
  const [state, dispatch] = useContext(OrderContext)
  let params = {}
  const filter = state.filter
  const meta = state.meta
  params = {
    keyword: filter.keyword.value,
    date_type: filter.date_type.value,
    start_date: filter.start_date.value,
    end_date: filter.end_date.value,
    customer_id: filter.customer_id.value,
    group_user: filter.group_user.value,
    user_id: filter.user_id.value,
    warehouse_id: filter.warehouse_id.value,
    shipping_partner: filter.shipping_partner.value,
    shipping_status: filter.shipping_status.value,
    product_id: filter.product_id.value,
    livestream_id: filter.livestream_id.value,
    is_duplicate: filter.is_duplicate.value,
    order_origin_id: filter.order_origin_id.value,
    start: meta.start,
    per_page: meta.per_page,
  }
  const fetchData = async () => {
    const {data: resData} = await getData(getUrlOrder(params))
    const {success, data} = resData
    if (success && data) {
      const newData = data.map(item => ({
        ...item,
        expand_icon: '',
        select_box: '',
      }))
      dispatch({type: 'UPDATE_ORDER_GRID', payload: newData})
      dispatch({type: 'UPDATE_SEARCH_STATUS', payload: true})
      dispatch({type: 'SET_LOADING', payload: false})
    }
  }

  const changeOrderStatus = async inputData => {
    dispatch({type: 'SET_LOADING', payload: true})
    const {data: resData} = await postData(getUrlOrderUpdateStatus(), inputData)
    const {success, message, meta, errors} = resData
    if (success && meta) {
      dispatch({type: 'SET_LOADING', payload: false})
      dispatch({type: 'SET_ORDER_UPDATE_STATUS_MESSAGE', payload: message})
      return {
        status: true,
        message
      }

    } else if (!success && errors) {
      return {
        status: false,
        message: errors?.message,
        errorData: errors?.details,
      }
    }
  }
  const onchangePagination = async page => {
    const amount = state.meta?.per_page || 10
    dispatch({type: 'SET_PAGE', payload: page * amount})
    dispatch({type: 'SET_LOADING', payload: true})
    dispatch({ type: 'SET_LOAD_DETAIL' })
  }
  const handleAmountChange = async amount => {
    dispatch({type: 'SET_PAGE', payload: 0})
    dispatch({type: 'SET_PER_PAGE', payload: amount})
    dispatch({type: 'SET_LOADING', payload: true})
    dispatch({ type: 'SET_LOAD_DETAIL' })
  }
  return {
    fetchData,
    changeOrderStatus,
    onchangePagination,
    handleAmountChange,
    data: state.dataGrid,
    meta: state.meta,
    loading: state.loading,
    loadDetail: state.loadDetail,
  }
}
