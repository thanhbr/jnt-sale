import {sendRequestAuth} from 'api/api'
import {transformQueryObjToString} from 'Component/surveyLogin/utils/transform'
import config from 'config'
import useAlert from 'hook/useAlert'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import { useCallback, useContext } from 'react'
import {facebookResponseContentScriptActions as actions} from '../provider/_actions'
import {FacebookResponseContentScriptContext} from '../provider/_context'
import { debounce } from '@mui/material'

const useFacebookResponseContentScript = () => {
  const {showAlert} = useAlert()

  const {state, dispatch} = useContext(FacebookResponseContentScriptContext)

  // =======================================================================
  // TABLE
  // =======================================================================
  const scriptQueries = {keyword: ''}


  const debounceSearchContentScript = useCallback(
    debounce((keyword,opt) => {
      getScripts({queries: {keyword: keyword ? keyword.trim() : ''}, origin: true ,...opt})
    }, 500),
    [],
  )

  const handleSearchChange = (keyword, opt) => {
    dispatch({type: actions.FILTER_KEYWORD_UPDATE, payload: {keyword}})
    debounceSearchContentScript(keyword ? keyword.trim() : '',opt)
  }

  const getScripts = async opt => {
    if (state.script.loading && !opt?.origin) return

    if (!opt?.notLoading)
      dispatch({type: actions.SCRIPT_LOADING_UPDATE, payload: {loading: true}})

    const q = transformQueryObjToString({...scriptQueries, ...opt?.queries})

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
        type: actions.SCRIPT_LIST_UPDATE,
        payload: {list: scriptList},
      })
    }

    if (!opt?.notLoading)
      setTimeout(
        () =>
          dispatch({
            type: actions.SCRIPT_LOADING_UPDATE,
            payload: {loading: false},
          }),
        500,
      )
  }

  const handleConfirmDeleteModalUpdate = data =>
    dispatch({type: actions.MODAL_CONFIRM_DELETE_UPDATE, payload: {data}})

  const handleRowDelete = async id => {
    dispatch({
      type: actions.MODAL_CONFIRM_DELETE_LOADING_TOGGLE,
      payload: {loading: true},
    })
    const response = await sendRequestAuth(
      'delete',
      `${config.API}/fb/setting/sample-message/delete/${id}`,
    )

    if (response?.data?.success) {
      showAlert({
        type: 'success',
        content: 'Xóa mẫu nội dung phản hồi thành công',
      })
      handleConfirmDeleteModalUpdate(null)
      getScripts({notLoading: true})
    } else
      showAlert({
        type: 'danger',
        content: 'Xóa mẫu nội dung phản hồi thất bại',
      })

    dispatch({
      type: actions.MODAL_CONFIRM_DELETE_LOADING_TOGGLE,
      payload: {loading: false},
    })
  }

  const handleRowPositionUpdate = async arr => {
    const wrapper = document.querySelector('#content-wrap')
    if (wrapper) wrapper.scrollTo({top: 0, behavior: 'smooth'})

    const submitData = arr.map((item, i) => ({id: item.id, position: i}))

    await sendRequestAuth(
      'post',
      `${config.API}/fb/setting/sample-message/position`,
      JSON.stringify(submitData),
    )
  }

  // =======================================================================
  // DETAIL
  // =======================================================================
  const handleDetailChange = data =>
    data?.type
      ? dispatch({
          type: actions.DETAIL_UPDATE,
          payload: {type: data.type, detailData: data?.data},
        })
      : dispatch({type: actions.DETAIL_RESET})

  const handleDetailConfirmToggle = boo =>
    dispatch({
      type: actions.DETAIL_CONFIRM_UPDATE,
      payload: {confirm: boo},
    })

  const handleDetailLoadingToggle = boo =>
    dispatch({
      type: actions.DETAIL_LOADING_UPDATE,
      payload: {loading: boo},
    })

  const handleDetailModifiledToggle = boo =>
    dispatch({
      type: actions.DETAIL_MODIFILED_UPDATE,
      payload: {modifiled: boo},
    })

  return {
    data: state,
    methods: {
      // table
      handleSearchChange,
      getScripts,
      handleConfirmDeleteModalUpdate,
      handleRowDelete,
      handleRowPositionUpdate,
      // detail
      handleDetailChange,
      handleDetailConfirmToggle,
      handleDetailLoadingToggle,
      handleDetailModifiledToggle,
    },
  }
}

export default useFacebookResponseContentScript
