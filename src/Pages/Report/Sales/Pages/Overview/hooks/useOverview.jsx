import { useReducer } from 'react'
import { actionTypes, SaleOverviewReducer } from '../provider/_reducer'
import { SaleOverviewInitialState } from '../provider/initState'
import { convertDateTimeToApiFormat } from '../../../../../../common/form/datePicker/_functions'
import { sendRequestAuth } from '../../../../../../api/api'
import config from '../../../../../../config'

const useOverview = () => {
  const [state, dispatch] = useReducer(SaleOverviewReducer, SaleOverviewInitialState)

  const handleOriginFetch = async dateTimeValue => {

    dispatch({
      type: actionTypes.UPDATE_LOADING,
      payload: true
    })
    const splitDate = dateTimeValue.split(' - ')
    const startDate = convertDateTimeToApiFormat(splitDate[0])
    const endDate = convertDateTimeToApiFormat(splitDate[1])
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/overview/order?start_date=${startDate}&end_date=${endDate}&date_type=date`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/overview/delivery?start_date=${endDate}&end_date=${endDate}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/overview/top-revenue?start_date=${startDate}&end_date=${endDate}`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/overview/top-product?start_date=${startDate}&end_date=${endDate}`,
      )
    ])

    if (!!response[0]?.data) {
      const revenues = response[0]?.data?.data.map(
        item => item.value.revenue
      )
      const profits = response[0]?.data?.data.map(
        item => item.value.profit
      )
      const products = response[0]?.data?.data.map(
        item => item.value.product
      )
      const orders = response[0]?.data?.data?.map(
        item => item.value.order
      )
      const timeX = response[0]?.data?.data.map(
        date => date?.title_date
      )
      const overview = {...response[0]?.data,revenues,products,profits,orders,timeX}
      dispatch({
        type: actionTypes.SET_OVERVIEW,
        payload: overview
      })
      const orderRevenue =  response[1].data.data.map((data) => {
        return {
          'label': data.title,
          'value': data.total_orders,
          'price': data.total_cods,
        }
      })
      dispatch({
        type: actionTypes.UPDATE_ORDER,
        payload: {
          list: orderRevenue,
          origin: response[1].data.data
        }
      })
      dispatch({
        type: actionTypes.UPDATE_EMPLOYEE,
        payload: response[2].data.data
      })

      dispatch({
        type: actionTypes.UPDATE_PRODUCT,
        payload: response[3].data.data
      })

      dispatch({
        type: actionTypes.UPDATE_LOADING,
        payload: false
      })
    }
  }

  return {
    provider: {
      state, dispatch
    },
    origin: handleOriginFetch
  }
}
export default useOverview