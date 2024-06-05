import { useContext, useState, useRef} from 'react'
import { FacebookLivestreamContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { useParams, useSearchParams } from 'react-router-dom'
import { facebookLiveStreamDetailActions } from '../provider/_actions'
import { printWhb, printFrame } from '../../../services/printer/print'
import { convertQuery } from '../../conversation/utils/format'
import { FALSE } from 'sass'
import useFilterFacebookLiveStreamDetail from "./useFilterFacebookLiveStreamDetail";
const useFacebookLiveStreamDetail = () => {

  const [GlobalState] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookLivestreamContext)
  const { showAlert } = useAlert()
  const { liveStream } = state
  const [loadingMore, setLoadingMore] = useState(false)
  const { queries } = useFilterFacebookLiveStreamDetail()

  let { pageId, liveStreamId } = useParams()
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
  const getPageDetail = async () => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/pages/detail/${pageId}`
    )
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_PAGE_DETAILS',
        payload: response?.data?.data
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
  const getListLiveStreamComment = async (page_id, page = 0) => {
    dispatch({
      type: 'SET_LIVESTREAM_LOADING',
      payload: true
    })
    dispatch({
      type: 'SET_LIVESTREAM_LOADING_MORE',
      payload: true
    })
    const start = page * 20
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/livestream/filter/${liveStreamId}?group_person=&keyword&is_phone&tags&is_done=&is_phone&is_read=&start_date&end_date&order_by=newest&per_page=20&start=${start}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list:
            page === 0
              ? response.data.data.filter(item => item.sender_id != item.page_id)
              : [...liveStream.display.list, ...response.data.data.filter(item => item.sender_id != item.page_id)],
        },
      })
      // dispatch({
      //   type: 'UPDATE_LIVESTREAM',
      //   payload: {
      //     list: response.data.data
      //   }
      // })
      dispatch({
        type: 'SET_META_LIVESTREAM',
        payload: response.data.meta,
      })

      // if(+response.data.meta?.unread?.all > 0){
      //   document.title = `(${response.data.meta?.total}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
      // }

      dispatch({
        type: 'SET_LIVESTREAM_LOADING',
        payload: false
      })
      dispatch({
        type: 'SET_LIVESTREAM_LOADING_MORE',
        payload: false
      })
      dispatch({
        type: 'UPDATE_PAGE_LOAD_MORE',
        payload: page
      })
    }
  }

  const getListLiveStreamDetail = async _ => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/post/livestream-detail?page_id=${pageId}&video_id=${liveStreamId}`
    )
    if (!!response.data.success) {
      const reactions = !!response.data.data?.reactions ? JSON.parse(response.data.data?.reactions) : {}
      const reactionsKey = Object.keys(reactions)
      let temp = []
      if (reactionsKey.length > 0)
        reactionsKey.map(item => {
          temp = [...temp, { name: item, value: reactions[item] }]
        })
      response.data.data.reactions = temp
      if (response.data.data?.active == 0) {
        dispatch({ type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: true })
      }
      dispatch({
        type: 'UPDATE_LIVESTREAM_DETAIL',
        payload: response.data.data,
      })
      if (response.data.data?.active == 0) {
        //update status livestream
        sendRequestAuth('post',
          `${config.API}/fb/livestream/active`,
          { page_id: pageId, stream_id: liveStreamId }
        )
      }
    }
    const orderScript = await sendRequestAuth('get',
      `${config.API}/fb/setting/order-script/check?id=${state?.configLiveStream?.settingDetail?.order_script_id}&page_id=${pageId}`,
    )
    if (orderScript.data.success) {
      dispatch({
        type: facebookLiveStreamDetailActions.UPDATE_STATUS_ORDER_SCRIPT,
        payload: false
      })
    }
  }

  const handleSocketPrinter = boo => {
    // UPDATE_SOCKET_PRINTER
    dispatch({
      type: 'UPDATE_SOCKET_PRINTER',
      payload: boo
    })
  }
  const handleReadAfterPrint = async (comment,stream) =>{
    const res =  await sendRequestAuth('post',
        `${config.API}/fb/action/read`,
        {
          is_livestream: 1,
          code: [comment]
        }
    )
    let queryString = '?'
    let i = 0
    for (const [key, value] of Object.entries(queries)) {
      queryString += `${i > 0 ? '&' : ''}${key}=${value}`
      i++
    }
    if(res?.data?.success){
      const response = await sendRequestAuth('get',
          `${config.API}/fb/livestream/filter/${stream}${queryString}`)
      if(response?.data?.success) {
        dispatch({
          type: 'UPDATE_LIVESTREAM',
          payload: {
            list: response.data.data.filter(item => item.sender_id != pageId),
          },
        })
        dispatch({
          type: 'SET_META_LIVESTREAM',
          payload: response.data.meta
        })
      }
    }
  }
  const handlePrint = (content)=>{
    let frame = document.createElement('iframe')
    frame.name = 'frame'
    frame.style.position = 'absolute'
    frame.style.top = '-1000000px'
    document.body.appendChild(frame)
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
  }
  const handlePrintComment = async opt => {

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    const data = {
      'stream_id': opt?.stream_id,
      'sender_id': opt?.sender_id,
      'group_person': 0,
      'comment_id': [opt?.comment_id] || []
    }
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/livestream/print`,
      data
    )

    if (response?.data?.success) {
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
      const isRead = liveStream.display.list.map(item => {
        const test =  data?.comment_id.find(filter => filter === item.comment_id)
        if (!!test) {
          item.is_read = 2
        }
        return item
      })
      dispatch({
        type: 'UPDATE_LIVESTREAM',
        payload: {
          list:isRead
        }
      })
      await sendRequestAuth('post',
          `${config.API}/fb/action/read`,
          {
            is_livestream: 1,
            code: data?.comment_id
          }
      )
      if (!!state?.socketPrinter) {
        // printWhb(response?.data?.data)
        handlePrint(response?.data?.data)
      } else {
        handlePrint(response?.data?.data)
      }

      return true
    } else {

      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }
  const handlePrintListComment = async opt => {

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/livestream/print`,
      opt
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
  //Export excel
  const handleExportComment = async (stream_id,opt) => {

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/livestream/export/${stream_id}${convertQuery(opt)}`,
    )
    dispatch({
      type: 'SET_LOADING',
      payload: false
    })
    return response?.data
  }

  const onLoadMore = async () => {
    const currentTotal = liveStream.page
    const total = state.meta.total
    if (currentTotal >= total) return
    const page_load = liveStream.page + 1
    const page_id = pageId
    setLoadingMore(true)
    const response = getListLiveStreamComment(page_id, page_load)
    response.then(() => setLoadingMore(false))
  }

  const handleOpenConfigLiveStream = _ => {
    dispatch({ type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: true })
  }
  const handleAddOrderScript = _ => {
    dispatch({ type: facebookLiveStreamDetailActions.CONFIG_TOGGLE_TAG, payload: 'tagScript' })
    dispatch({ type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: true })
  }
  const handlePauseOrderScript = async status => {
    const response = await sendRequestAuth('post',
      `${config.API}/fb/setting/order-script/active`,
      {
        'id': [state?.configLiveStream?.settingDetail?.order_script_id],
        'status': status
      }
    )

    if (response.data?.success) {
      showAlert({
        content: response.data.message,
        type: 'success'
      })
      dispatch({
        type: facebookLiveStreamDetailActions.UPDATE_STATUS_ORDER_SCRIPT,
        payload: status == 1 ? true : false
      })
    }
  }

  return {
    data: state,
    methods: {
      getListLiveStreamComment,
      getListTags,
      getPageDetail,
      getListPost,
      handlePrintComment,
      handlePrintListComment,
      handleExportComment,
      onLoadMore,
      getListLiveStreamDetail,
      handleSocketPrinter,
      handleOpenConfigLiveStream,
      handleAddOrderScript,
      handlePauseOrderScript
    },
  }
}

export default useFacebookLiveStreamDetail
