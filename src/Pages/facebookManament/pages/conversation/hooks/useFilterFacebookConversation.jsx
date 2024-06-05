import {useCallback, useContext,useState} from 'react'
import {FacebookConversationContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import {removeAcent} from '../../../../../common/fieldText/_functions'
import {debounce} from '@mui/material'
import { convertDateTimeToApiFormat } from '../../../../../common/form/datePicker/_functions'
import {getFbMessage} from "../../../services";
import {transformListDetailData} from "../../../utils/transform";
import {transformConversationUnread} from "../utils/transform";

const useFilterFacebookConversation = () => {

  const [GlobalState] = useGlobalContext()
  const {auth} = GlobalState.facebookAuth
  const {state, dispatch} = useContext(FacebookConversationContext)
  const {showAlert} = useAlert()
  const {conversation} = state
  const {detail} = state
  const {meta} = state
  const {filter} = state
  const {page} = state
  const [loadingMore, setLoadingMore] = useState(false)

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  // LIST FANPAGE

  const getListConversation = async (qs, opt = {}) => {
    dispatch({
      type: 'SET_CONVERSATION_LOADING',
      payload: true
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter${convertQuery({...qs, ...opt})}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: response.data.data,
        },
      })
      dispatch({
        type: 'SET_META_CONVERSATION',
        payload: {
          total: response.data.meta?.total,
          unread: {
            all: transformConversationUnread(response.data.meta?.unread?.all),
            messages: transformConversationUnread(response.data.meta?.unread?.messages),
            comments: transformConversationUnread(response.data.meta?.unread?.comment),
          },
        }
      })
      if(+response.data.meta?.unread?.all > 0){
        document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }
      dispatch({
        type: 'SET_CONVERSATION_LOADING',
        payload: false
      })
    }
  }

  const loadMoreConversation = async (qs, opt = {}) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter${convertQuery({...qs, ...opt})}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list:
          opt.start == 0
              ? response.data.data
              : [...conversation.display.list, ...response.data.data]
        },
      })
      dispatch({
        type: 'SET_META_CONVERSATION',
        payload: {
          total: response.data.meta?.total,
          unread: {
            all: transformConversationUnread(response.data.meta?.unread?.all),
            messages: transformConversationUnread(response.data.meta?.unread?.messages),
            comments: transformConversationUnread(response.data.meta?.unread?.comment),
          },
        }
      })
      setLoadingMore(false)
      if(+response.data.meta?.unread?.all > 0){
        document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }
    }
  }

  const getListConversationOnSocket = async (qs, code) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter${convertQuery(qs)}`
    )
    if (!!response.data.success) {
      let newListConversation = []
      if(!!code){
        newListConversation = response.data.data.map((item) => {
          if(item.code ==  code){
              item.is_read = 2
          }
          return item
        })
      }else{
        newListConversation = response.data.data
      }
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: newListConversation
        }
      })
      dispatch({
        type: 'SET_META_CONVERSATION',
        payload: {
          total: response.data.meta?.total,
          unread: {
            all: transformConversationUnread(response.data.meta?.unread?.all),
            messages: transformConversationUnread(response.data.meta?.unread?.messages),
            comments: transformConversationUnread(response.data.meta?.unread?.comment),
          },
        }
      })
      if(+response.data.meta?.unread?.all > 0){
        document.title = `(${response.data.meta?.unread?.all}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }else{
        document.title = `evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      }
    }

  }


  const handleDetailMessage = (response) => {
    const listDt = transformListDetailData(response?.data)
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
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

  const handleConversation = async (page_id, data) => {
    let code = document.getElementById(data.code)
    // recall list page
    if(!!data.action && data.is_reply == 0 || data.type == 2){
      getListConversationOnSocket(queries,!!code ? data.code : '')
      handleNotification(true)
    }

    //check active detail is new
      if (!!code) {
        // reload detail
        if (data.type == 1 && data.is_reply == 0) {
          // get message detail
          const accessToken = state.page.list.find(p => p.page_id == data.page)?.access_token || ''
          getFbMessage({ id: data.code, cb: handleDetailMessage, 'access_token': accessToken })
        }
        if (data.type == 2) {

          dispatch({
            type: 'SET_DETAIL_CONVERSATION',
            payload: {
              listSelected: [],
              list: []
            },
          })
          // get comment detail
          const response = await sendRequestAuth('get',
            `${config.API}/fb/fanpage/comment-user/list?page_id=${data?.page}&post_id=${data?.post}&from=${data?.from}`
          )
          if (!!response.data?.success) {
            dispatch({
              type: 'SET_DETAIL_CONVERSATION',
              payload: {
                list: response.data?.data,
              }
            })
          }
        }
        await sendRequestAuth('post',
          `${config.API}/fb/action/read`,
          {
            code: [data?.code]
          }
        )

      }
    // if(newList.length > 0)
    //   dispatch({
    //     type: 'UPDATE_CONVERSATION',
    //     payload: {
    //       list: newList
    //     }
    //   })
  }

// Filter DATE

  const dateValue = filter.conversation.date.value
  const startDate = filter.conversation.date.start_date
  const endDate = filter.conversation.date.end_date

  const handleDateChange = (data) => {
    dispatch({
      type: 'SET_FILTER_DATE',
      payload: {
        end_date: data.value[1],
        start_date: data.value[0],
        value: data.formatValue,
      },
    })
    getListConversation(queries, {
      start_date:  convertDateTimeToApiFormat(data.formatValue.split(' - ')[0]),
      end_date:  convertDateTimeToApiFormat(data.formatValue.split(' - ')[1]),
    })
  }


  const clearFilterDate = () => {
    dispatch({
      type: 'CLEAR_FILTER_DATE',
    })
    getListConversation(queries, {
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
    getListConversation(queries, {type: data, start:0})
  }

// Filter PAGE

  const handlePageChange = (page_id) => {
    const listPage = page.active.includes(page_id) ? page.active.filter(item => +item != +page_id) : [...page.active, page_id]
    if(listPage.length >= 1){
      dispatch({
        type: 'SET_FILTER_PAGE',
        payload: listPage
      })
      getListConversation(queries, {page_id: listPage.toString()})
    }
  }

// Filter KEYWORD

  const debounceKeywordChange = useCallback(debounce((queries, data) => {
    getListConversation(queries, {keyword: data || '', start:0})
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

  const clearFilterReadStatus = () => {
    dispatch({
      type: 'CLEAR_FILTER_READ_STATUS',
    })
    getListConversation(queries, {is_read: 0})
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
    getListConversation(queries, {is_phone: 0})
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
    getListConversation(queries, {is_done: 0})
  }

  // ===== ===== ===== ===== ===== TAGS CUSTOMER ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const tagsCustomerActiveValue = filter.conversation.tagsCustomer.active
  const tagsCustomerKeyword = filter.conversation.tagsCustomer.keyword
  const tagsCustomerList = filter.conversation.tagsCustomer.list
  const tagsCustomerListOrigin = filter.conversation.tagsCustomer.listOrigin
  const tagsCustomerTab = filter.conversation.tagsCustomer.tab
  const tagsCustomerValue = filter.conversation.tagsCustomer.value

  const clearFilterTagsCustomer = () => {
    dispatch({
      type: 'CLEAR_FILTER_TAGS_CUSTOMER',
    })
    getListConversation(queries, {tags: ''})
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

  // ===== ===== ===== ===== ===== POST ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const postActiveValue = filter.conversation.post.active
  const postKeyword = filter.conversation.post.keyword
  const postList = filter.conversation.post.list
  const postListOrigin = filter.conversation.post.listOrigin
  const postTab = filter.conversation.post.tab
  const postValue = filter.conversation.post.value

  const clearFilterPost = () => {
    dispatch({
      type: 'CLEAR_FILTER_POST',
    })
    getListConversation(queries, {post_id: ''})
  }

  const handlePostChange = data => {
    const find = postValue.find(item => item.post_id === data.post_id)
    const postListData =
      postTab === 'checked'
        ? postValue.filter(item => item.post_id !== data.post_id)
        : postList
    const postValueData = find
      ? postValue.filter(item => item.post_id !== data.post_id)
      : [...postValue, data]

    dispatch({
      type: 'FILTER_POST_UPDATE',
      payload: {
        list: postListData,
        value: postValueData,
      },
    })
  }

  const handlePostKeywordChange = async data => {
    const formatDataValue = data?.value.trim()
      ? removeAcent(data?.value.trim())
      : ''

    const findList =
        postTab === 'checked'
            ? postValue
            : postListOrigin
    const postListData = findList.filter(item => {
      const formatNameItem = item?.post_content
          ? removeAcent(item?.post_content.toLowerCase())
          : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })
    dispatch({
      type: 'FILTER_POST_KEYWORD_UPDATE',
      payload: {
        keyword: data?.value || '',
        list: postListData,
      },
    })
    
  }

  const handlePostResetInput = () => {
    dispatch({
      type: 'FILTER_POST_UPDATE',
      payload: {
        list: postListOrigin,
        value: [],
      },
    })
    // getListResponseScript()
    clearFilterPost()
  }

  const handlePostTabChange = tab => {
    const formatDataValue = postKeyword
      ? removeAcent(postKeyword?.toLowerCase())
      : ''

    const postListData = postListOrigin.filter(item => {
      const formatNameItem = item?.post_content
        ? removeAcent(item.post_content.toLowerCase())
        : ''
      if (formatNameItem.includes(formatDataValue)) return true
      return false
    })

    dispatch({
      type: 'FILTER_POST_TAB_UPDATE',
      payload: {
        list: tab === 'checked' ? postValue : postListData,
        tab,
      },
    })
  }

  const handlePostSubmit = _ => {
    const pageId = Array.isArray(postValue) ? postValue.map(item => item?.post_id).join(',') : ''
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
    keyword: filter.conversation?.keyword,
    page_id: state?.page?.active?.length > 0 ? state?.page?.active.toString() : '',
    type: filter.conversation?.type,
    post_id: !!postValue ? postValue.map(item => item.post_id).toString() : '',
    tags: !!tagsCustomerValue ? tagsCustomerValue.map(item => item.id).toString() : '',
    is_read: filter.conversation?.isRead?.id || '',
    is_phone: filter.conversation?.isPhone?.id || '',
    is_done: filter.conversation?.isStar?.id || '',
    start_date: filter.conversation.date?.value ? convertDateTimeToApiFormat(filter.conversation.date?.value.split(' - ')[0]) : '',
    end_date: filter.conversation.date?.value ? convertDateTimeToApiFormat(filter.conversation.date?.value.split(' - ')[1]) : '',
    start: state.conversation?.page || 0,
  }

  const approveFilter = () => {

    dispatch({
      type: 'SET_FILTER_ACTIVE'
    })
    getListConversation(queries, {page: 0, start: 0})
  }
  const closeFilter = () => {
    dispatch({
      type: 'SET_FILTER_SELECTED'
    })
  }
  const onLoadMore = async () => {
    if(loadingMore) return
    const currentTotal = state.conversation.page
    const total = state.meta.total
    if (currentTotal >= total) return
    const page_load = state.conversation.page+1;
    setLoadingMore(true)
    const response = loadMoreConversation(queries, {
      start: page_load*20,
    });
    dispatch({
      type: 'UPDATE_PAGE_LOAD_MORE',
      payload: page_load
    })
  }

  const loadMorePost = async (qs, opt = {}) => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/post/list${convertQuery({...qs, ...opt})}`
    ) 
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_POST_CUSTOMER',
        payload: {

          post: opt.start == 0
              ? response.data.data
              : [...filter.conversation.post.list, ...response.data.data]
        },
      })
      setLoadingMore(false)
    }
  }

  const handlePostLoadMore = async () => {
    if(loadingMore) return
    const queries_post = {
      page_id: state?.page?.active?.length > 0 ? state?.page?.active.toString() : '',
      keyword: filter.conversation?.post?.keyword,
      start: filter.conversation?.post?.page || 0,
    } 
    const currentTotal = filter.conversation?.post?.page
    const total = filter.conversation?.post?.list.length
    if (currentTotal >= total) return
    const page_load = currentTotal+1;
    setLoadingMore(true)
    const response = await loadMorePost(queries_post, {
      start: page_load*20,
    });
    dispatch({
      type: 'UPDATE_PAGE_POST_LOAD_MORE',
      payload: page_load
    })
  }

  const handlePostExportExcel = () =>{

  }

  return {
    queries,
    data: {
      state,
      meta,
      conversation,
      filter
    },
    functions: {
      onLoadMore
    },
    methods: {
      handleConversation,
      //Read status
      handleReadStatus,
      clearFilterReadStatus,
      //phone
      handleFilterPhone,
      clearFilterPhone,
      //star
      handleFilterStarComment,
      clearFilterStarComment,

      handleTypeChange,
      handleKeywordChange,
      handlePageChange,
      getListConversation,

      closeFilter,
      approveFilter,
      handleNotification
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
    post: {
      activeValue: postActiveValue,
      keyword: postKeyword,
      list: postList,
      tab: postTab,
      value: postValue,
      onChange: handlePostChange,
      onInputReset: handlePostResetInput,
      onKeywordChange: handlePostKeywordChange,
      onTabChange: handlePostTabChange,
      onSubmit: handlePostSubmit,
      clearFilterPost,
      onPostLoadMore: handlePostLoadMore,
      openPostExportExcel: handlePostExportExcel
    },
    page: {
      list: page.list,
      active: page.active
    }
  }
}

export default useFilterFacebookConversation
