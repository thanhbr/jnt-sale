import { useCallback, useContext, useState } from 'react'
import { PosOrderContext } from '../provider/_context'
import { removeAcent } from '../../../common/fieldText/_functions'
import { posOrderActions as actions, posOrderActions } from '../provider/_actions'
import { debounce } from '@mui/material'
import { transformProductData, transformQueryObjToString } from '../../purchases/utils/transform'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import ArrayUtils from '../../purchases/utils/array'
import { usePosOrderAction } from './usePosOrderAction'
import useAlert from '../../../hook/useAlert'

export const usePosSearchBox = () => {

  const { state, dispatch } = useContext(PosOrderContext)
  const { func } = usePosOrderAction()
  const { showAlert } = useAlert()
  const { productSearch } = state
  const { products } = state
  const { orders } = state
  const { warehouses } = state
  const errorSubmit = state?.rightContent?.errorSubmit

  const activeOrder = orders.list.find(order => order.id == orders.active)
  const priceType = state?.orders?.list?.find(item => +item.id === +orders.active)?.priceType
  // WAREHOUSE

  const warehouseKeyword = warehouses.keyword
  const warehouseList = warehouses.list
  const warehouseListOrigin = warehouses.listOrigin
  const activeOrders = orders.active
  const warehouseActiveValue = orders.warehouse.length > 0 ? orders.warehouse.find(item => item.id == activeOrders) : {}

  const handleWarehouseKeywordChange = data => {
    const formatDataValue = data
      ? removeAcent(data?.toLowerCase())
      : ''

    const warehouseListData = warehouseListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: posOrderActions.WAREHOUSE_KEYWORD_UPDATE,
      payload: {
        keyword: data || '',
        list: warehouseListData,
      },
    })
  }

  let listWarehouseOfOrder = orders.warehouse
  const categoryId = state.products.filter?.groupProduct?.id || ''
  const handleWarehouseChange = async data => {
    const warehouseActive = data.category
    warehouseActive.id = activeOrders
    listWarehouseOfOrder.map((item, index) => {
      if (item.id == activeOrders) listWarehouseOfOrder[index] = warehouseActive
    })
    dispatch({
      type: posOrderActions.ORDER_WAREHOUSE_VALUE_UPDATE,
      payload: listWarehouseOfOrder
    })

    // load product of warehouse
    // call api reset list product and product search

    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${data.category?.value || ''}&per_page=20&start=0`,
    )
    const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)

    dispatch({
      type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
      payload: {
        list: formatProductList,
        loading: false,
        page: 0,
        keyword: ''
      },
    })
    const quickProductResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&is_inventory=1&product_id_details=&status=1&warehouse_id=${data.category?.value || ''}&per_page=20&start=0`,
    )
    const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)
    dispatch({
      type: posOrderActions.QUICK_PRODUCT_UPDATE,
      payload: {
        list: formatQuickProductList,
        meta: quickProductResponse.data?.meta
      },
    })

    // clear product in orders , cause warehouse changed

    let newListOrder = orders.list
    newListOrder.map((order, index) => {
      if (order.id == activeOrder.id)
        newListOrder[index].product = []
        newListOrder[index].changed = true
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newListOrder
    })
    func.onTabChange(activeOrder.id)
  }

  //ProductSearch

  const handleFetchProductList = async (k, page = 0,opt={}) => {

    if (page === 0)
      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          loading: true
        }
      })

    if (!!!k.trim() && page === 0) {
      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: { list: opt.productSearch.listOrigin, loading: false, page: 0 },
      })
    }

    const q = transformQueryObjToString({
      keyword: k.trim(),
      status: 1,
      warehouse_id: opt?.warehouseId ? opt.warehouseId : warehouseActiveValue?.value || '',
      start: page * 20,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details${q}`,
    )

    if (!!response?.data?.success) {
      const formatProductList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformProductData)

      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          list:
            page === 0
              ? formatProductList
              : [...opt.productSearch.list, ...formatProductList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
          canLoadMore: [...opt.productSearch.list, ...formatProductList].length >= response?.data?.meta?.total ? false : true
        },
      })
    }

    return response
  }

  const debounceSearchProduct = useCallback(debounce((keyword, page, opt) => {
    handleFetchProductList(keyword, page, opt)
  }, 500), [])

  const handleProductSearchKeywordChange = (val = '') => {
    const keyword = val ? `${val}` : ''

    dispatch({
      type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
      payload: { keyword: keyword },
    })
    debounceSearchProduct(keyword, 0, {productSearch,warehouseId: warehouseActiveValue?.value})
  }

  const [loadingMore, setLoadingMore] = useState(false)
  const onLoadMore = async () => {
    if (loadingMore) return
    const currentTotal = state.productSearch.list.length
    const total = state.productSearch.meta.total
    if (currentTotal >= total) return
    setLoadingMore(true)
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&is_inventory=&status=1&warehouse_id=${warehouseActiveValue?.value || ''}&per_page=20&start=${state.productSearch.list.length}`,
    )
    if (!!productResponse.data.success) {
      const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)
      //
      dispatch({
        type: actions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          list: [...productSearch.list, ...formatProductList],
          meta: productResponse.data?.meta
        }
      })
      setLoadingMore(false)
    }
  }

  const handleSearchProductChange = (data, opt = {}) => {
    if (
      ![
        'increase',
        'decrease',
        'amount',
        'price',
        'discount',
        'discountValue',
        'discountEdit',
        'discountType',
      ].includes(opt?.type) ||
      !data
    )
      return
    let orderCurrent = !!opt?.orders ? opt?.orders.list.find(order => order.id == opt?.orders.active) : activeOrder
    let newSelectArr = orderCurrent?.product
    const findIndexData = newSelectArr.findIndex(
      item => item?.data?.id === data?.id,
    )

    const pageActive = !!opt?.orders ? opt?.orders?.active : state?.orders?.active
    const priceType = !!opt?.orders ? opt?.orders?.list?.find(item => +item.id === +pageActive)?.priceType : state?.orders?.list?.find(item => +item.id === +pageActive)?.priceType

    switch (opt.type) {
      case 'amount':
        if (findIndexData !== -1) {
          const amountFormat = Math.ceil(opt.amount)
          if (opt?.amount === -1) {
            newSelectArr = newSelectArr.filter((item, i) => i !== findIndexData)
          } else
            newSelectArr[findIndexData].quantity =
              typeof opt?.amount === 'string'
                ? opt?.amount
                ? 1
                : ''
                : +amountFormat > 9999 ? 9999 : +amountFormat
        } else
          newSelectArr = [
            { data, quantity: opt?.amount ? 1 : '' },
            ...newSelectArr,
          ]
        break

      case 'decrease':
        if (findIndexData !== -1) {
          if (newSelectArr[findIndexData].quantity > 1)
            newSelectArr[findIndexData].quantity -= 1
        }
        break

      case 'increase':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].quantity += 1
          if (newSelectArr[findIndexData].quantity > 9999) newSelectArr[findIndexData].quantity = 9999
        } else
          newSelectArr = [
            {
              data,
              quantity: 1,
              discountType: '%',
              price: priceType === 1 ? Number(opt?.price || 0) : Number(data?.wholesale_price || 0),
              triggerDefault: (newSelectArr.length > 0) ? !newSelectArr[0].triggerDefault : true
            },
            ...newSelectArr,
          ]
        break

      case 'price':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].price = Number((opt?.value > 99999999 ? 99999999 : opt?.value) || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discount':
        if (findIndexData !== -1) {
          const total = (+newSelectArr[findIndexData].quantity * +newSelectArr[findIndexData].price) || 0
          if (total < Number(opt?.value || 0)) opt.value = total
          newSelectArr[findIndexData].discount = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountValue':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].discount_value = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountEdit':
        if (findIndexData !== -1) {
          const total = (+newSelectArr[findIndexData].quantity * +newSelectArr[findIndexData].price) || 0
          if (total < Number(opt?.value || 0)) opt.value = total
          newSelectArr[findIndexData].discount = Number(opt?.value || 0)
          newSelectArr[findIndexData].discount_value = Number(opt?.value || 0)
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      case 'discountType':
        if (findIndexData !== -1) {
          newSelectArr[findIndexData].discountType = opt?.value
          newSelectArr[findIndexData].discount = 0
          newSelectArr[findIndexData].triggerDefault = !newSelectArr[findIndexData]?.triggerDefault
        }
        break

      default:
        break
    }
    let newListOrder = !!opt?.orders ? opt.orders.list : orders.list
    newListOrder.map((order, index) => {
      if (order.id == orderCurrent.id)
        newListOrder[index].product = newSelectArr
        newListOrder[index].changed = true
    })
    dispatch({
      type: posOrderActions.ORDER_PRODUCT_UPDATE,
      payload: newListOrder
    })

    const products = newSelectArr
    const provisional = products?.reduce((p, n, i) => {
      const itemPrice =
        Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) - (
          products[i]?.discountType === '%'
            ?  Math.floor(Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) *  Number(products[i]?.discount || 0) / 100)
            :  Number(products[i]?.discount || 0)
        )
      return p + itemPrice
    }, 0)
    const discount = newListOrder?.find(item => +item.id === +pageActive)?.discount
    const discountInOrder = Math.floor(discount?.type === '%' ? provisional * discount?.value / 100  : discount?.value || 0)
    const guestMustPay = provisional - discountInOrder
    const paymentMethodActive = !!opt?.paymentMethod ? opt.paymentMethod : state?.payment?.method?.listActive
    if(paymentMethodActive?.length > 0) {
      paymentMethodActive?.map(item => {
        if(+item.id === +pageActive) {
          item.data[0].price = guestMustPay
        }
      })
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: paymentMethodActive
      })
    }
  }

  const productSearchKeyword = productSearch.keyword
  const productSearchList = productSearch.list

  const handleChangeBarcode = boo => {
    dispatch({
      type: actions.UPDATE_BARCODE_STATUS,
      payload: {
        status: boo
      }
    })
  }

  const debounceInputSearchProduct = useCallback(debounce((data, opt={}) => {
    handleBarcodeFetchProductList(data, opt)
  }, 10), [])
  const handleInputChangeBarcode = data => {
    dispatch({
      type: actions.UPDATE_BARCODE_STATUS,
      payload: {
        value: data
      }
    })
    debounceInputSearchProduct(data, { warehouseId: warehouseActiveValue?.value,orders, paymentMethod:state?.payment?.method?.listActive})
  }

  const handleBarcodeFetchProductList = async (k, opt={}) => {

    const q = transformQueryObjToString({
      keyword: k.trim(),
      status: 1,
      warehouse_id: opt?.warehouseId || '',
      start: 0,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list-all-product-details${q}`,
    )

    if (!!response?.data?.success) {
      if (response?.data?.data.length == 0) {
        showAlert({
          type: 'danger',
          content: 'Sản phẩm không tồn tại',
          duration: 1000
        })
      } else {
        const formatProductList = ArrayUtils.getQualifiedArray(
          response?.data?.data,
        ).map(transformProductData)
        if (+formatProductList[0].data.warehouse_quantity > 0)
          handleSearchProductChange(formatProductList[0].data, {
            type: 'increase',
            price: formatProductList[0].data?.price,
            orders: opt.orders,
            paymentMethod: opt.paymentMethod
          })
        else
          showAlert({
            type: 'danger',
            content: 'Sản phẩm không đủ tồn kho',
            duration: 1000
          })
      }
    }

    dispatch({
      type: actions.UPDATE_BARCODE_STATUS,
      payload: {
        value: ''
      }
    })
  }


  const handleDisplayModalLeavePage = boo => {
    dispatch({
      type: actions.UPDATE_LEAVE_MODAL_STATUS,
      payload: boo
    })
  }

  return {
    state,
    data: {
      statusUpdate: state.statusUpdate,
      leaveModal: {
        status: state?.general?.modal?.leave,
        onDisplay: handleDisplayModalLeavePage
      },
      priceType,
      barcode: {
        ...state.barcode,
        onChange: handleChangeBarcode,
        onInputChange: handleInputChangeBarcode
      },
      orders: {
        ...orders,
        activeOrder: activeOrder,
      },
      warehouses: {
        ...warehouses,
        warehouseActiveValue: warehouseActiveValue,
        onKeywordChange: handleWarehouseKeywordChange,
        onChange: handleWarehouseChange,
      },
      products: state.products,
      productSearch: {
        loading: loadingMore,
        keyword: productSearchKeyword,
        list: productSearchList,
        onChange: handleSearchProductChange,
        onSearch: handleProductSearchKeywordChange,
        onLoadMore: onLoadMore,
      },
      errorSubmit
    }
  }
}