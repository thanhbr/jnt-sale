import { useCallback, useContext } from 'react'
import { FacebookAutoResponsesContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { debounce } from '@mui/material'
import { orderActions } from '../../../../refactorOrder/provider/_reducer'
import { removeAcent } from '../../../../../common/fieldText/_functions'

const useFacebookAutoResponsesFilter = () => {

  const [GlobalState] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookAutoResponsesContext)
  const { showAlert } = useAlert()
  const {filter} = state
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const debounceListResponse = useCallback(debounce((data) => {
    getListResponseScript({keyword: data})
  }, 1000), [])
  const getListResponseScript = async (data) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await sendRequestAuth('get',
      `${config.API}/fb/setting/reply-script/${auth.userId}/list?keyword=${data?.keyword||''}&page_id=${data?.page_id || ''}&status&per_page=20&start=0`
    )
    if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
      dispatch({
        type: 'UPDATE_TABLE',
        payload: {
          display: {
            updateList: response.data.data,
            list: response.data.data,
          },
          pagination: {
            totalItems: response?.data?.data?.totals || 0
          },
          loading: false
        },
      })

      dispatch({
        type: 'SET_LOADING',
        payload: false,
      })
    }
  }
  
  const handleNameScript = value => {
    dispatch({
      type:'SET_KEYWORD',
      payload: value
    }) 
    if (value.trim() || value == ''){
      debounceListResponse(value.trim())
    }
  }

  // ===== ===== ===== ===== ===== PAGE SELECTED ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const pageSelectedActiveValue = filter.pageSelected.activeValue
  const pageSelectedKeyword = filter.pageSelected.keyword
  const pageSelectedList = filter.pageSelected.list
  const pageSelectedListOrigin = filter.pageSelected.listOrigin
  const pageSelectedTab = filter.pageSelected.tab
  const pageSelectedValue = filter.pageSelected.value

  const handlePageSelectedChange = data => {
    const find = pageSelectedValue.find(item => item.page_id === data.page_id)
    const pageSelectedListData =
      pageSelectedTab === 'checked'
        ? pageSelectedValue.filter(item => item.page_id !== data.page_id)
        : pageSelectedList
    const pageSelectedValueData = find
      ? pageSelectedValue.filter(item => item.page_id !== data.page_id)
      : [...pageSelectedValue, data]
    dispatch({
      type: 'FILTER_PAGE_SELECTED_UPDATE',
      payload: {
        list: pageSelectedListData,
        value: pageSelectedValueData,
      },
    })
  }

  const handlePageSelectedKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim()?.toLowerCase())
      : ''

    const findList =
      pageSelectedTab === 'checked'
        ? pageSelectedValue
        : pageSelectedListOrigin

    const pageSelectedListData = findList.filter(item => {
      const formatNameItem = item?.page_name
        ? removeAcent(item.page_name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_PAGE_SELECTED_KEYWORD_UPDATE',
      payload: {
        keyword: data?.value || '',
        list: pageSelectedListData,
      },
    })
  }

  const handlePageSelectedResetInput = () => {
    dispatch({
      type: 'FILTER_PAGE_SELECTED_UPDATE',
      payload: {
        list: pageSelectedListOrigin,
        value: [],
      },
    })
    getListResponseScript()
  }

  const handlePageSelectedTabChange = tab => {
    const formatDataValue = pageSelectedKeyword
      ? removeAcent(pageSelectedKeyword?.toLowerCase())
      : ''

    const pageSelectedListData = pageSelectedListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_PAGE_SELECTED_TAB_UPDATE',
      payload: {
        list: tab === 'checked' ? pageSelectedValue : pageSelectedListData,
        tab,
      },
    })
  }

  const handlePageSelectedSubmit = _ => {
    const pageId = Array.isArray(pageSelectedValue)? pageSelectedValue.map(item => item?.page_id).join(','): ''
    getListResponseScript({keyword: filter?.keyword,page_id: pageId})
  }

  return {
    data: state,
    pageSelected: {
      activeValue: pageSelectedActiveValue,
      keyword: pageSelectedKeyword,
      list: pageSelectedList,
      tab: pageSelectedTab,
      value: pageSelectedValue,
      onChange: handlePageSelectedChange,
      onInputReset: handlePageSelectedResetInput,
      onKeywordChange: handlePageSelectedKeywordChange,
      onTabChange: handlePageSelectedTabChange,
      onSubmit: handlePageSelectedSubmit,
    },
    methods: {
      onchangeKeyword: handleNameScript
    },
  }
}

export default useFacebookAutoResponsesFilter
