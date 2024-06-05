import React, {useContext, useState} from 'react';
import {FacebookLivestreamContext} from "../provider/_context";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import { useParams} from "react-router-dom";
import { facebookLiveStreamDetailActions} from "../provider/_actions";
import toast from "../../../../../Component/Toast";
import useGlobalContext from "../../../../../containerContext/storeContext";

const useLiveStreamConfig = () => {
  const {state, dispatch} = useContext(FacebookLivestreamContext)
  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const {auth} = GlobalState.facebookAuth
  let {pageId, liveStreamId} = useParams()
  const getOriginData = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/fb/livestream/${liveStreamId}/setting-detail`),
      sendRequestAuth('get', `${config.API}/fb/pages/${auth?.userId || ''}/connected`),
    ])
    if (response[0]?.data?.success) {
      dispatch({type: facebookLiveStreamDetailActions.SETTING_DETAIL_LIVE_STREAM, payload: response[0]?.data?.data})
      if (response[0]?.data?.data?.hide_comment == 1) {
        dispatch({
          type: facebookLiveStreamDetailActions.CONFIG_TAG_AUTO_COMMENT_UPDATE,
          payload: [1]
        })
      } else {
        dispatch({
          type: facebookLiveStreamDetailActions.CONFIG_TAG_AUTO_COMMENT_UPDATE,
          payload: [response[0]?.data?.data?.hide_text?.length > 0 ? 3 : '', response[0]?.data?.data?.hide_comment || '']
        })
        response[0]?.data?.data?.hide_text?.length > 0
          ? dispatch(
          {
            type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_UPDATE_TAGS,
            payload: response[0]?.data?.data?.hide_text.split(',')
          })
          : ''
        !!response[0]?.data?.data?.print_size ? dispatch({
          type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_HEIGHT_UPDATE,
          payload: response[0]?.data?.data?.print_size
        }) : ''
        !!response[0]?.data?.data?.print_text ? dispatch({
          type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_CONTENT_UPDATE,
          payload: response[0]?.data?.data?.print_text
        }) : ''

        !!response[0]?.data?.data?.auto_print ? dispatch({
          type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_AUTO_PRINT_UPDATE,
          payload: response[0]?.data?.data?.auto_print
        }) : ''
      }
    }
    if(response[1]?.data?.success){
      dispatch({type:facebookLiveStreamDetailActions.CONFIG_LIST_PAGE_UPDATE,payload:{
          connected:response[1]?.data?.data
        }})
      response[1]?.data?.data.length > 0 && !!response[1]?.data?.data?.find(item => item.page_id == pageId)
          ? handleClickPageDropdown(response[1]?.data?.data?.find(item => item.page_id == pageId), {default: false}) : ''
    }
  }

  const getSettingLiveStream = async () => {
    const response = await sendRequestAuth('get', `${config.API}/fb/livestream/${liveStreamId}/setting-detail`)
    if(!!response?.data?.success) return response.data.data
    return false
  }

  const getListPage = async () => {
    getListScript(state?.configLiveStream?.tagScript?.autoPost?.active?.page || pageId, true)
  }

  const handleOpenConfigLiveStream = _ => {
    if (state.configLiveStream.change) {
      dispatch({
        type: facebookLiveStreamDetailActions.CONFIG_CONFIRM_OPEN_MODAL,
        payload: true
      })
    } else {
      dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: false})
    }
  }

  const handleChangeTagConfig = type => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TOGGLE_TAG, payload: type})
  }

  const handleChangeTagCommentStatus = _ => {
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_STATUS_UPDATE,
      payload: !state?.configLiveStream?.tagComment?.autoHideComment
    })
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,
      payload: true
    })
  }

  const handleChangeTagAutoComment = type => {
    const listOption = state?.configLiveStream?.tagComment?.listOption
    if (+type === 1) {
      dispatch({
        type: facebookLiveStreamDetailActions.CONFIG_TAG_AUTO_COMMENT_UPDATE,
        payload: !!listOption?.find(item => +item === 1) ? [] : [1]
      })
      return
    }
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_AUTO_COMMENT_UPDATE,
      payload: !!listOption?.find(item => +item === type) ? listOption.filter(item => +item !== type && +item !== 1)
        : [...listOption.filter(item => +item !== 1), type]
    })

    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,
      payload: true
    })
  }

  const handleChangeTags = value => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_UPDATE_TAGS, payload: value})
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,
      payload: true
    })
  }

  const handleChangeTagCommentHeight = value => {
    let height = value.toString().replace(/[^0-9]/g, '')
    height = +height > 600 ? 600 : +height
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_HEIGHT_UPDATE, payload: height})
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,payload: true})
  }

  const handleChangeTagCommentContent = value => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_CONTENT_UPDATE, payload: value})
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,payload: true})
  }

  const handleChangeTagCommentAutoPrint = boo => {
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_AUTO_PRINT_UPDATE,
      payload: boo
    })
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,payload: true})
  }

  const handleToggleDropdownPage = bol => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_TOGGLE_DROPDOWN_PAGE, payload: bol})
  }

  const handleClickPageDropdown = (value, otp = {default: true}) => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_TOGGLE_DROPDOWN_PAGE, payload: false})
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_TEXT_DROPDOWN_PAGE, payload: value})
    getListScript(value.page_id, otp.default)
  }

  const getListScript = async (page_id, boo) => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_LOADING_POST, payload: true})
    const response = await sendRequestAuth('get', `${config.API}/fb/setting/order-script/list?keyword=&page_id=${page_id}&status=`)
    if (response?.data?.success) {
      dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_LIST_AUTO_POST, payload: response?.data?.data})
      if (!!boo) dispatch({
        type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_ACTIVE_AUTO_POST,
        payload: response?.data?.data[0]
      })
      dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_LOADING_POST, payload: false})
    }
  }

  const handleSwitchAutoPost =(val) => {
    // dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_TEXT_DROPDOWN_PAGE, payload: []})
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_STATUS_AUTO_POST,
      payload: !state?.configLiveStream?.tagScript?.autoPostScript
    })
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,payload: true})
  }

  const handleChangeActionConfig =(item) => {
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_ACTIVE_AUTO_POST,
      payload: item
    })
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,
      payload: item.id != state?.configLiveStream?.tagScript.autoPost.active?.id && state?.configLiveStream?.tagScript.autoPost.active.length > 0 ? true : false
    })
  }

  const [debounceSubmit, setDebounceSubmit] = useState(true)
  const handleSubmit = async _ => {
    if (debounceSubmit) {
      setDebounceSubmit(false)
      setTimeout(() => setDebounceSubmit(true), 2000)

      const tagComment = state?.configLiveStream?.tagComment
      const tagScript = state?.configLiveStream?.tagScript
      const listOption = state?.configLiveStream?.tagComment?.listOption
      const querySubmit = {
        type_hide_auto: tagComment?.autoHideComment ? 1 : 0,
        hide_auto: {
          hide_comment: !!listOption?.find(item => item === 1) ? 1 :
            (!!listOption?.find(item => item == 2) || listOption.length ==2 ? 2 : ''),
          hide_keyword: !!listOption?.find(item => item === 1 || item === 3 ) ? tagComment?.listKeyword : []
        },
        print_setting: {height: tagComment?.height, content: tagComment?.content, auto_print: tagComment?.auto_print},
        order_script_id: state?.configLiveStream?.tagScript.autoPostScript == true ?  tagScript?.autoPost?.active?.id : ''
      }
      const response = await sendRequestAuth(
        'post',
        `${config.API}/fb/livestream/${liveStreamId}/setting`, JSON.stringify(querySubmit)
      )
      if (response?.data?.success) {
        toast.success('Cập nhật cấu hình livestream thành công')
        dispatch({
          type: facebookLiveStreamDetailActions.SETTING_DETAIL_LIVE_STREAM,
          payload: {order_script_id: state?.configLiveStream?.tagScript.autoPostScript == true ?  tagScript?.autoPost?.active?.id : ''}
        })
      } else toast.error('Cập nhật cấu hình livestream thất bại')

      dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: false})
    }
  }

  const handleCancelConfirm = _ => {
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_CONFIRM_OPEN_MODAL,
      payload: false
    })
  }

  const handleAcceptConfirm = _ => {
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CHANGE_DATA,payload: false})
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_CONFIRM_OPEN_MODAL,payload: false})
    dispatch({type: facebookLiveStreamDetailActions.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM, payload: false}) 
    reloadConfigData()
  }
  const reloadConfigData = () => {
    getOriginData()
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_STATUS_UPDATE,
      payload: true
    })
    dispatch({
      type: facebookLiveStreamDetailActions.CONFIG_TAG_SCRIPT_STATUS_AUTO_POST,
      payload: true
    })
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_CONTENT_UPDATE, payload: state?.configLiveStream?.settingDetail.print_text})
    dispatch({type: facebookLiveStreamDetailActions.CONFIG_TAG_COMMENT_HEIGHT_UPDATE, payload: state?.configLiveStream?.settingDetail.print_blank})
  }

  return {
    data: state,
    methods: {
      getOriginData,
      getSettingLiveStream,
      handleOpenConfigLiveStream,
      handleChangeTagConfig,
      handleChangeTagCommentStatus,
      handleChangeTagAutoComment,
      handleChangeTags,
      handleChangeTagCommentHeight,
      handleChangeTagCommentContent,
      handleChangeTagCommentAutoPrint,
      handleToggleDropdownPage,
      handleClickPageDropdown,
      handleSwitchAutoPost,
      getListPage,
      handleSubmit,
      handleChangeActionConfig,
      handleCancelConfirm,
      handleAcceptConfirm,
    },
    tags: state?.configLiveStream?.tagComment?.listKeyword,
  }
}

export default useLiveStreamConfig;