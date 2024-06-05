import { useCallback, useContext } from 'react'
import { FacebookConversationContext } from '../provider/_context'
import { postData, sendRequestAuth } from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import { getFbMessage } from '../../../services'
import axios from 'axios'
import { transformListDetailData } from '../../../utils/transform'
import { debounce } from '@mui/material'
import useFilterFacebookConversation from './useFilterFacebookConversation'
import ArrayUtils from '../../../utils/array'
import { replaceAllCustom } from '../../../../../util/functionUtil'
import { transformConversationUnread } from '../utils/transform'

const useFacebookDetailConversation = () => {

  const [GlobalState] = useGlobalContext()
  const { auth } = GlobalState.facebookAuth
  const { state, dispatch } = useContext(FacebookConversationContext)
  const {queries,methods} = useFilterFacebookConversation()
  const { showAlert } = useAlert()
  const { conversation } = state
  const { detail } = state
  const { message } = detail.conversation
  const customerInfo = state.detail.customerInfor
  const isEnoughCustomerInfo = ![
    !!customerInfo.list?.city_id,
    !!customerInfo.list?.district_id,
    !!customerInfo.list?.ward_id,
    !!customerInfo.list?.customer_address,
    !!customerInfo.list?.customer_mobile,
    !!customerInfo.list?.customer_name,
  ].includes(false)
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
    }
  }
  // LIST FANPAGE

  const getListFanpage = async () => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/pages/${auth.userId}/connected?keyword&per_page=20&start=0`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'SET_PAGE',
        payload: {
          list: response?.data?.data,
          active: response?.data?.data.map(item => item.page_id),
        }
      })
      getListConversation(response?.data?.data.map(item => item.page_id))
      getListPost(response?.data?.data.map(item => item.page_id))
    }
  }
  const getListConversation = async (page_id) => {
    dispatch({
      type: 'SET_CONVERSATION_LOADING',
      payload: true
    })
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/fanpage/filter?page_id=${!!page_id && page_id.toString()}&type=&keyword&post_id&tags&start_date&end_date&is_done&is_phone&is_read`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: response.data.data,
        }
      })
      dispatch({
        type: 'SET_META_CONVERSATION',
        payload: {
          total: response.data.meta?.total,
          unread: {
            all: response.data.meta?.unread?.all,
            messages: response.data.meta?.unread?.messages,
            comments: response.data.meta?.unread?.comment,
          },
        }
      })
      dispatch({
        type: 'SET_CONVERSATION_LOADING',
        payload: false
      })
    }

  }

  const handleConversation = (page_id, data) => {
    let listConversation = {}
    conversation.display.list.map(item => {
      if (item.page_id == page_id && data.action == 'update' && +item.type == +data.type) {
        listConversation = { ...item, ...data }
      }
    })
    if (!!listConversation)
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: [listConversation, ...conversation.display.list.filter(item => item.page_id != page_id)]
        }
      })
  }
  const listDetails = state?.detail?.conversation?.list
  const debounceLoadMoreConversation = useCallback(debounce(async (url, listDetails) => {
    await axios.get(url)
      .then(res => {
        const data = res?.data?.data || []
        const listDt = transformListDetailData(data)
        dispatch({
          type: 'SET_DETAIL_CONVERSATION',
          payload: {
            list: [...listDt, ...listDetails,],
            paging: res?.data?.paging,
            scrollBottom: true,
            scrollToView: listDt.length - 1
          }
        })
        // dispatch({
        //   type: 'UPDATE_LOADING_CONVERSATION',
        //   payload: false
        // })
      })
      .catch(error => console.log(error))
  }, 500), [])

  const loadMoreDetail = async (url) => {
    // dispatch({
    //   type: 'UPDATE_LOADING_CONVERSATION',
    //   payload: true
    // })
    debounceLoadMoreConversation(url, listDetails)
  }

  const tagsCustomer = state.filter.conversation.tagsCustomer

  const updateStatusConversation= async data => {
    await sendRequestAuth('post',
      `${config.API}/fb/action/read`,
      {
        code: [data?.code]
      }
    )
  }

  const handleGetDetail = async (data) => {
    if(data.is_read == 1){
      dispatch({
        type: 'SET_META_CONVERSATION',
        payload: {
          total: state.meta?.total,
          unread: {
            all: transformConversationUnread(+state.meta?.unread?.all - 1),
            messages: transformConversationUnread(data?.type == 1 ? +state.meta?.unread?.messages - 1 : +state.meta?.unread?.messages),
            comments: transformConversationUnread(data?.type == 2 ? +state.meta?.unread?.comments - 1 : +state.meta?.unread?.comments),
          },
        }
      })
      document.title = `(${+state.meta?.unread?.all - 1}) evoshop - Phần mềm quản lý bán hàng đa kênh chuyên nghiệp`
    }
    const listTags = tagsCustomer.list.map((item) => {
      if (data?.tags.length > 0 && !!(data?.tags.find(tag => tag.id == item.id)))
        item.added = true
      else item.added = false
      return item
    }) || []

    dispatch({
      type: 'SET_TAGS_CUSTOMER',
      payload: {
        tagsCustomer: listTags
      },
    })

    let matchTime = new Date(data.time)
    let date = new Date()

    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        type: data.type,
        customer: data,
        scrollBottom: false,
        inMatchTime: (matchTime.getTime() + (7 * 24 * 60 * 60 * 1000)) > date.getTime(),
        scrollToView: 0,
        firstFrame: false
      }
    })
    dispatch({
      type: 'UPDATE_LOADING_CONVERSATION',
      payload: true
    })
    dispatch({
      type: 'RESET_TYPING'
    })

    dispatch({
      type: 'UPDATE_CONVERSATION',
      payload: {
        list:
          conversation.display.list.map(item => {
            if (item.code == data.code) {
              item.is_read = 2
            }
            return item
          })
      }
    })
    // update read status
    // get customer infor
    handleDetailCustomerInfor(data);
    if (data.type == 1) {
      // get message detail
      const accessToken = state.page.list.find(p => p.page_id == data.page_id)?.access_token || ''
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
      getDetailPost(data)
      const response = await sendRequestAuth('get',
        `${config.API}/fb/fanpage/comment-user/list?page_id=${data?.page_id}&post_id=${data?.post_id}&from=${data?.from}`
      )
      if (!!response.data?.success) {
        dispatch({
          type: 'SET_DETAIL_CONVERSATION',
          payload: {
            list: response.data?.data,
          }
        })
        dispatch({
          type: 'UPDATE_LOADING_CONVERSATION',
          payload: false
        })
      }
      dispatch({
        type: 'UPDATE_LOADING_CONVERSATION',
        payload: false
      })
    }

    updateStatusConversation(data)
    //apply state conversation, meta read status

  }

  const getDetailPost = async (data) => {
    const response = await sendRequestAuth('get',
      `${config.API}/fb/post/detail?page_id=${data?.page_id}&post_id=${data?.post_id}`
    )
    if (!!response.data?.success) {
      dispatch({
        type: 'SET_DETAIL_CONVERSATION',
        payload: {
          detailPost: response.data?.data,
        }
      })
    }
  }

  const handleDetailMessage = (response) => {
    const listDt = transformListDetailData(response?.data)
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        list: listDt,
        paging: response?.paging,
        scrollToView: listDt.length - 1
      }
    })

    dispatch({
      type: 'UPDATE_LOADING_CONVERSATION',
      payload: false
    })
  }

  const handleDetailCustomerInfor = async (data) => {
    const id = data.from;
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/customer/${id}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'SET_CUSTOMER_DISABLED_NAME',
        payload: response.data.data.length <=0 ? true : false
      })
      dispatch({
        type: 'SET_CUSTOMER_LIST',
        payload: response.data.data
      })
      if(response.data.data.length <= 0){
        dispatch({
          type: 'SET_CUSTOMER_NAME_UPDATE',
          payload: data.name
        })
      }
      handleCustomerAddress(response.data.data.customer_mobile);
      handleCustomerOrders(response.data.data.customer_id);
      
    }
    handleCustomerPhones(id);
    dispatch({type: 'SET_CUSTOMER_VALID',payload: false})
    dispatch({type: 'RESET_VALIDATE_FORM_CUSTOMER',payload: []})
  }
  const handleCustomerReportStatus = async (phone) => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/order/customer/report`,
      JSON.stringify({phone: phone}),
    )
    if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
      dispatch({
        type: 'SET_CUSTOMER_TOTAL_REPORTS',
        payload:  response.data.data.length > 0 ? response.data.data[0].totals : 0
      })
      dispatch({
        type: 'SET_LIST_REPORT',
        payload:  response.data.data.length > 0 ? response.data.data : []
      })
    }
  }
  const handleCustomerAddress = async (phone) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/customer/check-address?phone=${phone}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'SET_CUSTOMER_ADDRESS_LIST',
        payload: response.data.data
      })
    }
  }
  const handleCustomerPhones = async (id) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/customer/check-phone?facebook_id=${id}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'SET_CUSTOMER_PHONE_LIST',
        payload: response.data.data
      })
      handleCustomerReportStatus(response.data.data);
    }
  }
  const handleCustomerOrders = async (id) => {
    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/customer/order-list?customer_id=${id}`
    )
    if (!!response.data.success) {
      dispatch({
        type: 'SET_CUSTOMER_ORDER_LIST',
        payload: response.data.data
      })
    }
  }

  const handleRightSide = (boo) => {
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        showRightSide: !boo
      }
    })
  }

  const handleStarStatusConversation = async data => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/action/is-done`,
      data
    )
    if (!!response.data.success) {
      const newConversation = conversation.display.list.map(item => {
        if (item.code == data.code)
          item.is_done = data.is_done
        return item
      })
      dispatch({
        type: 'UPDATE_CONVERSATION',
        payload: {
          list: newConversation
        }
      })
    } else {
      showAlert({
        content: 'Lỗi hệ thống',
        duration: 2000,
        type: 'danger'
      })
    }
  }
  const listComment =  detail.conversation.list
  const handleHiddenComment = async data => {
    const response = await sendRequestAuth('post',
      `${config.API}/fb/fanpage/comment-user/hidden`,
      { comment_id: [data.comment_id], 'is_hidden': data.is_hidden == 1 ? 0 : 1 }
    )
    if (!!response.data?.success) {
      showAlert({
        content: data.is_hidden == 1 ? 'Đã hiện bình luận này trên bài viết' : 'Đã ẩn bình luận này trên bài viết',
        duration: 2000,
        type: 'success'
      })
      const newList = listComment.map(cm => {
        if (cm.comment_id == data.comment_id) cm.is_hidden = data.is_hidden == 1 ? 0 : 1
        return cm
      })
      dispatch({
        type: 'SET_DETAIL_CONVERSATION',
        payload: {
          list: newList
        }
      })
    }
  }
  const handleSendMessage = data => {
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        message: {
          show: true,
          data: data
        }
      },
    })
  }
  const handleCloseMessageModal = _ => {
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        message: {
          show: false,
          data: {},
          media: [],
          value: '',
          message: false,
        }
      },
    })
  }
  const handleShowMessageModal = data => {
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        message: {
          show: true,
          data: data,
          media: {
            images: [],
            imageTemp: [],
            imageFiles: [],
            typeValue: 1
          },
          value: '',
        }
      },
    })
  }
  const comment = state.detail.conversation
  const displayList = comment.list
  const selectedList = comment.listSelected
  const shouldActiveCheckbox = selectedList.length > 0

  const isActive =
    displayList.length <= 0
      ? false
      : selectedList.length < displayList.length
      ? false
      : !!!displayList.find(
        item =>
          !!!selectedList.find(find => find?.comment_id === item?.comment_id),
      )
  const handleCheckboxChange = () => {
    let newSelectedList = []
    if (isActive)
      // on value is false
      newSelectedList = selectedList.filter(item => !!!displayList.find(find => find?.comment_id === item?.comment_id))
    else {
      // on value is true
      let addingList = []
      displayList.forEach(item => {
        if (!!!selectedList.find(find => find?.comment_id === item?.comment_id))
          addingList = [...addingList, item]
      })
      newSelectedList = [...selectedList, ...addingList]
    }
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        listSelected: newSelectedList, totalSelected: newSelectedList?.length
      }
    })
  }

  const rowCheckboxChange = (data, selected) =>
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        listSelected: selected
          ? selectedList.filter(item => item?.comment_id !== data?.comment_id)
          : [...selectedList, data]
      },
    })

  const copyComment = (snippet) => {
    navigator.clipboard.writeText(snippet)
    showAlert({ content: 'Đã sao chép nội dung phản hồi', type: 'success' })
  }

  const handleReplyComment = (item) => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        comment: item,
        commentType : 'reply',
        value: ''
      }
    })
  }

  const handleEditComment = (item) => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        comment: item,
        commentType : 'update',
        value: item?.snippet ? JSON.parse(item?.snippet) : ''
      }
    })
  }

  const copyListComment = _ => {
    let snippet = ''
    detail.conversation.listSelected.map(
      item => {
        snippet += !!item.snippet ? JSON.parse(item.snippet) + '\n' : ''
      }
    )
    navigator.clipboard.writeText(snippet)
    showAlert({ content: 'Đã sao chép bình luận', type: 'success' })
  }

  const handleDeleteCommentConfirm = (comment = {}) => {
    console.log(comment)
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        confirm: {
          ...detail.conversation.confirm,
          delete: comment
        }
      }
    })
  }

  const handleDeleteComment = async (comment) => {
    dispatch({
      type: 'SET_DETAIL_CONVERSATION',
      payload: {
        confirm: {
          ...detail.conversation.confirm,
          delete: {}
        },
      }
    })
    dispatch({
      type: 'SET_LOADING',
      payload: true
    })
    const data = {
      'page_id': detail.conversation?.detailPost?.page_id,
      'post_id': detail.conversation?.detailPost?.post_id,
      'from': comment?.from || detail.conversation?.customer?.from,
      'comment_id': comment.comment_id
    }
    const response = await sendRequestAuth('post',

      `${config.API}/fb/fanpage/comment-user/delete`,
      data
    )
    if (!!response?.data?.success) {
      let newComments = []
      if (!!comment?.parent) {
        newComments = detail.conversation.list.map(item => {
          if (item.comment_id == comment?.parent) {
            const newReply = item?.reply.filter(reply => reply.comment_id != data.comment_id)
            item.reply = newReply
          }
          return item
        })
      } else newComments = detail.conversation.list.filter(item => item.comment_id != data.comment_id)
      dispatch({
        type: 'SET_DETAIL_CONVERSATION',
        payload: {
          list: newComments
        }
      })
      methods?.getListConversation(queries)
      showAlert({
        content: 'Xoá bình luận thành công',
        type: 'success',
        duration: 2000
      })

      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    } else {

      showAlert({
        content: 'Xoá bình luận thất bại',
        type: 'danger',
        duration: 2000
      })

      dispatch({
        type: 'SET_LOADING',
        payload: false
      })
    }
  }

  const handlePrintComment = async _ => {

    dispatch({
      type: 'SET_LOADING',
      payload: true
    })

    let comment = []
    detail.conversation.listSelected.map(
      item => {
        comment = [...comment, item.comment_id]
      }
    )
    const data = {
      'page_id': detail.conversation.customer?.page_id,
      'post_id': detail.conversation.customer?.post_id,
      'from': detail.conversation.customer?.from,
      'comment_id': comment
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
  const {images, imageTemp, imageFiles} = message.media


  const handleChangeInputTyping = data => {
    dispatch({
      type: 'SET_INPUT_MESSAGE',
      payload: data
    })
  }

  const handleSelectScriptMessage = (data, opt = {}) => {
    
    
    const script = replaceAllCustom(data?.message,'{{name}}',` ${detail.conversation?.customer?.name} `)
    dispatch({
      type: 'SET_INPUT_MESSAGE',
      payload: (opt?.fast || !message?.value) ? script : message?.value + ' ' + script
    })
    const listImage = !!data?.image && data?.image.length > 0 ? JSON.parse(data?.image).map((item, index) => {
      return {
        id: `${index}-${Math.random()}`,
        name: item,
        url: item,
      }
    }) : [] 
    if ([...imageTemp,...listImage].length > 10) {
      showAlert({
        type: 'danger',
        content: 'Chỉ được phép tải lên tối đa 10 ảnh',
      })
    } else {
      dispatch({
        type: 'SET_MEDIA_MESSAGE',
        payload: {
          images: [...images,...listImage],
          imageTemp: [...imageTemp,...listImage],
          typeValue: message?.media?.typeValue
        }
      })
    }
    dispatch({
      type: 'SET_MEDIA_MESSAGE',
      payload: {
        type: [...images,...listImage].length > 0,
      }
    })
  }
  const handleSetTypeMedia= (boo,val) => {
    dispatch({
      type: 'SET_MEDIA_MESSAGE',
      payload: {
        type: boo,
        typeValue: val
      }
    })
  }

  const handleSetShowCarouselMedia = boo => {
    dispatch({
      type: 'SET_MEDIA_MESSAGE',
      payload: {
        carousel: boo
      }
    })
  }

  const handleImageDelete = id => {
    dispatch({
      type: 'SET_MEDIA_MESSAGE',
      payload: {
        imageTemp: imageTemp.filter(item => item?.id !== id),
        images: images.filter(item => item?.id !== id)
      }
    })
  }

  const handleImageFileChange = e => {
    const files = e.target.files
    let imageArr = []
    let count = 0
    for (let i = 0; i < files.length; i++) {
      if (count + imageTemp.length >= 10) {
        showAlert({
          type: 'danger',
          content: 'Chỉ được phép tải lên tối đa 10 ảnh',
        })
        break
      }
      const item = files[i]
      if (
        !['image/jpg', 'image/jpeg', 'image/png'].includes(
          item.type.toLowerCase(),
        )
      ) {
        showAlert({
          type: 'danger',
          content: 'Chỉ hỗ trợ các định dạng: .jpg, .jpeg, .png.',
        })
        break
      }
      if (item?.size <= 3000000) {
        imageArr.push({
          id: Math.random(),
          name: item?.name,
          url: window.URL.createObjectURL(item),
        })
        count++
      } else
        showAlert({
          type: 'danger',
          content: 'Ảnh tải lên không được vượt quá 3MB',
        })
    }
    dispatch({
      type: 'SET_MEDIA_MESSAGE',
      payload: {
        imageTemp: [...imageTemp, ...imageArr],
        imageFiles: [...imageFiles, ...files]
      }
    })
  }

  const handleAddNameTag = _ => {
    dispatch({
      type: 'SET_INPUT_MESSAGE',
      payload: message?.value + ` ${detail.conversation?.customer?.name} `
    })
  }



  const handleUploadImage = async (images) => {
    let formDataList = []
    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData()
      formData.append('images[]', imageFiles[i])
      formDataList.push(formData)
    }

    const response = await Promise.all(
      formDataList.map(item =>
        postData(`${config.API}/fb/action/upload`, item),
      ),
    )

    return response
  }


  const handleSubmitMessage = e => {
    const keyCode = e.keyCode || e.which
    if (e.key === 'Enter' && e.shiftKey) {
      e.returnValue = false
    }
    if ((keyCode === 13 && !e.shiftKey) || e?.type == 'click' ) {
      e.returnValue = false
      if (e.preventDefault) e.preventDefault()
      if(!!message.value || imageFiles.length > 0 ){
        handleCloseMessageModal()
        const uploadResponse = handleUploadImage()
        uploadResponse.then(res => {
          const urlList = res.map(item => {
            if (
              item?.data?.success &&
              ArrayUtils.getQualifiedArray(item?.data?.data)[0]
            ) {
              return `${ArrayUtils.getQualifiedArray(item?.data?.data)[0]}`
            } else return ''
          })
          handleSubmitConversation(urlList)
        })
      }
    }
  }

  const handleCancelEditComment = _ => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        comment: {},
        commentType : '',
        value: ''
      }
    })
  }


  const handleSubmitConversation = async imgURLList => {
    let url = ''
    let data = {}
    const image = [
      ...images.map(item => item?.url),
      ...imgURLList,
    ]
      //messenger
    url = 'fb/fanpage/message/send'
    data = {
      'is_livestream': 0,
      'page_id': detail.conversation.customer?.page_id,
      'code': detail.conversation.customer?.code,
      'recipient_id': detail.conversation.customer?.from,
      'text': message.value,
      'attachment': image.length > 0 ? (message?.media?.type ? image : detail.conversation.detailPost?.image) :  (message?.media?.type && message?.media?.typeValue == 2 ? [detail.conversation.detailPost?.image] : [])
    }
    data.attachment = data.attachment.slice(0,10)
    const response = await sendRequestAuth(
      'post',
      `${config.API}/${url}`,
      data
    )

    if (response?.data?.success) {
      showAlert({
        content: 'Gửi tin nhắn thành công',
        duration: 2000,
        type: 'success'
      })
      dispatch({
        type: 'SET_LOADING_MESSAGE',
        payload: false
      })
      //clear state typing
    }else{
      dispatch({
        type: 'SET_LOADING_MESSAGE',
        payload: false
      })
      if(response?.data?.errors?.message)
        showAlert({
          content: response?.data?.errors?.message,
          duration: 2000,
          type: 'danger'
        })
    }
  }

  const handleTabActive = val => {
    dispatch({
      type: 'SET_TAB_ACTIVE',
      payload: val
    })
    dispatch({
      type: 'SET_CUSTOMER_VALID',
      payload: !isEnoughCustomerInfo
    })
    //isEnoughCustomerInfo
  }

  return {
    data: state,
    methods: {
      getListFanpage,
      getListConversation,
      handleConversation,
      getListTags,
      getListPost,
      handleGetDetail,
      handleRightSide,
      loadMoreDetail,
      handleStarStatusConversation,
      onCheckboxChange: rowCheckboxChange,
      handleTabActive
    },
    comment: {
      message: message,
      func: {
        handleHiddenComment,
        handleSendMessage,
        handleShowMessageModal,
        handleCloseMessageModal,
        handleEditComment,
        handleDeleteComment,
        handleDeleteCommentConfirm,
        copyComment,
        copyListComment,
        handlePrintComment,
        handleReplyComment,
        handleSelectScriptMessage,
        handleSetTypeMedia,
        handleImageDelete,
        handleImageFileChange,
        handleSetShowCarouselMedia,
        handleChangeInputTyping,
        handleAddNameTag,
        handleSubmitMessage,
        handleCancelEditComment
      },
      checkbox: {
        checked: shouldActiveCheckbox,
        onClick: handleCheckboxChange,
      },
    },
  }
}

export default useFacebookDetailConversation
