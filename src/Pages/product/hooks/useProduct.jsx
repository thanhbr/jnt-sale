import {useReducer} from "react";
import {productInitialState} from "../provider/~initState";
import {productReducer} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {productActions} from "../provider/~action";
import {useLocation, useSearchParams} from "react-router-dom";
import {fNumber} from "../../../util/formatNumber";
import {CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS} from "../interfaces/~constants";

const useProduct = () => {
  const [state, dispatch] = useReducer(productReducer, productInitialState)
  const location = useLocation()?.pathname?.split('/')
  let [searchParams] = useSearchParams();

  const handleOriginFetch = async () => {
    const search = searchParams.get('search') || ''
    dispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/product/list?keyword=${search}&category_id=&status=&per_page=&start=`),
      sendRequestAuth('get', `${config.API}/product/category/list?keyword=${search}&status`),
      sendRequestAuth('get', `${config.API}/warehouse/warehouses?keyword${search}&is_purchase&status=1&per_page=5000&start=0`),
    ])
    if(response[0]?.data?.success) {
      const proFilter = state.filter
      dispatch({
        type: productActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: response[0]?.data?.data,
          },
          pagination: {
            active: response[0]?.data?.meta?.start || 0,
            amount: response[0]?.data?.meta?.per_page || 20,
            total: Math.ceil(response[0]?.data?.meta?.total / (response[0]?.data?.meta?.per_page || 20)),
            totalItems: response[0]?.data?.meta?.total,
          }
        },
      })
      dispatch({
        type: 'SET_FILTER',
        payload: {...proFilter, start: 0, total: response[0].data.meta.total},
      })
      dispatch({type: productActions.SET_LIST_DEFAULT, payload: response[0]?.data?.data})
    }
    if(response[1]?.data?.success) {
      dispatch({type: productActions.FORM_CREATE_ADD_LIST_ORIGIN, payload: {
          list: response[1]?.data?.data?.filter(item => +item?.status === 1),
          listOrigin: response[1]?.data?.data?.filter(item => +item?.status === 1),
        }})
    }
    if(response[2]?.data?.success) {
      const defaultWareHouse = response[2]?.data?.data?.find(item=> +item.is_main === 1)
      dispatch({type: productActions.WARE_HOUSE_LIST, payload:{
          list:response[2]?.data?.data,
          value:defaultWareHouse
        }})
    }

    dispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})


    // Form edit
    if(location[2] === 'edit') {
      const url = `${config.API}/product/detail/${location[3]}`
      const response = await sendRequestAuth( 'get', url )
      if(response?.data?.success) {
        const data = response?.data?.data
        dispatch({type: productActions.CHANGE_FORM_STATUS, payload: location[4] === '1' ? 'editSingleVersion' : 'editMultipleVersion'})
        // Basic
        dispatch({type: productActions.FORM_CREATE_CHANGE_ACTIVE_INFO_BASIC, payload: data?.status})
        dispatch({type: productActions.FORM_CREATE_CHANGE_NAME_INFO_BASIC, payload: data?.product_name})
        dispatch({type: productActions.FORM_CREATE_CHANGE_CODE_INFO_BASIC,
          payload: data?.product_model || (data?.arr_product_details?.length === 1 ? data?.arr_product_details[0]?.sku : '')})
        dispatch({
          type: productActions.FORM_CREATE_CHANGE_BARCODE_INFO_BASIC,
          payload: data?.arr_product_details?.length === 1 ? data?.arr_product_details[0]?.barcode : data?.barcode
        })
        // Product
        dispatch({type: productActions.FORM_CREATE_CHANGE_IMAGE_PRODUCT, payload: {name: data?.image_thumb?.split('/')[6], link: data?.image_thumb}})
        dispatch({type: productActions.FORM_CREATE_SHOW_NOTE_PRODUCT, payload: true})
        dispatch({type: productActions.FORM_CREATE_INIT_NOTE_PRODUCT, payload: data?.description})
        // Price
        dispatch({type: productActions.FORM_CREATE_CHANGE_UNIT_TYPE_PRODUCT, payload: data?.arr_product_details[0]?.weight_unit})
        dispatch({type: productActions.FORM_CREATE_INIT_WEIGHT_PRODUCT, payload: data?.arr_product_details[0]?.weight})
        const priceValue = fNumber(data?.arr_product_details[0]?.price?.toString()?.replace(/[^0-9]/g, ''))
        dispatch({type: productActions.FORM_CREATE_INIT_PRICE_RETAIL, payload: priceValue})
        const wholesaleValue = fNumber(data?.arr_product_details[0]?.wholesale_price?.toString().replace(/[^0-9]/g, ''))
        dispatch({type: productActions.FORM_CREATE_INIT_PRICE_WHOLESALE, payload:  wholesaleValue})
        const supplierValue = fNumber(data?.arr_product_details[0]?.supplier_price?.toString().replace(/[^0-9]/g, ''))
        dispatch({type: productActions.FORM_CREATE_INIT_PRICE_LAST_ENTRY, payload:  supplierValue})
        const costValue = fNumber(data?.arr_product_details[0]?.cost_price?.toString().replace(/[^0-9]/g, ''))
        dispatch({type: productActions.FORM_CREATE_INIT_PRICE_COST, payload: costValue})

        let warehouse_quantity = 0
        let orderCount = 0
        const valueAttr = data?.arr_product_details?.map(item => {
          warehouse_quantity += +item?.warehouse_quantity
          if(!!item?.order_id) orderCount++
          return {
            id: item?.id,
            idEdit: item?.id,
            image: item?.image_thumb,
            // image_name: item?.image_thumb?.split('/')[6],
            image_name: item?.image_thumb,
            name: data?.product_name,
            attr_size: item?.name_attr_value_1,
            attr_color: item?.name_attr_value_2,
            attr_type: item?.name_attr_value_3,
            sku: item?.sku,
            barcode: item?.barcode,
            weight: item?.weight,
            type_weight: item?.weight_unit,
            list_type: [
              {id: 'g', name: 'g', active: item?.weight_unit === 'g'},
              {id: 'kg', name: 'kg', active: item?.weight_unit !== 'g'},
            ],
            inventory: item?.warehouse_quantity,
            status: item?.status,
            price: fNumber(item?.price?.toString().replace(/[^0-9]/g, '')),
            wholesale_price: fNumber(item?.wholesale_price?.toString().replace(/[^0-9]/g, '')),
            supplier_price: fNumber(item?.supplier_price?.toString().replace(/[^0-9]/g, '')),
            cost_price: fNumber(item?.cost_price?.toString().replace(/[^0-9]/g, '')),
            verOldStatus: 'edit',
          }
        }).reverse()
        dispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: valueAttr})
        dispatch({type: productActions.FORM_EDIT_CHANGE_ATTRIBUTES_COLUMN_PRODUCT, payload: valueAttr})

        // STATUS EDIT CONFIRM
        dispatch({type: productActions.EDIT_PRODUCT_STATUS_CONFIRM,
          payload: {warehouse_quantity: warehouse_quantity, order: orderCount}})
        //

        if(!!!data?.arr_attr) {
          dispatch({type: productActions.FORM_CREATE_INIT_INVENTORY, payload: data?.arr_product_details[0]?.warehouse_quantity || 0})
        } else  {
          const list_attr = CREATE_PRODUCT_LIST_DEFAULT_ATTR_CONSTANTS
          const arr_attr = data?.arr_attr?.map((item, index) => {
            return {
              id: index + 1,
              code: list_attr[index].code,
              name: item.name
            }
          })
          const attr_value = data?.arr_attr?.map((item, index) => {
            return {
              code: list_attr[index]?.code,
              name: item?.name,
              value: item?.arr_value
            }
          })
          const formatAttrValue = attr_value?.map(item => {
            return {
              code: item?.code,
              name: item?.name,
              value: item?.value?.map(it => {
                return {
                  status: 'edit',
                  value: it
                }
              })
            }
          })
          dispatch({type: productActions.FORM_CREATE_CHANGE_INIT_ATTRIBUTES_PRODUCT, payload: arr_attr?.length})
          dispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_PRODUCT, payload: arr_attr})
          dispatch({type: productActions.FORM_CREATE_CHANGE_ATTRIBUTES_VALUE_PRODUCT, payload: formatAttrValue})
          // dispatch({type: productActions.FORM_CREATE_INIT_INVENTORY, payload: warehouse_quantity || 0})
        }


        const responseDetail = await Promise.all([
          sendRequestAuth('get', `${config.API}/product/category/detail/${data?.category_id}`),
          sendRequestAuth('get', `${config.API}/product/unit/detail/${data?.unit}`),
        ])
        if(responseDetail[0]?.data?.success) {
          dispatch({type: productActions.FORM_CREATE_CHANGE_ID_GROUP_INFO_BASIC, payload: responseDetail[0]?.data?.data[0]?.id})
          dispatch({type: productActions.FORM_CREATE_CHANGE_VALUE_GROUP_INFO_BASIC, payload: responseDetail[0]?.data?.data[0]?.category_name})
          // pageDispatch({type: productActions.FORM_CREATE_CHANGE_NAME_INFO_BASIC, payload: data?.product_name})
        }
        if(responseDetail[1]?.data?.success) {
          dispatch({type: productActions.FORM_CREATE_CHANGE_UNIT_VALUE_PRODUCT, payload: responseDetail[1]?.data?.data[0]})
        }

      }
    }
  }

  const fetchProductByFilter = async (qs, page) => {
    dispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: true})
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(qs)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }

    const response = await sendRequestAuth(
      'get',
      `${config.API}/product/list${queryString}`,
    )
    if(response?.data?.success) {

      dispatch({
        type: productActions.TABLE_AMOUNT_UPDATE,
        payload: {
          display: {
            list: response?.data?.data,
          },
          pagination: {
            active: +page,
            amount: +response?.data?.meta?.per_page || 20,
            total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
            totalItems: response?.data?.meta?.total,
          }
        },
      })
    }
    dispatch({type: productActions.TABLE_DISPLAY_LOADING_UPDATE, payload: false})
  }

  const queries = {
    keyword: state?.filter?.keyword || '',
    category_id: state?.filter?.category_id?.id || '',
    status: state?.filter?.status?.id || '',
    per_page: '',
    start: 0,
  }

  const handleAmountChange = async n => {
    fetchProductByFilter({...queries, per_page: n}, 0)
  }

  const handlePageChange = async page => {
    fetchProductByFilter({...queries, per_page: state?.table?.pagination?.amount, start: page * state?.table?.pagination?.amount}, page)
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
export default useProduct