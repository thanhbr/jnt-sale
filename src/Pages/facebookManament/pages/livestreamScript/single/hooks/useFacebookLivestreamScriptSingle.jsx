import {sendRequestAuth} from 'api/api'
import config from 'config'
import useGlobalContext from 'containerContext/storeContext'
import useAlert from 'hook/useAlert'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import StringUtils from 'Pages/facebookManament/utils/string'
import {transformQueryObjToString} from 'Pages/facebookManament/utils/transform'
import {useContext} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {facebookLivestreamScriptSingleActions as actions} from '../provider/_actions'
import {FacebookLivestreamScriptSingleContext} from '../provider/_context'
import {FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS} from '../provider/_initstate'
import { replaceAllCustom } from '../../../../../../util/functionUtil'

const useFacebookLiveStreamScriptSingle = () => {
  const [globalState] = useGlobalContext()
  const {facebookAuth} = useFacebookAuth()
  const {auth} = facebookAuth

  const navigate = useNavigate()
  const params = useParams()

  const {showAlert} = useAlert()

  const {state, dispatch} = useContext(FacebookLivestreamScriptSingleContext)
  const {
    name,
    fanpage,
    status,
    pricePolicy,
    warehouse,
    product,
    orderSyntax,
    orderTime,
    orderConfirm,
    shippingPoint,
    shippingPartner,
    cod,
    insurance,
    packageNumber,
    weight,
    length,
    width,
    height,
    note,
  } = state.form

  const getDetailData = async (id, originData) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/setting/order-script/detail/${id}`,
    )

    if (response?.data?.success) {
      const ruleParseData = JSON.parse(response?.data?.data?.rule)

      // fanpage
      const fanpageIdList = `${response?.data?.data?.page || ''}`.split(',')
      const findFanpageData = ArrayUtils.getQualifiedArray(
        originData[0]?.data?.data?.connected,
      ).filter(item => fanpageIdList.includes(item?.page_id))

      // warehouse
      const qualifiedWarehouseData = ArrayUtils.getQualifiedArray(
        originData[1]?.data?.data,
      )
      const findWarehouseData = response?.data?.data?.warehouse_id
        ? qualifiedWarehouseData.find(
            item => item?.id === `${response.data.data.warehouse_id}`,
          )
        : null
      const selectWarehouseData = findWarehouseData
        ? {
            data: findWarehouseData,
            name: findWarehouseData?.warehouse_name || '---',
            value: findWarehouseData?.id || '',
          }
        : qualifiedWarehouseData[0]
        ? {
            data: qualifiedWarehouseData[0],
            name: qualifiedWarehouseData[0]?.warehouse_name || '---',
            value: qualifiedWarehouseData[0]?.id || '',
          }
        : null

      // price policy
      const findPricePolicyData =
        response?.data?.data?.typeprice === 1
          ? FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy[0]
          : FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.pricePolicy[0]

      // product
      const productData = ArrayUtils.getQualifiedArray(
        response?.data?.data?.arr_product_detail,
      ).map(item => ({
        data: item,
        tags: ArrayUtils.getQualifiedArray(item?.keyword),
        name: item?.product_name || '---',
        value: item?.id || '',
      }))

      // order syntax
      const orderSyntaxPhoneData =
        ruleParseData?.phone_number == 1
          ? [FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderSyntax[1]]
          : []
      const orderSyntaxData = [
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderSyntax[0],
        ...orderSyntaxPhoneData,
      ]

      // order time
      const findOrderTimeData =
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderTime.find(
          item => `${item?.value}` === response?.data?.data?.draft_method,
        )
      const orderTimeData =
        findOrderTimeData ||
        FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS.orderTime[0]

      // shipping point
      const qualifiedShippingPointData = ArrayUtils.getQualifiedArray(
        originData[2]?.data?.data,
      )
      const findShippingPointData = response?.data?.data?.sender_address
        ? qualifiedShippingPointData.find(
            item => item?.id === `${response.data.data.sender_address}`,
          )
        : null
      const selectShippingPointData = findShippingPointData
        ? {
            data: findShippingPointData,
            name: findShippingPointData?.fullname || '---',
            value: findShippingPointData?.id || '',
          }
        : qualifiedShippingPointData[0]
        ? {
            data: qualifiedShippingPointData[0],
            name: qualifiedShippingPointData[0]?.fullname || '---',
            value: qualifiedShippingPointData[0]?.id || '',
          }
        : null

      // shipping partner
      const qualifiedShippingPartnerData = ArrayUtils.getQualifiedArray(
        originData[3]?.data?.data,
      )
      const findShippingPartnerData = response?.data?.data?.shipping_partner
        ? qualifiedShippingPointData.find(
            item => item?.id === `${response.data.data.shipping_partner}`,
          )
        : null
      const selectShippingPartnerData = findShippingPartnerData
        ? {
            data: findShippingPartnerData,
            name: findShippingPartnerData?.name || '---',
            value: findShippingPartnerData?.id || '',
          }
        : qualifiedShippingPartnerData[0]
        ? {
            data: qualifiedShippingPartnerData[0],
            name: qualifiedShippingPartnerData[0]?.name || '---',
            value: qualifiedShippingPartnerData[0]?.id || '',
          }
        : null
      const transformConfigDetail = {
        payer: response?.data?.data?.payer,
        request: response?.data?.data?.recipient_view,
        request_goods: response?.data?.data?.request_goods,
        partsign: response?.data?.data?.partsign,
        transport: response?.data?.data?.transport,
        service: response?.data?.data?.service_id,
      }
      let formatDefaultShippingPartnerconfig = {}
      ArrayUtils.getQualifiedArray(
        selectShippingPartnerData?.data?.fields,
      ).forEach(item => {
        for (let [key, value] of Object.entries(transformConfigDetail)) {
          if (item?.field === key)
            formatDefaultShippingPartnerconfig[`${item?.field}`] =
              item?.type === 'checkbox' ? [`${value}`] : `${value}`
          else if (
            !formatDefaultShippingPartnerconfig[`${item?.field}`] ||
            formatDefaultShippingPartnerconfig[`${item?.field}`] === ''
          )
            formatDefaultShippingPartnerconfig[`${item?.field}`] =
              item?.type === 'checkbox'
                ? ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                  ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
                  ? [`${item.values[0].value}`]
                  : []
                : ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                  ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
                ? `${item.values[0].value}`
                : ''
        }
      })

      dispatch({
        type: actions.DETAIL_ORIGIN_UPDATE,
        payload: {
          name: response?.data?.data?.name || '',
          fanpage: findFanpageData.map(item => ({
            data: item,
            name: item?.page_name || '---',
            value: item?.page_id || '',
          })),
          status: response?.data?.data?.status
            ? response.data.data.status === '1'
            : true,
          warehouse: selectWarehouseData,
          pricePolicy: findPricePolicyData
            ? findPricePolicyData
            : FACEBOOK_LIVESTREAM_SCRIPT_SINGLE_INITIAL_CONSTANTS
                .pricePolicy[0],
          product: productData,
          orderSyntax: orderSyntaxData,
          orderTime: orderTimeData,
          orderConfirm: response?.data?.data?.send_confirm === '1',
          shippingPoint: selectShippingPointData,
          shippingPartner: {
            value: selectShippingPartnerData,
            config: formatDefaultShippingPartnerconfig,
          },
          cod: {
            value: response?.data?.data?.cod
              ? Number(response.data.data.cod)
              : 0,
            disabled: response?.data?.data?.cod
              ? Number(response.data.data.cod) <= 0
              : true,
          },
          insurance: {
            value: response?.data?.data?.insurrance
              ? Number(response.data.data.insurrance)
              : 0,
            disabled: response?.data?.data?.is_insurrance !== '1',
          },
          packageNumber: response?.data?.data?.number_pack
            ? Number(response.data.data.number_pack)
            : 1,
          weight: response?.data?.data?.weight
            ? Number(response.data.data.weight)
            : 0,
          length: response?.data?.data?.lengh
            ? Number(response.data.data.lengh)
            : 10,
          width: response?.data?.data?.width
            ? Number(response.data.data.width)
            : 10,
          height: response?.data?.data?.height
            ? Number(response.data.data.height)
            : 10,
          note: response?.data?.data?.note || '',
        },
      })
    }
  }

  const getOriginData = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/fb/pages/${auth.userId}`),
      sendRequestAuth(
        'get',
        `${config.API}/warehouse/warehouses?keyword=&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/setting/addresses?keyword=&status=1&per_page=500&start=0`,
      ),
      sendRequestAuth('get', `${config.API}/tool/bulks/partners`),
      sendRequestAuth(
        'get',
        `${config.API}/setting/delivery-note/list?keyword=&status=1&per_page=500&start=0`,
      ),
      sendRequestAuth(
        'get',
        `${config.API}/fb/setting/order-script/list?keyword=&page_id=&status=`,
      ),
    ])

    if (response[0]?.data?.success)
      dispatch({
        type: actions.FANPAGE_LIST_ORIGIN_UPDATE,
        payload: {
          list: ArrayUtils.getQualifiedArray(response[0]?.data?.data?.connected)
            .filter(item => item?.manage_permission)
            .map(item => ({
              data: item,
              name: item?.page_name || '---',
              value: item?.page_id || '',
            })),
        },
      })

    if (response[1]?.data?.success) {
      const warehouseTransformData = ArrayUtils.getQualifiedArray(
        response[1]?.data?.data,
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
          pagination: {page: 0, total: response[1]?.data?.meta?.total},
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
              pagination: {page: 0, total: productResponse?.data?.meta?.total},
            },
          })
      }
    }

    if (response[2]?.data?.success) {
      const shippingPointTransformData = ArrayUtils.getQualifiedArray(
        response[2]?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.fullname || '---',
        value: item?.id || '',
      }))
      const findDefaultValue = shippingPointTransformData.find(
        item => item?.is_default === '1',
      )
      dispatch({
        type: actions.SHIPPING_POINT_LIST_ORIGIN_UPDATE,
        payload: {
          list: shippingPointTransformData,
          value: findDefaultValue
            ? findDefaultValue
            : shippingPointTransformData[0] || null,
          pagination: {page: 0, total: response[2]?.data?.meta?.total},
        },
      })
    }

    if (response[3]?.data?.success) {
      const shippingPartnerTransformData = ArrayUtils.getQualifiedArray(
        response[3]?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }))
      const findShippingPartner = shippingPartnerTransformData.find(
        item => item?.data?.is_default === 1,
      )
      const shippingPartnerDefault = findShippingPartner
        ? findShippingPartner
        : shippingPartnerTransformData[0] || null
      const defaultConfig = shippingPartnerDefault?.data?.config || {}
      let formatDefaultconfig = {}
      ArrayUtils.getQualifiedArray(
        shippingPartnerDefault?.data?.fields,
      ).forEach(item => {
        for (let [key, value] of Object.entries(defaultConfig)) {
          if (item?.field === key)
            formatDefaultconfig[`${item?.field}`] =
              item?.type === 'checkbox' ? [`${value}`] : `${value}`
          else if (
            !formatDefaultconfig[`${item?.field}`] ||
            formatDefaultconfig[`${item?.field}`] === ''
          )
            formatDefaultconfig[`${item?.field}`] =
              item?.type === 'checkbox'
                ? ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                  ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
                  ? [`${item.values[0].value}`]
                  : []
                : ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                  ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
                ? `${item.values[0].value}`
                : ''
        }
      })
      dispatch({
        type: actions.SHIPPING_PARTNER_LIST_ORIGIN_UPDATE,
        payload: {
          list: shippingPartnerTransformData,
          value: shippingPartnerDefault,
          config: formatDefaultconfig,
        },
      })
    }

    if (response[4]?.data?.success) {
      const noteTransformData = ArrayUtils.getQualifiedArray(
        response[4]?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.content || '---',
        value: item?.id || '',
      }))
      const findNote = noteTransformData.find(item => item?.is_default === '1')
      dispatch({
        type: actions.NOTE_LIST_ORIGIN_UPDATE,
        payload: {
          list: noteTransformData,
          keyword: findNote ? findNote?.name : noteTransformData[0]?.name || '',
          pagination: {page: 0, total: response[4]?.data?.meta?.total},
        },
      })
    }

    if (response[5]?.data?.success) {
      dispatch({
        type: actions.SCRIPT_LIST_ORIGIN_UPDATE,
        payload: {
          list: ArrayUtils.getQualifiedArray(response[5]?.data?.data),
        },
      })
    }

    return response
  }

  // ========================================================================
  // BASIC INFO
  // ========================================================================
  // name
  const handleNameChange = val =>
    dispatch({type: actions.NAME_UPDATE, payload: {value: val}})

  // fapage
  const handleFanpageChange = data =>
    dispatch({
      type: actions.FANPAGE_VALUE_UPDATE,
      payload: {value: ArrayUtils.getQualifiedArray(data)},
    })

  // status
  const handleStatusToggle = () => dispatch({type: actions.STATUS_TOGGLE})

  // ========================================================================
  // DECLARE ORDER KEYWORD
  // ========================================================================
  // warehouse
  const warehouseQueries = {keyword: '', per_page: 500, start: 0}

  const getWarehouses = async (keyword, page) => {
    if (warehouse.loading) return
    dispatch({
      type:
        page === 0
          ? actions.WAREHOUSE_LOADING_TOGGLE
          : actions.WAREHOUSE_LOADING_MORE_TOGGLE,
      payload: {loading: true},
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
          pagination: {page, total: response?.data?.meta?.total},
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.WAREHOUSE_LOADING_TOGGLE
            : actions.WAREHOUSE_LOADING_MORE_TOGGLE,
        payload: {loading: false},
      })
    }, 500)
  }

  const handleWarehouseChange = data => {
    dispatch({type: actions.WAREHOUSE_VALUE_UPDATE, payload: {value: data}})
    handleProductChange([])
  }

  let warehouseKeywordTimeout
  const handleWarehouseKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({type: actions.WAREHOUSE_KEYWORD_UPDATE, payload: {keyword}})
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

  // price policy
  const handlePricePolicyChange = data =>
    dispatch({type: actions.PRICE_POLICY_VALUE_UPDATE, payload: {value: data}})

  const handlePricePolicyKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({
      type: actions.PRICE_POLICY_KEYWORD_UPDATE,
      payload: {keyword},
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
      payload: {list: pricePolicyListData},
    })
  }

  // product
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
      payload: {loading: true},
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
          pagination: {page, total: response?.data?.meta?.total},
        },
      })
    }
    dispatch({
      type:
        page === 0
          ? actions.PRODUCT_LOADING_TOGGLE
          : actions.PRODUCT_LOADING_MORE_TOGGLE,
      payload: {loading: false},
    })
  }

  const getWarningProductTags = () => {
    let checkExisttags = []
    product.value.forEach(item => {
      checkExisttags = [...checkExisttags, ...item.tags]
    })
    const existTags = checkExisttags.filter(
      (item, index) => checkExisttags.indexOf(item) !== index,
    )
    return existTags
  }

  const handleProductChange = data => {
    dispatch({
      type: actions.PRODUCT_VALUE_UPDATE,
      payload: {
        value: data.map(item => ({
          ...item,
          tags: item?.tags ? item.tags : item?.data?.sku ? [item.data.sku] : [],
        })),
      },
    })
  }

  let productKeywordTimeout
  const handleProductKeywordChange = keyword => {
    dispatch({type: actions.PRODUCT_KEYWORD_UPDATE, payload: {keyword}})
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

  const handleProductTagsChange = (id, tags) => {
    const productTableTags = ArrayUtils.getQualifiedArray(
      state.validate.productTableTags,
    )

    if (tags.length > 5) {
      dispatch({
        type: actions.VALIDATE_UPDATE,
        payload: {
          validate: {
            ...state.validate,
            productTableTags: productTableTags.find(item => item?.id === id)
              ? productTableTags.map(item =>
                  item?.id === id
                    ? {
                        ...item,
                        content: 'Bạn chỉ được khai báo tối đa 5 từ khóa',
                      }
                    : {...item},
                )
              : [
                  ...productTableTags,
                  {id, content: 'Bạn chỉ được khai báo tối đa 5 từ khóa'},
                ],
          },
        },
      })

      return 'trigger'
    }

    const newData = product.value.map(item => ({
      ...item,
      tags: item?.value === id ? tags : item?.tags,
    }))

    handleProductChange(newData)
  }

  const handleProductDelete = id => {
    const newData = product.value.filter(item => item?.value !== id)
    handleProductChange(newData)
  }

  // ========================================================================
  // CONFIG AUTO MENU SYNTAX
  // ========================================================================
  // order syntax
  const handleOrderSyntaxChange = data => {
    const find = orderSyntax.value.find(item => item?.value === data?.value)
    dispatch({
      type: actions.ORDER_SYNTAX_VALUE_UPDATE,
      payload: {
        value: !!find
          ? orderSyntax.value.filter(item => item?.value !== data?.value)
          : [...orderSyntax.value, data],
      },
    })
  }

  // order time
  const handleOrderTimeChange = data =>
    dispatch({
      type: actions.ORDER_TIME_VALUE_UPDATE,
      payload: {value: data},
    })

  // order confirm
  const handleOrderConfirmToggle = boo =>
    dispatch({
      type: actions.ORDER_CONFIRM_TOGGLE,
      payload: {value: boo},
    })

  // ========================================================================
  // SHIPPING INFO
  // ========================================================================
  // shipping point
  const shippingPointQueries = {keyword: '', status: 1, per_page: 500, start: 0}

  const getShippingPoints = async (keyword, page) => {
    if (shippingPoint.loading) return
    dispatch({
      type:
        page === 0
          ? actions.SHIPPING_POINT_LOADING_TOGGLE
          : actions.SHIPPING_POINT_LOADING_MORE_TOGGLE,
      payload: {loading: true},
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
          pagination: {page, total: response?.data?.meta?.total},
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.SHIPPING_POINT_LOADING_TOGGLE
            : actions.SHIPPING_POINT_LOADING_MORE_TOGGLE,
        payload: {loading: false},
      })
    }, 500)
  }

  const handleShippingPointChange = data =>
    dispatch({
      type: actions.SHIPPING_POINT_VALUE_UPDATE,
      payload: {value: data},
    })

  let shippingPointKeywordTimeout
  const handleShippingPointKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({type: actions.SHIPPING_POINT_KEYWORD_UPDATE, payload: {keyword}})
    clearTimeout(shippingPointKeywordTimeout)
    shippingPointKeywordTimeout = setTimeout(
      () =>
        (!!keyword.trim() || keyword === '') && getShippingPoints(keyword, 0),
      500,
    )
  }

  const handleShippingPointLoadMore = () => {
    const currentTotal = shippingPoint.list.length
    const total = shippingPoint.pagination.total
    if (currentTotal >= total) return
    getShippingPoints(shippingPoint.keyword, shippingPoint.pagination.page + 1)
  }

  // shipping partner
  const handleShippingPartnerChange = data => {
    const defaultConfig = data?.data?.config || {}
    let formatDefaultconfig = {}
    ArrayUtils.getQualifiedArray(data?.data?.fields).forEach(item => {
      for (let [key, value] of Object.entries(defaultConfig)) {
        if (item?.field === key)
          formatDefaultconfig[`${item?.field}`] =
            item?.type === 'checkbox' ? [`${value}`] : `${value}`
        else if (
          !formatDefaultconfig[`${item?.field}`] ||
          formatDefaultconfig[`${item?.field}`] === ''
        )
          formatDefaultconfig[`${item?.field}`] =
            item?.type === 'checkbox'
              ? ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
                ? [`${item.values[0].value}`]
                : []
              : ArrayUtils.getQualifiedArray(item?.values)[0]?.value ||
                ArrayUtils.getQualifiedArray(item?.values)[0]?.value === ''
              ? `${item.values[0].value}`
              : ''
      }
    })
    dispatch({
      type: actions.SHIPPING_PARTNER_VALUE_UPDATE,
      payload: {config: formatDefaultconfig, value: data},
    })
  }

  const handleShippingPartnerKeywordChange = data => {
    const keyword = data?.value || ''
    dispatch({
      type: actions.SHIPPING_PARTNER_KEYWORD_UPDATE,
      payload: {keyword},
    })
    const formatDataValue = data?.value
      ? StringUtils.removeAcent(data?.value?.toLowerCase())
      : ''
    const shippingPartnerListData = shippingPartner.listOrigin.filter(item => {
      const formatNameItem = item?.name
        ? StringUtils.removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    dispatch({
      type: actions.SHIPPING_PARTNER_LIST_UPDATE,
      payload: {list: shippingPartnerListData},
    })
  }

  // cod
  const handleCodChange = val =>
    dispatch({type: actions.COD_VALUE_UPDATE, payload: {value: val}})

  const handleCodDisabledToggle = () =>
    dispatch({type: actions.COD_DISABLED_TOGGLE})

  // insurance
  const handleInsuranceChange = val =>
    dispatch({type: actions.INSURANCE_VALUE_UPDATE, payload: {value: val}})

  const handleInsuranceDisabledToggle = () =>
    dispatch({type: actions.INSURANCE_DISABLED_TOGGLE})

  // package number
  const handlePackageNumberChange = n =>
    dispatch({
      type: actions.PACKAGE_NUMBER_VALUE_UPDATE,
      payload: {value: n ? Number(n || 0) : 0},
    })

  // weight
  const handleWeightChange = n =>
    dispatch({
      type: actions.WEIGHT_VALUE_UPDATE,
      payload: {value: n || 0},
    })

  // length
  const handleLengthChange = n =>
    dispatch({
      type: actions.LENGTH_VALUE_UPDATE,
      payload: {value: n || 0},
    })

  // width
  const handleWidthChange = n =>
    dispatch({
      type: actions.WIDTH_VALUE_UPDATE,
      payload: {value: n || 0},
    })

  // height
  const handleHeightChange = n =>
    dispatch({
      type: actions.HEIGHT_VALUE_UPDATE,
      payload: {value: n || 0},
    })

  // shipping point
  const noteQueries = {keyword: '', status: 1, per_page: 500, start: 0}

  const getNotes = async (keyword, page) => {
    if (note.loading) return
    dispatch({
      type:
        page === 0
          ? actions.NOTE_LOADING_TOGGLE
          : actions.NOTE_LOADING_MORE_TOGGLE,
      payload: {loading: true},
    })
    const q = transformQueryObjToString({
      ...noteQueries,
      keyword: keyword ? keyword.trim() : '',
      start: isNaN(page * 500) ? 500 : page * 500,
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/setting/delivery-note/list${q}`,
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
          pagination: {page, total: response?.data?.meta?.total},
        },
      })
    }
    setTimeout(() => {
      dispatch({
        type:
          page === 0
            ? actions.NOTE_LOADING_TOGGLE
            : actions.NOTE_LOADING_MORE_TOGGLE,
        payload: {loading: false},
      })
    }, 500)
  }

  const handleNoteChange = data => {
    if (data?.name)
      dispatch({
        type: actions.NOTE_KEYWORD_UPDATE,
        payload: {keyword: data.name},
      })

    // dispatch({
    //   type: actions.NOTE_VALUE_UPDATE,
    //   payload: {value: data},
    // })
  }

  // let noteKeywordTimeout
  const handleNoteKeywordChange = keyword => {
    dispatch({type: actions.NOTE_KEYWORD_UPDATE, payload: {keyword}})
    // clearTimeout(noteKeywordTimeout)
    // noteKeywordTimeout = setTimeout(
    //   () => (!!keyword.trim() || keyword === '') && getNotes(keyword, 0),
    //   500,
    // )
  }

  const handleNoteLoadMore = () => {
    const currentTotal = note.list.length
    const total = note.pagination.total
    if (currentTotal >= total) return
    getNotes(note.keyword, note.pagination.page + 1)
  }

  // config
  const handleConfigChange = (field, opt) => {
    const currentConfig = shippingPartner.config
    if (opt?.type === 'single') currentConfig[`${field}`] = opt?.value
    else if (opt?.type === 'multiple') {
      const findDuplicate = ArrayUtils.getQualifiedArray(
        currentConfig[`${field}`],
      ).find(item => `${item}` === `${opt?.value}`)
      const newValue = !!findDuplicate
        ? currentConfig[`${field}`].filter(item => item !== findDuplicate)
        : [...currentConfig[`${field}`], opt?.value]
      currentConfig[`${field}`] = newValue
    }
    dispatch({type: actions.CONFIG_UPDATE, payload: {config: currentConfig}})
  }

  // ========================================================================
  // SUBMIT
  // ========================================================================
  const submitParams = {
    title: name.value.trim(),
    page_id: fanpage.value.map(item => item?.value).join(','),
    status: status.value ? 1 : -1,
    warehouse_id: warehouse.value?.value ? Number(warehouse.value.value) : '',
    type_price: pricePolicy.value?.value,
    item_details: product.value.map(item => ({
      product_id: item?.data?.product_id || item?.value,
      product_id_details: item?.data?.id,
      product_model: item?.data?.sku || '',
      product_name: item?.data?.product_name || '',
      weight: item?.data?.weight || '',
      price: item?.data?.price || '',
      wholesale_price: item?.data?.wholesale_price || '',
      keyword: item?.tags || [],
    })),
    type_phone: !!orderSyntax.value.find(item => item?.value === 2) ? 1 : 0,
    type_time: orderTime.value?.value,
    type_confirm: orderConfirm.value ? 1 : 0,
    id_sender:  shippingPoint.value ? shippingPoint.value.value:  globalState?.user?.user_id,
    shipping_partner: {
      partner_ship: shippingPartner.value?.value || '',
      cod: cod.value?.length > 3 ? replaceAllCustom(cod.value,',', '') : cod.value,
      weight: weight.value,
      width: width.value,
      height: height.value,
      lengh: length.value,
      note: note.keyword,
      is_insurrance: insurance.disabled ? 0 : 1,
      insurrance_value: insurance.value?.length > 3 ? replaceAllCustom(insurance.value,',', '')  : insurance.value,
      payer: shippingPartner.config?.payer || '',
      recipient_view: shippingPartner.config?.request || '',
      request_goods: shippingPartner.config?.request_goods || '',
      number_pack: packageNumber.value || '',
      pick_date: '',
      pick_shift: '',
      transport: shippingPartner.config?.transport || '',
      partsign: shippingPartner.config?.partsign
        ? shippingPartner.config?.partsign[0] || ''
        : '',
      serviceID: shippingPartner.config?.service || '',
      sub_service: '',
    },
  }

  const handleSubmit = async opt => {
    const response = await sendRequestAuth(
      'post',
      opt?.type === 'create'
        ? `${config.API}/fb/setting/order-script/create`
        : `${config.API}/fb/setting/order-script/update/${opt?.id}`,
      JSON.stringify({...submitParams, ...opt?.params}),
    )
    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content:
          opt?.type === 'create'
            ? 'Thêm mới kịch bản lên đơn tự động thành công'
            : 'Cập nhật kịch bản lên đơn tự động thành công',
      })
      if (opt?.type === 'create') navigate('/facebook/livestream-scripts')
    } else
      showAlert({
        type: 'danger',
        content:
          opt?.type === 'create'
            ? response?.data?.details?.message ||
              'Thêm mới kịch bản lên đơn tự động thất bại'
            : response?.data?.details?.message ||
              'Cập nhật kịch bản lên đơn tự động thất bại',
      })
    return response
  }

  const handleValidate = () => {
    const newValidate = {...state.validate}
    let check = true
    if (!name.value || !name.value.trim()) {
      newValidate.name = 'Tên kịch bản không được để trống'
      check = false
    }

    if (product.value.length <= 0) {
      newValidate.productSearch = 'Chưa có sản phẩm nào được chọn'
      check = false
    } else {
      const noTagProductList = product.value.filter(
        item => item.tags.length <= 0,
      )
      if (noTagProductList.length > 0) {
        newValidate.productTableTags = noTagProductList.map(item => ({
          id: item?.value,
          content: 'Từ khóa cho sản phẩm không được để trống',
        }))
        check = false
      }
      const warningTags = getWarningProductTags()
      const valueArr =  product.value.map(function(item){
          return !!warningTags.find(find => item.tags.includes(find))
      });
      if(valueArr.includes(true)) {
        check = false
      }
    }

    if (shippingPartner.value?.value === '3') {
      if (
        length.value <= 0 ||
        [length.value > 0, width.value > 0, height.value > 0].includes(false)
      ) {
        newValidate.lengthType = length.value > 0 ? 'defaultDanger' : 'danger'
        newValidate.lengthContent =
          'DVVC Giao hàng nhanh yêu cầu tất cả các kích thước phải lớn hơn 0'
        check = false
      }
      if (width.value <= 0) {
        newValidate.width = true
        check = false
      }
      if (height.value <= 0) {
        newValidate.height = true
        check = false
      }
    }

    dispatch({type: actions.VALIDATE_UPDATE, payload: {validate: newValidate}})

    return check
  }

  const handleValidateFanpageDuplicate = async () => {
    const idList = fanpage.value.map(item => item?.value)
    const idListString = idList.join(',')

    const id = params?.single && params.single !== 'create' ? params.single : ''

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/setting/order-script/check?id=${id}&page_id=${idListString}`,
    )

    return response
  }

  const handleRemoveValidate = opt => {
    const newValidate = {...state.validate}
    opt.forEach(item => (newValidate[`${item?.name}`] = item?.value))
    dispatch({type: actions.VALIDATE_UPDATE, payload: {validate: newValidate}})
  }

  const handleCheckLeavePage = () => {
    return [
      name.value === name.valueOrigin,
      JSON.stringify(fanpage.value) === JSON.stringify(fanpage.valueOrigin),
      status.value === status.valueOrigin,
      JSON.stringify(warehouse.value) === JSON.stringify(warehouse.valueOrigin),
      JSON.stringify(pricePolicy.value) ===
        JSON.stringify(pricePolicy.valueOrigin),
      JSON.stringify(product.value) === JSON.stringify(product.valueOrigin),
      JSON.stringify(orderSyntax.value) ===
        JSON.stringify(orderSyntax.valueOrigin),
      JSON.stringify(orderTime.value) === JSON.stringify(orderTime.valueOrigin),
      orderConfirm.value === orderConfirm.valueOrigin,
      JSON.stringify(shippingPoint.value) ===
        JSON.stringify(shippingPoint.valueOrigin),
      JSON.stringify(shippingPartner.value) ===
        JSON.stringify(shippingPartner.valueOrigin),
      cod.value === cod.valueOrigin,
      insurance.value === insurance.valueOrigin,
      insurance.disabled === insurance.disabledOrigin,
      packageNumber.value === packageNumber.valueOrigin,
      weight.value === weight.valueOrigin,
      length.value === length.valueOrigin,
      width.value === width.valueOrigin,
      height.value === height.valueOrigin,
      note.keyword === note.keywordOrigin,
    ].includes(false)
  }

  return {
    data: state,
    methods: {
      getDetailData,
      getOriginData,
      handleCheckLeavePage,
      handleRemoveValidate,
      handleSubmit,
      handleValidate,
      handleValidateFanpageDuplicate,
    },
    basicInfoMethods: {
      // name
      handleNameChange,
      // fanpage
      handleFanpageChange,
      // status
      handleStatusToggle,
    },
    declareOrderKeywordMethods: {
      // warehouse
      handleWarehouseChange,
      handleWarehouseKeywordChange,
      handleWarehouseLoadMore,
      // price policy
      handlePricePolicyChange,
      handlePricePolicyKeywordChange,
      //product
      getWarningProductTags,
      handleProductChange,
      handleProductKeywordChange,
      handleProductLoadMore,
      handleProductTagsChange,
      handleProductDelete,
    },
    configAutoMenuSyntaxMethods: {
      // order syntax
      handleOrderSyntaxChange,
      // order time
      handleOrderTimeChange,
      // order confirm
      handleOrderConfirmToggle,
    },
    shippingInfoMethods: {
      // shipping point
      handleShippingPointChange,
      handleShippingPointKeywordChange,
      handleShippingPointLoadMore,
      // shipping partner
      handleShippingPartnerChange,
      handleShippingPartnerKeywordChange,
      // cod
      handleCodChange,
      handleCodDisabledToggle,
      // insurance
      handleInsuranceChange,
      handleInsuranceDisabledToggle,
      // package number
      handlePackageNumberChange,
      // weight
      handleWeightChange,
      // length
      handleLengthChange,
      // width
      handleWidthChange,
      // height
      handleHeightChange,
      // note
      handleNoteChange,
      handleNoteKeywordChange,
      handleNoteLoadMore,
      // config
      handleConfigChange,
    },
  }
}

export default useFacebookLiveStreamScriptSingle
