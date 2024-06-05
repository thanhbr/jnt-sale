import {useContext} from 'react'
import {FacebookConversationContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'

const useFacebookConversationTags = () => {

  const [GlobalState] = useGlobalContext()
  const {auth} = GlobalState.facebookAuth
  const {state, dispatch} = useContext(FacebookConversationContext)
  const {showAlert} = useAlert()
  const form = state.tags.form
  const {detail} = state
  const {conversation} = state
  const tagsCustomer = state.filter.conversation.tagsCustomer
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // FACEBOOK HIDE COMMENT

  const handleShowCreateSticker = _ => {
    dispatch({
      type: 'SET_MODAL_ACTIVE',
      payload: true
    })
    dispatch({
      type: 'SET_FORM_DATA',
    })
    dispatch({
      type: 'SET_MODAL_CHANGE',
      payload: false
    })
  }


  //sticker name


  const handleValidateStickerName = boo => {
    dispatch({
      type: 'SET_FORM_VALIDATE_NAME',
      payload: {
        stickerName: !boo ? ('Tên nhãn không được bỏ trống') : (state?.tags?.form?.data?.stickerName.length >= 31) ? ('Tên nhãn không được quá 30 ký tự') : ''
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
    handleValidateStickerLengthName((name.length >= 31) ? false : true)
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

  const handleClose = _ => {
    if (state.tags.change) {
      dispatch({
        type: 'SET_MODAL_CONFIRM',
        payload: true
      })
    } else {
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
    dispatch({
      type: 'SET_CONVERSATION_LOADING',
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
      const newTag = {
        id: response?.data?.meta?.insert_id,
        name: form.data.stickerName,
        color: form.data.color
      }
      dispatch({
        type: 'SET_TAGS_CUSTOMER',
        payload: {
          tagsCustomer: [newTag, ...state.filter.conversation.tagsCustomer.listOrigin]
        },
      })
      showAlert({
        content: form.data?.id ? 'Cập nhật nhãn khách hàng thành công' : 'Thêm mới nhãn khách hàng thành công',
        duration: 2000,
        type: 'success'
      })

      dispatch({
        type: 'SET_CONVERSATION_LOADING',
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
    } else {
      showAlert({
        content: form.data?.id ? 'cập nhật nhãn khách hàng thất bại' : 'Thêm mới nhãn khách hàng thất bại',
        duration: 2000,
        type: 'danger'
      })
      dispatch({
        type: 'SET_CONVERSATION_LOADING',
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

  const handleAcceptConfirm = _ => {
    dispatch({
      type: 'SET_MODAL_CONFIRM',
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

  const handleTagsAction = async (tag) => {
    const data = {
      page_id: detail.conversation.customer?.page_id,
      fb_id: detail.conversation.customer?.from,
      code: detail.conversation.customer?.code,
      'tag_id': tag.id,
      data_bom: {},
      is_livestream: 0
    }
    const response = await sendRequestAuth('post',
      `${config.API}/fb/action/mark-tag`,
      data
    )
    if(!!response.data.success){
      const newConversation = conversation.display.list.map(item => {
        if(item.from == detail.conversation.customer?.from)
          if(item.tags.length > 0 && item.tags.find(item => item.id == tag.id))
            item.tags = item.tags.filter(item => item.id != tag.id)
          else
            item.tags = [...item.tags, tag]
        return item
      })
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: newConversation
        }
      })
      const listTags = tagsCustomer.list.map((item) => {
        if (item.id == tag.id)
          item.added = !item.added
        return item
      })
      dispatch({
        type: 'SET_TAGS_CUSTOMER',
        payload: {
          tagsCustomer: listTags
        },
      })
      showAlert({content: response.data.message, type: 'success'})
    }else showAlert({content: "Cập nhật nhãn thất bại", type: 'danger'})
  }
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

  return {
    data: state,
    methods: {
      onShowCreateSticker: handleShowCreateSticker,
      onChangeColor: handleChangeColor,
      onChangeStickerName: handleChangeStickerName,
      onValidateColor: handleValidateColor,
      onValidateStickerName: handleValidateStickerName,
      onClose: handleClose,
      onCancelConfirm: handleCancelConfirm,
      onAcceptConfirm: handleAcceptConfirm,
      onSubmitCreateSticker: handleCreateSticker,
      handleTagsAction
    },
    validate: (!!!form.data?.color || !!!form.data?.stickerName || form.data?.stickerName.length == 31) ? true : false
  }
}

export default useFacebookConversationTags
