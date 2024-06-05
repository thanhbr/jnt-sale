import { useCallback, useContext, useState } from 'react'
import { FacebookAutoResponsesContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { transformQueryObjToString } from '../../../../orderSingle/utils/transform'
import ArrayUtils from '../../../../orderSingle/utils/array'
import { orderSingleAction } from '../../../../orderSingle/provider/_actions'
import { transformPostData } from '../../../utils/transform'
import { useNavigate } from 'react-router-dom'
import { debounce } from '@mui/material'

const useCreateFacebookAutoResponses = () => {

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookAutoResponsesContext)
  const { showAlert } = useAlert()
  const { fanPage } = state.create.basicInfo
  const { validate } = state
  const { confirm } = state
  const { scriptName } = state.create.basicInfo
  const { scriptStatus } = state.create.basicInfo
  const postAndComment = state.create.postAndComment
  const postData = postAndComment.post
  const commentData = postAndComment.comment
  const autoResponse = state.create.autoResponse
  const idAutoResponse = Number(location.pathname.split('/')[4])
  const navigate = useNavigate()

  const successFit = (!!autoResponse?.fitCondition?.commentResponse?.status && !!autoResponse?.fitCondition?.messageResponse?.status)
    ?
    !!autoResponse?.fitCondition?.messageResponse?.value && !!autoResponse?.fitCondition?.commentResponse?.value
    :
    [
      !autoResponse?.fitCondition?.commentResponse?.status && !!autoResponse?.fitCondition?.messageResponse?.value,
      !!autoResponse?.fitCondition?.commentResponse?.status && !!autoResponse?.fitCondition?.commentResponse?.value,
      !autoResponse?.fitCondition?.messageResponse?.status && !!autoResponse?.fitCondition?.commentResponse?.value,
      !!autoResponse?.fitCondition?.messageResponse?.status && !!autoResponse?.fitCondition?.messageResponse?.value,
    ].includes(true)
  const successUnfit = postAndComment?.comment?.type == 1 || (
    (!!autoResponse?.unfitCondition?.commentResponse?.status && !!autoResponse?.unfitCondition?.messageResponse?.status)
      ?
      !!autoResponse?.unfitCondition?.messageResponse?.value && !!autoResponse?.unfitCondition?.commentResponse?.value
      :
      [
        !autoResponse?.unfitCondition?.commentResponse?.status && !!autoResponse?.unfitCondition?.messageResponse?.value,
        !!autoResponse?.unfitCondition?.commentResponse?.status && !!autoResponse?.unfitCondition?.commentResponse?.value,
        !autoResponse?.unfitCondition?.messageResponse?.status && !!autoResponse?.unfitCondition?.commentResponse?.value,
        !!autoResponse?.unfitCondition?.messageResponse?.status && !!autoResponse?.unfitCondition?.messageResponse?.value,
        !autoResponse?.unfitCondition?.commentResponse?.status && !autoResponse?.unfitCondition?.messageResponse?.status
      ].includes(true)
  )
  const successPost = postAndComment?.post?.type == 1 || (postAndComment?.post?.type == 2 && postAndComment?.post?.value.length > 0)
  const successComment = postAndComment?.comment?.type == 1 || (postAndComment?.comment?.type == 2 && (
    postAndComment?.comment?.keyword.status == 0 || (postAndComment?.comment?.keyword.status == 1 && postAndComment?.comment?.keyword.value.length > 0)
  ))

  const canSubmit = ![
    !!fanPage.value, !!scriptName, successFit, successUnfit, successPost, successComment,
  ].includes(false)
  const displayList = postData.list
  const selectedList = postData.listSelected
  const shouldActiveCheckbox = selectedList.length > 0

  const isActive =
    displayList.length <= 0
      ? false
      : selectedList.length < displayList.length
      ? false
      : !!!displayList.find(
        item =>
          !!!selectedList.find(find => find?.data?.post_id === item?.data?.post_id),
      )
  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive)
      // on value is false
      newSelectedList = selectedList.filter(item => !!!displayList.find(find => find?.data?.post_id === item?.data?.post_id))
    else {
      // on value is true
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.data?.post_id === item?.data?.post_id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }

    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: { listSelected: newSelectedList, totalSelected: newSelectedList?.length },
    })
  }

  // BASIC INFO

  const [isFanPageLoading, setIsFanPageLoading] = useState(false)

  const mappingDataDetail = async (data) => {

    // mapping script name
    dispatch({
      type: 'FORM_SCRIPT_NAME_UPDATE',
      payload: data?.script_name,
    })
    // mapping fanpage
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/pages/${auth.userId}/connected`,
    )

    if (!!response?.data?.success) {
      const FanPageListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.page_name || '---',
        value: item?.page_id || '',
      }))
      dispatch({
        type: 'UPDATE_LIST_FAN_PAGE',
        payload: {
          list: FanPageListData,
          total: response?.data?.meta?.totals|| 0,
        },
      })

      dispatch({
        type: 'FORM_FAN_PAGE_UPDATE',
        payload: { value: FanPageListData.find(item => item?.data?.page_id == data?.page_id) || [] },
      })
    }

    //mapping status script

    dispatch({
      type: 'FORM_SCRIPT_STATUS_UPDATE',
      payload: data?.status == 1 ? true : false
    })

    // mapping post
    const arrPostId = (data?.post_ids?.length > 0 && data?.post_ids !== 'null') ? JSON.parse(data?.post_ids) : []
    dispatch({
      type: 'FORM_POST_TYPE_UPDATE',
      payload: {
        type: data?.post_type
      }
    })
    const listPost = await sendRequestAuth(
      'get',
      `${config.API}/fb/post/list?page_id=${data?.page_id}`,
    )

    if (!!listPost?.data?.success) {
      // const formatPostList = response?.data?.data
      const formatPostList = ArrayUtils.getQualifiedArray(
        listPost?.data?.data,
      ).map(transformPostData)

      dispatch({
        type: 'POST_LIST_UPDATE',
        payload: {
          list: formatPostList,
          page: 0,
          total: response?.data?.meta?.totals|| 0,
        },
      })
      dispatch({
        type: 'POST_LIST_SELECTED_UPDATE',
        payload: {
          listSelected: arrPostId.length > 0 ? formatPostList.filter(item => arrPostId.includes(item?.data?.post_id)) : [],
          totalSelected: arrPostId.length > 0 ? formatPostList.filter(item => arrPostId.includes(item?.data?.post_id))?.length : 0
        },
      })
      dispatch({
        type: 'POST_LIST_VALUE_UPDATE',
        payload: arrPostId.length > 0 ? formatPostList.filter(item => arrPostId.includes(item?.data?.post_id)) : [],
      })

      setTimeout(() => {
        dispatch({
          type: 'UPDATE_TABLE_LOADING',
          payload: false
        })
      }, 500)
    }

    // mapping comment

    dispatch({
      type: 'COMMENT_TYPE_UPDATE',
      payload: data?.comment_type
    })

    dispatch({
      type: 'COMMENT_TYPE_PHONE_UPDATE',
      payload: data?.comment_has_phone == 1 ? true : false
    })
    dispatch({
      type: 'COMMENT_TYPE_KEYWORD_UPDATE',
      payload: data?.comment_has_key == 1 ? true : false
    })

    dispatch({
      type: 'COMMENT_VALUE_KEYWORD_UPDATE',
      payload: (data?.comment_keys?.length > 0 && data?.comment_keys !== 'null') ? JSON.parse(data?.comment_keys) : []
    })

    // mapping auto response
    dispatch({
      type: 'UPDATE_AUTO_RESPONSE',
      payload: {
        fitCondition: {
          commentResponse: {
            status: data?.enable_reply_comment == 1 ? true : false,
            value: data?.reply_comment_content || ''
          },
          messageResponse: {
            status: data?.enable_reply_message == 1 ? true : false,
            value: data?.reply_message_content || ''
          },
        },
        unfitCondition: {
          commentResponse: {
            status: data?.enable_reply_comment_invalid == 1 ? true : false,
            value: data?.reply_comment_content_invalid || ''
          },
          messageResponse: {
            status: data?.enable_reply_message_invalid == 1 ? true : false,
            value: data?.reply_message_content_invalid || ''
          },
        },
      }
    })
  }

  const updateChangedConfirm = () => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        status: true
      }
    })
  }
  const getListFanPage = async () => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/pages/${auth.userId}/connected`
    )
    if (!!response?.data?.success) {
      const FanPageListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.page_name || '---',
        value: item?.page_id || '',
      }))
      dispatch({
        type: 'UPDATE_LIST_FAN_PAGE',
        payload: {
          list: FanPageListData,
          page: 0,
          total: response?.data?.data?.meta?.total_connect || 0,
        },
      })
    }

    if (!!idAutoResponse) {
      const response = await sendRequestAuth('get',
        `${config.API}/fb/setting/reply-script/detail/${idAutoResponse}`
      )
      if (!!response?.data?.success) {
        mappingDataDetail(response?.data?.data)
      }
    }

  }

  const handleFetchFanPage = async (k, opt) => {
    if (isFanPageLoading) return

    const page = opt?.page || 0

    if (page === 0) setIsFanPageLoading(true)

    const q = transformQueryObjToString({
      keyword: k.trim(),
      start: page * 20,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/pages/${auth.userId}/connected${q}`,
    )

    if (!!response?.data?.success) {
      const FanPageListData = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(item => ({
        data: item,
        name: item?.page_name || '---',
        value: item?.page_id || '',
      }))
      dispatch({
        type: 'UPDATE_LIST_FAN_PAGE',
        payload: {
          list:
            page === 0
              ? FanPageListData
              : [...fanPage.list, ...FanPageListData],
          page,
          total: response?.data?.meta?.totals|| 0,
        },
      })
    }

    if (page === 0) setIsFanPageLoading(false)

    return response
  }

  const handleFanPageChange = data => {

    dispatch({
      type: 'FORM_FAN_PAGE_UPDATE',
      payload: { value: data },
    })
    handlePageValidate(true)
    updateChangedConfirm()
    dispatch({
      type: 'POST_LIST_VALUE_UPDATE',
      payload: [],
    })
    dispatch({
      type: 'POST_LIST_UPDATE',
      payload: {
        list: [],
        total: 0,
      },
    })
    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: {
        listSelected: [],
        totalSelected: 0,
      },
    })
  }

  const debounceFanPageKeywordChange = useCallback(debounce((data) => {
    handleFetchFanPage(data?.value)
  }, 500), [])
  const handleFanPageKeywordChange = data => {
    dispatch({
      type: 'FORM_FAN_PAGE_KEYWORD_UPDATE',
      payload: { keyword: data?.value || '' },
    })
    debounceFanPageKeywordChange(data)
  }

  const handleFanPageLoadMore = () => {
    const currentTotal = fanPage.list.length
    const total = fanPage.total

    if (currentTotal >= total) return null

    const response = handleFetchFanPage(fanPage.keyword, {
      page: fanPage.page + 1,
    })

    return response
  }

  const handlePageValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        basicInfo: {
          page: !!boo ? (
            ''
          ) : (
            <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Trang áp dụng không được bỏ trống
            </span>
            </div>
          ),
        },
      }
    })
  }

  const handleScriptNameChange = data => {
    if (data.trim() == '') data = ''
    dispatch({
      type: 'FORM_SCRIPT_NAME_UPDATE',
      payload: data,
    })
    handleScriptNameValidate(true)
    updateChangedConfirm()
  }

  const handleScriptNameValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        basicInfo: {
          scriptName: !!boo ? (
            ''
          ) : (
            <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Tên kịch bản không được bỏ trống
            </span>
            </div>
          ),
        },
      }
    })
  }

  const handleValidateCommentResponse = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        postAndComment: {
          comment: !!boo ? (
            ''
          ) : 'Nội dung chứa từ khóa không được bỏ trống'
          ,
        },
      }
    })
  }

  const handleValidatePostResponse = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        postAndComment: {
          post: !!boo ? (
            ''
          ) : (
            <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Bài viết không được bỏ trống
            </span>
            </div>
          ),
        },
      }
    })
  }

  const handleScriptStatusChange = _ => {
    dispatch({
      type: 'FORM_SCRIPT_STATUS_UPDATE',
    })
    updateChangedConfirm()
  }
  // POST AND COMMENT

  const handleChangeTypePost = value => {
    handlePageValidate((value == 2 && !fanPage?.value) ? false : true)
    dispatch({
      type: 'FORM_POST_TYPE_UPDATE',
      payload: {
        type: value
      }
    })
    updateChangedConfirm()
  }

  // ======================================================================================================
  // post
  // ======================================================================================================

  const handlePostValidate = boo => {
    dispatch({
      type: orderSingleAction.SET_VALIDATE_FORM,
      payload: {
        fullName: !!boo ? (
          ''
        ) : (
          <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '210px' }}
            >
              Bài viết không được bỏ trống
            </span>
          </div>
        ),
      },
    })
  }

  const handleFetchPostList = async (k='', page=0, opt = {}) => {
    dispatch({
      type: 'POST_LOADING_UPDATE',
      payload: { loading: true },
    })

    const q = transformQueryObjToString({
      keyword: k.trim(),
      start: page * 20,
    })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/post/list${q}&per_page=20&page_id=${opt?.page_id || fanPage?.value?.value}`,
    )

    if (!!response?.data?.success) {
      // const formatPostList = response?.data?.data
      const formatPostList = ArrayUtils.getQualifiedArray(
        response?.data?.data,
      ).map(transformPostData)

      dispatch({
        type: 'POST_LOADING_UPDATE',
        payload: { loading: false },
      })
      dispatch({
        type: 'UPDATE_FETCHING_MODAL',
        payload: false
      })
      dispatch({
        type: 'POST_LIST_UPDATE',
        payload: {
          list:
            page === 0
              ? formatPostList
              : [...postData.list, ...formatPostList],
          page,
          total: response?.data?.meta?.totals|| 0,
        },
      })
    } else {

      dispatch({
        type: 'UPDATE_FETCHING_MODAL',
        payload: false
      })
    }

  }

  const handleSelectAllPost = () => {
    let list = postData?.list
    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: {
        listSelected: postData?.listSelected?.length == postData?.list?.length ? [] : list,
        totalSelected: list?.length || 0,
      },
    })
  }

  const handleShowListPost = () => {
    dispatch({
      type: 'UPDATE_SHOW_POST_MODAL',
      payload: true
    })
    dispatch({
      type: 'UPDATE_FETCHING_MODAL',
      payload: true
    })
    handleFetchPostList('', 0)
  }

  const handlePostModalClose = () => {
    dispatch({
      type: 'UPDATE_SHOW_POST_MODAL',
      payload: false
    })

  }

  const handlePostChange = val => {
    dispatch({
      type: 'POST_VALUE_UPDATE',
      payload: { value: val },
    })
    handlePostValidate(true)
    updateChangedConfirm()
  }

  const debounceSyncPostList = useCallback(debounce((fanPage) => {
    handleSyncPostList(fanPage?.value?.value)
  }, 500), [])

  const handleSyncPostList = async (page_id) => {
    dispatch({
      type: 'POST_LOADING_UPDATE',
      payload: { loading: true },
    })

    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/post/sync`,
      {
        page_id: [page_id]
      },'','',
      () => {
        dispatch({
          type: 'POST_LOADING_UPDATE',
          payload: { loading: false },
        })
        dispatch({
          type: 'UPDATE_FETCHING_MODAL',
          payload: false
        })
      }
    )

    if (!!response?.data?.success) {
      // call api get list
      const listPost = await sendRequestAuth(
        'get',
        `${config.API}/fb/post/list?keyword=&page_id=${page_id}`,
      )

      if (!!listPost?.data?.success) {
        // const formatPostList = response?.data?.data
        const formatPostList = ArrayUtils.getQualifiedArray(
          listPost?.data?.data,
        ).map(transformPostData)

        dispatch({
          type: 'POST_LOADING_UPDATE',
          payload: { loading: false },
        })
        dispatch({
          type: 'UPDATE_FETCHING_MODAL',
          payload: false
        })
        dispatch({
          type: 'POST_LIST_UPDATE',
          payload: {
            list: formatPostList,
            page: 0,
            total: 0,
          },
        })
      } else {

        dispatch({
          type: 'UPDATE_FETCHING_MODAL',
          payload: false
        })
      }
      dispatch({
        type: 'UPDATE_FETCHING_MODAL',
        payload: false
      })
    } else {
      dispatch({
        type: 'UPDATE_FETCHING_MODAL',
        payload: false
      })
    }

  }

  const handleReloadPost = () => {
    dispatch({
      type: 'UPDATE_FETCHING_MODAL',
      payload: true
    })
    dispatch({
      type: 'POST_KEYWORD_UPDATE',
      payload: { keyword: '' },
    })

    dispatch({
      type: 'POST_LIST_UPDATE',
      payload: {
        list: [],
        page: 0,
        total: 0,
      },
    })
    dispatch({
      type: 'POST_LIST_VALUE_UPDATE',
      payload: [],
    })
    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: {
        listSelected: [],
        totalSelected: 0
      },
    })
    debounceSyncPostList(fanPage)
  }

  const debouncePostKeywordChange = useCallback(debounce((data, fanPage) => {
    handleFetchPostList(data, 0, { page_id: fanPage?.value?.value })
  }, 500), [])
  const handlePostKeywordChange = val => {
    const keyword = val ? `${val}` : ''

    dispatch({
      type: 'POST_KEYWORD_UPDATE',
      payload: { keyword },
    })
    debouncePostKeywordChange(keyword, fanPage)
  }

  const handlePostListLoadMore = () => {
    const currentTotal = postData.list.length
    const total = postData.total
    if (currentTotal >= total) return

    handleFetchPostList(postData.keyword, postData.page + 1)
  }

  const handlePostListReset = () => {
    dispatch({
      type: 'POST_KEYWORD_UPDATE',
      payload: { keyword: '' },
    })

    dispatch({
      type: 'POST_LIST_UPDATE',
      payload: {
        list: postData.listOrigin,
        loading: false,
        page: 0,
        total: postData.totalOrigin,
      },
    })
  }

  const handleApprovePostListSelected = () => {
    dispatch({
      type: 'POST_LIST_VALUE_UPDATE',
      payload: postData?.listSelected,
    })
    handleValidatePostResponse(postData?.listSelected?.length > 0)
    updateChangedConfirm()
  }

  const rowCheckboxChange = (data, selected) =>
    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: {
        listSelected: selected
          ? selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id)
          : [...selectedList, data],
        totalSelected: selected
          ? selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id)?.length
          : [...selectedList, data]?.length
      },
    })

  const removePost = (data) => {

    dispatch({
      type: 'POST_LIST_SELECTED_UPDATE',
      payload: {
        listSelected: selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id),
        totalSelected: selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id)?.length
      },
    })
    dispatch({
      type: 'POST_LIST_VALUE_UPDATE',
      payload: selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id),
    })

    handleValidatePostResponse(selectedList.filter(item => item?.data?.post_id !== data?.data?.post_id)?.length > 0)
  }

  // ======================================================================================================
  // comment
  // ======================================================================================================

  const handleChangeTypeComment = val => {
    dispatch({
      type: 'COMMENT_TYPE_UPDATE',
      payload: val,
    })
    handlePostValidate(true)
    updateChangedConfirm()
  }

  const handleChangeTypePhone = _ => {
    dispatch({
      type: 'COMMENT_TYPE_PHONE_UPDATE',
    })
    updateChangedConfirm()
  }

  const handleChangeTypeKeword = _ => {
    dispatch({
      type: 'COMMENT_TYPE_KEYWORD_UPDATE',
    })
    updateChangedConfirm()
  }

  const handleChangeValueKeyword = (hide_text) => {
    dispatch({
      type: 'COMMENT_VALUE_KEYWORD_UPDATE',
      payload: hide_text
    })
    handleValidateCommentResponse(hide_text?.length > 0 ? true : false)
    updateChangedConfirm()
  }

  // AUTO RESPONSE SCRIPT

  const handleFitConditionCommentStatus = _ => {
    dispatch({
      type: 'FIT_CONDITION_COMMENT_STATUS_UPDATE',
    })
    updateChangedConfirm()
  }

  const handleFitConditionCommentValue = (value, tag = false) => {
    if (tag) value = value + ' {{Name}} '
    dispatch({
      type: 'FIT_CONDITION_COMMENT_VALUE_UPDATE',
      payload: value
    })
    handleFitConditionCommentValidate(value == '' ? false : true)
    updateChangedConfirm()
  }

  const handleFitConditionCommentValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        autoResponse: {
          fitCondition: {
            commentResponse: !!boo ? (
              ''
            ) : (
              <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Nội dung phản hồi bình luận không được bỏ trống
            </span>
              </div>
            ),
          }
        },
      }
    })
  }
  const handleFitConditionMessageValue = (value, tag = false) => {
    if (tag) value = value + ' {{Name}} '
    dispatch({
      type: 'FIT_CONDITION_MESSAGE_VALUE_UPDATE',
      payload: value
    })
    handleFitConditionMessageValidate(value == '' ? false : true)
    updateChangedConfirm()
  }

  const handleFitConditionMessageValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        autoResponse: {
          fitCondition: {
            messageResponse: !!boo ? (
              ''
            ) : (
              <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Nội dung phản hồi tin nhắn không được bỏ trống
            </span>
              </div>
            ),
          }
        },
      }
    })
  }

  const handleFitConditionMessage = _ => {
    dispatch({
      type: 'FIT_CONDITION_MESSAGE_STATUS_UPDATE',
    })
    updateChangedConfirm()
  }

  const handleUnfitConditionCommentStatus = _ => {
    dispatch({
      type: 'UNFIT_CONDITION_COMMENT_STATUS_UPDATE',
    })
    updateChangedConfirm()
  }

  const handleUnfitConditionCommentValue = (value, tag = false) => {
    if (tag) value = value + ' {{Name}} '
    dispatch({
      type: 'UNFIT_CONDITION_COMMENT_VALUE_UPDATE',
      payload: value
    })
    handleUnfitConditionCommentValidate(value == '' ? false : true)
    updateChangedConfirm()
  }

  const handleUnfitConditionCommentValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        autoResponse: {
          unfitCondition: {
            commentResponse: !!boo ? (
              ''
            ) : (
              <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Nội dung phản hồi bình luận không được bỏ trống
            </span>
              </div>
            ),
          }
        },
      }
    })
  }

  const handleUnfitConditionMessageValue = (value, tag = false) => {
    if (tag) value = value + ' {{Name}} '
    dispatch({
      type: 'UNFIT_CONDITION_MESSAGE_VALUE_UPDATE',
      payload: value
    })
    handleUnfitConditionMessageValidate(value == '' ? false : true)
    updateChangedConfirm()
  }

  const handleUnfitConditionMessageValidate = boo => {
    dispatch({
      type: 'SET_VALIDATE_FORM',
      payload: {
        autoResponse: {
          unfitCondition: {
            messageResponse: !!boo ? (
              ''
            ) : (
              <div style={{ position: 'relative' }}>
            <span
              style={{ position: 'absolute', top: 0, left: 0, width: '272px' }}
            >
              Nội dung phản hồi tin nhắn không được bỏ trống
            </span>
              </div>
            ),
          }
        },
      }
    })
  }

  const handleUnfitConditionMessage = _ => {
    dispatch({
      type: 'UNFIT_CONDITION_MESSAGE_STATUS_UPDATE',
    })
    updateChangedConfirm()
  }

  //CONFIRM 

  const handleCloseCreateConfirm = () => {
    dispatch({
      type: 'SET_CONFIRM_MODAL',
      payload: {
        create: {
          status: '',
          value: {}
        }
      }
    })

  }
  // CREATE AUTO RESPONSE
  const createAutoResponse = async (otp = {}) => {

    if (canSubmit) {
      dispatch({
        type: 'SET_LOADING',
        payload: true
      })
      const formData = {
        page_id: fanPage?.value?.value,
        script_name: scriptName,
        status: !!otp?.status ? 0 : (!!scriptStatus ? 1 : 0),
        post: {
          post_type: postData.type,
          arr_post_id: postData?.value?.length > 0 ? postData?.value?.map(item => item?.data?.post_id) : []
        },
        comment: {
          comment_type: commentData.type,
          is_phone: !!commentData.phone ? 1 : 0,
          is_keyword: !!commentData.keyword.status ? 1 : 0,
          keyword: commentData.keyword.value,
        },
        reply_content: {
          is_comment: !!autoResponse?.fitCondition?.commentResponse?.status ? 1 : 0,
          is_message: !!autoResponse?.fitCondition?.messageResponse?.status ? 1 : 0,
          message_content: autoResponse?.fitCondition?.messageResponse?.value,
          comment_content: autoResponse?.fitCondition?.commentResponse?.value,
        },
        reply_content_invalid: {
          is_comment: !!autoResponse?.unfitCondition?.commentResponse?.status ? 1 : 0,
          is_message: !!autoResponse?.unfitCondition?.messageResponse?.status ? 1 : 0,
          message_content: autoResponse?.unfitCondition?.messageResponse?.value,
          comment_content: autoResponse?.unfitCondition?.commentResponse?.value,
        },
      }
      const url = !!idAutoResponse ? `${config.API}/fb/setting/reply-script/update/${idAutoResponse}` : `${config.API}/fb/setting/reply-script/create`
      const response = await sendRequestAuth('post',
        url,
        formData
      )

      if (response?.data?.success) {
        setTimeout(() => {
          dispatch({
            type: 'SET_LOADING',
            payload: false
          })
        }, 500)

        showAlert({
          content: !!idAutoResponse ? 'Cập nhật kịch bản phản hồi tự động thành công' : 'Thêm mới kịch bản phản hồi tự động thành công',
          type: 'success',
          duration: 2000
        })
        GlobalDispatch({
          type: 'UPDATE_CHANGE_STATUS',
          payload: {
            status: false
          }
        })

        navigate('/facebook/auto-responses')
      } else {
        setTimeout(() => {
          dispatch({
            type: 'SET_LOADING',
            payload: false
          })
        }, 500)
        showAlert({
          content: !!idAutoResponse ? 'Cập nhật kịch bản phản hồi tự động thất bại' : 'Thêm mới kịch bản phản hồi tự động thất bại',
          type: 'danger',
          duration: 2000
        })
        GlobalDispatch({
          type: 'UPDATE_CHANGE_STATUS',
          payload: {
            status: false
          }
        })
      }
    }
  }
  const handleCreateAutoResponse = async () => {

    handleFitConditionCommentValidate(!!autoResponse?.fitCondition?.commentResponse?.value)
    handleFitConditionMessageValidate(!!autoResponse?.fitCondition?.messageResponse?.value)
    handleUnfitConditionCommentValidate(!!autoResponse?.unfitCondition?.commentResponse?.value)
    handleUnfitConditionMessageValidate(!!autoResponse?.unfitCondition?.messageResponse?.value)
    handlePageValidate(!!fanPage?.value)
    handleValidateCommentResponse((commentData?.keyword?.status && commentData?.keyword?.value?.length > 0))
    handleValidatePostResponse((postData?.type == 2 && postData?.value?.length > 0))
    // handlePostValidate()
    handleScriptNameValidate(scriptName)
    if (!!scriptStatus && canSubmit) {
      // call api check
      const idPost = postData?.value?.length > 0 ? postData?.value?.map(item => item?.data?.post_id).toString() : ''
      const response = await sendRequestAuth('get',
        `${config.API}/fb/setting/reply-script/check?id=${idAutoResponse || ''}&page_id=${fanPage?.value?.value || ''}&post_type=${postData.type || ''}&arr_post_id=${idPost}`
      )
      if (!!response?.data?.success) {
        createAutoResponse()
      } else {
        // show popup confirm create/update
        dispatch({
          type: 'SET_CONFIRM_MODAL',
          payload: {
            create: {
              status: idAutoResponse ? idAutoResponse : 'new',
              data: {
                message: response?.data?.errors[0]?.message,
                activeScript: scriptName,
                script: response?.data?.errors[0]?.script_name || '',
                idScript: response?.data?.errors[0]?.script_id || ''
              }
            }
          }
        })
      }
    } else createAutoResponse()

  }
  // END
  return {

    checkbox: {
      checked: shouldActiveCheckbox,
      onClick: handleCheckboxChange,
      originLength: parseInt(postData?.total, 10),
    },
    data: {
      fanPage,
      scriptName,
      scriptStatus,
      validate,
      postAndComment,
      autoResponse,
      successFit,
      successUnfit,
      canSubmit,
      idAutoResponse,
      confirm
    },
    properties: { isFanPageLoading },
    methods: {
      getListFanPage,
      onFanPageChange: handleFanPageChange,
      onFanPageKeywordChange: handleFanPageKeywordChange,
      onFanPageLoadMore: handleFanPageLoadMore,
      onScriptNameChange: handleScriptNameChange,
      onScriptStatusChange: handleScriptStatusChange,
      // post
      onChangeTypePost: handleChangeTypePost,
      onPostChange: handlePostChange,
      onPostFetchPostList: handleFetchPostList,
      onShowListPost: handleShowListPost,
      onFetchMorePostList: handlePostListLoadMore,
      onPostKeywordChange: handlePostKeywordChange,
      onPostListReset: handlePostListReset,
      onPostModalClose: handlePostModalClose,
      onPostSelectAllPost: handleSelectAllPost,
      onCheckboxChange: rowCheckboxChange,
      onRemovePost: removePost,
      onReloadPost: handleReloadPost,
      onApprovePostListSelected: handleApprovePostListSelected,
      //comment
      onChangeTypeComment: handleChangeTypeComment,
      onChangeTypePhone: handleChangeTypePhone,
      onChangeTypeKeyword: handleChangeTypeKeword,
      onChangeValueKeyword: handleChangeValueKeyword,
      //autoResponse
      onChangeFitConditionCommentStatus: handleFitConditionCommentStatus,
      onChangeFitConditionCommentValue: handleFitConditionCommentValue,
      onChangeFitConditionMessageValue: handleFitConditionMessageValue,
      onChangeFitConditionMessage: handleFitConditionMessage,
      onChangeUnfitConditionCommentStatus: handleUnfitConditionCommentStatus,
      onChangeUnfitConditionCommentValue: handleUnfitConditionCommentValue,
      onChangeUnfitConditionMessageValue: handleUnfitConditionMessageValue,
      onChangeUnfitConditionMessage: handleUnfitConditionMessage,

      //validate
      onPageValidate: handlePageValidate,
      onPostValidate: handlePostValidate,
      onValidateScriptName: handleScriptNameValidate,
      onValidateCommentResponse: handleValidateCommentResponse,
      onValidatePostResponse: handleValidatePostResponse,
      onValidateFitConditionCommentValidate: handleFitConditionCommentValidate,
      onValidateFitConditionMessageValidate: handleFitConditionMessageValidate,
      onValidateUnfitConditionCommentValidate: handleUnfitConditionCommentValidate,
      onValidateUnfitConditionMessageValidate: handleUnfitConditionMessageValidate,
      //confirm 
      onCloseCreateConfirm: handleCloseCreateConfirm,
      //submit
      onSubmitCreate: handleCreateAutoResponse,
      onConfirmCreate: createAutoResponse
    },
  }
}

export default useCreateFacebookAutoResponses
