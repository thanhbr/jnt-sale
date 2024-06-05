import {useCallback, useContext} from 'react'
import {FacebookLivestreamContext} from '../provider/_context'
import {postData, sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import axios from 'axios'
import {transformListDetailData} from '../../../utils/transform'
import {debounce} from '@mui/material'
import ArrayUtils from '../../../utils/array'
import {replaceAllCustom} from '../../../../../util/functionUtil'
import useFilterFacebookLiveStreamDetail from './useFilterFacebookLiveStreamDetail'
import {useParams} from 'react-router-dom'

const useFacebookDetailComment = () => {

    const [GlobalState] = useGlobalContext()
    const {auth} = GlobalState.facebookAuth
    const {state, dispatch} = useContext(FacebookLivestreamContext)
    const {queries, methods} = useFilterFacebookLiveStreamDetail()
    const {showAlert} = useAlert()
    const {liveStream} = state
    const {detail} = state
    const {customerInfor} = detail
    const customerInfo = customerInfor
    const {message} = detail.liveStream

    let {pageId, liveStreamId} = useParams()
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
            type: 'SET_LIVESTREAM_LOADING',
            payload: true
        })
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/fanpage/filter?page_id=${!!page_id && page_id.toString()}&type=&keyword&post_id&tags&start_date&end_date&is_done&is_phone&is_read`
        )
        if (!!response.data.success) {
            dispatch({
                type: 'UPDATE_LIVESTREAM',
                payload: {
                    list: response.data.data.filter(item => item.sender_id != item.page_id),
                }
            })
            dispatch({
                type: 'SET_META_LIVESTREAM',
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
                type: 'SET_LIVESTREAM_LOADING',
                payload: false
            })
        }

    }

    const handleConversation = (page_id, data) => {
        let listConversation = {}
        liveStream.display.list.map(item => {
            if (item.page_id == page_id && data.action == 'update' && +item.type == +data.type) {
                listConversation = {...item, ...data}
            }
        })
        if (!!listConversation)
            dispatch({
                type: 'UPDATE_LIVESTREAM',
                payload: {
                    list: [listConversation, ...liveStream.display.list.filter(item => item.page_id != page_id)]
                }
            })
    }
    const listDetails = state?.detail?.liveStream?.list
    const debounceLoadMoreConversation = useCallback(debounce(async (url, listDetails) => {
        await axios.get(url)
            .then(res => {
                const data = res?.data?.data || []
                const listDt = transformListDetailData(data)
                dispatch({
                    type: 'SET_DETAIL_LIVESTREAM',
                    payload: {
                        list: [...listDt, ...listDetails,],
                        paging: res?.data?.paging,
                        scrollBottom: true,
                        scrollToView: listDt.length - 1
                    }
                })
            })
            .catch(error => console.log(error))
    }, 500), [])

    const loadMoreDetail = async (url) => {
        debounceLoadMoreConversation(url, listDetails)
    }
    const tagsCustomer = state.filter.liveStream.tagsCustomer
    const handleGetDetailComment = async (data) => {
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
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                customer: data,
                scrollBottom: false,
                scrollToView: 0
            }
        })
        dispatch({
            type: 'UPDATE_LOADING_LIVESTREAM',
            payload: true
        })
        dispatch({
            type: 'RESET_TYPING'
        })

        dispatch({
            type: 'UPDATE_LIVESTREAM',
            payload: {
                list:
                    liveStream.display.list.map(item => {
                        if (item.comment_id == data.comment_id) {
                            item.is_read = 2
                        }
                        return item
                    })
            }
        })
        // update read status
        // get customer infor
        handleDetailCustomerInfor(data)
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                listSelected: [],
                list: []
            },
        })
        // get comment detail
        const response = await Promise.all([
            sendRequestAuth('get',
                `${config.API}/fb/livestream/comment-user/${data?.sender_id}?stream_id=${data?.stream_id}&group_person=0&comment_id=${data?.comment_id}`
            ),
            sendRequestAuth('get',
                `${config.API}/fb/livestream/comment-user/${data?.sender_id}?stream_id=${data?.stream_id}&group_person=1&comment_id`
            ),
        ])
        if (!!response[0].data?.success && !!response[1].data?.success ) {
            dispatch({
                type: 'SET_DETAIL_LIVESTREAM',
                payload: {
                    list: response[0].data?.data,
                    isGroupPerson: !!state.filter.liveStream?.groupPerson ? 1 : 0,
                    activeComment: response[0].data?.data,
                    listOrigin: response[1].data?.data,
                }
            })

            dispatch({
                type: 'UPDATE_LOADING_LIVESTREAM',
                payload: false
            })
        }
        dispatch({
            type: 'UPDATE_LOADING_LIVESTREAM',
            payload: false
        })

        await sendRequestAuth('post',
            `${config.API}/fb/action/read`,
            {
                is_livestream: 1,
                code: [data?.comment_id]
            }
        )

        //apply state liveStream, meta read status

    }
    const handleGetDetailCommentGroupPerson = async (group_person) => {
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                isGroupPerson: group_person,
            }
        })
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                listSelected: [], totalSelected: 0
            }
        })
    }
    const handleDetailCustomerInfor = async (data) => {

        const id = data.sender_id
        const response = await sendRequestAuth(
            'get',
            `${config.API}/fb/customer/${id}`
        )
        if (!!response.data.success) {
            dispatch({
                type: 'SET_CUSTOMER_DISABLED_NAME',
                payload: response.data.data.length <= 0 ? true : false
            })
            dispatch({
                type: 'SET_CUSTOMER_LIST',
                payload: response.data.data
            })
            if (response.data.data.length <= 0) {
                dispatch({
                    type: 'SET_CUSTOMER_NAME_UPDATE',
                    payload: data.sender_name
                })
            }
            handleCustomerAddress(response.data.data.customer_mobile)
            handleCustomerOrders(response.data.data.customer_id)
        }
        handleCustomerPhones(id)
        dispatch({type: 'SET_CUSTOMER_VALID', payload: false})
        dispatch({type: 'RESET_VALIDATE_FORM_CUSTOMER', payload: []})
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
                payload: response.data.data.length > 0 ? response.data.data[0].totals : 0
            })
            dispatch({
                type: 'SET_LIST_REPORT',
                payload: response.data.data.length > 0 ? response.data.data : []
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
            handleCustomerReportStatus(response.data.data)
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
            type: 'SET_DETAIL_LIVESTREAM',
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
            const newConversation = liveStream.display.list.map(item => {
                if (item.comment_id == data.code)
                    item.is_done = data.is_done
                return item
            })
            dispatch({
                type: 'UPDATE_LIVESTREAM',
                payload: {
                    list: newConversation.filter(item => item.sender_id != item.page_id),
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

    const handleCreateFastOrder = async (data, active) => {
        let requestData = {
            'page_id': pageId,
            'stream_id': liveStreamId,
            'group_person': !!state.filter.liveStream?.groupPerson ? 1 : 0,
            'comment_id': data.comment_id,
        }
        if (!!data?.phone || !!data?.phone_customer) {
            requestData.phone = data?.phone || data?.phone_customer
        } else if (!!active) {
            requestData.phone = customerInfo.list?.customer_mobile
        }
        const response = await sendRequestAuth(
            'post',
            `${config.API}/fb/livestream/comment-user/${data?.sender_id}/create-quick-order`,
            requestData
        )
        if (!!response.data.success) {
            // thông báo thành công và xử lý in
            showAlert({
                content: 'Tạo đơn nháp thành công!',
                duration: 2000,
                type: 'success'
            })
            const newConversation = liveStream.display.list.map(item => {
                if (item.comment_id == data.comment_id)
                    item.is_order = 1
                return item
            })
            dispatch({
                type: 'UPDATE_LIVESTREAM',
                payload: {
                    list: newConversation,
                }
            })
        } else {
            showAlert({
                content: response.data.errors?.message,
                duration: 2000,
                type: 'danger'
            })
        }
    }
    const listComment = detail.liveStream.list
    const {listOrigin} = detail.liveStream
    const {isGroupPerson} = detail.liveStream
    const handleHiddenComment = async data => {
        const response = await sendRequestAuth('post',
            `${config.API}/fb/action/hidden-comment`,
            {comment_id: [data.comment_id], 'is_hidden': data.is_hidden == 1 ? 0 : 1, "is_livestream": 1}
        )
        if (!!response.data?.success) {
            showAlert({
                content: data.is_hidden == 1 ? 'Đã hiện bình luận này trên bài viết' : 'Đã ẩn bình luận này trên bài viết',
                duration: 2000,
                type: 'success'
            })
            if (isGroupPerson == 0) {
                const newList = listComment.map(cm => {
                    if (cm.comment_id == data.comment_id) cm.is_hidden = data.is_hidden == 1 ? 0 : 1
                    return cm
                })
                const response = await sendRequestAuth('get',
                    `${config.API}/fb/livestream/comment-user/${detail.liveStream.customer?.sender_id}?stream_id=${detail.liveStream.customer?.stream_id}&group_person=1&comment_id`
                )
                dispatch({
                    type: 'SET_DETAIL_LIVESTREAM',
                    payload: {
                        list: newList,
                        listOrigin: response?.data?.success ? response?.data?.data : listOrigin,
                    }
                })
            } else {
                const newList = listOrigin.map(cm => {
                    if (cm.comment_id == data.comment_id) cm.is_hidden = data.is_hidden == 1 ? 0 : 1
                    return cm
                })
                const response = await sendRequestAuth('get',
                    `${config.API}/fb/livestream/comment-user/${detail.liveStream.customer?.sender_id}?stream_id=${detail.liveStream.customer?.stream_id}&group_person=1&comment_id=${data.comment_id}`
                )
                dispatch({
                    type: 'SET_DETAIL_LIVESTREAM',
                    payload: {
                        listOrigin: newList,
                        list: response?.data?.success ? response?.data?.data : listComment
                    }
                })
            }

        }
    }
    const handleSendMessage = data => {
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
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
            type: 'SET_DETAIL_LIVESTREAM',
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
            type: 'SET_DETAIL_LIVESTREAM',
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
    const comment = state.detail.liveStream
    const displayList = comment.listOrigin
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
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                listSelected: newSelectedList, totalSelected: newSelectedList?.length
            }
        })
    }

    const rowCheckboxChange = (data, selected) =>
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                listSelected: selected
                    ? selectedList.filter(item => item?.comment_id !== data?.comment_id)
                    : [...selectedList, data]
            },
        })

    const copyComment = (snippet) => {
        navigator.clipboard.writeText(snippet)
        showAlert({content: 'Đã sao chép nội dung phản hồi', type: 'success'})
    }

    const handleReplyComment = (item) => {
        dispatch({
            type: 'SET_INPUT_TYPING',
            payload: {
                comment: item,
                commentType: 'reply',
                value: ''
            }
        })
    }

    const handleEditComment = (item) => {
        dispatch({
            type: 'SET_INPUT_TYPING',
            payload: {
                comment: item,
                commentType: 'update',
                value: item?.snippet ? JSON.parse(item?.snippet) : ''
            }
        })
    }

    const copyListComment = _ => {
        let snippet = ''
        detail.liveStream.listSelected.map(
            item => {
                snippet += !!item.snippet ? JSON.parse(item.snippet) + '\n' : ''
            }
        )
        navigator.clipboard.writeText(snippet)
        showAlert({content: 'Đã sao chép bình luận', type: 'success'})
    }

    const handleDeleteCommentConfirm = (comment = {}) => {
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                confirm: {
                    ...detail.liveStream.confirm,
                    delete: comment
                }
            }
        })
    }

    const handleDeleteComment = async (comment) => {
        dispatch({
            type: 'SET_DETAIL_LIVESTREAM',
            payload: {
                confirm: {
                    ...detail.liveStream.confirm,
                    delete: {}
                },
            }
        })
        dispatch({
            type: 'SET_LOADING',
            payload: true
        })
        const data = {
            'page_id': detail.liveStream?.detailPost?.page_id,
            'post_id': detail.liveStream?.detailPost?.post_id,
            'from': comment?.from || detail.liveStream?.customer?.from,
            'comment_id': comment.comment_id
        }
        const response = await sendRequestAuth('post',

            `${config.API}/fb/fanpage/comment-user/delete`,
            data
        )
        if (!!response?.data?.success) {
            let newComments = []
            if (!!comment?.parent) {
                newComments = detail.liveStream.list.map(item => {
                    if (item.comment_id == comment?.parent) {
                        const newReply = item?.reply.filter(reply => reply.comment_id != data.comment_id)
                        item.reply = newReply
                    }
                    return item
                })
            } else newComments = detail.liveStream.list.filter(item => item.comment_id != data.comment_id)
            dispatch({
                type: 'SET_DETAIL_LIVESTREAM',
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
        detail.liveStream.listSelected.map(
            item => {
                comment = [...comment, item.comment_id]
            }
        )

        const data = {
            'stream_id': detail.liveStream.customer?.stream_id,
            'sender_id': detail.liveStream.customer?.sender_id,
            'group_person': detail.liveStream.isGroupPerson,
            'comment_id': comment
        }
        const isRead = liveStream.display.list.map(item => {
           const test =  data?.comment_id.find(filter => filter === item.comment_id)
            if (!!test) {
                item.is_read = 2
            }
            return item
        })

        const response = await sendRequestAuth(
          'post',
          `${config.API}/fb/livestream/print`,
          data
        )

        if (response?.data?.success) {
          // in
          dispatch({
            type: 'UPDATE_LIVESTREAM',
            payload: {
              list:isRead
            }
          })
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
            await sendRequestAuth('post',
                `${config.API}/fb/action/read`,
                {
                    is_livestream: 1,
                    code: data?.comment_id
                }
            )
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
        const script = replaceAllCustom(data?.message, '{{name}}', ` ${detail.liveStream?.customer?.name} `)
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
        dispatch({
            type: 'SET_MEDIA_MESSAGE',
            payload: {
                images: [...images, ...listImage],
                imageTemp: [...imageTemp, ...listImage],
                typeValue: message?.media?.typeValue
            }
        })
        dispatch({
            type: 'SET_MEDIA_MESSAGE',
            payload: {
                type: [...images, ...listImage].length > 0
            }
        })
    }
    const handleSetTypeMedia = (boo, val) => {
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
            if (count + imageTemp.length > 10) {
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
            payload: message?.value + ` ${detail.liveStream?.customer?.sender_name} `
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
        if ((keyCode === 13 && !e.shiftKey) || e?.type == 'click') {
            e.returnValue = false
            if (e.preventDefault) e.preventDefault()
            if (!!message.value || imageFiles.length > 0) {
                handleCloseMessageModal()
                dispatch({
                    type: 'SET_LOADING_MESSAGE',
                    payload: true
                })
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
                commentType: '',
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
            'is_livestream': 1,
            'page_id': detail.liveStream.customer?.page_id,
            'code': detail.liveStream.list[0]?.comment_id,
            'recipient_id': detail.liveStream?.customer?.sender_id,
            'text': message.value,
            'attachment': image.length > 0 ? (message?.media?.type ? image : detail.liveStream.detailPost?.image) : (message?.media?.type && message?.media?.typeValue == 2 ? [liveStream?.detail?.thumbnails] : [])
        }
        data.attachment = data.attachment.slice(0,10)
        const response = await sendRequestAuth(
            'post',
            `${config.API}/${url}`,
            data
        )
        dispatch({
            type: 'SET_LOADING_MESSAGE',
            payload: true
        })
        if (response?.data?.success) {
            showAlert({
                content: 'Gửi tin nhắn thành công',
                duration: 2000,
                type: 'success'
            })
            handleCloseMessageModal()
            dispatch({
                type: 'SET_LOADING_MESSAGE',
                payload: false
            })
            //clear state typing
        } else {
            const message_errors = response?.data?.errors.code == 4117 ? 'Không thể gửi tin nhắn. Lỗi: Tin nhắn này được gửi ngoài khoảng thời gian cho phép.' : response?.data?.errors?.message
            showAlert({
                content: message_errors,
                duration: 2000,
                type: 'danger'
            })
            dispatch({
                type: 'SET_LOADING_MESSAGE',
                payload: false
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
    }

    return {
        data: state,
        methods: {
            getListFanpage,
            getListConversation,
            handleConversation,
            getListTags,
            getListPost,
            handleGetDetailComment,
            handleRightSide,
            loadMoreDetail,
            handleStarStatusConversation,
            handleCreateFastOrder,
            onCheckboxChange: rowCheckboxChange,
            handleTabActive,
            handleGetGroupCommentPerson: handleGetDetailCommentGroupPerson,
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

export default useFacebookDetailComment
