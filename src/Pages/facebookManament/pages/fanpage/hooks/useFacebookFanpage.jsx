import {sendRequestAuth} from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import useFacebookAuth from 'Pages/facebookManament/hooks/useFacebookAuth'
import FacebookService from 'Pages/facebookManament/services'
import ArrayUtils from 'Pages/facebookManament/utils/array'
import {useContext} from 'react'
import {facebookFanpageActions as actions} from '../provider/_actions'
import {FacebookFanpageContext} from '../provider/_context'
import {facebookFanPageInitialState} from '../provider/_initstate'
import useGlobalContext from "../../../../../containerContext/storeContext";

const useFacebookFanpage = () => {
  const {showAlert} = useAlert()

  const [GlobalState,GlobalDispatch] = useGlobalContext()

  const {facebookAuth} = useFacebookAuth()
  const {auth} = facebookAuth

  const {state, dispatch} = useContext(FacebookFanpageContext)
  const {fanpage} = state

  const setModal = (id, opt) =>
    dispatch({type: actions.MODAL_ID_UPDATE, payload: {id, opt}})

  const setLoading = boo =>
    dispatch({
      type: actions.SET_LOADING,
      payload: boo,
    })
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // FACEBOOK
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const getFanpages = async opt => {
    if (auth.userId) {
      const response = await sendRequestAuth(
        'get',
        `${config.API}/fb/pages/${auth.userId}`,
      )

      if (response?.data?.success) {
        const connectedList = ArrayUtils.getQualifiedArray(
          response?.data?.data?.connected,
        ).map(item => ({...item, connected: true}))
        const disconnectedList = ArrayUtils.getQualifiedArray(
          response?.data?.data?.unconnected,
        ).map(item => ({...item, connected: false}))

        dispatch({
          type: actions.FANPAGE_LIST_UPDATE,
          payload: {
            list: [...connectedList, ...disconnectedList],
            maxConnection: Number(response?.data?.meta?.max_connect || 0),
          },
        })

        if (opt?.connected === true)
          dispatch({
            type: actions.FILTER_CONNECTED_TOGGLE,
            payload: {connected: true},
          })
        else if (opt?.connected === false)
          dispatch({
            type: actions.FILTER_CONNECTED_TOGGLE,
            payload: {connected: false},
          })
        else if (connectedList.length <= 0)
          dispatch({
            type: actions.FILTER_CONNECTED_TOGGLE,
            payload: {connected: false},
          })
        dispatch({
          type: actions.SET_LOADING,
          payload: false,
        })
      }

      return response
    }
  }

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // FILTER
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const connectedList = fanpage.list.filter(item => !!item?.connected)
  const disconnectedList = fanpage.list.filter(item => !item?.connected)
  const selectedConnectedList = fanpage.selected.filter(
    item => !!item?.connected,
  )
  const selectedDisconnectedList = fanpage.selected.filter(
    item => !item?.connected,
  )
  const warningSelectedDisconnectedList = selectedDisconnectedList.filter(
    item => item?.status === '1',
  )

  const canMultipleConnect = selectedDisconnectedList.length > 0 || GlobalState.facebook.fanpage.length > 0
  const canMultipleDisconnect = selectedConnectedList.length > 0 || GlobalState.facebook.fanpage.length > 0
  const isExistedConnectedFanpage = connectedList.length > 0
  const isExistedDisconnectedFanpage = disconnectedList.length > 0

  const toggleFilterConnected = boo =>
    dispatch({
      type: actions.FILTER_CONNECTED_TOGGLE,
      payload: {connected: !!boo},
    })

  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  // OTHERS
  // ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== ===== =====
  const canSelectDisconnectedFanpage =
    connectedList.length + selectedDisconnectedList.length <
    fanpage.maxConnection

  const handleAskPermissionSelect = opt => {
    const find = fanpage.selected.find(item => !item?.manage_permission)
    if (find) {
      setModal('permissionSelect', {onSubmit: opt?.onSubmit})
      return true
    }

    return false
  }

  const handleCheckExistPermission = opt => {
    const find = fanpage.list.find(item => item?.manage_permission)
    return !!find
  }

  const handleConnectFanpages = async opt => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/page/connect`,
      JSON.stringify({
        pages: selectedDisconnectedList.map(item => item?.page_id).join(','),
      }),
    )

    if (response?.data?.success) {
      showAlert({type: 'success', content: 'Kết nối trang thành công'})

      unselectAllFanpages()

      if (opt?.callback) opt.callback()

      getFanpages({connected: true})
    } else {
      showAlert({type: 'danger', content: 'Kết nối trang thất bại'})
      if (opt?.callback) opt.callback()
    }
  }

  const connectFanpages = async opt => {
    setTimeout(() => {
      handleConnectFanpages(opt)
    }, 1000)
  }

  const disconnectFanpages = async opt => {
    const response = await sendRequestAuth(
      'post',
      `${config.API}/fb/page/disconnect`,
      JSON.stringify({
        pages: selectedConnectedList.map(item => item?.page_id).join(','),
      }),
    )

    if (response?.data?.success) {
      showAlert({type: 'success', content: 'Ngắt kết nối trang thành công'})

      unselectAllFanpages()

      const res = getFanpages({connected: true})
      if (res?.data?.success) {
        if (opt?.callback) opt.callback()
      } else {
        if (opt?.callback) opt.callback()
      }
    } else {
      showAlert({type: 'danger', content: 'Ngắt kết nối trang thất bại'})
      if (opt?.callback) opt.callback()
    }
  }

  const toggleSelectedFanpage = data => {
    const isExisted = GlobalState.facebook.fanpage.find(
      item => data?.page_id && item?.page_id === data.page_id,
    )
    
    handleSelectedFanpages(data, {isExisted})
  }

  const handleSelectedFanpages = (data, opt) => {
    dispatch({
      type: actions.FANPAGE_SELECTED_UPDATE,
      payload: {
        selected: !!opt?.isExisted
          ? GlobalState.facebook.fanpage.filter(item => item?.page_id !== data?.page_id)
          : GlobalState.facebook.fanpage.length > 0 ? [...GlobalState.facebook.fanpage, data] : [...fanpage.selected, data],
      },
    })
    GlobalDispatch({
      type: 'SET_PAGE_FACEBOOK',
      payload: {
        selected: !!opt?.isExisted
          ? GlobalState.facebook.fanpage.filter(item => item?.page_id !== data?.page_id)
          : GlobalState.facebook.fanpage.length > 0 ? [...GlobalState.facebook.fanpage, data] : [...fanpage.selected, data],
      },
    })
  }

  const selectAllConnectedFanpages = () =>{
    dispatch({
      type: actions.FANPAGE_SELECTED_UPDATE,
      payload: {
        selected: [
          ...fanpage.selected.filter(item => !item?.connected),
          ...fanpage.list.filter(item => !!item?.connected),
        ],
      },
    })
    GlobalDispatch({
      type: 'SET_PAGE_FACEBOOK',
      payload: {
        selected:  [
          ...fanpage.selected.filter(item => !item?.connected),
          ...fanpage.list.filter(item => !!item?.connected),
        ],
      }
    })

  }
    

  const unselectAllConnectedFanpages = () => {
    dispatch({
      type: actions.FANPAGE_SELECTED_UPDATE,
      payload: {
        selected: fanpage.selected.filter(item => !item?.connected),
      },
    })
    GlobalDispatch({
      type: 'SET_PAGE_FACEBOOK',
      payload: {
        selected:  [],
      }
    })
  }

  const unselectAllDisconnectedFanpages = () =>
    dispatch({
      type: actions.FANPAGE_SELECTED_UPDATE,
      payload: {
        selected: fanpage.selected.filter(item => !!item?.connected),
      },
    })

  const unselectAllFanpages = () =>{
    dispatch({type: actions.FANPAGE_SELECTED_UPDATE, payload: {selected: []}})
    GlobalDispatch({ type: 'SET_PAGE_FACEBOOK',payload: {selected: []},})
  }

  return {
    data: state,
    properties: {
      // filter
      connectedList,
      selectedDisconnectedList,
      warningSelectedDisconnectedList,
      canMultipleConnect,
      canMultipleDisconnect,
      isExistedConnectedFanpage,
      isExistedDisconnectedFanpage,
      //other
      canSelectDisconnectedFanpage,
    },
    methods: {
      setModal,
      // facebook
      getFanpages,
      // filter
      toggleFilterConnected,
      // others
      connectFanpages,
      disconnectFanpages,
      toggleSelectedFanpage,
      selectAllConnectedFanpages,
      unselectAllConnectedFanpages,
      unselectAllDisconnectedFanpages,
      setLoading,
      handleAskPermissionSelect,
      handleCheckExistPermission,
    },
  }
}

export default useFacebookFanpage
