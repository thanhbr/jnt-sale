import { useCallback, useContext, useState } from 'react'
import { FacebookLivestreamContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useAlert from '../../../../../hook/useAlert'
import { removeAcent } from '../../../../../common/fieldText/_functions'
import { debounce } from '@mui/material'
import { convertDateTimeToApiFormat } from '../../../../../common/form/datePicker/_functions'
import { transformListDetailData } from '../../../utils/transform'
import { useParams } from 'react-router-dom'
import { facebookLiveStreamDetailActions } from '../provider/_actions'
import useFacebookAuth from '../../../hooks/useFacebookAuth'
import { printWhb } from '../../../services/printer/print'

const useFilterFacebookLiveStreamDetail = () => {

  const { state, dispatch } = useContext(FacebookLivestreamContext)
  const { facebookAuth } = useFacebookAuth()
  const { auth } = facebookAuth
  const { showAlert } = useAlert()
  const { liveStream } = state
  const { meta } = state
  const { filter } = state
  const { page } = state
  const { configLiveStream } = state
  const [loadingMore, setLoadingMore] = useState(false)
  let { pageId, liveStreamId } = useParams()
  const {detail} = state
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // LIST FANPAGE

  const getListLiveStreamComment = async (qs, opt = {}) => {
    dispatch({
      type: 'SET_LIVESTREAM_LOADING',
      payload: true
    })
    const response = await Promise.all([
      sendRequestAuth(
          'get',
          `${config.API}/fb/livestream/filter/${liveStreamId}${convertQuery({ ...qs, ...opt })}`
      ),
      sendRequestAuth('get',
          `${config.API}/fb/livestream/comment-user/${detail?.liveStream?.customer?.sender_id}?stream_id=${detail?.liveStream?.customer?.stream_id}&group_person=1&comment_id`
      )
    ])
    if (!!response[0].data.success && !!response[1].data?.success) {
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list: response[0].data.data.filter(item => item.sender_id != pageId),
        },
      })
      dispatch({
        type: 'SET_META_LIVESTREAM',
        payload: response[0].data.meta
      })
      dispatch({
        type: 'SET_DETAIL_LIVESTREAM',
        payload: {
         listOrigin : response[1].data?.data || detail?.liveStream?.listOrigin,
        }
      })
      dispatch({
        type: 'SET_LIVESTREAM_LOADING',
        payload: false
      })
    }
  }

  const loadMoreConversation = async (qs, opt = {}) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/livestream/filter/${liveStreamId}${convertQuery({ ...qs, ...opt })}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list:
            opt.start == 0
              ? response.data.data.filter(item => item.sender_id != pageId)
              : [...liveStream.display.list, ...response.data.data.filter(item => item.sender_id != pageId)]
        },
      })
      dispatch({
        type: 'SET_META_LIVESTREAM',
        payload: response.data.meta
      })
      setLoadingMore(false)
      // if(+response.data.meta?.unread?.all > 0){
      //   document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      // }
    }
  }

  const getListLiveStreamCommentOnSocket = async (qs, code) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter${convertQuery(qs)}`
    )
    if (!!response.data.success) {
      let newListConversation = []
      if (!!code) {
        newListConversation = response.data.data.map((item) => {
          if (item.code == code) {
            item.is_read = 2
          }
          return item
        })
      } else {
        newListConversation = response.data.data
      }
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list: newListConversation.filter(item => item.sender_id != item.page_id),
        }
      })
      dispatch({
        type: 'SET_META_LIVESTREAM',
        payload: {
          total: response.data.meta?.total,
          unread: response.data.meta?.total_unread,
        }
      })
      if (+response.data.meta?.unread?.all > 0) {
        document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      } else {
        document.title = `evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }
    }

  }

  const handleDetailMessage = (response) => {
    const listDt = transformListDetailData(response?.data)
    dispatch({
      type: 'SET_DETAIL_LIVESTREAM',
      payload: {
        list: listDt,
        paging: response?.paging,
      }
    })
  }

  const handleNotification = boo => {
    dispatch({
      type: 'SET_NOTIFY',
      payload: boo
    })
  }

// Filter DATE

  const dateValue = filter.liveStream.date.value
  const startDate = filter.liveStream.date.start_date
  const endDate = filter.liveStream.date.end_date

  const handleDateChange = (data) => {
    dispatch({
      type: 'SET_FILTER_DATE',
      payload: {
        end_date: data.value[1],
        start_date: data.value[0],
        value: data.formatValue,
      },
    })
    getListLiveStreamComment(queries, {
      start_date: convertDateTimeToApiFormat(data.formatValue.split(' - ')[0]),
      end_date: convertDateTimeToApiFormat(data.formatValue.split(' - ')[1]),
    })
  }

  const clearFilterDate = () => {
    dispatch({
      type: 'CLEAR_FILTER_DATE',
    })
    getListLiveStreamComment(queries, {
      start_date: '',
      end_date: '',
      value: '',
    })
  }

// Filter TYPE

  const handleTypeChange = (data) => {
    dispatch({
      type: 'SET_FILTER_TYPE',
      payload: data
    })
    dispatch({
      type: 'UPDATE_PAGE_LOAD_MORE',
      payload: 0
    })
    getListLiveStreamComment(queries, { type: data, start: 0 })
  }

// Filter PAGE

  const handlePageChange = (page_id) => {
    const listPage = page.active.includes(page_id) ? page.active.filter(item => +item != +page_id) : [...page.active, page_id]
    dispatch({
      type: 'SET_FILTER_PAGE',
      payload: listPage
    })
    getListLiveStreamComment(queries, { page_id: listPage.toString() })
  }

// Filter KEYWORD

  const debounceKeywordChange = useCallback(debounce((queries, data) => {
    getListLiveStreamComment(queries, { keyword: data || '' })
  }, 500), [])

  const handleKeywordChange = (data) => {
    dispatch({
      type: 'SET_FILTER_KEYWORD',
      payload: data.target.value
    })
    debounceKeywordChange(queries, data.target.value)
  }

// Filter read status

  const handleReadStatus = (data) => {
    dispatch({
      type: 'SET_FILTER_STATUS_READ',
      payload: data
    })
  }

  const handleGroupPerson = (boo) => {
    dispatch({
      type: 'SET_FILTER_GROUP_PERSON',
      payload: boo
    })
    getListLiveStreamComment(queries, { page: 0, group_person: !!boo ? 1 : 0 })
  }

  const clearFilterReadStatus = () => {
    dispatch({
      type: 'CLEAR_FILTER_READ_STATUS',
    })
    getListLiveStreamComment(queries, { is_read: '' })
  }

// Filter order status

  const handleOrderStatus = (data) => {
    dispatch({
      type: 'SET_FILTER_STATUS_ORDER',
      payload: data
    })
  }

  const clearFilterOrderStatus = () => {
    dispatch({
      type: 'CLEAR_FILTER_ORDER_STATUS',
    })
    getListLiveStreamComment(queries, { is_order: '' })
  }

// Filter Phone

  const handleFilterPhone = (data) => {
    dispatch({
      type: 'SET_FILTER_PHONE',
      payload: data
    })
  }
  const clearFilterPhone = () => {
    dispatch({
      type: 'CLEAR_FILTER_PHONE',
    })
    getListLiveStreamComment(queries, { is_phone: 0 })
  }

// Filter Star comment

  const handleFilterStarComment = (data) => {
    dispatch({
      type: 'SET_FILTER_STAR_COMMENT',
      payload: data
    })
  }

  const clearFilterStarComment = () => {
    dispatch({
      type: 'CLEAR_FILTER_STAR_COMMENT',
    })
    getListLiveStreamComment(queries, { is_done: 0 })
  }

  // ===== ===== ===== ===== ===== TAGS CUSTOMER ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const tagsCustomerActiveValue = filter.liveStream.tagsCustomer.active
  const tagsCustomerKeyword = filter.liveStream.tagsCustomer.keyword
  const tagsCustomerList = filter.liveStream.tagsCustomer.list
  const tagsCustomerListOrigin = filter.liveStream.tagsCustomer.listOrigin
  const tagsCustomerTab = filter.liveStream.tagsCustomer.tab
  const tagsCustomerValue = filter.liveStream.tagsCustomer.value

  const clearFilterTagsCustomer = () => {
    dispatch({
      type: 'CLEAR_FILTER_TAGS_CUSTOMER',
    })
    getListLiveStreamComment(queries, { tags: '' })
  }

  const handleTagsCustomerChange = data => {
    const find = tagsCustomerValue.find(item => item.id === data.id)
    const tagsCustomerListData =
      tagsCustomerTab === 'checked'
        ? tagsCustomerValue.filter(item => item.id !== data.id)
        : tagsCustomerList
    const tagsCustomerValueData = find
      ? tagsCustomerValue.filter(item => item.id !== data.id)
      : [...tagsCustomerValue, data]

    dispatch({
      type: 'FILTER_TAGS_CUSTOMER_UPDATE',
      payload: {
        list: tagsCustomerListData,
        value: tagsCustomerValueData,
      },
    })
  }

  const handleTagsCustomerKeywordChange = data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim()?.toLowerCase())
      : ''

    const findList =
      tagsCustomerTab === 'checked'
        ? tagsCustomerValue
        : tagsCustomerListOrigin

    const tagsCustomerListData = findList.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_TAGS_CUSTOMER_KEYWORD_UPDATE',
      payload: {
        keyword: data?.value || '',
        list: tagsCustomerListData,
      },
    })
  }

  const handleTagsCustomerResetInput = () => {
    dispatch({
      type: 'FILTER_TAGS_CUSTOMER_UPDATE',
      payload: {
        list: tagsCustomerListOrigin,
        value: [],
      },
    })
    clearFilterTagsCustomer()
  }

  const handleTagsCustomerTabChange = tab => {
    const formatDataValue = tagsCustomerKeyword
      ? removeAcent(tagsCustomerKeyword?.toLowerCase())
      : ''

    const tagsCustomerListData = tagsCustomerListOrigin.filter(item => {
      const formatNameItem = item?.name
        ? removeAcent(item.name.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_TAGS_CUSTOMER_TAB_UPDATE',
      payload: {
        list: tab === 'checked' ? tagsCustomerValue : tagsCustomerListData,
        tab,
      },
    })
  }

  const handleTagsCustomerSubmit = _ => {
    const pageId = Array.isArray(tagsCustomerValue) ? tagsCustomerValue.map(item => item?.page_id).join(',') : ''
    // getListResponseScript({keyword: filter?.keyword,page_id: pageId})
  }

  const convertQuery = query => {
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(query)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    return queryString
  }

  const queries = {
    keyword: filter.liveStream?.keyword,
    group_person: filter.liveStream?.groupPerson || '',
    tags: !!tagsCustomerValue ? tagsCustomerValue.map(item => item.id).toString() : '',
    is_read: filter.liveStream?.isRead?.id,
    is_phone: filter.liveStream?.isPhone?.id || '',
    is_order: filter.liveStream?.orderStatus?.id,
    is_done: filter.liveStream?.isStar?.id || '',
    start_date: filter.liveStream.date?.value ? convertDateTimeToApiFormat(filter.liveStream.date?.value.split(' - ')[0]) : '',
    end_date: filter.liveStream.date?.value ? convertDateTimeToApiFormat(filter.liveStream.date?.value.split(' - ')[1]) : '',
    order_by: state.liveStream?.orderBy || '',
    start: state.liveStream?.page || 0,
  }
  const approveFilter = () => {
    dispatch({
      type: 'SET_FILTER_ACTIVE'
    })
    console.log(queries)
    getListLiveStreamComment(queries, { page: 0, start: 0 })
  }

  const syncLiveStream = async () => {
    dispatch({
      type: 'SET_LIVESTREAM_LOADING',
      payload: true
    })
    const response = await sendRequestAuth('post',
      `${config.API}/fb/livestream/sync`,
      {
        'fb_id': auth.userId,
        'page_id': [pageId],
        'stream_id': liveStreamId,
        'limit': 100
      }
    )
    if (response.data?.success)
      getListLiveStreamComment(queries, { page: 0, start: 0 })
    else
      dispatch({
        type: 'SET_LIVESTREAM_LOADING',
        payload: false
      })
  }
  const closeFilter = () => {
    dispatch({
      type: 'SET_FILTER_SELECTED'
    })
  }
  const onLoadMore = async () => {
    if (loadingMore) return
    const currentTotal = state.liveStream.page
    const total = state.meta.total
    if (currentTotal >= total) return
    setLoadingMore(true)
    const response = loadMoreConversation(queries, {
      start: state.meta.start + state.meta.per_page || 0,
    })
  }

  /// handle WEB SOCKET

  const getListCommentLiveStreamOnSocket = async (qs) => {

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/livestream/filter/${liveStreamId}${convertQuery(qs)}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list: response.data.data.filter(item => item.sender_id != item.page_id),
        },
      })

      dispatch({
        type: 'SET_META_LIVESTREAM',
        payload: {
          total: response.data.meta?.total,
          unread: response.data.meta?.total_unread,
        }
      })
      if (+response.data.meta?.total_unreadl > 0) {
        document.title = `(${response.data.meta?.total_unread}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      } else {
        document.title = `evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }
    }
  }

  const handleLoadingOrigin = _ =>
    dispatch({
      type: 'SET_ORIGIN_LOADING'
    })

  const handleWebSocketLiveStream = async (data, socketPrinter, configLive) => {
    const requestData = {
      'page_id': pageId,
      'stream_id': liveStreamId,
      'comment_id': data[0]?.id,
      'message': data[0]?.message,
      'created_time': data[0]?.created_time,
      'attachment': data[0]?.attachment,
    }
    // dispatch({
    //   type: 'UPDATE_LIVESTREAM',
    //   payload: {
    //     list: [requestData,...state.liveStream.display.list]
    //   },
    // })
    const response = await sendRequestAuth('post',
      `${config.API}/fb/livestream/update-comment`,
      requestData
    )
    if (!!response.data.success) {
      
      if (response.data?.data?.phone && +configLive.auto_print == 1) {
        const data = {
          'stream_id': liveStreamId,
          'sender_id': response.data?.data?.sender_id,
          'group_person': 0,
          'comment_id': [response.data?.data?.comment_id] || []
        }
        const print = await sendRequestAuth(
          'post',
          `${config.API}/fb/livestream/print`,
          data
        )

        if (!!print?.data?.success) {
          document.querySelector('#content').innerHTML = print?.data?.data
          printWhb(socketPrinter)          
        }
        getListCommentLiveStreamOnSocket(queries)
        handleNotification(true)
      } else{
        getListCommentLiveStreamOnSocket(queries)
        handleNotification(true)
      }
    }
  }

  const handleOpenConfigLiveStream = _ => {
    dispatch({ type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: true })
  }

  return {
    queries,
    data: {
      state,
      meta,
      liveStream,
      filter
    },
    functions: {
      onLoadMore
    },
    methods: {
      handleLoadingOrigin,
      handleWebSocketLiveStream,
      //Read status
      handleReadStatus,
      clearFilterReadStatus,
      //group persion
      handleGroupPerson,
      //order status
      handleOrderStatus,
      clearFilterOrderStatus,
      //phone
      handleFilterPhone,
      clearFilterPhone,
      //star
      handleFilterStarComment,
      clearFilterStarComment,

      handleTypeChange,
      handleKeywordChange,
      handlePageChange,
      getListLiveStreamComment,

      closeFilter,
      approveFilter,
      syncLiveStream,
      handleNotification,

      // config live stream
      handleOpenConfigLiveStream,
    },
    tagsCustomer: {
      activeValue: tagsCustomerActiveValue,
      keyword: tagsCustomerKeyword,
      list: tagsCustomerList,
      tab: tagsCustomerTab,
      value: tagsCustomerValue,
      onChange: handleTagsCustomerChange,
      onInputReset: handleTagsCustomerResetInput,
      onKeywordChange: handleTagsCustomerKeywordChange,
      onTabChange: handleTagsCustomerTabChange,
      onSubmit: handleTagsCustomerSubmit,
      clearFilterTagsCustomer
    },
    date: {
      value: dateValue,
      startDate: startDate,
      endDate: endDate,
      handleDateChange,
      clearFilterDate,
    },
    page: {
      list: page.list,
      active: page.active
    }
  }
}

export default useFilterFacebookLiveStreamDetail
