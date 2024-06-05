import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ProductContext} from "../provider/~context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {productActions} from "../provider/~action";
import toast from "../../../Component/Toast";
import {useLocation} from "react-router-dom";
import {PRODUCT_PAPER_SETTING_BARCODE, PRODUCT_PAPER_SIZE} from "../interfaces/~constants";
import {debounce} from "@mui/material";
import {
  transformProductData,
  transformQueryObjToString,
} from "../../orderSingle/utils/transform";
import ArrayUtils from "../../orderSingle/utils/array";
import useGlobalContext from "../../../containerContext/storeContext";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../const/display_name_menu";

const usePrintBarcode = () => {
  const { t } = useTranslation()
  const {pageState, pageDispatch} = useContext(ProductContext)
  const [stateGolbal, ] = useGlobalContext()
  const location = useLocation()
  // const idDefault = location?.pathname?.split('/')[3]?.split(',')[0]
  const productList = pageState?.printBarcode?.product?.list
  const warehouseInfo = pageState?.printBarcode?.warehouse
  const priceType = pageState?.printBarcode?.priceType
  const searchProduct = pageState?.printBarcode?.product
  const loadingTable = pageState?.printBarcode?.loading
  const [pageSize, setPageSize] = useState(PRODUCT_PAPER_SIZE)
  const [indexBarcode, setIndexBarcode] = useState(PRODUCT_PAPER_SETTING_BARCODE)
  const shopInfo = stateGolbal?.shopInfo

  const printType = pageState?.printBarcode?.formSubmit?.print_type
  const printSetting = pageState?.printBarcode?.formSubmit?.print_setting?.map(item => {
    return {
      code: item?.code,
      active: item?.active,
      position: item?.position,
    }
  })
  const printArrProduct = pageState?.printBarcode?.formSubmit?.arr_product?.map(item => {
    return {
      barcode: item?.barcode,
      product_name: item?.product_name,
      quantity: item?.number_of_stamps,
      price: +priceType?.value?.value === 2 ? item?.wholesale_price : item?.price,
    }
  })

  const handleCheckSize = size => {
    pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRINT_TYPE, payload: size?.code})
    setPageSize(pageSize?.map(item => {
      item.active = item?.id === size?.id ? '1' : '2'
      return item
    }))
  }

  const [paramListID, setParamListID] = useState('')
  useEffect(() => {
    if(!!paramListID) {
      pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT, payload: paramListID})
      pageDispatch({type: productActions.PRINT_CODE_UPDATE_ARR_PRODUCT, payload: paramListID})
    }
  }, [paramListID])
  const handleOriginFetch = async keyword => {
    const response = await Promise.all([
      sendRequestAuth('get',`${config.API}/warehouse/warehouses?keyword=${keyword || ''}&is_purchase&status&per_page=100&start=0`),
    ]).catch(() => toast.error('Lỗi sever!'))
    if(response[0]?.data?.success) {
      pageDispatch({type: productActions.PRINT_CODE_ADD_LIST_ORIGIN_WAREHOUSE, payload: {
          value: response[0]?.data?.data?.find(item => +item?.is_main === 1),
          list: response[0]?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
          listOrigin: response[0]?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1),
        }})
    }

    const listID = location?.pathname?.split('/')[3]?.split(',')
    const responseIdDefault = await sendRequestAuth('get', `${config.API}/product/list-all-product-details?product_id_details=${listID}&per_page=200&start=0`)
    if(responseIdDefault?.data?.success) {
      setParamListID(responseIdDefault?.data?.data?.map(item => {
        item.number_of_stamps = 1
        return item
      }))
      pageDispatch({type: productActions.PRINT_CODE_SET_LOADING, payload: false})
    }

    // let result = []
    // listID?.map(async item => {
    //   const responseIdDefault = await sendRequestAuth('get', `${config.API}/product/detail/${item}`)
    //   if (responseIdDefault?.data?.success) {
    //     responseIdDefault?.data?.data?.arr_product_details?.map(it => {
    //       it.number_of_stamps = 1
    //       result?.push(it)
    //     })
    //   }
    //   setParamListID(result)
    //   return item
    // })
    // setTimeout(() => pageDispatch({type: productActions.PRINT_CODE_SET_LOADING, payload: false}), 1000)
    handleFetchSearchProductList('', 0)
  }

  const handleChangeRowDetail = data => {
    console.log(data)
  }

  const querySubmit = {
    'print_type': printType,
    'print_setting': printSetting,
    "arr_product": printArrProduct,
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const submit = async _ => {
    if(debounceSubmit && printArrProduct?.length > 0) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 5000)

      const response = await sendRequestAuth(
        'post',
        `${config.API}/product/print-barcode`, JSON.stringify(querySubmit)
      )

      if(response?.data?.success && response?.data?.data?.url) {
        let linkBarCode = document.createElement('a')
        linkBarCode.href = response.data.data.url
        linkBarCode.target = '_blank'
        document.body.appendChild(linkBarCode);
        linkBarCode.click()
      } else {
        toast.error('Xuất file thất bại!')
      }
    } else if (printArrProduct?.length === 0) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 3000)
      toast.error(t(DISPLAY_NAME_MENU.PRODUCT_PAGE.LEAST_1_PRODUCT_PRINT_BARCODE))
    }
  }

  const canSubmit = [
    pageState?.printBarcode?.product?.list?.find(item => item.validate_stamps) === undefined,
    debounceSubmit
  ].includes(false)

  const handleChangeIndex = arr => {
    const result = arr?.map((item, index) => {
      const oldElement = indexBarcode?.find(it => it?.id === item?.id)
      item.element = oldElement?.element
      item.code = oldElement?.code
      item.name = oldElement?.name
      item.active = oldElement?.active
      item.position = index + 1
      return item
    })
    pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRINT_SETTING, payload: result})
    setIndexBarcode(result)
  }

  const handleChangeStatus = ele => {
    const result = indexBarcode?.map(item => {
      if(+ele?.id === +item?.id) {
        item.active = +item?.active === 1 ? 2 : 1
      }
      return item
    })
    pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRINT_SETTING, payload: result})
    setIndexBarcode(result)
  }

  const warehouseKeywordChange = async keyword => {
    const response = await Promise.all([
      sendRequestAuth('get',`${config.API}/warehouse/warehouses?keyword=${keyword || ''}&is_purchase&status&per_page=100&start=0`),
    ]).catch(() => toast.error('Lỗi sever!'))
    if(response[0]?.data?.success) {
      pageDispatch({type: productActions.PRINT_CODE_ADD_KEYWORD_CHANGE_WAREHOUSE,
                    payload: response[0]?.data?.data?.filter(item => +item?.status === 1 || +item?.is_main === 1)})
    }
  }

  // PRODUCT
  const withInventoryData = pageState?.printBarcode?.withInventoryConfig
  const productQueries = {
    keyword: '',
    category_id: '',
    product_id_details: '',
    status: 1,
    warehouse_id: '',
    per_page: 10,
    start: 0,
  }
  // ======================================================================================================
  // INVENTORY WAREHOUSE
  // ======================================================================================================
  const [isWarehouseLoading, setIsWarehouseLoading] = useState(false)

  const handleFetchWarehouseList = async (k, page) => {
    if (isWarehouseLoading) return

    if (page === 0) setIsWarehouseLoading(true)

    const warehouseQueries = {keyword: '', per_page: 10, start: 0}
    const q = transformQueryObjToString({
      ...warehouseQueries,
      keyword: k.trim(),
      start: isNaN(page * 10) ? 10 : page * 10,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/warehouse/warehouses${q}`,
    )

    if (!!response?.data?.success) {
      const warehouseListData = response?.data?.data

      pageDispatch({
        type: productActions.FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? warehouseListData
              : [...withInventoryData.warehouse.list, ...warehouseListData],
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    if (page === 0) setIsWarehouseLoading(false)

    return response
  }

  const handleWarehouseChange = data => {
    pageDispatch({
      type: productActions.FORM_WITH_INVENTORY_WAREHOUSE_UPDATE,
      payload: {value: data},
    })
    handleFetchSearchProductList(withInventoryData.search.value, 0, {
      queries: {warehouse_id: data?.value || ''},
    })
  }

  const debounceWarehouseKeywordChange = useCallback(
    debounce((data, page) => {
      handleFetchWarehouseList(data?.value, 0)
    }, 500),
    [],
  )

  const handleWarehouseKeywordChange = data => {
    pageDispatch({
      type: productActions.FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE,
      payload: {keyword: data?.value},
    })
    debounceWarehouseKeywordChange(data, 0)
  }

  const handleWarehouseLoadMore = () => {
    const currentTotal = withInventoryData?.warehouse?.list?.length
    const total = withInventoryData?.warehouse?.total

    if (currentTotal >= total) return null

    const response = handleFetchWarehouseList(
      withInventoryData.warehouse.keyword,
      withInventoryData.warehouse.page + 1,
    )

    return response
  }

  // ======================================================================================================
  // INVENTORY PRICE TYPE
  // ======================================================================================================
  const handlePriceTypeChange = data => {
    pageDispatch({
      type: productActions.FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE,
      payload: {value: data},
    })
    pageDispatch({
      type: productActions.PRINT_CODE_CHANGE_TYPE_PRICE_WAREHOUSE,
      payload: data,
    })
  }

  // ======================================================================================================
  // INVENTORY SEARCH
  // ======================================================================================================
  const withInventorySearchData = pageState?.printBarcode?.withInventoryConfig.search
  const withInventoryWarehouseData = pageState?.printBarcode?.withInventoryConfig.warehouse

  const handleFetchSearchProductList = async (k, page, opt) => {
    if (withInventorySearchData.loading) return

    if (page === 0)
      pageDispatch({
        type: productActions.FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE,
      })

    const q = transformQueryObjToString({
      ...productQueries,
      keyword: k.trim(),
      warehouse_id: withInventoryWarehouseData.value?.value || '',
      start: page * 10,
      ...opt?.queries,
    })

    const response = await sendRequestAuth('get', `${config.API}/product/list-all-product-details${q}`)

    if (!!response?.data?.success) {
      const formatCustomerList = ArrayUtils.getQualifiedArray(
        response?.data?.data?.map(item => {
          item.number_of_stamps = 1
          return item
        }),
      ).map(transformProductData)

      pageDispatch({
        type: productActions.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE,
        payload: {
          list:
            page === 0
              ? formatCustomerList
              : [...withInventorySearchData.list, ...formatCustomerList],
          loading: false,
          page,
          total: response?.data?.meta?.total || 0,
        },
      })
    }

    return response
  }


  const debounceWithInventorySearchChange = useCallback(
    debounce((keyword, page) => {
      handleFetchSearchProductList(keyword, 0)
    }, 500),
    [],
  )

  const handleWithInventorySearchChange = val => {
    const keyword = val ? `${val}` : ''

    pageDispatch({
      type: productActions.FORM_WITH_INVENTORY_SEARCH_UPDATE,
      payload: {value: keyword},
    })

    debounceWithInventorySearchChange(keyword, 0)
  }

  const handleWithInventorySearchSelect = (data, opt) => {
    const newData = pageState?.printBarcode?.product?.list
    const result = !!newData?.find(item => item?.id === data?.id)
                      ? newData?.map(item => {
                          if(item?.id === data?.id) item.number_of_stamps += 1
                          return item})
                      : [...newData, data]

    pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT, payload: result})
    pageDispatch({type: productActions.PRINT_CODE_UPDATE_ARR_PRODUCT, payload: result})
  }

  const handleWithInventorySearchListLoadMore = () => {
    const currentTotal = withInventorySearchData.list.length
    const total = withInventorySearchData.total

    if (currentTotal >= total) return

    const response = handleFetchSearchProductList(
      withInventorySearchData.value,
      withInventorySearchData.page + 1,
    )

    return response
  }

  const handleChangeItemTable = (data, action) => {

    switch (action?.type) {
      case 'removeItem':
        pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT,
                    payload: pageState?.printBarcode?.product?.list?.filter(item => item?.id !== data?.id)})
        pageDispatch({type: productActions.PRINT_CODE_UPDATE_ARR_PRODUCT,
                    payload: pageState?.printBarcode?.product?.list?.filter(item => item?.id !== data?.id)})
        break
      case 'increase':
        pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT,
                      payload: pageState?.printBarcode?.product?.list?.map(item => {
                        if(item?.id === data?.id) {
                          item.number_of_stamps++
                          item.validate_stamps = item.number_of_stamps > 1000 || item.number_of_stamps < 1
                        }
                        return item
                      })})
        break
      case 'decrease':
        pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT,
          payload: pageState?.printBarcode?.product?.list?.map(item => {
            if(item?.id === data?.id) {
              item.number_of_stamps--
              item.validate_stamps = item.number_of_stamps > 1000 || item.number_of_stamps < 1
            }
            return item
          })})
        break
      case 'amount':
        pageDispatch({type: productActions.PRINT_CODE_UPDATE_PRODUCT_DEFAULT,
          payload: pageState?.printBarcode?.product?.list?.map(item => {
            if(item?.id === data?.id) {
              item.number_of_stamps = action?.amount || ''
              item.validate_stamps = item.number_of_stamps > 1000 || item.number_of_stamps < 1
            }
            return item
          })})
        break
      default: break
    }
  }

  return {
    data: withInventoryData,
    value: {
      productList,
      warehouseInfo,
      debounceSubmit,
      pageSize,
      indexBarcode,
      priceType,
      searchProduct,
      loadingTable,
      shopInfo
    },
    functions: {
      handleOriginFetch,
      onChangeRowDetail: handleChangeRowDetail,
      onCheckSize: handleCheckSize,
      onChangeIndex: handleChangeIndex,
      onChangeStatus: handleChangeStatus,
      submit,

      onWithInventorySearchChange: handleWithInventorySearchChange,
      onWithInventorySearchFetchMoreProductList: handleWithInventorySearchListLoadMore,
      onWithInventorySearchSelect: handleWithInventorySearchSelect,
      onPriceTypeChange: handlePriceTypeChange,
      onWarehouseChange: handleWarehouseChange,
      onWarehouseKeywordChange: handleWarehouseKeywordChange,
      onWarehouseLoadMore: handleWarehouseLoadMore,

      onChangeItemTable: handleChangeItemTable,
    },
    properties: {
      isWarehouseLoading,
      canSubmit
    },
  }
}

export default usePrintBarcode;