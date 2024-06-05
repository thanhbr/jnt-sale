import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useContext } from 'react'
import { DateRangePicker } from 'rsuite'
import { SaleOverviewContext } from '../provider/_context'
import { actionTypes } from '../provider/_reducer'
import { convertDateTimeToApiFormat } from '../../../../../../common/form/datePicker/_functions'
import { ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES } from '../interfaces/_constants'
import { transformDateTime } from '../utils/transform'

const useOverviewFilter = () => {

  const { pageState, pageDispatch } = useContext(SaleOverviewContext)
  const { filter } = pageState

  const getDateFromNow = (n, otp = { type: 'start' }) => {
    let date = new Date()
    if (otp && otp?.type == 'start')
      date.setHours(0, 0, 0, 0)
    if (otp && otp?.type == 'end')
      date.setHours(23, 59, 0, 0)
    const res = date.setTime(date.getTime() + n * 24 * 60 * 60 * 1000)
    return new Date(res)
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // ===== ===== ===== ===== =====
  // DATE TIME
  // ===== ===== ===== ===== =====
  const { afterToday } = DateRangePicker
  const dateTimeActiveValue = filter.dateTime.activeValue
  const dateTimeDefaultValue = [
    getDateFromNow(-7, { type: 'start' }),
    getDateFromNow(0, { type: 'end' }),
  ]
  const dateTimeEnd = filter.dateTime.end
  const dateTimeStart = filter.dateTime.start
  const dateTimeType = filter.dateTime.type
  const dateTimeOption = filter.dateTime.option
  const dateTimeValue = filter.dateTime.value
  const dateTimeLabel = filter.dateTime.label
  const dateTimeTrigger = filter.dateTime.trigger

  const handleDateTimeChange = data => {
    const timeValue = transformDateTime({ value: data.value, type: dateTimeType })
    pageDispatch({
      type: actionTypes.FILTER_DATE_TIME_VALUE_UPDATE,
      payload: {
        value: timeValue,
        label: data.label,
        active: data.value,
      },
    })
    const collection = {
      date_type: dateTimeType || 'date',
      start_date: convertDateTimeToApiFormat(timeValue.split(' - ')[0]) || '',
      end_date: convertDateTimeToApiFormat(timeValue.split(' - ')[1]) || '',
    }
    fetchOverviewByFilter(collection, { forceLoading: true })
  }

  const handleDateTimeDefault = type => {
    let timeValue, dataDate = ''

    if (type == 'date')
      dataDate = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0].option[0]

    if (type == 'month')
      dataDate = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[1].option[0]

    if (type == 'quarter')
      dataDate = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[2].option[0]

    if (type == 'year')
      dataDate = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[3].option[0]
    timeValue = transformDateTime({ value: dataDate.value, type: type })
    pageDispatch({
      type: actionTypes.FILTER_DATE_TIME_VALUE_UPDATE,
      payload: {
        value: timeValue,
        label: dataDate.label,
        active: dataDate.value,
      },
    })
    const collection = {
      date_type: type || 'date',
      start_date: convertDateTimeToApiFormat(timeValue.split(' - ')[0]) || '',
      end_date: convertDateTimeToApiFormat(timeValue.split(' - ')[1]) || '',
    }
    fetchOverviewByFilter(collection, { forceLoading: true })
  }

  const handleDateTimeTypeChange = data => {
    if(data.category.value == dateTimeType) return
    const optionDateTime = ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES.find(item => item.id == data.category.id) || {}
    pageDispatch({
      type: actionTypes.FILTER_DATE_TIME_TYPE_UPDATE,
      payload: {
        type: data.category.value,
        option: optionDateTime.option
      },
    })
    handleDateTimeDefault(data.category.value)
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const fetchOverviewByFilter = async (qs, opt) => {
    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: actionTypes.UPDATE_LOADING_STATISTIC,
        payload: true,
      })

    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/report/sales/overview/order${queryString}`,
      ),
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
      const overview = { ...response[0]?.data, revenues, products, profits, orders, timeX }
      pageDispatch({
        type: actionTypes.SET_OVERVIEW,
        payload: overview
      })
    }

    if (Number.isNaN(opt?.activePage) || opt?.forceLoading)
      pageDispatch({
        type: actionTypes.UPDATE_LOADING_STATISTIC,
        payload: false,
      })
  }

  const refreshOverview = async () => {

    pageDispatch({
      type: actionTypes.UPDATE_LOADING,
      payload: true
    })
    const collection = {
      date_type: dateTimeType || 'date',
      start_date:
        dateTimeStart && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[0])
          : '',
      end_date:
        dateTimeEnd && dateTimeValue
          ? convertDateTimeToApiFormat(dateTimeValue.split(' - ')[1])
          : '',
    }
    fetchOverviewByFilter(collection, { forceLoading: true })
    const splitDate = dateTimeValue.split(' - ')
    const startDate = convertDateTimeToApiFormat(splitDate[0])
    const endDate = convertDateTimeToApiFormat(splitDate[1])
    const response = await Promise.all([
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
      const orderRevenue =  response[0].data.data.map((data) => {
        return {
          'label': data.title,
          'value': data.total_orders,
          'price': data.total_cods,
        }
      })
      pageDispatch({
        type: actionTypes.UPDATE_ORDER,
        payload: {
          list: orderRevenue,
          origin: response[0].data.data
        }
      })
      pageDispatch({
        type: actionTypes.UPDATE_EMPLOYEE,
        payload: response[1].data.data
      })

      pageDispatch({
        type: actionTypes.UPDATE_PRODUCT,
        payload: response[2].data.data
      })

      pageDispatch({
        type: actionTypes.UPDATE_LOADING,
        payload: false
      })
    }
  }

  return {
    pageState,
    dateTime: {
      activeValue: dateTimeActiveValue,
      defaultValue: dateTimeDefaultValue,
      disabledDate: afterToday(),
      triggerDefault: dateTimeTrigger,
      value: dateTimeValue,
      active: filter.dateTime.active,
      type: dateTimeType,
      label: dateTimeLabel,
      option: dateTimeOption,
      onChange: handleDateTimeChange,
      onTypeChange: handleDateTimeTypeChange,
      onReset: handleDateTimeDefault
    },
    refresh: refreshOverview
  }
}

export default useOverviewFilter
