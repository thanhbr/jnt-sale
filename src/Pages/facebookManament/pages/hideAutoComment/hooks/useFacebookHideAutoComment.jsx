import { useContext } from 'react'
import { FacebookHideAutoCommentContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'

const useFacebookHideAutoComment = () => {

  const [GlobalState, GlobalDispatch] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookHideAutoCommentContext)
  const { showAlert } = useAlert()

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  const updateChangedConfirm = () => {
    GlobalDispatch({
      type: 'UPDATE_CHANGE_STATUS',
      payload: {
        status: true
      }
    })
  }
  // FACEBOOK HIDE COMMENT

  const getListHideComment = async () => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/setting/hide-comment/${auth.userId}/list-page?status=1`
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
          loading: true
        },
      })
      dispatch({
        type: 'SET_EXTRA',
        payload: {
          hiddenAllComment: !!!response.data?.data.find(item => +item.hide_comment !== 1),
          hiddenAllCommentHasPhone: !!!response.data?.data.find(item => +item.hide_comment !== 2)
        },
      })
    }
  }
  const listPage = state?.table?.display?.updateList
  const handleHiddenStatus = opt => {
    const listConfig = listPage.map((item) => {
      if (item.id == opt.id) item.hide_comment = opt?.hide_comment
      return item
    })
    dispatch({
      type: 'UPDATE_TABLE_ROW',
      payload: {
        display: {
          updateList: listConfig,
        },
      },
    })

    dispatch({
      type: 'SET_EXTRA',
      payload: {
        hiddenAllComment: !!!listConfig.find(item => +item.hide_comment !== 1),
        hiddenAllCommentHasPhone: !!!listConfig.find(item => +item.hide_comment !== 2)
      },
    })

    updateChangedConfirm()
  }
  const handleHiddenCommentHasKeyword = (hide_text, opt) => {
    dispatch({
      type: 'SET_VALIDATE',
      payload: {
        index: opt.id,
        text: hide_text.length < 11
          ? '' : 'Bạn chỉ được khai báo tối đa 10 từ khóa.'
      },
    })
    const listConfig = listPage.map((item) => {
      if (item.id == opt.id) item.hide_text = hide_text
      return item
    })
    dispatch({
      type: 'UPDATE_TABLE_ROW',
      payload: {
        display: {
          updateList: listConfig,
        },
      },
    })

    dispatch({
      type: 'SET_EXTRA',
      payload: {
        hiddenAllComment: !!!listConfig.find(item => +item.hide_comment !== 1),
        hiddenAllCommentHasPhone: !!!listConfig.find(item => +item.hide_comment !== 2)
      },
    })
    updateChangedConfirm()
  }
  const handleUpdateAutoHiddenComment = async () => {
    const canSubmit = listPage.find(item => item.hide_text.length > 10)
    if(!canSubmit){

      GlobalDispatch({
        type: 'UPDATE_CHANGE_STATUS',
        payload: {
          status: false
        }
      })
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      })
      const data = listPage.map(item => ({
        page_id: item.page,
        hidden_text: item.hide_text.toString(),
        hidden_type: !!item.hide_comment ? item.hide_comment : 0,
      }))
      const response = await sendRequestAuth('post',
        `${config.API}/fb/setting/hide-comment/update`,
        data
      )
      if (!!response?.data?.success) {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        })
        showAlert({ content: 'Cập nhật cấu hình ẩn bình luận tự động thành công', type: 'success', duration: 2000 })
      } else {
        dispatch({
          type: 'SET_LOADING',
          payload: false,
        })
        showAlert({ content: 'Cập nhật cấu hình ẩn bình luận tự động thất bại', type: 'danger', duration: 2000 })
      }
    }else{
      showAlert({ content: 'Bạn chỉ được khai báo tối đa 10 từ khóa.', type: 'danger', duration: 2000 })
    }
  }
  const handleHiddenAllCommentStatus = () => {
    dispatch({
      type: 'SET_EXTRA',
      payload: {
        hiddenAllComment: !state.extra.hiddenAllComment,
        hiddenAllCommentHasPhone: false,
      },
    })
    if (!state.extra.hiddenAllComment) {
      dispatch({
        type: 'UPDATE_TABLE_ROW',
        payload: {
          display: {
            updateList: listPage.map((item) => {
              item.hide_comment = 1
              return item
            }),
          },
        },
      })
    } else {

      dispatch({
        type: 'UPDATE_TABLE_ROW',
        payload: {
          display: {
            updateList: listPage.map((item) => {
              item.hide_comment = 0
              return item
            }),
          },
        },
      })
    }

    updateChangedConfirm()
  }
  const handleHiddenAllCommentHasPhone = () => {
    dispatch({
      type: 'SET_EXTRA',
      payload: {
        hiddenAllCommentHasPhone: !state.extra.hiddenAllCommentHasPhone,
        hiddenAllComment: false,
      },
    })
    if (!state.extra.hiddenAllCommentHasPhone) {
      dispatch({
        type: 'UPDATE_TABLE_ROW',
        payload: {
          display: {
            updateList: listPage.map((item) => {
              item.hide_comment = 2
              return item
            }),
          },
        },
      })
    } else {

      dispatch({
        type: 'UPDATE_TABLE_ROW',
        payload: {
          display: {
            updateList: listPage.map((item) => {
              item.hide_comment = 0
              return item
            }),
          },
        },
      })
    }

    updateChangedConfirm()
  }

  const handleCancelConfirmDelete = _ => {
    dispatch({
      type: 'SET_CONFIRM',
      payload: false
    })
  }

  const handleConfirmBack = _ => {
    dispatch({
      type: 'SET_CONFIRM',
      payload: true
    })
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  return {
    data: state,
    methods: {
      listOrigin: getListHideComment,
      onChangeHiddenStatus: handleHiddenStatus,
      onChangeHiddenCommentHasKeyword: handleHiddenCommentHasKeyword,
      onChangeHiddenAllCommentStatus: handleHiddenAllCommentStatus,
      onChangeHiddenAllCommentHasPhone: handleHiddenAllCommentHasPhone,
      onCancelConfirmDelete: handleCancelConfirmDelete,
      onSubmitAutoHiddenComment: handleUpdateAutoHiddenComment,
      onClickConfirm: handleConfirmBack,
    },
  }
}

export default useFacebookHideAutoComment
