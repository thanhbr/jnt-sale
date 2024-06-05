import { useContext } from 'react'
import { FacebookConversationStickersContext } from '../provider/_context'
import { sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import { orderActions } from '../../../../deliveryManagement/provider/_reducer'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { useProductAction } from '../../../../productGroup/provider/_reducer'

const useFacebookConversationStickers = () => {

  const [GlobalState] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookConversationStickersContext)
  const { showAlert } = useAlert()
  const form = state.modal.form
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // FACEBOOK HIDE COMMENT

  const getListConversationStickers = async () => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/setting/tag/list`
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
    }
  }
  const listPage = state?.table?.display?.updateList
  const handleShowCreateSticker = _ => {
    dispatch({
      type: 'SET_MODAL_ACTIVE',
      payload: true
    })
    dispatch({
      type: 'SET_FORM_DATA',
    })
  }

  const handleShowEditSticker = data => {
    dispatch({
      type: 'SET_FORM_DATA',
      payload: {
        color: data?.color,
        stickerName: data?.name,
        id: data?.id,
      }
    })
    dispatch({
      type: 'SET_MODAL_ACTIVE',
      payload: true
    })
  }

  //sticker name


  const handleValidateStickerName = boo => {
    dispatch({
      type: 'SET_FORM_VALIDATE_NAME',
      payload: {
        stickerName: !boo ? ('Tên nhãn không được bỏ trống') : ''
      }
    })
  }

  const handleValidateStickerLengthName = boo => {
    dispatch({
      type: 'SET_FORM_VALIDATE_NAME',
      payload: {
        stickerName: !boo ? ('Tên nhãn không được quá 30 ký tự') : ''
      }
    })
  }

  const handleChangeStickerName = name => {
    handleValidateStickerName((name == '') ? false : true)
    handleValidateStickerLengthName((name.length == 31) ? false : true)
    dispatch({
      type: 'SET_FORM_NAME',
      payload: {
        stickerName: name
      }
    })
    dispatch({
      type: 'SET_MODAL_CHANGE',
      payload: true
    })
  }
  // color
  const handleValidateColor = boo => {
    dispatch({
      type: 'SET_FORM_VALIDATE_COLOR',
      payload: {
        color: !boo ? ('Màu sắc không được bỏ trống') : ''
      }
    })
  }
  const handleChangeColor = color => {
    handleValidateColor(true)
    dispatch({
      type: 'SET_FORM_COLOR',
      payload: {
        color: color
      }
    })
    dispatch({
      type: 'SET_MODAL_CHANGE',
      payload: true
    })
  }

  const showConfirmDelete = data =>
     dispatch({
       type: 'SET_MODAL_CONFIRM_DELETE',
       payload: {
         id : data?.id
       }
     })

  const handleClose = _ => {
    if(state.modal.status.change){
      dispatch({
        type: 'SET_MODAL_CONFIRM',
        payload: true
      })
    }else{
      dispatch({
        type: 'SET_MODAL_ANIMATE',
        payload: true
      })
      setTimeout(() => {
        dispatch({
          type: 'SET_MODAL_ANIMATE',
          payload: false
        })
        dispatch({
          type: 'SET_MODAL_ACTIVE',
          payload: false
        })
      }, 300)
      dispatch({
        type: 'SET_FORM_VALIDATE_COLOR',
      })
      dispatch({
        type: 'SET_FORM_VALIDATE_NAME',
      })
    }
  }

  const handleCreateSticker = async _ => {
    let check = true
  if(!form.data.stickerName || !form.data.stickerName.trim()){
    dispatch({
      type: 'SET_FORM_VALIDATE_NAME',
      payload: {
        stickerName: 'Tên nhãn không được bỏ trống'
      }
    })
    check = false
  }
    if(!form.data.color || !form.data.color.trim()){
      dispatch({
        type: 'SET_FORM_VALIDATE_COLOR',
        payload: {
          color: 'Màu sắc không được bỏ trống'
        }
      })
      check = false
    }
    if(check){
      dispatch({
        type: 'SET_LOADING',
        payload: true
      })
      const url = !!form.data?.id ? `${config.API}/fb/setting/tag/update/${form.data?.id}` : `${config.API}/fb/setting/tag/create`
      const response = await sendRequestAuth('post',
          url,
          {
            name: form.data.stickerName,
            color: form.data.color,
          }
      )
      if (!!response?.data?.success) {
        await getListConversationStickers()
        showAlert({
          content: form.data?.id ? 'Cập nhật nhãn khách hàng thành công' : 'Thêm mới nhãn khách hàng thành công',
          duration: 2000,
          type: 'success'
        })

        dispatch({
          type: 'SET_LOADING',
          payload: false
        })

        dispatch({
          type: 'SET_MODAL_CONFIRM',
          payload: false
        })
        dispatch({
          type: 'SET_MODAL_CHANGE',
          payload: false
        })
        dispatch({
          type: 'SET_FORM_COLOR',
        })
        dispatch({
          type: 'SET_FORM_NAME',
        })
        dispatch({
          type: 'SET_FORM_VALIDATE_COLOR',
        })
        dispatch({
          type: 'SET_FORM_VALIDATE_NAME',
        })

        dispatch({
          type: 'SET_MODAL_ACTIVE',
          payload: false
        })
      }else{
        showAlert({
          content: form.data?.id  ? 'cập nhật nhãn khách hàng thất bại' :'Thêm mới nhãn khách hàng thất bại',
          duration: 2000,
          type: 'danger'
        })
        dispatch({
          type: 'SET_LOADING',
          payload: false
        })
      }
    }


  }

  const handleDeleteTag = async id => {
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    const url = `${config.API}/fb/setting/tag/delete/${id}`
    const response = await sendRequestAuth('DELETE',
      url
    )
    if (!!response?.data?.success) {
      dispatch({
        type: 'SET_MODAL_CONFIRM_DELETE',
        payload: false
      })
      await getListConversationStickers()
        showAlert({
          content: 'Xóa nhãn khách hàng thành công',
          duration: 2000,
          type: 'success'
        })
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })


    }else{
      showAlert({
        content: 'Xóa nhãn khách hàng thất bại',
        duration: 2000,
        type: 'danger'
      })
      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }

  }

  const handleCancelConfirm = _ => {
    dispatch({
      type: 'SET_MODAL_CONFIRM',
      payload: false
    })
  }
  const handleCancelConfirmDelete = _ => {
    dispatch({
      type: 'SET_MODAL_CONFIRM_DELETE',
      payload: false
    })
  }

  const handleAcceptConfirm = _ => {
    dispatch({
      type: 'SET_MODAL_CONFIRM',
      payload: false
    })
    dispatch({
      type: 'SET_MODAL_CONFIRM_DELETE',
      payload: false
    })
    dispatch({
      type: 'SET_MODAL_CHANGE',
      payload: false
    })
    dispatch({
      type: 'SET_FORM_COLOR',
    })
    dispatch({
      type: 'SET_FORM_NAME',
    })
    dispatch({
      type: 'SET_FORM_VALIDATE_COLOR',
    })
    dispatch({
      type: 'SET_FORM_VALIDATE_NAME',
    })
    dispatch({
      type: 'SET_MODAL_ANIMATE',
      payload: true
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MODAL_ANIMATE',
        payload: false
      })
      dispatch({
        type: 'SET_MODAL_ACTIVE',
        payload: false
      })
    }, 300)
  }


  const handleRowPositionUpdate = async arr => {
    const submitData = arr.map((item, i) => ({id: item.id, position: i}))

    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/setting/tag/position`,
      JSON.stringify(submitData),
    )
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  return {
    data: state,
    methods: {
      listOrigin: getListConversationStickers,
      onShowCreateSticker: handleShowCreateSticker,
      onShowEditSticker: handleShowEditSticker,
      onChangeColor: handleChangeColor,
      onChangeStickerName: handleChangeStickerName,
      onValidateColor: handleValidateColor,
      onValidateStickerName: handleValidateStickerName,
      onClose: handleClose,
      onCancelConfirm: handleCancelConfirm,
      onCancelConfirmDelete: handleCancelConfirmDelete,
      onAcceptConfirm: handleAcceptConfirm,
      onSubmitCreateSticker: handleCreateSticker,
      onSubmitDeletetag: handleDeleteTag,
      onShowConfirmDelete: showConfirmDelete,
      handleRowPositionUpdate
      // onSubmitAutoHiddenComment: handleUpdateAutoHiddenComment,

      // validate: checkValidate ?? false
    },
    validate: (!!!form.data.color || !!!form.data.stickerName || form.data.stickerName.length == 31) ? true : false
  }
}

export default useFacebookConversationStickers
