import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useCallback, useContext, useState } from 'react'
import { facebookLiveStreamDetailActions, facebookLiveStreamDetailActions as actions } from '../provider/_actions'
import { FacebookLivestreamContext } from '../provider/_context'
import ArrayUtils from '../utils/array'
import StringUtils from '../utils/string'
import { transformQueryObjToString } from '../utils/transform'
import useFacebookOrderShippingInfo from './useFacebookOrderShippingInfo'
import useFacebookCustomerInfor from './useFacebookCustomerInfor'
import toast from '../../../../../Component/Toast'
import { ORDER_SINGLE_CONSTANTS } from '../../../../orderSingle/interface/_constants'
import { transformMoneyToSendRequest } from '../../../../orderSingle/utils/transform'
import { convertDateTimeToApiFormat } from '../../../../../common/form/datePicker/_functions'
import { replaceAllCustom } from '../../../../../util/functionUtil'
import { debounce } from '@mui/material'
import { useParams } from 'react-router-dom'

const useFacebookConversationOrder = () => {
  const { state, dispatch } = useContext(FacebookLivestreamContext)
  const handleShipping = useFacebookOrderShippingInfo()
  const shippingHook = useFacebookOrderShippingInfo()
  let { pageId, liveStreamId } = useParams()

  const { customerInfor, productInfo, paymentInfo, shippingInfo } = state.detail
  const customerInfo = customerInfor
  const postId = state.detail?.liveStream?.customer?.stream_id || ''
  const fbID = state.detail?.liveStream?.customer?.sender_id || ''
  const isEnoughCustomerInfo = ![
    !!customerInfo.list?.city_id,
    !!customerInfo.list?.district_id,
    !!customerInfo.list?.ward_id,
    !!customerInfo.list?.customer_address,
    !!customerInfo.list?.customer_mobile,
    !!customerInfo.list?.customer_name,
  ].includes(false)
  // const isEnoughProductInfo = productInfo.inventory
  //   ? productInfo.withInventoryConfig.search?.selected?.length > 0
  //     ? true
  //     : false
  //   : [
  //     // productInfo.inventoryConfig.type === 'manual' &&
  //     // !!productInfo.inventoryConfig.manual.value.trim(),
  //     productInfo.nonInventoryConfig.manual?.value
  //   ].includes(true)
  const isEnoughProductInfo = !!productInfo.nonInventoryConfig.manual?.value

  const isEnoughShippingInfo = ![
    !!shippingInfo.weight,
    !!shippingInfo.cod,
    // !!shippingInfo.shippingPartner,
    shippingInfo.shippingInfo?.deliveryNote?.content?.length <= 255 || (!!!shippingInfo.shippingInfo?.deliveryNote?.content),
    shippingInfo.note?.value?.name.length <= 255 || (!!!shippingInfo.note?.value?.name),
  ].includes(false)
  const canSaveDraft = isEnoughCustomerInfo
  const canSaveOrder =
    isEnoughCustomerInfo && isEnoughProductInfo && isEnoughShippingInfo

  const getOriginData = async () => {
    const response = await Promise.all([
      sendRequestAuth(
        'get',
        `${config.API}/warehouse/warehouses?keyword=&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/payment/payment-method?keyword=&status=1&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/setting/addresses?keyword=&status=1&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/setting/delivery-note/list?keyword=&status=1&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/fb/pages/detail/${pageId}`,
      ),
      // sendRequestAuth('get', `${config.API}/tool/bulks/partners`),
    ])

    if (response[0]?.data?.success) {
      const warehouseTransformData = ArrayUtils.getQualifiedArray(
        response[0]?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.warehouse_name || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: actions.WAREHOUSE_LIST_ORIGIN_UPDATE,
        payload: {
          list: warehouseTransformData,
          value: warehouseTransformData[0] || null,
          pagination: { page: 0, total: response[0]?.data?.meta?.total },
        },
      })

      if (warehouseTransformData[0]) {
        const productResponse = await sendRequestAuth(
          'get',
          `${
            config.API
          }/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${
            warehouseTransformData[0]?.value || ''
          }&per_page=10&start=0`,
        )
        if (productResponse?.data?.success)
          dispatch({
            type: actions.PRODUCT_LIST_ORIGIN_UPDATE,
            payload: {
              list: ArrayUtils.getQualifiedArray(
                productResponse?.data?.data,
              ).map(item => ({
                data: item,
                name: item?.product_name || '---',
                value: item?.id || '',
              })),
              pagination: { page: 0, total: productResponse?.data?.meta?.total },
            },
          })
      }
    }

    if (response[1]?.data?.success) {
      let defaultPaymentMethod = null
      const paymentMethodTransformData = ArrayUtils.getQualifiedArray(
        response[1]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && defaultPaymentMethod !== null)
          defaultPaymentMethod = item
        return {
          data: item,
          name: item?.name || '---',
          value: item?.id || '',
        }
      })
      if (defaultPaymentMethod === null)
        defaultPaymentMethod = paymentMethodTransformData[0] || null
      dispatch({
        type: actions.PAYMENT_METHOD_LIST_ORIGIN_UPDATE,
        payload: {
          list: paymentMethodTransformData,
          value: defaultPaymentMethod,
          pagination: { page: 0, total: response[1]?.data?.meta?.total },
        },
      })
    }

    if (response[2]?.data?.success) {
      let defaultShippingPoint = null
      const shippingPointTransformData = ArrayUtils.getQualifiedArray(
        response[2]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && defaultShippingPoint !== null)
          defaultShippingPoint = item
        return {
          data: item,
          name: item?.fullname || '---',
          value: item?.id || '',
        }
      })
      if (defaultShippingPoint === null)
        defaultShippingPoint = shippingPointTransformData[0] || null
      dispatch({
        type: actions.SHIPPING_POINT_LIST_ORIGIN_UPDATE,
        payload: {
          list: shippingPointTransformData,
          value: defaultShippingPoint,
          pagination: { page: 0, total: response[2]?.data?.meta?.total },
        },
      })
    }

    if (response[3]?.data?.success) {
      let defaultNote = null
      const noteTransformData = ArrayUtils.getQualifiedArray(
        response[3]?.data?.data,
      ).map(item => {
        if (item?.is_default === '1' && defaultNote !== null) defaultNote = item
        return {
          data: item,
          name: item?.content || '---',
          value: item?.id || '',
        }
      })
      if (defaultNote === null) defaultNote = noteTransformData[0] || null
      dispatch({
        type: actions.NOTE_LIST_ORIGIN_UPDATE,
        payload: {
          list: noteTransformData,
          value: defaultNote,
          pagination: { page: 0, total: response[3]?.data?.meta?.total },
        },
      })
      dispatch({
        type: facebookLiveStreamDetailActions.UPDATE_LIST_DELIVERY_NOTE,
        payload: response[3]?.data?.data,
      })
    }

    if (response[4]?.data?.success) {
      dispatch({
        type: 'SET_PAGE',
        payload: {
          detail: response[4]?.data?.data
        }
      })
    }
    handleShipping.methods.origin()
  }

  const handleProductNonInventoryChange = val =>{
    dispatch({
      type: actions.ORDER_PRODUCT_NON_INVENTORY_UPDATE,
      payload: { value: val },
    })
    handleProductValidate(!val.trim() ? true : false)
  }


  const handleProductInventoryToggle = () =>
    dispatch({ type: actions.ORDER_PRODUCT_INVENTORY_TOGGLE })

  // ========================================================================
  // WAREHOUSE
  // ========================================================================
  const warehouse = productInfo.inventoryConfig.warehouse

  const warehouseQueries = { keyword: '', per_page: 500, start: 0 }

  const getWarehouses = async (keyword, page) => {
    if (warehouse.loading) return
    dispatch({
      type:
        page === 0
          ? actions.WAREHOUSE_LOADING_TOGGLE
          : actions.WAREHOUSE_LOADING_MORE_TOGGLE,
      payload: { loading: true },
    })
    const q = transformQueryObjToString({
      ...warehouseQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 500) ? 500 : page * 500,
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/warehouse/warehouses${q}`,
    )
    if (!!response?.data?.success) {
      const warehouseListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.warehouse_name || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: actions.WAREHOUSE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? warehouseListData
              : [...warehouse.list, ...warehouseListData],
          page,
          pagination: { page, total: response?.data?.meta?.total },
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.WAREHOUSE_LOADING_TOGGLE
            : actions.WAREHOUSE_LOADING_MORE_TOGGLE,
        payload: { loading: false },
      })
    }, 500)
  }

  const handleWarehouseChange = data => {
    dispatch({ type: actions.WAREHOUSE_VALUE_UPDATE, payload: { value: data } })
    handleProductChange(null, null, { reset: true })
  }

  let warehouseKeywordTimeout
  const handleWarehouseKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({ type: actions.WAREHOUSE_KEYWORD_UPDATE, payload: { keyword } })
    clearTimeout(warehouseKeywordTimeout)
    warehouseKeywordTimeout = setTimeout(
      () => (!!keyword.trim() || keyword === '') && getWarehouses(keyword, 0),
      500,
    )
  }

  const handleWarehouseLoadMore = () => {
    const currentTotal = warehouse.list.length
    const total = warehouse.pagination.total
    if (currentTotal >= total) return
    getWarehouses(warehouse.keyword, warehouse.pagination.page + 1)
  }

  // ========================================================================
  // PRICE POLICY
  // ========================================================================
  const pricePolicy = productInfo.inventoryConfig.pricePolicy

  const handlePricePolicyChange = data =>
    dispatch({ type: actions.PRICE_POLICY_VALUE_UPDATE, payload: { value: data } })

  const handlePricePolicyKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({
      type: actions.PRICE_POLICY_KEYWORD_UPDATE,
      payload: { keyword },
    })
    const formatDataValue = data?.value
      ? StringUtils.removeAcent(data?.value?.toLowerCase())
      : ''
    const pricePolicyListData = pricePolicy.listOrigin.filter(item => {
      const formatNameItem = item?.name
        ? StringUtils.removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    dispatch({
      type: actions.PRICE_POLICY_LIST_UPDATE,
      payload: { list: pricePolicyListData },
    })
  }

  // ========================================================================
  // PRODUCT
  // ========================================================================
  const product = productInfo.inventoryConfig.product

  const productQueries = {
    keyword: '',
    category_id: '',
    product_id: '',
    details: '',
    status: 1,
    warehouse_id: warehouse.value?.value || '',
    per_page: 10,
    start: 0,
  }

  const getProducts = async (keyword, page) => {
    if (product.loading || product.loadingMore) return
    dispatch({
      type:
        page === 0
          ? actions.PRODUCT_LOADING_TOGGLE
          : actions.PRODUCT_LOADING_MORE_TOGGLE,
      payload: { loading: true },
    })
    const q = transformQueryObjToString({
      ...productQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 10) ? 10 : page * 10,
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details${q}`,
    )
    if (!!response?.data?.success) {
      const productListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.product_name || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: actions.PRODUCT_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? productListData
              : [...product.list, ...productListData],
          page,
          pagination: { page, total: response?.data?.meta?.total },
        },
      })
    }
    dispatch({
      type:
        page === 0
          ? actions.PRODUCT_LOADING_TOGGLE
          : actions.PRODUCT_LOADING_MORE_TOGGLE,
      payload: { loading: false },
    })
  }

  const handleProductChange = (data, type, opt) => {
    if (opt?.reset) {
      dispatch({
        type: actions.PRODUCT_VALUE_UPDATE,
        payload: { value: [] },
      })
      return
    }

    const currentValue = product.value
    let tmpValue = currentValue
    const findIndex = currentValue.findIndex(
      item => item?.value === data?.value,
    )
    if (findIndex !== -1) {
      switch (type) {
        case 'increase':
          tmpValue[findIndex].quantity = tmpValue[findIndex]?.quantity + 1
          break

        case 'decrease':
          tmpValue[findIndex].quantity = Math.max(
            tmpValue[findIndex]?.quantity - 1,
            0,
          )
          break

        case 'amount':
          if (findIndex !== -1) {
            if (opt?.value === 0) {
              tmpValue = tmpValue.filter((item, i) => i !== findIndex)
            } else
              tmpValue[findIndex].quantity =
                typeof opt?.value === 'string'
                  ? opt?.value
                  ? 1
                  : ''
                  : Math.ceil(opt.value)
          } else tmpValue = [...tmpValue, { data, quantity: opt?.value ? 1 : '' }]
          break

        case 'price':
          tmpValue[findIndex].price = Number(opt?.value || 0)
          break

        case 'discount':
          tmpValue[findIndex].discount = Number(opt?.value || 0)
          break

        case 'discountValue':
          tmpValue[findIndex].discount_value = Number(opt?.value || 0)
          break

        case 'discountType':
          tmpValue[findIndex].discountType = opt?.value
          tmpValue[findIndex].discount = 0
          break

        default:
          break
      }
    }
    const newValue =
      findIndex !== -1
        ? tmpValue
        : [
          ...tmpValue,
          {
            ...data,
            quantity: 1,
            discount: 0,
            discount_value: 0,
            discountType: '%',
            price: Number(
              pricePolicy.value?.value === 2
                ? data?.data?.wholesale_price || 0
                : data?.data?.price || 0,
            ),
          },
        ]

    dispatch({
      type: actions.PRODUCT_VALUE_UPDATE,
      payload: { value: newValue },
    })
  }

  let productKeywordTimeout
  const handleProductKeywordChange = keyword => {
    dispatch({ type: actions.PRODUCT_KEYWORD_UPDATE, payload: { keyword } })
    clearTimeout(productKeywordTimeout)
    productKeywordTimeout = setTimeout(
      () => (!!keyword.trim() || keyword === '') && getProducts(keyword, 0),
      500,
    )
  }

  const handleProductLoadMore = () => {
    const currentTotal = product.list.length
    const total = product.pagination.total
    if (currentTotal >= total) return
    getProducts(product.keyword, product.pagination.page + 1)
  }

  const handleProductDelete = id => {
    const newData = product.value.filter(item => item?.value !== id)
    handleProductChange(newData)
  }

  const handleTotalDiscountChange = (type, value) =>
    dispatch({
      type: actions.PRODUCT_TOTAL_DISCOUNT_UPDATE,
      payload: { type, value },
    })

  // ========================================================================
  // PAYMENT
  // ========================================================================
  const handleTypeChange = val => {
    dispatch({
      type: actions.PAYMENT_TYPE_UPDATE,
      payload: { type: val },
    })
    if (val !== 'before') handlePaymentMoneyChange(0)
  }

  const paymentMethod = paymentInfo.method

  const paymentMethodQueries = { keyword: '', status: 1, per_page: 500, start: 0 }

  const getPaymentMethods = async (keyword, page) => {
    if (paymentMethod.loading) return
    dispatch({
      type:
        page === 0
          ? actions.PAYMENT_METHOD_LOADING_TOGGLE
          : actions.PAYMENT_METHOD_LOADING_MORE_TOGGLE,
      payload: { loading: true },
    })
    const q = transformQueryObjToString({
      ...paymentMethodQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 500) ? 500 : page * 500,
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/payment/payment-method${q}`,
    )
    if (!!response?.data?.success) {
      const paymentMethodListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: actions.PAYMENT_METHOD_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? paymentMethodListData
              : [...paymentMethod.list, ...paymentMethodListData],
          page,
          pagination: { page, total: response?.data?.meta?.total },
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.PAYMENT_METHOD_LOADING_TOGGLE
            : actions.PAYMENT_METHOD_LOADING_MORE_TOGGLE,
        payload: { loading: false },
      })
    }, 500)
  }

  const handlePaymentMethodChange = data => {
    dispatch({
      type: actions.PAYMENT_METHOD_VALUE_UPDATE,
      payload: { value: data },
    })
  }

  const deboucePaymentSearch = useCallback(debounce(async (keyword) => {
    getPaymentMethods(keyword, 0)
  }, 500), [])

  const handlePaymentMethodKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({ type: actions.PAYMENT_METHOD_KEYWORD_UPDATE, payload: { keyword } })
    deboucePaymentSearch(keyword)
  }

  const handlePaymentMethodLoadMore = () => {
    const currentTotal = paymentMethod.list.length
    const total = paymentMethod.pagination.total
    if (currentTotal >= total) return
    getPaymentMethods(paymentMethod.keyword, paymentMethod.pagination.page + 1)
  }

  const handlePaymentMoneyChange = val => {
    dispatch({
      type: actions.PAYMENT_MONEY_UPDATE,
      payload: { money: Number(`${val}`.replace(/,/g, '') || 0) },
    })
  }

  const handleDateTimeChange = data =>
    dispatch({
      type: actions.PAYMENT_DATE_UPDATE,
      payload: { ...data },
    })

  // ========================================================================
  // SHIPPING INFO
  // ========================================================================

  const handleCODValidate = (boo) => {
    const cod = boo ? (
      <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}>
            Tiền thu hộ không được để trống
          </span>
      </div>
    ) : ''
    dispatch({
      type: facebookLiveStreamDetailActions.SET_VALIDATE_COD,
      payload: cod,
    })
  }

  const handleProductValidate = (boo) => {
    const productValidate = boo ? (
      <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '300px' }}>
          Thông tin sản phẩm không được bỏ trống
          </span>
      </div>
    ) : ''
    dispatch({
      type: facebookLiveStreamDetailActions.SET_VALIDATE_PRODUCT_INFOR,
      payload: productValidate,
    })
  }
  const [triggerDefault, setTriggerDefault] = useState(false)
  const handleCODChange = val => {
    val = replaceAllCustom(val, ',','') >= 100000000 ? '99,999,999' : val
    dispatch({
      type: actions.SHIPPING_COD_UPDATE,
      payload: val,
    })
    setTriggerDefault(!triggerDefault)
    handleCODValidate(val == '' || replaceAllCustom(val, ',','') >= 100000000 ? true : false)
  }

  const transformSizeData = val => {
    const regArray = val.split('.').map(item => item.replace(/[^0-9]/g, ''))
    const checkArray = regArray.map((item, i) =>
      i === 1
        ? `.${item === '' ? '' : Number(item || 0)}`
        : item === ''
        ? ''
        : Number(item || 0),
    )
    return checkArray.join('')
  }

  const debounceDeliveryNote = useCallback(debounce(async (search) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/delivery-note/list?keyword=${search}&status=1&per_page=100&start=0`,
    )
    if (!!response?.data?.success) {
      dispatch({
        type: facebookLiveStreamDetailActions.UPDATE_LIST_DELIVERY_NOTE,
        payload: response?.data?.data,
      })
    }
  }, 500), [])
  const [errorDeliveryNote, setErrorDeliveryNote] = useState(shippingInfo?.note?.keyword?.length > 254)
  const onDeliveryNoteChange = async (e = '') => {
    const keyword = e
    const search = keyword.replace('/', '')
    debounceDeliveryNote(keyword.indexOf('/') === 0 ? search : '')
    dispatch({ type: actions.NOTE_KEYWORD_UPDATE, payload: { keyword } })
    e.length > 255 ? setErrorDeliveryNote(true) : setErrorDeliveryNote(false)
  }
  const handleWeightValidate = (boo) => { console.log(boo)
    const weight = boo ? (
      <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', top: 0, left: 0, width: '300px' }}>
          Trọng lượng cần ≥ 0.01kg (10g) và ≤ 70kg (7000g)
          </span>
      </div>
    ) : ''
    dispatch({
      type: facebookLiveStreamDetailActions.SET_VALIDATE_WEIGHT,
      payload: weight,
    })
  }

  const handleWeightChange = val => {
    val = val > 70 ? 70 : val
    dispatch({
      type: actions.SHIPPING_WEIGHT_UPDATE,
      payload: { weight: val == '' ? val : Number(val) },
    })

    handleWeightValidate(val > 70 || val < 0.01 ? true : false)
  }

  const handleLengthChange = val => {
    if (val > 150) val = 150
    dispatch({
      type: actions.SHIPPING_LENGTH_UPDATE,
      payload: { longs: val },
    })
  }

  const handleWidthChange = val => {
    if (val > 150) val = 150
    dispatch({
      type: actions.SHIPPING_WIDTH_UPDATE,
      payload: { width: val },
    })
  }

  const handleHeightChange = val => {
    if (val > 150) val = 150
    dispatch({
      type: actions.SHIPPING_HEIGHT_UPDATE,
      payload: { height: val },
    })
  }

  const shippingPoint = shippingInfo.shippingPoint

  const shippingPointQueries = { keyword: '', status: 1, per_page: 500, start: 0 }

  const getShippingPoints = async (keyword, page) => {
    if (shippingPoint.loading) return
    dispatch({
      type:
        page === 0
          ? actions.SHIPPING_POINT_LOADING_TOGGLE
          : actions.SHIPPING_POINT_LOADING_MORE_TOGGLE,
      payload: { loading: true },
    })
    const q = transformQueryObjToString({
      ...shippingPointQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 500) ? 500 : page * 500,
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
        type: actions.SHIPPING_POINT_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? shippingPointListData
              : [...shippingPoint.list, ...shippingPointListData],
          page,
          pagination: { page, total: response?.data?.meta?.total },
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.SHIPPING_POINT_LOADING_TOGGLE
            : actions.SHIPPING_POINT_LOADING_MORE_TOGGLE,
        payload: { loading: false },
      })
    }, 500)
  }

  const handleShippingPointChange = data => {
    dispatch({
      type: actions.SHIPPING_POINT_VALUE_UPDATE,
      payload: { value: data },
    })
  }

  const debounceGetShipping = useCallback(debounce(async (keyword) => {
    getShippingPoints(keyword, 0)
  }, 500), [])

  const handleShippingPointKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({ type: actions.SHIPPING_POINT_KEYWORD_UPDATE, payload: { keyword } })
    if (!!keyword.trim() || keyword === '') debounceGetShipping(keyword)
  }

  const handleShippingPointLoadMore = () => {
    const currentTotal = shippingPoint.list.length
    const total = shippingPoint.pagination.total
    if (currentTotal >= total) return
    getShippingPoints(shippingPoint.keyword, shippingPoint.pagination.page + 1)
  }

  const note = shippingInfo.note

  const noteQueries = { keyword: '', status: 1, per_page: 500, start: 0 }

  const getNotes = async (keyword, page) => {
    if (note.loading) return
    dispatch({
      type:
        page === 0
          ? actions.NOTE_LOADING_TOGGLE
          : actions.NOTE_LOADING_MORE_TOGGLE,
      payload: { loading: true },
    })
    const q = transformQueryObjToString({
      ...noteQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 500) ? 500 : page * 500,
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/addresses${q}`,
    )
    if (!!response?.data?.success) {
      const noteListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.content || '---',
        value: item?.id || '',
      }))
      dispatch({
        type: actions.NOTE_LIST_UPDATE,
        payload: {
          list: page === 0 ? noteListData : [...note.list, ...noteListData],
          page,
          pagination: { page, total: response?.data?.meta?.total },
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.NOTE_LOADING_TOGGLE
            : actions.NOTE_LOADING_MORE_TOGGLE,
        payload: { loading: false },
      })
    }, 500)
  }

  const handleNoteChange = data => {
    dispatch({
      type: actions.NOTE_VALUE_UPDATE,
      payload: { value: data },
    })
    handleNoteKeywordChange(data?.name || '')
  }

  const handleNoteKeywordChange = data => {
    const keyword = data
    dispatch({ type: actions.NOTE_KEYWORD_UPDATE, payload: { keyword } })
  }

  const handleNoteLoadMore = () => {
    const currentTotal = note.list.length
    const total = note.pagination.total
    if (currentTotal >= total) return
    getNotes(note.keyword, note.pagination.page + 1)
  }
  //create order LOGIC

  const validateForm = () => {
    handleCODValidate(!shippingInfo.cod)
    handleWeightValidate((shippingInfo.weight < 0.01 || shippingInfo.weight > 70) || shippingInfo.weight == '')
    handleProductValidate(!productInfo.nonInventoryConfig.manual.value.trim())

    // customerHook.methods.onPhoneValidate(!!customerInfo.phone.value.trim())
    // customerHook.methods.onFullNameValidate(
    //   !!customerInfo.fullName.value.trim(),
    // )
    // customerHook.methods.onAddressValidate(!!customerInfo.address.value.trim())
    // customerHook.methods.onProvinceValidate(
    //   !!customerInfo.address.province.value?.value,
    // )
    // customerHook.methods.onDistrictValidate(
    //   !!customerInfo.address.district.value?.value,
    // )
    // customerHook.methods.onWardValidate(
    //   !!customerInfo.address.ward.value?.value,
    // )
    let validateStatus = 0
    // if (
    //   (productInfo.inventory && shippingInfo.shippingPartner.id == 0) ||
    //   (!productInfo.inventory &&
    //     ![
    //       productInfo.inventoryConfig.type === 'manual' &&
    //       !!productInfo.inventoryConfig.manual.value.trim(),
    //       productInfo.inventoryConfig.type === 'auto' &&
    //       productInfo.inventoryConfig.auto.selected.length > 0,
    //     ].includes(true))
    // ) {
    //   dispatch({
    //     type: facebookLiveStreamDetailActions.SET_VALIDATE_FORM,
    //     payload: {
    //       shippingPartner: '#FF424E',
    //     },
    //   })
    //   validateStatus = 1
    // }
    if(!productInfo.nonInventoryConfig.manual.value.trim()){
      validateStatus = 1
    }
    if(shippingInfo.cod == ''){
      validateStatus = 1
    }
    if(shippingInfo.weight < 0.01 || shippingInfo.weight > 70 || shippingInfo.weight == ''){
      validateStatus = 1
    }
    if ((+shippingInfo?.shippingPartner?.id === 2 && (shippingInfo?.cargoInsurrance?.value == 0 || shippingInfo?.cargoInsurrance?.value == '')) ||
      (+shippingInfo?.cargoInsurrance?.value === 0
        && shippingInfo?.cargoInsurrance?.active)) {
      shippingHook.methods.handleCargoInsurranceValidate(true)
      validateStatus = 1
    }

    if (
      activeShippingPartner?.config?.packageQuantity == 0 ||
      activeShippingPartner?.config?.packageQuantity == ''
    ) {
      shippingInfo.shippingPartner.list.map((item, index) => {
        if (item.id == shippingInfo.shippingPartner.id) {
          shippingHook.methods.handleValidatePackageQuantity(true, index)
        }
      })
      validateStatus = 1
    }
    return validateStatus
  }

  const selectedList = productInfo?.withInventoryConfig?.search?.selected

  const tmpPrice = selectedList.reduce((p, n, i) => {
    const itemPrice =
      transformMoneyToSendRequest(selectedList[i]?.price || 0) *
      transformMoneyToSendRequest(selectedList[i]?.quantity || 0)

    return p + itemPrice
  }, 0)

  const tmpDiscount = selectedList.reduce((p, n, i) => {
    const itemDiscount =
      selectedList[i]?.discountType === 'đ'
        ? transformMoneyToSendRequest(selectedList[i]?.discount || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0)
        : (transformMoneyToSendRequest(selectedList[i]?.price || 0) *
        transformMoneyToSendRequest(selectedList[i]?.quantity || 0) *
        transformMoneyToSendRequest(selectedList[i]?.discount || 0)) /
        100

    return p + itemDiscount
  }, 0)
  const activeShippingPartner = shippingInfo.shippingPartner.list.find(
    item => item.id == shippingInfo.shippingPartner.id,
  )
  const submitQueries = {
    // account login id
    id_sender: shippingInfo.shippingPoint.value?.value || null,
    // customer info
    page_id: pageId,
    post_id: postId,
    fb_id: fbID,
    customers: customerInfo.list,
    // product info
    details:
      !!productInfo?.inventory || productInfo?.inventoryConfig?.type === 'auto'
        ? ''
        : productInfo?.nonInventoryConfig?.manual?.value || '',
    type_price: !!productInfo?.inventory
      ? productInfo.withInventoryConfig.priceType.value?.value || ''
      : '',
    item_details: productInfo.inventory
      ? ArrayUtils.getQualifiedArray(
        productInfo?.withInventoryConfig?.search?.selected,
      ).map(item => ({
        product_id: transformMoneyToSendRequest(item?.data?.product_id || 0),
        product_id_details: transformMoneyToSendRequest(item?.data?.id || 0),
        product_model: item?.data?.sku,
        product_name: item?.data?.product_name,
        price: transformMoneyToSendRequest(item?.data?.price || 0),
        total_price: transformMoneyToSendRequest(item?.data?.price || 0),
        discount:
          item?.discountType === 'đ'
            ? Number(item?.discount || 0)
            : (Number(item?.discount || 0) * Number(item?.price || 0)) / 100,
        discount_type: item?.discountType === 'đ' ? 1 : 2,
        discount_value: Number(item?.discount || 0),
        quantity: item?.quantity || 0,
      }))
      : [],
    // shipping info
    shipping: !shippingInfo.isStorePickUp
      ? {
        cod: transformMoneyToSendRequest(shippingInfo.cod || 0),
        weight: transformMoneyToSendRequest(shippingInfo.weight || 0),
        width: transformMoneyToSendRequest(shippingInfo.width || 0),
        height: transformMoneyToSendRequest(shippingInfo.height || 0),
        lengh: transformMoneyToSendRequest(shippingInfo.longs || 0),
        note: shippingInfo?.note?.value?.name || '',
      }
      : '',
    shipping_partner:
      !shippingInfo.isStorePickUp && !!activeShippingPartner
        ? {
          partner_ship: shippingInfo.shippingPartner.id,
          serviceID:
            shippingInfo.shippingPartner?.service?.length > 0
              ? shippingInfo.shippingPartner.service.find(
              item => item.partnerId == shippingInfo.shippingPartner.id,
            )?.serviceId || ''
              : '',
          sub_service: shippingInfo.shippingPartner.subService?.subServiceId,
          is_insurrance: shippingInfo.cargoInsurrance.active || shippingInfo.shippingPartner.id == 2
            ? 1
            : 0,
          insurrance_value: !!shippingInfo.cargoInsurrance.value ? transformMoneyToSendRequest(replaceAllCustom(shippingInfo.cargoInsurrance.value, ',', '') || 0) : 0,
          payer: !!activeShippingPartner.config.payer
            ? activeShippingPartner.config.payer.find(
              item => item.checked == true,
            ).value
            : '',
          recipient_view: !!activeShippingPartner.config.request
            ? activeShippingPartner.config.request.find(
              item => item.checked == true,
            ).value
            : '',
          request_goods: !!activeShippingPartner.config.request_goods
            ? activeShippingPartner.config.request_goods.find(
              item => item.checked == true,
            ).value
            : '',
          pick_date: activeShippingPartner.config.pick_date || '',
          pick_shift: !!activeShippingPartner.config.pick_shift
            ? activeShippingPartner.config.pick_shift.find(
              item => item.checked == true,
            )?.value
            : '',
          transport: !!activeShippingPartner.config.transport
            ? activeShippingPartner.config.transport.find(
              item => item.checked == true,
            )?.value
            : '',
          partsign: activeShippingPartner.config.partsign ? 1 : 0,
          number_pack: activeShippingPartner.config?.packageQuantity || '',
        }
        : '',
    // extra info
    warehouse_id: '',
    order_origin_id: '1', //facebook
    order_code_of_shop: '',
    order_note: '',
    // payment method
    payment: {
      payment_type: ['before', 'cod', 'after'].findIndex(
        item => item === paymentInfo.type,
      ),
      payment_method_id: ['before', 'after'].includes(paymentInfo.type) ? paymentMethod?.value?.value : '',
      payment_money: transformMoneyToSendRequest(
        paymentInfo.money || 0,
      ),
      payment_date: paymentInfo.dateTime.formatValue
        ? convertDateTimeToApiFormat(paymentInfo.dateTime.formatValue)
        : '',
    },
    total_amount: tmpPrice > 0 ? tmpPrice : transformMoneyToSendRequest(shippingInfo.cod || 0) + transformMoneyToSendRequest(paymentInfo.money || 0),
    total_discount: tmpDiscount,
    order_discount_type: productInfo?.withInventoryConfig?.discount?.type === '%' ? 2 : 1,
    order_discount_value: productInfo?.withInventoryConfig?.discount?.value || 0,
    order_discount: ((+tmpPrice - +tmpDiscount) -
      (productInfo?.withInventoryConfig?.discount?.type === '%' ?
        ((+tmpPrice - +tmpDiscount) * +(productInfo?.withInventoryConfig?.discount?.value) / 100) :
        ((+tmpPrice - +tmpDiscount) - +(productInfo?.withInventoryConfig?.discount?.value)))) || 0,
    // submit
    is_delivery: 0,
    is_draft: 0,
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const handleSubmit = async opt => {
    if (debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      if (+submitQueries.total_amount > 2000000000) {
        toast.error('Tổng giá trị đơn hàng chỉ được phép tối đa 2 tỷ!')
      } else {
        const validateStatus = validateForm()
        if (canSaveDraft && +validateStatus === 0) {
          const shippingIDSelected = shippingInfo?.shippingPartner?.selected
          const cloneShippingList = shippingInfo?.shippingPartner?.list
          const shippingSelected = cloneShippingList?.find(item => +item.id === +shippingIDSelected && +item.fee === 0)
          if (!!shippingSelected && Object.keys(shippingSelected)?.length > 0 && +opt?.is_draft !== 1) {
            return ORDER_SINGLE_CONSTANTS.errorFeeShipping
          }

          +opt?.is_draft === 1 ? submitQueries.is_draft = 1 : submitQueries.is_delivery = 1
          dispatch({ type: 'UPDATE_LOADING', payload: true })
          const response = await sendRequestAuth(
            'post',
            `${config.API}/fb/action/create-order`,
            JSON.stringify({ ...submitQueries, ...opt }),
          )
          if (!!response?.data) {
            dispatch({ type: 'UPDATE_LOADING', payload: false })
            dispatch({
              type: 'RESET_TYPING'
            })
            return response
          }
        } else return false
      }
    }
  }

  return {
    state,
    data: state.detail,
    loading: state?.loadingFee,
    methods: {
      getOriginData,
      handleSubmit
    },
    properties: {
      canSaveOrder,
      isEnoughCustomerInfo,
      errorDeliveryNote,
      triggerDefault
    },
    productMethods: {
      onNonInventoryChange: handleProductNonInventoryChange,
      onInventoryToggle: handleProductInventoryToggle,
      onWarehouse: {
        change: handleWarehouseChange,
        loadMore: handleWarehouseLoadMore,
        keywordChange: handleWarehouseKeywordChange,
      },
      onPricePolicy: {
        change: handlePricePolicyChange,
        keywordChange: handlePricePolicyKeywordChange,
      },
      onProduct: {
        change: handleProductChange,
        delete: handleProductDelete,
        loadMore: handleProductLoadMore,
        keywordChange: handleProductKeywordChange,
        onTotalDiscountChange: handleTotalDiscountChange,
      },
    },
    paymentMethods: {
      onTypeChange: handleTypeChange,
      onMoneyChange: handlePaymentMoneyChange,
      onDateChange: handleDateTimeChange,
      onMethod: {
        change: handlePaymentMethodChange,
        loadMore: handlePaymentMethodLoadMore,
        keywordChange: handlePaymentMethodKeywordChange,
      },
    },
    shippingMethods: {
      handleCODValidate,
      handleWeightValidate,
      onCODChange: handleCODChange,
      onWeightChange: handleWeightChange,
      onLengthChange: handleLengthChange,
      onWidthChange: handleWidthChange,
      onHeightChange: handleHeightChange,
      onShippingPoint: {
        change: handleShippingPointChange,
        loadMore: handleShippingPointLoadMore,
        keywordChange: handleShippingPointKeywordChange,
      },
      onNote: {
        change: handleNoteChange,
        loadMore: handleNoteLoadMore,
        keywordChange: handleNoteKeywordChange,
        onDeliveryNoteChange,
      },

    },
  }
}

export default useFacebookConversationOrder
