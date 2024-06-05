import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import StringUtils from 'Pages/facebookManament/utils/string'
import {transformQueryObjToString} from 'Pages/facebookManament/utils/transform'
import {useContext, useState} from 'react'
import {facebookLivestreamScriptActions as actions} from '../provider/_actions'
import {FacebookLivestreamScriptContext} from '../provider/_context'

const useFacebookLiveStreamScript = () => {
  const {showAlert} = useAlert()

  const {facebookAuth} = useFacebookAuth()
  const {auth} = facebookAuth

  const {state, dispatch} = useContext(FacebookLivestreamScriptContext)
  const {filter} = state

  const [isStatusLoading, setIsStatusLoading] = useState(false)

  const scriptQueries = {
    keyword: filter.search.value ? filter.search.value.trim() : '',
    page_id: filter.fanpage.activeValue?.value || '',
    status: '',
  }

  const getOriginData = async () => {
    const q = transformQueryObjToString(scriptQueries)

    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/fb/pages/${auth.userId}`),
      sendRequestAuth('get', `${config.API}/fb/setting/order-script/list${q}`),
    ])

    if (response[0]?.data?.success)
      dispatch({
        type: actions.FANPAGE_LIST_ORIGIN_UPDATE,
        payload: {
          list: ArrayUtils.getQualifiedArray(
            response[0]?.data?.data?.connected,
          ).map(item => ({
            data: item,
            name: item?.page_name || '---',
            value: item?.page_id || '',
          })),
        },
      })

    if (response[1]?.data?.success)
      dispatch({
        type: actions.SCRIPT_LIST_UPDATE,
        payload: {
          list: ArrayUtils.getQualifiedArray(response[1]?.data?.data),
        },
      })

    handleTableLoading(false)
  }

  const handleTableLoading = boo =>
    dispatch({type: actions.SCRIPT_LOADING_UPDATE, payload: {loading: boo}})

  const getScripts = async opt => {
    if (!opt?.notLoading) handleTableLoading(true)

    const q = transformQueryObjToString({...scriptQueries, ...opt?.queries})

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/setting/order-script/list${q}`,
    )

    if (response?.data?.success)
      dispatch({
        type: actions.SCRIPT_LIST_UPDATE,
        payload: {list: ArrayUtils.getQualifiedArray(response?.data?.data)},
      })

    if (!opt?.notLoading) handleTableLoading(false)
  }

  // =========================================================================
  // FILTER
  // =========================================================================
  let searchTimeout
  const handleSearchChange = e => {
    const keyword = e.target.value || ''
    dispatch({
      type: actions.FANPAGE_SEARCH_UPDATE,
      payload: {value: keyword},
    })
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(
      () =>
        (!!keyword.trim() || keyword === '') &&
        getScripts({queries: {keyword: keyword.trim()}}),
      500,
    )
  }

  const fanpageKeyword = filter.fanpage.keyword
  const fanpageList = filter.fanpage.list
  const fanpageListOrigin = filter.fanpage.listOrigin
  const fanpageTab = filter.fanpage.tab
  const fanpageValue = filter.fanpage.value

  const handleFanpageChange = data => {
    const find = fanpageValue.find(item => item?.value === data?.value)
    const fanpageListData =
      fanpageTab === 'checked'
        ? fanpageValue.filter(item => item?.value !== data?.value)
        : fanpageList
    const fanpageValueData = find
      ? fanpageValue.filter(item => item?.value !== data?.value)
      : [...fanpageValue, data]
    dispatch({
      type: actions.FANPAGE_VALUE_UPDATE,
      payload: {list: fanpageListData, value: fanpageValueData},
    })
  }

  const handleFanpageKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? StringUtils.removeAcent(data?.value.trim()?.toLowerCase())
      : ''
    const findList = fanpageTab === 'checked' ? fanpageValue : fanpageListOrigin
    const fanpageListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? StringUtils.removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    dispatch({
      type: actions.FANPAGE_KEYWORD_UPDATE,
      payload: {keyword: data?.value || '', list: fanpageListData},
    })
  }

  const handleFanpageResetInput = () => {
    dispatch({
      type: actions.FANPAGE_VALUE_UPDATE,
      payload: {list: fanpageListOrigin, value: []},
    })
    getScripts()
  }

  const handleFanpageTabChange = tab => {
    const formatDataValue = fanpageKeyword
      ? StringUtils.removeAcent(fanpageKeyword?.toLowerCase())
      : ''
    const fanpageListData = fanpageListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? StringUtils.removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    dispatch({
      type: actions.FANPAGE_TAB_UPDATE,
      payload: {list: tab === 'checked' ? fanpageValue : fanpageListData, tab},
    })
  }

  const handleFanpageSubmit = () => {
    const pageId = Array.isArray(fanpageValue)
      ? fanpageValue.map(item => item?.value).join(',')
      : ''
    getScripts({queries: {page_id: pageId}})
  }

  // =========================================================================
  // TABLE
  // =========================================================================

  const handleRowStatusChange = async (id, boo) => {
    if (isStatusLoading) return

    setIsStatusLoading(true)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/setting/order-script/active`,
      JSON.stringify({id: [id], status: boo ? 1 : -1}),
    )

    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content:
          response?.data?.message ||
          'Cập nhật trạng thái kịch bản lên đơn tự động thành công',
      })
      getScripts({notLoading: true})
    } else
      showAlert({
        type: 'danger',
        content:
          response?.data?.message ||
          'Cập nhật trạng thái kịch bản lên đơn tự động thất bại',
      })

    setIsStatusLoading(false)

    return response
  }

  return {
    data: state,
    properties: {isStatusLoading},
    methods: {getOriginData, getScripts, handleRowStatusChange},
    searchMethods: {onChange: handleSearchChange},
    fanpageMethods: {
      onChange: handleFanpageChange,
      onReset: handleFanpageResetInput,
      onSubmit: handleFanpageSubmit,
      onKeywordChange: handleFanpageKeywordChange,
      onTabChange: handleFanpageTabChange,
    },
  }
}

export default useFacebookLiveStreamScript
