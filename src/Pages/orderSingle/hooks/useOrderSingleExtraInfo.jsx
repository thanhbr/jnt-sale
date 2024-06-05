import {sendRequestAuth} from 'api/api'
import config from 'config'
import {useCallback, useState} from 'react'
import {useContext} from 'react'
import {orderSingleAction} from '../provider/_actions'
import {OrderSingleContext} from '../provider/_context'
import ArrayUtils from '../utils/array'
import {
  transformQueryObjToString,
  transformSourceData,
} from '../utils/transform'
import {debounce} from "@mui/material";
import useGlobalContext from "../../../containerContext/storeContext";
import { replaceAllCustom } from '../../../util/functionUtil'

const useOrderSingleExtraInfo = () => {
  const {state, dispatch} = useContext(OrderSingleContext)
  const [GlobalState, ] = useGlobalContext()
  const {extraInfo} = state.form

  const shippingPointQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  const sourceQueries = {
    keyword: '',
    status: 1,
    per_page: 10,
    start: 0,
  }

  // ======================================================================================================
  // SHIPPING POINT
  // ======================================================================================================
  const [isShippingPointLoading, setIsShippingPointLoading] = useState(false)

  const handleFetchShippingPoint = async (k, opt) => {
    if (isShippingPointLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsShippingPointLoading(true)

    const q = transformQueryObjToString({
      ...shippingPointQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/addresses${q}`,
    )

    if (!!response?.data?.success) {
      const shippingPointListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.fullname || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: orderSingleAction.FORM_SHIPPING_POINT_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? shippingPointListData
              : [...extraInfo.shippingPoint.list, ...shippingPointListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsShippingPointLoading(false)

    return response
  }

  const handleShippingPointChange = data => {
    // const shippingOrderActive = [{
    //   'user_id': GlobalState.user.user_id,
    //   'data': data
    // }]
    // let shippingOrderArray = JSON.parse(window.localStorage.getItem('shipping_order_active'))
    // if(!!shippingOrderArray) {
    //   const checkLocalStorage = shippingOrderArray.find(item => item?.user_id === GlobalState?.user?.user_id)
    //   if(!!checkLocalStorage) {
    //     shippingOrderArray.map(item => {
    //       if(item?.user_id === GlobalState?.user?.user_id) item.data = data
    //     })
    //   } else {
    //     shippingOrderArray = [...shippingOrderArray, {
    //       'user_id': GlobalState.user.user_id,
    //       'data': data
    //     }]
    //   }
    // } else shippingOrderArray = shippingOrderActive
    // window.localStorage.setItem('shipping_order_active', JSON.stringify(shippingOrderArray))

    dispatch({
      type: orderSingleAction.FORM_SHIPPING_POINT_UPDATE,
      payload: {value: data},
    })
  }

  const debounceShippingPointKeywordChange = useCallback(debounce((data) => {
    handleFetchShippingPoint(data?.value)
  }, 500), [])
  const handleShippingPointKeywordChange = data => {
    dispatch({
      type: orderSingleAction.FORM_SHIPPING_POINT_KEYWORD_UPDATE,
      payload: {keyword: data?.value || ''},
    })
    debounceShippingPointKeywordChange(data)
  }

  const handleShippingPointLoadMore = () => {
    const currentTotal = extraInfo.shippingPoint.list.length
    const total = extraInfo.shippingPoint.total

    if (currentTotal >= total) return null

    const response = handleFetchShippingPoint(extraInfo.shippingPoint.keyword, {
      page: extraInfo.shippingPoint.page + 1,
    })

    return response
  }

  // ======================================================================================================
  // SOURCE
  // ======================================================================================================
  const [isSourceLoading, setIsSourceLoading] = useState(false)

  const handleFetchSource = async (k, opt) => {
    if (isSourceLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsSourceLoading(true)

    const q = transformQueryObjToString({
      ...sourceQueries,
      keyword: k.trim(),
      start: page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/order/origins${q}`,
    )

    if (!!response?.data?.success) {
      const sourceListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformSourceData)

      dispatch({
        type: orderSingleAction.FORM_SOURCE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? sourceListData
              : [...extraInfo.source.list, ...sourceListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsSourceLoading(false)

    return response
  }

  const handleSourceChange = data => {
    const originOrderActive = [{
      'user_id': GlobalState.user.user_id,
      'data': data
    }]
    let originOrderArray = JSON.parse(window.localStorage.getItem('origin_order_active'))
    if(!!originOrderArray) {
      const checkLocalStorage = originOrderArray.find(item => item?.user_id === GlobalState?.user?.user_id)
      if(!!checkLocalStorage) {
        originOrderArray.map(item => {
          if(item?.user_id === GlobalState?.user?.user_id) item.data = data
        })
      } else {
        originOrderArray = [...originOrderArray, {
          'user_id': GlobalState.user.user_id,
          'data': data
        }]
      }
    } else {
      originOrderArray = originOrderActive
    }
    window.localStorage.setItem('origin_order_active', JSON.stringify(originOrderArray))
    dispatch({
      type: orderSingleAction.FORM_SOURCE_UPDATE,
      payload: {value: data},
    })
  }

  const debounceSourceKeywordChange = useCallback(debounce((data) => {
    handleFetchSource(data?.value)
  }, 500), [])
  const handleSourceKeywordChange = data => {
    dispatch({
      type: orderSingleAction.FORM_SOURCE_KEYWORD_UPDATE,
      payload: {keyword: data?.value || ''},
    })
    debounceSourceKeywordChange(data)
  }

  const handleSourceLoadMore = () => {
    const currentTotal = extraInfo.source.list.length
    const total = extraInfo.source.total

    console.log(currentTotal, total)

    if (currentTotal >= total) return null

    const response = handleFetchSource(extraInfo.source.keyword, {
      page: extraInfo.source.page + 1,
    })

    return response
  }

  // ======================================================================================================
  // UNIQUE ORDER NUMBER
  // ======================================================================================================
  const handleUniqueOrderNumberChange = val =>
    dispatch({
      type: orderSingleAction.FORM_UNIQUE_ORDER_NUMBER_UPDATE,
      payload: {value: val},
    })

  // ======================================================================================================
  // SHIPPING FEE CUSTOM
  // ======================================================================================================
  const handleShippingFeeCustomChange = val =>
  {
    val = val.length > 3 ? replaceAllCustom(val,',','') : val
    dispatch({
      type: orderSingleAction.FORM_SHIPPING_FEE_CUSTOM_UPDATE,
      payload: {value: +val >= 1000000000 ? 999999999 : +val},
    })
  }

  // ======================================================================================================
  // NOTE
  // ======================================================================================================

  const [errorNote, setDeliveryNote] = useState(state?.form?.extraInfo?.note?.value?.length > 255)
  const handleNoteChange = val => {
    dispatch({
      type: orderSingleAction.FORM_NOTE_UPDATE,
      payload: {value: val},
    })
    val.length > 255 ? setDeliveryNote(true) : setDeliveryNote(false)
  }

  return {
    data: extraInfo,
    properties: {isShippingPointLoading, isSourceLoading},
    methods: {
      // shipping point
      onShippingPointChange: handleShippingPointChange,
      onShippingPointKeywordChange: handleShippingPointKeywordChange,
      onShippingPointLoadMore: handleShippingPointLoadMore,
      // source
      onSourceChange: handleSourceChange,
      onSourceKeywordChange: handleSourceKeywordChange,
      onSourceLoadMore: handleSourceLoadMore,
      // unique order number
      onUniqueOrderNumberChange: handleUniqueOrderNumberChange,
      // shipping fee custom
      onShippingFeeCustomChange: handleShippingFeeCustomChange,
      // note
      onNoteChange: handleNoteChange,
      errorNote
    },
  }
}

export default useOrderSingleExtraInfo
