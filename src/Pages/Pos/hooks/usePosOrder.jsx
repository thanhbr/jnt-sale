import { useContext } from 'react'
import useAlert from '../../../hook/useAlert'
import { PosOrderContext } from '../provider/_context'
import { sendRequestAuth } from '../../../api/api'
import config from '../../../config'
import ArrayUtils from '../../orderSingle/utils/array'
import {
  transformCustomerData,
  transformPaymentMethodData,
  transformProductData, transformShippingPointData, transformSourceData,
  transformWarehouseData
} from '../../orderSingle/utils/transform'
import { posOrderActions } from '../provider/_actions'
import useGlobalContext from "../../../containerContext/storeContext";

export const usePosOrder = () => {
  const { state, dispatch } = useContext(PosOrderContext)
  const [stateGolbal, ] = useGlobalContext()
  const { showAlert } = useAlert()

  const fetchOriginData = async () => {
    const storageState = window.localStorage.getItem('order_pos') ? JSON.parse(window.localStorage.getItem('order_pos')) : ''
    if(!!storageState){
      dispatch({
        type: posOrderActions.LOAD_STATE,
        payload: storageState
      })
    }else{
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/warehouse/warehouses?status=1&per_page=9999999&start=0`),
        sendRequestAuth('get', `${config.API}/payment/payment-method?keyword&status=1&per_page=999&start=0`),
        sendRequestAuth('get', `${config.API}/customer/customer-search?keyword=&group=&city_id=&district_id=&ward_id=&status=1&per_page=20&start=0`),
        sendRequestAuth('get', `${config.API}/product/category/list?keyword=&status=`),
        sendRequestAuth('get',`${config.API}/customer/groups?status=1&per_page=99999`),
      ])
      if(
        !!response[0]?.data?.success &&
        !!response[1]?.data?.success &&
        !!response[2]?.data?.success
      ){

        let WarehouseValueData = null
        const formatWarehouseList = ArrayUtils.getQualifiedArray(
          response[0]?.data?.data,
        ).map(item => {
          if (item?.is_main === '1' && !WarehouseValueData)
            WarehouseValueData = transformWarehouseData(item)
          return transformWarehouseData(item)
        })

        const productResponse = await sendRequestAuth('get',`${config.API}/product/list-all-product-details?keyword=&category_id=&product_id_details=&status=1&warehouse_id=${formatWarehouseList[0]?.value || ''}&per_page=20&start=0`,
        )
        const formatProductList = ArrayUtils.getQualifiedArray(productResponse.data?.data).map(transformProductData)

        const quickProductResponse = await sendRequestAuth('get',`${config.API}/product/list-all-product-details?keyword=&category_id=&is_inventory=1&product_id_details=&status=1&warehouse_id=${formatWarehouseList[0]?.value || ''}&per_page=20&start=0`,
        )
        const formatQuickProductList = ArrayUtils.getQualifiedArray(quickProductResponse.data?.data).map(transformProductData)

        let paymentMethodValueData = null
        const formatPaymentMethodList = ArrayUtils.getQualifiedArray(
          response[1]?.data?.data,
        ).map(item => {
          if (item?.is_active === '1' && !paymentMethodValueData)
            paymentMethodValueData = transformPaymentMethodData(item)
          return transformPaymentMethodData(item)
        })

        const formatCustomerList = ArrayUtils.getQualifiedArray(
          response[2]?.data?.data,
        ).map(transformCustomerData)

        const warehouseDefault = formatWarehouseList.find(warehouse => +warehouse?.data?.is_main == 1)
        warehouseDefault.id = 1
        dispatch({
          type: posOrderActions.ORIGIN,
          payload: {
            payment: {
              method: {
                list: formatPaymentMethodList,
                listActive: [{
                  id: 1,
                  data: [paymentMethodValueData || formatPaymentMethodList[0]],
                }],
                total: response[3]?.data?.meta?.total || 0,
                value: paymentMethodValueData || formatPaymentMethodList[0],
              },
            },
            products: {
              list: formatQuickProductList,
              meta: quickProductResponse.data?.meta
            },
            productSearch: {
              list: formatProductList,
              meta: productResponse.data?.meta
            },
            warehouses: formatWarehouseList,
            customerInfo: {
              list: formatCustomerList,
              listOrigin: formatCustomerList,
              total: response[2]?.data?.meta?.total,
              totalOrigin: response[2]?.data?.meta?.total,
            },
            warehouseDefault: [warehouseDefault]
          },
        })
      }

      if(response[3]?.data?.success) {
        dispatch({
          type: posOrderActions.FILTER_GROUP_PRODUCT_UPDATE,
          payload: {
            list: response[3]?.data?.data,
            listOrigin: response[3]?.data?.data,
          }
        })
      }
      if(response[4]?.data?.success) {
        dispatch({
          type: posOrderActions.FORM_GROUP_CUSTOMER_UPDATE,
          payload: {
            list: ArrayUtils.getQualifiedArray(response[4]?.data?.data).map(
              transformCustomerData,
            ),
            listOrigin: ArrayUtils.getQualifiedArray(response[4]?.data?.data).map(
              transformCustomerData,
            ),
          }
        })
      }
    }
  }

  const fetchAddressOrder = async _ => {
    const response = await sendRequestAuth('get', `${config.API}/setting/addresses?keyword=&status=&per_page=100&start=0`)

    if(response?.data?.success) {
      let shippingPointValueData = null
      const formatShippingPointList = ArrayUtils.getQualifiedArray(
        response?.data?.data?.filter(item => +item?.status === 1),
      ).map(item => {
        if (item?.is_default === '1' && !shippingPointValueData)
          shippingPointValueData = transformShippingPointData(item)
        return transformShippingPointData(item)
      })
      dispatch({
        type: posOrderActions.SET_ADDRESS_ORDER,
        payload: shippingPointValueData
      })
    }
  }

  const handleDisplayModalLeavePage = boo => {
    dispatch({
      type: posOrderActions.UPDATE_LEAVE_MODAL_STATUS,
      payload: boo
    })
  }
  return{
    data: state,
    origin: {
      fetchOriginData,
      fetchAddressOrder
    },
    methods: {
      onDisplayModalLeavePage: handleDisplayModalLeavePage
    }
  }
}