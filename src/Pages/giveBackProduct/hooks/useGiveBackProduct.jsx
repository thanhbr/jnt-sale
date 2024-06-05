import React, {useReducer} from 'react';
import {giveBackProductInitialState} from "../provider/~init";
import {giveBackProductActions, giveBackProductReducer} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import toast from "../../../Component/Toast";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {calculatedGivebackProduct} from "../interfaces/util";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const useGiveBackProduct = () => {
  const {t} = useTranslation()
  const [state, dispatch] = useReducer(giveBackProductReducer, giveBackProductInitialState)
  const location = useLocation()
  const navigate = useNavigate()
  const dateTimeValue = state?.filter?.dateTime?.defaultValue?.value || ''
  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleOriginFetch = async _ => {
    const idDefault = location?.pathname?.split('/')[3]
    if(!!idDefault) {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/order/return/order-detail/${idDefault}`),
        sendRequestAuth('get', `${config.API}/payment/payment-method?keyword&status=&per_page=100&start`)
      ])
      if(response[0]?.data?.success) {
        const listOrderReturn = calculatedGivebackProduct(response[0]?.data?.data)

        // if(listOrderReturn.payment_money === 0) {
        //   navigate('/giveback-products')
        // }

        listOrderReturn.products = listOrderReturn?.products?.filter(item => {
          return (+item?.quantity - +item?.quantity_returned) !== 0
        })

        dispatch({type: giveBackProductActions.UPDATE_ORDER_RETURN_DETAIL, payload: listOrderReturn})
        const correctOrder = [4,8,19,20].includes(+response[0]?.data?.data?.shipping_status_id)

        if(!correctOrder) {
          toast.error(t(DISPLAY_NAME_MENU.VALIDATE.INVALID.ORDER))
          navigate(`/giveback-products`)
        }
      } else {
        navigate(`/giveback-products`)
        toast.error(t(DISPLAY_NAME_MENU.VALIDATE.INVALID.ORDER_INFO))
      }
      if(response[1]?.data?.success) {
        dispatch({type: giveBackProductActions.UPDATE_LIST_PAYMENT_METHOD,
          payload: response[1]?.data?.data?.filter(item => +item.status === 1 || +item.is_active === 1)})
      }
    } else {
      const splitDate = dateTimeValue.split(' - ')
      const startDate = convertDateTimeToApiFormat(splitDate[0])
      const endDate = convertDateTimeToApiFormat(splitDate[1])

      dispatch({type: giveBackProductActions.LOADING_TABLE, payload: true})
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/order/return/list?keyword=${querySearch}&start_date=&end_date=&status=&payment_status&warehouse_id=&per_page=20&start=0`),
        sendRequestAuth('get', `${config.API}/warehouse/warehouses`),
        sendRequestAuth('get', `${config.API}/order/return/filter-orders?keyword=&start_date=${startDate}&end_date=${endDate}&per_page=100&start=0`),
        sendRequestAuth('get', `${config.API}/payment/payment-method?keyword&status=&per_page&start`),
      ])
      if(response[0]?.data?.success) {
        const displayListData = Array.isArray(response[0]?.data?.data) ? response[0]?.data?.data : []
        const perPage = response[0]?.data?.meta?.per_page
        const totalItems = response[0]?.data?.meta?.total

        // SET list order
        dispatch({type: giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE, payload: displayListData})
        dispatch({type: giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE_DEFAULT, payload: displayListData})
        // SET pagination
        dispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION,
          payload: {
            active: 0,
            amount: perPage,
            total: Math.ceil(totalItems / perPage),
            totalItems: totalItems,
          }})
        // SET panel
        dispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL,
          payload: {
            totalOrder: totalItems,
            totalValueGoods: response[0]?.data?.meta?.total_price,
            amountRefunded: response[0]?.data?.meta?.total_payment,
          }})

        dispatch({type: giveBackProductActions.LOADING_TABLE, payload: false})

        if(!!querySearch) {
          const detailID = displayListData?.find(item => item.order_code === querySearch)?.id
          const responseDetail = await sendRequestAuth(
            'get',
            `${config.API}/order/return/detail/${detailID}`,
          )
          if(responseDetail?.data?.success) {
            dispatch({
              type: giveBackProductActions.SET_SEARCH_TABLE,
              payload: querySearch
            })
            dispatch({
              type: giveBackProductActions.UPDATE_ID_GIVEBACK_PRODUCT_TABLE_DETAIL,
              payload: {id: detailID || ''}
            })
            dispatch({
              type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_DETAIL,
              payload: {
                active: responseDetail?.data?.data,
                list: displayListData
              }
            })
          }
        }
      }
      // Warehouse API
      if(response[1]?.data?.success) {
        const listWarehouse = response[1]?.data?.data
        // const listWarehouse = response[1]?.data?.data?.filter(item => +item?.status === 1)
        dispatch({type: giveBackProductActions.FILTER_GIVEBACK_PRODUCT_WAREHOUSE,
          payload: {
            list: listWarehouse,
            listOrigin: listWarehouse
          }})
      }
      // Order API
      if(response[2]?.data?.success) {
        dispatch({type: giveBackProductActions.MODAL_UPDATE_LIST_ORDER,
          payload: {
            list: response[2]?.data?.data,
            listOrigin: response[2]?.data?.data,
          }})
      }
      // Payment API
      if(response[3]?.data?.success) {
        dispatch({type: giveBackProductActions.MODAL_UPDATE_LIST_PAYMENT, payload: response[3]?.data?.data?.filter(item => +item?.status === 1)})
        dispatch({type: giveBackProductActions.MODAL_UPDATE_ACTIVE_VALUE_PAYMENT, payload: response[3]?.data?.data?.find(item => +item?.is_active === 1)})
      }
    }
  }


  const fetchGivebackProductByFilter = async (qs) => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    dispatch({type: giveBackProductActions.LOADING_TABLE, payload: true})
    const response = await
      sendRequestAuth('get', `${config.API}/order/return/list${queryString}`)
    if(response?.data?.success) {
      const displayListData = Array.isArray(response?.data?.data) ? response?.data?.data : []
      const perPage = response?.data?.meta?.per_page
      const totalItems = response?.data?.meta?.total

      // SET list order
      dispatch({type: giveBackProductActions.UPDATE_LIST_GIVEBACK_PRODUCT_TABLE, payload: displayListData})
      // SET pagination
      dispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PAGINATION,
        payload: {
          active: Math.floor(+qs?.start / perPage) || 0,
          amount: perPage,
          total: Math.ceil(totalItems / perPage),
          totalItems: totalItems,
        }})
      // SET panel
      dispatch({type: giveBackProductActions.UPDATE_GIVEBACK_PRODUCT_TABLE_PANEL,
        payload: {
          totalOrder: totalItems,
          totalValueGoods: response?.data?.meta?.total_price,
          amountRefunded: response?.data?.meta?.total_payment,
        }})

      dispatch({type: giveBackProductActions.LOADING_TABLE, payload: false})
    }
  }

  const handleAmountChange = value => {
    const dataPost = {
      keyword: state?.filter?.search?.value || '',
      start_date: state?.filter?.dateTime?.start || '',
      end_date: state?.filter?.dateTime?.end || '',
      status: state?.filter?.receivingState ?.value?.id || '',
      payment_status: state?.filter?.payment?.value?.join(',') || '',
      warehouse_id: state?.filter?.warehouse?.value?.id || '',
      per_page: value,
      start: 0
    }
    dispatch({type: giveBackProductActions.SET_PER_PAGE, payload: value})
    fetchGivebackProductByFilter(dataPost)
  }

  const handlePageChange = value => {
    const amount = state?.table?.pagination?.amount || 20
    const dataPost = {
      keyword: state?.filter?.search?.value || '',
      start_date: state?.filter?.dateTime?.start || '',
      end_date: state?.filter?.dateTime?.end || '',
      status: state?.filter?.receivingState ?.value?.id || '',
      payment_status: state?.filter?.payment?.value?.join(',') || '',
      warehouse_id: state?.filter?.warehouse?.value?.id || '',
      per_page: amount,
      start: value * amount
    }
    dispatch({type: giveBackProductActions.SET_ACTIVE_VALUE_PAGE, payload: +value})
    fetchGivebackProductByFilter(dataPost)
  }

  return {
    fetch: {
      origin: handleOriginFetch
    },
    provider: {
      state,
      dispatch
    },
    pagination: {
      onAmountChange: handleAmountChange,
      onPageChange: handlePageChange,
    }
  }
}

export default useGiveBackProduct