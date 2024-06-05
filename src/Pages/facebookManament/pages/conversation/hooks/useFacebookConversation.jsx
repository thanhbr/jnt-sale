import { useContext,useState } from 'react'
import { FacebookConversationContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { useSearchParams } from 'react-router-dom'
import { transformConversationUnread } from '../utils/transform'

const useFacebookConversation = () => {

  const [GlobalState] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookConversationContext)
  const { showAlert } = useAlert()
  const { conversation } = state
  const [searchParams] = useSearchParams()
  const pageIds = !!searchParams.get('page_id') ? searchParams.get('page_id').split(',') : []
  const [loadingMore, setLoadingMore] = useState(false)

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const getListTags = async () => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/setting/tag/list`
    )
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_TAGS_CUSTOMER',
        payload: {
          tagsCustomer: response?.data?.data
        },
      })
    }
  }

  const getListPost = async (page_id) => { 
    const response = await sendRequestAuth('get',
      `${config.API}/fb/post/list?page_id=${!!page_id && page_id.toString()}&keyword=&time`
    ) 
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_POST_CUSTOMER',
        payload: {
          post: response?.data?.data
        },
      })
      dispatch({
        type: 'UPDATE_PAGE_POST_LOAD_MORE',
        payload: 0
      })
    }
  }
  // LIST FANPAGE

  const getListFanpage = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/pages/${auth.userId}/connected?keyword&per_page=20&start=0`
    )
    if (!!response.data.success) {
      if (pageIds.length > 0) {
        let listPage = []
        pageIds.map(item => {
          let page = response?.data?.data.find(data => data.page_id == item)
          if(!!page)
            listPage = [...listPage,page]
        })

        const pageActive = listPage.map(item => item.page_id)
        dispatch({
          type: 'SET_PAGE',
          payload: {
            list: listPage,
            active: pageActive,
          }
        })
        getListConversation(pageActive)
        getListPost(pageActive)
      } else {
        const pageActive = response?.data?.data.map(item => item.page_id)
        dispatch({
          type: 'SET_PAGE',
          payload: {
            list: response?.data?.data,
            active: pageActive,
          }
        })
        getListConversation(pageActive)
        getListPost(pageActive)
      }
    }
  }
  const getListConversation = async (page_id,page=0) => {
    dispatch({
      type: 'SET_CONVERSATION_LOADING',
      payload:  true
    })
    dispatch({
      type: 'SET_CONVERSATION_LOADING_MORE',
      payload:  true
    })
    const start = page * 20;
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter?page_id=${!!page_id && page_id.toString()}&type=&keyword&post_id&tags&start_date&end_date&is_done&is_phone&is_read&start=${start}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list:
            page === 0
              ? response.data.data
              : [...conversation.display.list, ...response.data.data]
        },
      })
      // dispatch({
      //   type: 'UPDATE_CONVERSATION',
      //   payload: {
      //     list: response.data.data
      //   }
      // })
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
      dispatch({
        type: 'SET_CONVERSATION_LOADING_MORE',
        payload:  false
      })
      dispatch({
        type: 'UPDATE_PAGE_LOAD_MORE',
        payload: page
      })
    }

  }


  const handlePrintComment = async opt => {

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    const data = {
      'page_id': opt?.page_id || '',
      'post_id': opt?.post_id || '',
      'from': opt?.from || '',
      'comment_id': opt?.comment_id || []
    }
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/fanpage/comment-user/print`,
      data
    )

    if (response?.data?.success) {
      // in
      let frame = document.createElement('iframe')
      frame.name = 'frame'
      frame.style.position = 'absolute'
      frame.style.top = '-1000000px'
      document.body.appendChild(frame)
      let content = response?.data?.data
      const frameDoc = frame.contentWindow
        ? frame.contentWindow
        : frame.contentDocument.document
          ? frame.contentDocument.document
          : frame.contentDocument
      frameDoc.document.open()
      frameDoc.document.write(content)
      frameDoc.document.close()
      window.frames.frame.focus()
      setTimeout(function () {
        window.frames.frame.print()
        document.body.removeChild(frame)
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
      }, 1500)

      return true
    } else {

      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }

  const onLoadMore = async () => {
    const currentTotal = conversation.page
    const total = state.meta.total
    if (currentTotal >= total) return
    const page_load = conversation.page+1;
    const page_id = searchParams.get('page_id');
    setLoadingMore(true)
    const response =  getListConversation(page_id,page_load);
    response.then(() => setLoadingMore(false))
  }
  // FB action subscribed app
  const getActionSubscribeApp = async () => {
    
    if(state.page.list.length > 0){
      let addingList = []
      state.page.list.forEach(item => {
          addingList = [...addingList, {page_id:item.page_id,access_token: item.access_token}]
      })
      const response = await sendRequestAuth(
        'post',
        `${config.API}/fb/action/subscribed-app`,
        addingList
      )
      if (!!response.data.success) {
        // console.log(response)
      }
    }
  }
  
  return {
    data: state,
    methods: {
      getListFanpage,
      getListConversation,
      getListTags,
      getListPost,
      handlePrintComment,
      onLoadMore,
      getActionSubscribeApp
    }
  }
}

export default useFacebookConversation