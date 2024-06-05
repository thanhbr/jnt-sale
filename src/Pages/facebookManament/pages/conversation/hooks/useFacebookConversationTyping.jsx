import { useCallback, useContext, useState } from 'react'
import { FacebookConversationContext } from '../provider/_context'
import config from '../../../../../config'
import useAlert from '../../../../../hook/useAlert'
import { transformQueryObjToString } from '../../../../../Component/surveyLogin/utils/transform'
import { postData, sendRequestAuth } from '../../../../../api/api'
import ArrayUtils from '../../../utils/array'
import { debounce } from '@mui/material'
import { transformListDetailData } from '../../../utils/transform'
import { getFbMessage } from '../../../services'

const useFacebookConversationTyping = () => {

  const { state, dispatch } = useContext(FacebookConversationContext)
  const { showAlert } = useAlert()
  const typing = state.detail.conversation.typing
  const detail = state.detail.conversation
  const { scriptResponse } = typing
  const { media } = typing
  const { images, imageTemp, imageFiles } = media
  const MAX_NUMBER_OF_IMAGES = 15
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const scriptQueries = { keyword: '' }
  const getScripts = async (opt = {}) => {
    if (typing.scriptResponse.loading && !opt?.origin) return

    if (!opt?.notLoading)
      dispatch({ type: 'SCRIPT_RESPONSE_UPDATE', payload: { loading: true } })

    const q = transformQueryObjToString({ ...scriptQueries, ...opt?.queries })

    const response = await sendRequestAuth(
      'get',
      `${config.API}/fb/setting/sample-message/list${q}`,
    )

    if (response?.data?.success) {
      const scriptList = ArrayUtils.getQualifiedArray(response?.data?.data)
        .sort((a, b) => Number(a?.position || 0) - Number(b?.position || 0))
        .map((item, i) => ({
          ...item,
          tmpPosition: i,
        }))

      dispatch({
        type: 'SCRIPT_RESPONSE_UPDATE',
        payload: {
          list: scriptList
        },
      })
    }

    if (!opt?.notLoading)
      setTimeout(
        () =>
          dispatch({
            type: 'SCRIPT_RESPONSE_UPDATE',
            payload: {
              loading: false
            },
          }),
        500,
      )
  }

  const debounceSearchChange = useCallback(debounce(async (keyword, opt) => {
    getScripts({ queries: { keyword: keyword ? keyword.trim() : '' }, ...opt })
  }, 500), [])

  const handleSearchChange = (keyword, opt) => {
    dispatch({ type: 'SCRIPT_RESPONSE_UPDATE', payload: { keyword: keyword } })
    debounceSearchChange(keyword, opt)
  }
  const handleDetailChange = data =>
    data?.type
      ?
      dispatch({
        type: 'SCRIPT_RESPONSE_UPDATE',
        payload: {
          detail: {
            data: {
              ...scriptResponse.detail.data,
              ...data?.data
            },
            type: data.type
          }
        }
      })
      : dispatch({
        type: 'SCRIPT_RESPONSE_UPDATE',
        payload: {
          detail: {
            data: {},
            type: ''
          }
        }
      })

  const handleDetailConfirmToggle = boo =>
    dispatch({
      type: 'SCRIPT_RESPONSE_UPDATE',
      payload: {
        detail: {
          ...scriptResponse.detail,
          data: {
            ...scriptResponse.detail.data,
            confirm: boo
          }
        }
      },
    })

  const handleDetailLoadingToggle = boo =>
    dispatch({
      type: 'SCRIPT_RESPONSE_UPDATE',
      payload: {
        loading: boo
      },
    })

  const handleDetailModifiledToggle = boo =>
    dispatch({
      type: 'SCRIPT_RESPONSE_UPDATE',
      payload: {
        detail: {
          ...scriptResponse.detail,
          data: {
            ...scriptResponse.detail.data,
            modifiled: boo
          }
        }
      },
    })

  const handleSelectItem = (data, opt = {}) => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        value: (opt?.fast || !typing.text?.value) ? data?.message : typing.text?.value + ' ' + data?.message
      },
    })
    const listImage = !!data?.image && data?.image.length > 0 ? JSON.parse(data?.image).map((item, index) => {
      return {
        id: `${index}-${Math.random()}`,
        name: item,
        url: item,
      }
    }) : []
    dispatch({
      type: 'SET_MEDIA_TYPING',
      payload: {
        images: [...images, ...listImage],
        imageTemp: [...imageTemp, ...listImage],
      }
    })
    if ([...imageTemp, ...listImage].length > 1 && detail.type == 2) {
      showAlert({
        type: 'warning',
        content: 'Chỉ được chọn 1 ảnh để phản hồi bình luận',
      })
    }
  }

  const debounceGetListScript = useCallback(debounce((splitData) => {
    splitData.shift()
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        search: true
      },
    })

    // dispatch({ type: 'SCRIPT_RESPONSE_UPDATE', payload: { keyword: splitData.toString() } })
    getScripts({ queries: { keyword: splitData.toString().trim() } })
  }, 500), [])

  const handleChangeInputTyping = data => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        value: data,
      },
    })
    let splitData = data.split('/')
    if (splitData.length > 1 && !splitData[0]) debounceGetListScript(splitData)
    else if (!!typing.text.search)
      dispatch({
        type: 'SET_INPUT_TYPING',
        payload: {
          search: false
        },
      })
  }
  const handleDisplayModal = boo => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        search: boo
      },
    })
  }

  // media
  const handleImageFileChange = e => {
    const files = e.target.files
    let imageArr = []
    let count = 0
    for (let i = 0; i < files.length; i++) {
      if (count + imageTemp.length >= MAX_NUMBER_OF_IMAGES) {
        showAlert({
          type: 'danger',
          content: `Chỉ được phép tải lên tối đa ${MAX_NUMBER_OF_IMAGES} ảnh`,
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
      type: 'SET_MEDIA_TYPING',
      payload: {
        imageTemp: detail?.type == 1 ? [...imageTemp, ...imageArr] : imageArr,
        imageFiles: detail?.type == 1 ? [...imageFiles, ...files] : files
      }
    })
  }

  const handleImageDelete = id => {
    dispatch({
      type: 'SET_MEDIA_TYPING',
      payload: {
        imageTemp: imageTemp.filter(item => item?.id !== id),
        images: images.filter(item => item?.id !== id)
      }
    })
  }

  const handleImageDeleteAll = _ => {
    dispatch({
      type: 'SET_MEDIA_TYPING',
      payload: {
        imageTemp: [],
        images: []
      }
    })
  }

  const handleSubmit = e => {
    const keyCode = e.keyCode || e.which
    if (e.key === 'Enter' && e.shiftKey) {
      e.returnValue = false
    }
    if (e.key == 'Escape' && typing.text?.commentType) {

      // clear typing
      dispatch({
        type: 'SET_INPUT_TYPING',
        payload: {
          comment: {},
          commentType: '',
          value: ''
        }
      })
    }
    if ((keyCode === 13 && !e.shiftKey) || e?.type == 'click') {
      e.returnValue = false
      if (e.preventDefault) e.preventDefault()
      if ((!!typing.text?.value && typing.text?.value !='/') || imageFiles.length > 0) {
        //append fake data to coversation
        let attachments, newConversation, newComment = []
        if (+detail.customer?.type == 1) {
          if (imageTemp.length > 0) {
            attachments = imageTemp.map(item => {
              return {
                'attachments': {
                  'data': [
                    {
                      'id': Math.random(),
                      'mime_type': 'image/jpeg',
                      'name': item?.name || '---',
                      'image_data': {
                        'url': item?.url,
                        'preview_url': item?.url,
                        'image_type': 1,
                        'render_as_sticker': false,
                      }
                    }
                  ],
                  pending: true,
                },
                'created_time': new Date(),
                'id': Math.random(),
                'to': {
                  'data': [
                    {
                      'name': detail.customer?.name,
                      'id': detail.customer?.from,
                    }
                  ]
                },
                'from': {
                  'name': detail.customer?.name,
                  'id': detail.customer?.page_id,
                },
              }
            })
          }
          newConversation = [{
            'message': typing.text?.value,
            'pending': true,
            'created_time': new Date(),
            'id': Math.random(),
            'to': {
              'data': [
                {
                  'name': detail.customer?.name,
                  'id': detail.customer?.from,
                }
              ]
            },
            'from': {
              'name': detail.customer?.name,
              'id': detail.customer?.page_id,
            },
          },
            ...attachments || []
          ]
          dispatch({
            type: 'SET_DETAIL_CONVERSATION',
            payload: {
              list: [...detail.list, ...newConversation],
              scrollToView: [...detail.list, ...newConversation].length - 1
            }
          })
        } else {
          // comment update
          if (typing.text?.commentType == 'update') {
            let editComment = ''
            if (!!typing.text?.comment?.parent) {
              editComment = detail.list.find(item => item.comment_id == typing.text?.comment?.parent) || []
              let replyCommnet = editComment?.reply.map(reply => {
                if (reply.comment_id == typing.text?.comment?.comment_id) {
                  reply.pending = true
                  reply.snippet = JSON.stringify(typing.text?.value)
                }
                return reply
              })
              editComment.reply = replyCommnet
              newComment = [...detail.list.filter(item => item.comment_id !== typing.text?.comment?.parent), editComment]
            } else {
              //update comment
              let comment = detail.list.map(item => {
                if (item.comment_id == typing.text?.comment?.comment_id) {
                  item.snippet = JSON.stringify(typing.text?.value)
                  item.pending = true
                }
                return item
              })
              newComment = comment
            }

          } else {
            // reply
            let newReply = {
              'from': detail.detailPost?.page_id,
              'media': imageTemp[0]?.url,
              'parent': typing.text?.comment?.comment_id,
              'comment_id': Math.random(),
              'snippet': JSON.stringify(typing.text?.value),
              'time': new Date(),
              'is_hidden': null,
              'pending': true,
              'sender_name': detail.detailPost?.page_name || '---',
            }
            let parentId = typing.text?.comment?.comment_id ? typing.text?.comment?.comment_id : detail.list[detail.list.length - 1]?.comment_id
            let comment =  detail.list.map(item => {
              if (item?.comment_id == parentId) {
                item.reply = !!item.reply ? [...item.reply, newReply] : [newReply]
              }
              return item
            })
            newComment = comment
          }
          dispatch({
            type: 'SET_DETAIL_CONVERSATION',
            payload: {
              list: newComment,
            }
          })
        }

        //end appen

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

  const transformData = (imgURLList) => {
    let url = ''
    let data = {}
    const image = [
      ...images.map(item => item?.url),
      ...imgURLList,
    ]
    if (detail.customer?.type == 2) {
      // comement
      if (typing.text?.commentType == 'update') {
        // update comment
        url = 'fb/fanpage/comment-user/update'
        data = {
          'page_id': detail.customer?.page_id,
          'post_id': detail.customer?.post_id,
          'sender_id': detail.detailPost?.page_id,
          'sender_name': detail.detailPost?.page_name,
          'sender_avatar': detail.customer?.page_avatar,
          'comment_id': typing.text?.comment?.comment_id,
          'snippet': typing.text?.value,
          'attachment_url': image
        }
      } else {
        // reply comment
        url = 'fb/fanpage/comment-user/reply'
        data = {
          'page_id': detail.customer?.page_id,
          'post_id': detail.customer?.post_id,
          'comment_id': typing.text?.comment?.comment_id ? typing.text?.comment?.comment_id : detail.list[detail.list.length - 1]?.comment_id,
          'snippet': typing.text?.value,
          'attachment_url': image
        }
      }

    } else {
      url = 'fb/fanpage/message/send'
      data = {
        'is_livestream': 0,
        'page_id': detail.customer?.page_id,
        // 'code': detail.customer?.code,
        'code': '',
        'recipient_id': detail.customer?.from,
        'text': typing.text?.value,
        'attachment': image.length > 0 ? image : []
      }
    }
    return { url, data }
  }

  const handleSubmitConversation = async (imgURLList) => {
    const { url, data } = transformData(imgURLList)
    if (data?.page_id)
      dispatch({
        type: 'RESET_TYPING'
      })
    const response = await sendRequestAuth(
      'post',
      `${config.API}/${url}`,
      data
    )

    if (response?.data?.success) {
      //clear state typing
      const newObject = {
        'from': detail.detailPost?.page_id,
        'sender_name': detail.detailPost?.page_name,
        'parent': typing.text?.comment?.comment_id ? typing.text?.comment?.comment_id : detail.list[detail.list.length - 1]?.comment_id,
        'comment_id': response?.data?.data?.comment_id,
        'snippet': JSON.stringify(typing.text?.value),
        'time': new Date(),
        'is_hidden': null
      }
      if (+detail.customer?.type == 2) {
        if (typing.text?.commentType == 'update') {
          // Cập nhật bình luận thành công
          const comment = typing?.text?.comment
          let newComments = []
          if (!!comment?.parent) {
            newComments = detail.list.map(item => {
              if (item.comment_id == comment?.parent) {
                let newReply = item?.reply.map(reply => {
                  if (reply.comment_id == data.comment_id) {
                    reply.snippet = JSON.stringify(typing.text?.value)
                    reply.time = new Date()
                    reply.pending = false
                  }
                  return reply
                })
                item.reply = newReply
              }
              return item
            })
          } else newComments = detail.list.filter(item => {
            if (item.comment_id == data.comment_id) {
              item.snippet = JSON.stringify(typing.text?.value)
              item.time = new Date()
              item.pending = false
            }
            return item
          })
          dispatch({
            type: 'SET_DETAIL_CONVERSATION',
            payload: {
              list: newComments
            }
          })
        } else {
          // Phản hồi bình luận thành công
          let parentId = typing.text?.comment?.comment_id ? typing.text?.comment?.comment_id : detail.list[detail.list.length - 1]?.comment_id
          let newList = detail.list.map(item => {
            if (item?.comment_id == parentId) {
              item.reply.pop()
              item.reply = !!item.reply ? [...item.reply, newObject] : [newObject]
            }
            return item
          })
          dispatch({
            type: 'SET_DETAIL_CONVERSATION',
            payload: {
              list: newList,
            }
          })
        }
      }

      if (+detail.customer?.type == 1) {
        const accessToken = state.page.list.find(p => p.page_id == data.page_id)?.access_token || ''
        getFbMessage({ id: detail.customer?.code, cb: handleDetailMessage, 'access_token': accessToken })
      }
    } else {

      dispatch({
        type: 'SET_LOADING',
        payload: false
      })

      if(response?.data?.errors?.message)
        showAlert({
          content: response?.data?.errors?.message,
          duration: 3000,
          type: 'danger'
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
      }
    })

    dispatch({
      type: 'UPDATE_LOADING_CONVERSATION',
      payload: false
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

  const clearReply = () => {
    dispatch({
      type: 'SET_INPUT_TYPING',
      payload: {
        comment: {},
        commentType: '',
      }
    })
  }

  const handleSetShowCarouselMedia = boo => {
    dispatch({
      type: 'SET_MEDIA_TYPING',
      payload: {
        carousel: boo
      }
    })
  }
  return {
    data: state,
    typing: typing,
    detail: detail,
    methods: {
      getScripts,
      handleSearchChange,
      // detail script conversation
      handleDetailChange,
      handleDetailConfirmToggle,
      handleDetailLoadingToggle,
      handleDetailModifiledToggle,
      handleSelectItem,
      handleChangeInputTyping,
      handleDisplayModal,
      //
      handleSubmit,
      handleUploadImage,
      handleImageFileChange,
      handleImageDelete,
      handleImageDeleteAll,
      handleSubmitConversation,
      clearReply,
      handleSetShowCarouselMedia
    },
  }
}

export default useFacebookConversationTyping
