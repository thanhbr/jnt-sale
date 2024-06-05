import { useContext } from 'react'
import { PosOrderContext } from '../provider/_context'
import { posOrderActions, posOrderActions as actions } from '../provider/_actions'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import ArrayUtils from '../../orderSingle/utils/array'
import { transformProductData } from '../../orderSingle/utils/transform'
import useAlert from '../../../hook/useAlert'

export const usePosOrderAction = () => {
  const { state, dispatch } = useContext(PosOrderContext)

  const { showAlert } = useAlert()
  const { orders } = state
  const { warehouse } = orders
  const { warehouses } = state

  const { productSearch } = state

  const warehouseDefault = warehouses.list.length > 0 ? warehouses.list.find(item => +item.is_main == 1) || warehouses.list[0] : []
  const categoryId = state.products.filter?.groupProduct?.id || ''

  const addNewOrders = async (listOrder, opt = {}) => {

    if (listOrder.length < 5) {
      dispatch({
        type: actions.SET_LOADING,
        payload: true
      })
      dispatch({
        type: actions.UPDATE_LIST_POS_ORDERS,
        payload: {
          list: [...listOrder, {
            id: listOrder[listOrder.length - 1].id + 1,
            product: [],
            discount: {
              type: '%',
              value: 0,
            },
            priceType: 1,
            changed: false
          }
          ],
          active: listOrder[listOrder.length - 1].id + 1,
          warehouse: [...orders.warehouse, {
            id: listOrder[listOrder.length - 1].id + 1,
            name: warehouseDefault?.name || opt.warehouseDefault?.name,
            value: warehouseDefault?.value || opt.warehouseDefault?.value
          }]
        }
      })
      dispatch({
        type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
        payload: [
          ...opt.customer,
          {
            id: listOrder[listOrder.length - 1].id + 1,
            data: {},
            tab: 'guest'
          }
        ]
      })
      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          list: productSearch.listOrigin, loading: false,
          page: 0,
          keyword: ''
        },
      })
      const listPayment = [opt.listPayment.list?.find(item => item?.data?.is_active === '1')]
      listPayment[0].price = 0
      listPayment[0].price_0 = 0
      const paymentMethodSelect = opt.listPayment.active?.filter(item => +item.id !== +listOrder[listOrder.length - 1].id + 1) || []
      dispatch({
        type: actions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: [
          ...paymentMethodSelect,
          {
            id: listOrder[listOrder.length - 1].id + 1,
            data: listPayment
          }
        ]
      })
      // call api reset list product and product search
      const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${warehouseDefault?.value || ''}&per_page=30&start=0`,
      )
      const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)
      const quickProductResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${opt?.categoryId || ''}&is_inventory=1&product_id_details=&status=1&warehouse_id=${warehouseDefault?.value || ''}&per_page=20&start=0`,
      )
      const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)
      dispatch({
        type: posOrderActions.QUICK_PRODUCT_UPDATE,
        payload: {
          list: formatQuickProductList,
          meta: quickProductResponse.data?.meta
        },
      })
      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          list: formatProductList,
          loading: false,
          page: 0,
          keyword: ''
        },
      })
    }

    dispatch({
      type: actions.SET_LOADING,
      payload: false
    })
  }
  // console.log('state', state)
  const removeOrders = (id, listOrder, opt = {}) => {
    const indexOfOrder = listOrder.findIndex(item => item.id == id)

    let warehouse = orders.warehouse.filter(item => item.id != id)
    if (listOrder.length > 1) {
      const newListOrder = listOrder.filter(item => item.id != id)
      dispatch({
        type: actions.UPDATE_LIST_POS_ORDERS,
        payload: {
          list: newListOrder,
          active: indexOfOrder == 0 ? newListOrder[indexOfOrder].id : newListOrder[indexOfOrder - 1].id,
          warehouse: warehouse
        }
      })
      dispatch({
        type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
        payload: {
          list: productSearch.listOrigin, loading: false,
          page: 0,
          keyword: ''
        },
      })

      const newListCustomer = opt?.customer?.length > 0 ? opt?.customer.filter(item => item.id != id) : {}
      dispatch({
        type: posOrderActions.ORDER_CUSTOMER_VALUE_UPDATE,
        payload: newListCustomer
      })
    }

    const paymentMethodSelect = state?.payment?.method?.listActive?.filter(item => +item.id !== +id) || []
    dispatch({
      type: actions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
      payload: paymentMethodSelect
    })
    showAlert({
      type: 'success',
      content: 'Đã xóa đơn hàng thành công'
    })
  }

  const handleOrderTabChange = async id => {

    // update active tab
    dispatch({
      type: actions.SET_LOADING,
      payload: true
    })
    dispatch({
      type: actions.UPDATE_TAB_ORDERS,
      payload: id
    })

    const warehouseActive = warehouse.find(item => item.id == id)

    // call api reset list product and product search
    const productResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=20&start=0`,
    )
    const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)
    const quickProductResponse = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?keyword=&category_id=${categoryId || ''}&is_inventory=1&product_id_details=&status=1&warehouse_id=${warehouseActive?.value || ''}&per_page=20&start=0`,
    )
    const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)
    dispatch({
      type: posOrderActions.QUICK_PRODUCT_UPDATE,
      payload: {
        list: formatQuickProductList,
        meta: quickProductResponse.data?.meta
      },
    })
    dispatch({
      type: posOrderActions.UPDATE_PRODUCT_SEARCH_INFO,
      payload: {
        list: formatProductList,
        loading: false,
        page: 0,
        keyword: ''
      },
    })
    dispatch({
      type: actions.SET_LOADING,
      payload: false
    })

    const products = state?.orders?.list?.find(item => +item.id === +id)?.product || []
    const provisional = products?.reduce((p, n, i) => {
      const itemPrice =
        Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) - (
          products[i]?.discountType === '%'
            ?  Math.floor(Number( products[i]?.price || 0, ) * Number(products[i]?.quantity || 0) *  Number(products[i]?.discount || 0) / 100)
            :  Number(products[i]?.discount || 0)
        )
      return p + itemPrice
    }, 0)
    const discount = state?.orders?.list?.find(item => +item.id === +id)?.discount
    const discountInOrder = Math.floor(discount?.type === '%' ? provisional * discount?.value / 100  : discount?.value || 0)
    const guestMustPay = provisional - discountInOrder
    const paymentMethodActive = state?.payment?.method?.listActive
    if(paymentMethodActive?.length > 0) {
      paymentMethodActive?.map(item => {
        if(+item.id === +id) {
          item.data[0].price = guestMustPay
        }
      })
      dispatch({
        type: posOrderActions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER,
        payload: paymentMethodActive
      })
    }
  }

  const handleDisplayModalRemoveOrder = (boo, order = {}) => {
    dispatch({
      type: actions.UPDATE_REMOVE_ORDER_MODAL_STATUS,
      payload: {
        display: boo,
        order: order
      }
    })
  }
  return {
    data: state,
    confirmRemoveOrderModal: {
      status: state?.general?.modal?.removeOrder.display,
      order: state?.general?.modal?.removeOrder.order,
      onDisplay: handleDisplayModalRemoveOrder
    },
    func: {
      addNewOrders, removeOrders,
      onTabChange: handleOrderTabChange,
    }
  }
}