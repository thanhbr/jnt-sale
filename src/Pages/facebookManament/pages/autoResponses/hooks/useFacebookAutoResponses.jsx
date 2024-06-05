import {useContext} from 'react'
import {FacebookAutoResponsesContext} from '../provider/_context'
import {sendRequestAuth} from '../../../../../api/api'
import config from '../../../../../config'
import useGlobalContext from '../../../../../containerContext/storeContext'
import useAlert from '../../../../../hook/useAlert'
import ArrayUtils from '../../../../orderSingle/utils/array'

const useFacebookAutoResponses = () => {

   const [GlobalState] = useGlobalContext()
   const {auth} = GlobalState.facebookAuth
   const {state, dispatch} = useContext(FacebookAutoResponsesContext)
   const {showAlert} = useAlert()

   // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
   // FACEBOOK HIDE COMMENT

   const getListAutoResponse = async () => {
      const response = await sendRequestAuth('get',
         `${config.API}/fb/setting/reply-script/${auth.userId}/list?keyword&page_id=&status=&per_page=10&start=0`
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
               loading: false
            },
         })
      }
   }

   //scroll down to bottom call list auto response
    const handleScrollDown = async _=>{
       const currentTotal = state?.table?.display?.updateList.length
        const totalItem = state?.table?.display?.pagination?.totalItems
        const updateList = state?.table?.display?.updateList
        const list = state?.table?.display?.list
       if(currentTotal < totalItem){
           const start = +state?.table?.display?.pagination?.active*10
           const response = await sendRequestAuth('get',
               `${config.API}/fb/setting/reply-script/${auth.userId}/list?keyword&page_id=&status=&per_page=10&start=${start}`
           )
           if (!!response?.data?.success && Array.isArray(response?.data?.data)) {
               dispatch({
                   type: 'UPDATE_TABLE',
                   payload: {
                       display: {
                           updateList: start == 0
                               ? response.data.data
                               : [...updateList, ...response.data.data],
                           list: start == 0
                               ? response.data.data
                               : [...list, ...response.data.data],
                       },
                       pagination: {
                           totalItems: response?.data?.data?.totals || 0
                       },
                       loading: false
                   },
               })
           }
       }

    }



   const getListPage = async () => {
      const response = await sendRequestAuth('get',
         `${config.API}/fb/pages/${auth.userId}/connected`
      )
      if (!!response?.data?.success) {
         dispatch({
            type: 'SET_PAGE',
            payload: {
               pageSelected: response?.data?.data
            },
         })
      }
   }
   // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====

   const handleStatusConfirm = async (data = {}) => {
      if (data?.status == 1) {
         dispatch({
            type: 'SET_CONFIRM_MODAL',
            payload: {
               disable: data?.id
            }
         })
      }
      if (data?.status == 0) {
         const idPost = (data?.post_ids?.length > 0 && data?.post_ids !== 'null') ? JSON.parse(data?.post_ids).toString() : ''
         const response = await sendRequestAuth('get',
            `${config.API}/fb/setting/reply-script/check?id=${data?.id || ''}&page_id=${data?.page_id || ''}&post_type=${data?.post_type || ''}&arr_post_id=${idPost}`
         )
         if (!!response?.data?.success) {
           const response = await sendRequestAuth('post',
              `${config.API}/fb/setting/reply-script/active`,
              {
                id: [data?.id],
                status: 1,
              }
           )
           if (!!response?.data?.success) {
             getListAutoResponse()
             showAlert({
               content: 'Kích hoạt kịch bản phản hồi tự động thành công',
               type: 'success',
               duration: 2000
             })
           }else{
             showAlert({
               content: 'Kích hoạt kịch bản phản hồi tự động thất bại',
               type: 'danger',
               duration: 2000
             })
           }
         } else {
            dispatch({
               type: 'SET_CONFIRM_MODAL',
               payload: {
                  enable: {
                     status: data?.id,
                     data: {
                        message: response?.data?.errors[0]?.message,
                        activeScript: data?.script_name,
                        script: response?.data?.errors[0]?.script_name || '',
                        idScript: response?.data?.errors[0]?.script_id || ''
                     }
                  }
               }
            })
         }

      }
   }

   const handleCloseDisableConfirm = () => {
      dispatch({
         type: 'SET_CONFIRM_MODAL',
         payload: {
            disable: ''
         }
      })

   }

   const handleCloseEnableConfirm = () => {
      dispatch({
         type: 'SET_CONFIRM_MODAL',
         payload: {
            enable: {
               status: '',
               value: {}
            }
         }
      })

   }

   const handleDeleteConfirm = (id = '') => {
      dispatch({
         type: 'SET_CONFIRM_MODAL',
         payload: {
            delete: id
         }
      })
   }

   const handleDeleteAutoResponse = async () => {

      dispatch({
         type: 'SET_LOADING',
         payload: true
      })
      const response = await sendRequestAuth('delete',

         `${config.API}/fb/setting/reply-script/delete/${state?.confirm?.delete}`
      )
      if (!!response?.data?.success) {
         dispatch({
            type: 'SET_CONFIRM_MODAL',
            payload: {
               delete: ''
            }
         })
        showAlert({
          content: 'Đã xoá kịch bản phản hồi tự động thành công',
          type: 'success',
          duration: 2000
        })
         getListAutoResponse()
      }else{

        showAlert({
          content: 'Đã xoá kịch bản phản hồi tự động thất bại',
          type: 'danger',
          duration: 2000
        })
      }

      setTimeout(() => {
         dispatch({
            type: 'SET_LOADING',
            payload: false
         })
      }, 500)
   }

   const handleDisableAutoScript = async () => {

      const response = await sendRequestAuth('post',
         `${config.API}/fb/setting/reply-script/active`,
         {
            id: [state?.confirm?.disable],
            status: 0,
         }
      )
      if (!!response?.data?.success) {
         dispatch({
            type: 'SET_CONFIRM_MODAL',
            payload: {
               disable: ''
            }
         })
         getListAutoResponse()
        showAlert({
          content: 'Ngưng sử dụng kịch bản phản hồi tự động thành công',
          type: 'success',
          duration: 2000
        })
      }else{
        showAlert({
          content: 'Ngưng sử dụng kịch bản phản hồi tự động thất bại',
          type: 'danger',
          duration: 2000
        })
      }
   }

   const handleEnableAutoScript = async () => {

      const response = await sendRequestAuth('post',
         `${config.API}/fb/setting/reply-script/active`,
         {
            id: [state?.confirm?.enable?.status],
            status: 1,
         }
      )
      if (!!response?.data?.success) {
         dispatch({
            type: 'SET_CONFIRM_MODAL',
            payload: {
               enable: {
                  status: '',
                  data: {}
               }
            }
         })
         getListAutoResponse()
        showAlert({
          content: 'Kích hoạt kịch bản phản hồi tự động thành công',
          type: 'success',
          duration: 2000
        })
      }else{
        showAlert({
          content: 'Kích hoạt kịch bản phản hồi tự động thất bại',
          type: 'danger',
          duration: 2000
        })
      }
   }

   return {
      data: state,
      methods: {
         listOrigin: getListAutoResponse,
         listPage: getListPage,
         onClickDeleteConfirm: handleDeleteConfirm,
         onClickStatusConfirm: handleStatusConfirm,
         onCloseDisableConfirm: handleCloseDisableConfirm,
         onCloseEnableConfirm: handleCloseEnableConfirm,
         onDisableAutoScript: handleDisableAutoScript,
         onEnableAutoScript: handleEnableAutoScript,
         onDeleteAutoResponse: handleDeleteAutoResponse,
          onSroll: handleScrollDown,
      },
   }
}

export default useFacebookAutoResponses
