import { sendRequestAuth } from 'api/api'
import config from 'config'
import { useContext } from 'react'
import { bulkOrderCreateActions } from '../provider/_actions'
import { BulkOrderCreateContext } from '../provider/_context'
import { getArrayFromValue } from '../utils/array'
import { removeAcent } from '../utils/string'
import { BULK_ORDER_CREATE_CONSTANTS } from '../interface/_constants'

const useBulkOrderCreateForm = () => {
  const { state, dispatch } = useContext(BulkOrderCreateContext)

  // =================================================
  // SHIPPING PARTNER
  // =================================================
  const shippingPartner = state.form.shippingPartner

  const handleShippingPartnerChange = data => {
    let optionValue = {}
    getArrayFromValue(data?.data?.fields).forEach(item => {
      optionValue[item?.field] =
        item?.type === 'checkbox'
          ? data?.data?.config[item?.field]
          ? [`${data?.data?.config[item?.field]}`]
          : []
          : data?.data?.config[item?.field]
          ? `${data?.data?.config[item?.field]}`
          : item?.type === 'selectbox'
            ? getArrayFromValue(item?.values)[0]?.value || ''
            : ''
    })

    dispatch({
      type: bulkOrderCreateActions.FORM_SHIPPING_PARTNER_UPDATE,
      payload: { options: optionValue, value: data },
    })
  }

  const handleShippingPartnerKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const shippingPartnerListData = shippingPartner.listOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: bulkOrderCreateActions.FORM_SHIPPING_PARTNER_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: shippingPartnerListData,
      },
    })
  }

  const handleShippingPartnerOptionChange = (field, opt) => {
    let optionValue = state.form.shippingPartner.options
    if (field) {
      optionValue[field] =
        opt?.value || opt.value === ''
          ? opt.value
          : opt?.type === 'multiple'
          ? []
          : null
    }

    dispatch({
      type: bulkOrderCreateActions.FORM_SHIPPING_PARTNER_OPTION_UPDATE,
      payload: { options: optionValue },
    })
  }

  // =================================================
  // SHIPPING POINT
  // =================================================
  const shippingPoint = state.form.shippingPoint

  const handleFetchShippingPoint = async k => {
    const response = await sendRequestAuth(
      'get',
      `${
        config.API
      }/setting/addresses?keyword=${k.trim()}&status=1&per_page=20&start=0`,
    )

    if (!!response?.data?.success) {
      const shippingPointListData = getArrayFromValue(response?.data?.data).map(
        item => ({
          data: item,
          name: item?.fullname || '---',
          value: item?.id || '',
        }),
      )
      dispatch({
        type: bulkOrderCreateActions.FORM_SHIPPING_POINT_LIST_UPDATE,
        payload: { list: shippingPointListData },
      })
    }
  }

  const handleShippingPointChange = data =>
    dispatch({
      type: bulkOrderCreateActions.FORM_SHIPPING_POINT_UPDATE,
      payload: { value: data },
    })

  let shippingPointTimeout
  const handleShippingPointKeywordChange = data => {
    dispatch({
      type: bulkOrderCreateActions.FORM_SHIPPING_POINT_KEYWORD_UPDATE,
      payload: { keyword: data?.value || '' },
    })

    clearTimeout(shippingPointTimeout)
    shippingPointTimeout = setTimeout(() => {
      handleFetchShippingPoint(data?.value)
    }, 500)
  }

  // ==================================================================================================


  // ==================================================================================================
  // ===== ===== ===== ===== =====
  // SOURCE
  // ===== ===== ===== ===== =====
  const sourceActiveValue = state.form.source.activeValue
  const sourceKeyword = state.form.source.keyword
  const sourceList = state.form.source.list
  const sourceListOrigin = state.form.source.listOrigin
  const sourceValue = state.form.source.value

  const handleSourceChange = data =>
    dispatch({
      type: bulkOrderCreateActions.FORM_SOURCE_UPDATE,
      payload: { value: data },
    })

  const handleSourceKeywordChange = data => {
    const formatDataValue = data?.value
      ? removeAcent(data?.value?.toLowerCase())
      : ''

    const sourceListData = sourceListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: bulkOrderCreateActions.FORM_SOURCE_KEYWORD_UPDATE,
      payload: {
        keyword: data?.value || '',
        list: sourceListData,
      },
    })
  }

  // ###################

  const canOpenImportFileModal = ![
    !!shippingPartner.value?.value,
    !!shippingPoint.value?.value,
  ].includes(false)

  const handleErrorListUpdate = errList =>
    dispatch({
      type: bulkOrderCreateActions.TABLE_ERROR_UPDATE,
      payload: {
        error: {
          list: errList,
        },
      },
    })

  const handleFetchOrigin = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/tool/bulks/partners`),
      sendRequestAuth('get', `${config.API}/setting/addresses?status=1`),
      sendRequestAuth('get', `${config.API}/order/origins?status=1&per_page=9999999&start=0`),
      sendRequestAuth('get', `${config.API}/shop/info`)
    ])

    let shippingPartnerValueData = null
    const shippingPartnerListData = getArrayFromValue(
      response[0]?.data?.data,
    ).map(item => {
      // if (item?.is_default === 1) {
      if (item?.id === 1) {
        shippingPartnerValueData = {
          data: item,
          name: item?.name || '---',
          value: item?.id || '',
        }
      }
      return {
        data: item,
        name: item?.name || '---',
        value: item?.id || '',
      }
    })

    let shippingPointValueData = null
    const shippingPointListData = getArrayFromValue(
      response[1]?.data?.data,
    ).map(item => {
      // if (item?.is_default === '1') {
      if (item?.id === '1') {
        shippingPointValueData = {
          data: item,
          name: item?.fullname || '---',
          value: item?.id || '',
        }
      }
      return {
        data: item,
        name: item?.fullname || '---',
        value: item?.id || '',
      }
    })

    const orderSourceListData = getArrayFromValue(
      response[2]?.data?.data,
    ).map(item => {
      return {
        name: item?.name || '',
        value: item?.id || '',
      }
    })
    let pageSize = BULK_ORDER_CREATE_CONSTANTS?.printModal?.pageSize?.list
    const activeValue = pageSize.find(item => +item.id === +response[3]?.data?.data?.setting_print)
    dispatch({
      type: bulkOrderCreateActions.FORM_ORIGIN_UPDATE,
      payload: {
        shippingPartner: {
          list: shippingPartnerListData,
        },
        shippingPoint: {
          list: shippingPointListData,
        },
        source: {
          list: orderSourceListData,
        },
        activePrint: activeValue || pageSize[0]
      },
    })

    handleShippingPartnerChange(
      shippingPartnerValueData || shippingPartnerListData[0],
    )
    handleShippingPointChange(
      shippingPointValueData || shippingPointListData[0],
    )
  }

  return {
    source: {
      activeValue: sourceActiveValue,
      keyword: sourceKeyword,
      list: sourceList,
      value: sourceValue,
      onChange: handleSourceChange,
      onKeywordChange: handleSourceKeywordChange,
    },
    shippingPartner: {
      data: shippingPartner,
      methods: {
        onChange: handleShippingPartnerChange,
        onKeywordChange: handleShippingPartnerKeywordChange,
        onOptionChange: handleShippingPartnerOptionChange,
      },
    },
    shippingPoint: {
      data: shippingPoint,
      methods: {
        onChange: handleShippingPointChange,
        onKeywordChange: handleShippingPointKeywordChange,
      },
    },
    properties: {
      loading: state.form.loading,
      canOpenImportFileModal,
    },
    methods: {
      fetchOrigin: handleFetchOrigin,
      onErrorUpdate: handleErrorListUpdate,
    },
  }
}

export default useBulkOrderCreateForm
