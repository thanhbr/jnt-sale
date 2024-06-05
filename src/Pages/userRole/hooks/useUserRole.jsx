import {useReducer} from "react";
import {userRoleActions, userRoleInitialState, userRoleReducer} from "../provider/~reducer";
import {deleteData, postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {useLocation, useNavigate} from "react-router-dom";
const useUserRole = () => {
  const [state, dispatch] = useReducer(userRoleReducer, userRoleInitialState)
  const navigate = useNavigate()
  const location = useLocation()

  const nameRole = state.formCreateRole.name.value
  const noteRole = state.formCreateRole.note.value
  const errorName = state.validate.name

  const handleUserRole = async () => {

    const idRole = location.pathname.split('/')[3]
    // CREATE USER ROLE
    if(location.pathname.split('/')[2] === 'create' && !!!idRole) {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/features`),
      ])
      if(response[0]?.data?.success) {
        let listRole = response[0]?.data?.data
        transformData(listRole)

        dispatch({ type: userRoleActions.LIST_PERMISSION, payload: listRole })
        dispatch({ type: userRoleActions.LIST_FEATURES, payload: listRole[0]?.features })
        dispatch({ type: userRoleActions.LIST_FEATURE_ACTIONS, payload: [listRole[0]?.features[0]] })
      }
    }
    // UPDATE USER ROLE
    else {
      const response = await Promise.all([
        sendRequestAuth('get', `${config.API}/admin/features`),
        sendRequestAuth('get', `${config.API}/admin/employee/group/detail/${idRole}`),
      ])
      if(response[0]?.data?.success) {
        // console.log('list', response[0]?.data.data)
        // console.log('active', response[1]?.data.data)

        let listRole = response[0]?.data?.data
        let checkAll = true
        transformData(listRole)
        const roleActive = response[1]?.data?.data
        if(roleActive.permission.length === 0) checkAll = false
        roleActive.permission.map(role => {
          let ddd = []
          listRole.map(feat => {
            if(!!(feat.features.find(ft => ft.feature_code === role.feature_code))) {
              ddd = feat.features.find(ft => ft.feature_code === role.feature_code)
              // console.log('ddd', ddd)
              // console.log('role', role)
              ddd.feature_actions.map(act => {
                let activeChange = act
                if(role.actions_permission.length === 0) checkAll = false
                Object.keys(role.actions_permission).map(key => {
                  if(act.code === key) {
                    activeChange.active = role.actions_permission[key] === '1'
                    if(!activeChange.active || !!!activeChange.active) checkAll = false
                  }
                })
              })
            }
          })
        })

        if(checkAll) dispatch({ type: userRoleActions.SET_ACTIVE_CHECK_ALL_PER, payload: true })

        dispatch({ type: userRoleActions.UPDATE_FORM_CREATE_NAME, payload: { value: response[1]?.data?.data?.group_name }})
        dispatch({ type: userRoleActions.UPDATE_FORM_CREATE_NOTE, payload: { value: response[1]?.data?.data?.group_comment }})
        dispatch({ type: userRoleActions.LIST_PERMISSION, payload: listRole })
        dispatch({ type: userRoleActions.LIST_FEATURES, payload: listRole[0]?.features })
        dispatch({ type: userRoleActions.LIST_FEATURE_ACTIONS, payload: [listRole[0]?.features[0]] })
      }
    }
  }

  const transformData = listRole => {
    return listRole.map(item => {
      if(item.module_code === "partner") item.module_name = "Quản lý đối tác"
      if(item.module_code === "order") {
        item.features.map(it => {
          if(it.feature_code === "order") it.feature_name = "Quản lý đơn hàng"
        })
      }
    })
  }

  const handleUserRoleList = async () => {
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups`),
    ])
    if(response[0]?.data?.success) {
      dispatch({ type: userRoleActions.USER_ROLE_LIST, payload: response[0]?.data.data })
      dispatch({type: userRoleActions.SET_PAGINATION, payload: {
          active: 0,
          amount: 20,
          total: Math.ceil(response[0]?.data?.meta?.total / 20),
          totalItems: response[0]?.data?.meta?.total,
        }})
    }
  }

  const handleClickItemAction = (feat, ac) => {
    dispatch({ type: userRoleActions.CHANGE_FORM_CREATE, payload: true})
    if(!state.activeCheckAllPer) {
      const listFeatures = state.listFeatures.map(item => {
        if(ac.code === 'view' && ac.active && item.feature_code === feat.feature_code) {
          item.feature_actions.map(it => {
            it.active = false
          })
        } else if(ac.code !== 'view' && !!!ac.active && item.feature_code === feat.feature_code) {
          item.feature_actions.map(it => {
            if((it.code === 'view' || it.code === 'detail')) {
              it.active = true
            } else if(ac.code === it.code && !it.active) {
              it.active = true
            } else if(ac.code === it.code && it.active) {
              it.active = false
            }
          })
        } else if(item.feature_code === feat.feature_code) {
          item.feature_actions.map(it => {
            if(ac.code === it.code && !it.active) {
              it.active = true
            } else if(ac.code === it.code && it.active) {
              it.active = false
            }
          })
        }
        return item
      })
      dispatch({type: userRoleActions.LIST_FEATURES, payload: listFeatures})
    }
  }

  const checkboxItemGroup = feat => {
    const checked = feat.feature_actions.filter(item => item.active)
    return checked.length > 0
  }

  const checkboxItemGroupAll = feat => {
    const checkAll = feat.feature_actions.find(item => !item.active)
    return !!!checkAll
  }

  const checkboxItemAction = (act, ac) => {
    const checked = act.feature_actions.find(item => item.code === ac.code)
    return checked.active
  }

  const handleClickCheckAllItem = feat => {
    const checkAll =  feat.feature_actions.filter(item => item.active)
    const listFeatures = state.listFeatures.map(item => {
      if(item.feature_code === feat.feature_code) {
        item.feature_actions.map(it => {
          it.active = checkAll.length === 0
        })
      }
      return item
    })
    dispatch({type: userRoleActions.LIST_FEATURES, payload: listFeatures})
    dispatch({ type: userRoleActions.CHANGE_FORM_CREATE, payload: true})
  }

  const handleShowDetailRow = feat => {
    // if(!state.activeCheckAllPer) {
    let listActions
    if(!!!state.featureActions.find(it => it.feature_code === feat.feature_code)) {
      listActions = [...state.featureActions, feat]
    } else {
      listActions = state.featureActions.filter(item => item.feature_code !== feat.feature_code)
    }
    dispatch({ type: userRoleActions.LIST_FEATURE_ACTIONS, payload: listActions })
    // }
  }

  const handleClickSidebarRole = item => {
    dispatch({ type: userRoleActions.SET_ACTIVE_SIDE_BAR, payload: item.module_id })
    dispatch({ type: userRoleActions.LIST_FEATURES, payload: item.features })
    dispatch({ type: userRoleActions.LIST_FEATURE_ACTIONS, payload: item.features })
  }

  const listSubHeader = feat => {
    return feat.feature_actions.filter(item =>  item.active)
  }

  const showTick = item => {
    let checkTick = false
    item.features.map(feat => {
      if(feat.feature_actions.find(it => it.active)) checkTick = true
    })
    return checkTick
  }

  const handleClickAllPermission = () => {
    dispatch({ type: userRoleActions.CHANGE_FORM_CREATE, payload: true})
    if(state.activeCheckAllPer) {
      const list = state.listPermission.map(item => {
        item.features.map(feat => {
          feat.feature_actions.map(act => {
            act.active = false
          })
        })
        return item
      })
      dispatch({ type: userRoleActions.SET_ACTIVE_CHECK_ALL_PER, payload: false })
      dispatch({ type: userRoleActions.LIST_PERMISSION, payload: list })
    } else {
      const list = state.listPermission.map(item => {
        item.features.map(feat => {
          feat.feature_actions.map(act => {
            act.active = true
          })
        })
        return item
      })
      dispatch({ type: userRoleActions.SET_ACTIVE_CHECK_ALL_PER, payload: true })
      dispatch({ type: userRoleActions.LIST_PERMISSION, payload: list })
    }
  }

  const handleChangeName = name => {
    dispatch({ type: userRoleActions.UPDATE_FORM_CREATE_NAME, payload: { value: name }})
    dispatch({ type: userRoleActions.CHANGE_FORM_CREATE, payload: true})

    if(!!name) {
      dispatch({ type: userRoleActions.VALIDATE_FORM_CREATE_NAME, payload: { status: false, message: '' }})
    }
  }

  const handleChangeNote = note => {
    dispatch({ type: userRoleActions.UPDATE_FORM_CREATE_NOTE, payload: { value: note }})
    dispatch({ type: userRoleActions.CHANGE_FORM_CREATE, payload: true})
  }

  const handleSubmitUserRole = () => {
    if(!!!nameRole) {
      dispatch({ type: userRoleActions.VALIDATE_FORM_CREATE_NAME, payload: { status: true, message: 'Tên vai trò không được để trống!' }})
      return
    }

    let result = []
    state.listPermission.map(item => {
      item.features.map(feat => {
        let obj = {}
        feat.feature_actions.map(act => {
          obj[act.code] = act.active ? '1' : '0'
        })
        result[result.length] =  {
          "module_id": item.module_id,
          "feature_code": feat.feature_code,
          "feature_actions": obj
        }
      })
      return result
    })


    const idRole = location.pathname.split('/')[3]
    // CREATE USER ROLE
    if(location.pathname.split('/')[2] === 'create' && !!!idRole) {
      const url = `${config.API}/admin/group/create`
      const dataPost = JSON.stringify({
        "group_name": nameRole,
        "group_comment": noteRole,
        "permission": result
      })
      postData(url, dataPost)
        .then(res => {
          if (res?.data && res?.data?.success) {
            toast.success(res?.data?.message)
            navigate('/user-role')
          } else {
            toast.error('Thêm mới vai trò thất bại!')
          }
        })
    }
    // UPDATE USER ROLE
    else {
      const url = `${config.API}/admin/group/update/${idRole}`
      const dataPost = JSON.stringify({
        "group_name": nameRole,
        "group_comment": noteRole,
        "permission": result
      })
      postData(url, dataPost)
        .then(res => {
          if (res?.data && res?.data?.success) {
            toast.success('Cập nhật vai trò người dùng thành công.')
            navigate('/user-role')
          } else {
            toast.error('Cập nhật vai trò người dùng thất bại!')
          }
        })
    }

  }

  const handleBlurName = () => {
    if(!!!nameRole) {
      dispatch({ type: userRoleActions.VALIDATE_FORM_CREATE_NAME, payload: { status: true, message: 'Tên vai trò không được để trống!' }})
    } else {
      dispatch({ type: userRoleActions.VALIDATE_FORM_CREATE_NAME, payload: { status: false, message: '' }})
    }
  }

  const backToList = () => {
    if(!state.changeFormCreate) {
      navigate('/user-role')
    } else {
      dispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM, payload: true})
    }
  }

  const closeModalRoleConfirm = () => dispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM, payload: false})

  const acceptanceModalRoleConfirm = () => {
    dispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM, payload: false})
    navigate('/user-role')
  }

  const closeModalRoleConfirmDelete = () => dispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM_DELETE, payload: false})

  const acceptanceModalRoleConfirmDelete = () => {
    dispatch({ type: userRoleActions.OPEN_MODAL_CONFIRM_DELETE, payload: false})
    const data = state.userRoleBeforeDelete
    const url = `${config.API}/admin/group/delete/${data.id}`
    deleteData(url)
      .then(response => {
        if(response?.data?.success) {
          toast.success(response?.data?.errors?.message)

          // LOAD PAGE
          const fetch = async () => {
            const response = await Promise.all([
              sendRequestAuth('get', `${config.API}/admin/employee/groups`),
            ])
            if(response[0]?.data?.success) {
              dispatch({ type: userRoleActions.USER_ROLE_LIST, payload: response[0]?.data.data })
              dispatch({type: userRoleActions.SET_PAGINATION, payload: {
                  active: state.paginate.active,
                  amount: state.paginate.amount,
                  total: Math.ceil(response[0]?.data?.data.length / state.paginate.amount),
                  totalItems: response[0]?.data?.data.length,
                }})
            }
          }
          fetch()
        }
      })
  }

  const handlePaginationAmountChange = async amount => {
    dispatch({type: userRoleActions.SET_LOADING, payload: true })
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=${amount}&start=0`),
    ])
    if (response[0]?.data?.success) {
      dispatch({type: userRoleActions.SET_LOADING, payload: false })
      dispatch({type: userRoleActions.USER_ROLE_LIST, payload: response[0]?.data?.data})
      dispatch({type: userRoleActions.SET_PAGINATION, payload: {
          active: 0,
          amount: amount,
          total: Math.ceil(response[0]?.data?.meta?.total / amount),
          totalItems: response[0]?.data?.meta?.total,
        }})
    }
  }

  const handlePaginationPageChange = async page => {
    dispatch({type: userRoleActions.SET_LOADING, payload: true })
    const amount = state?.paginate?.amount || 20
    const response = await Promise.all([
      sendRequestAuth('get', `${config.API}/admin/employee/groups?per_page=${amount}&start=${page*amount}`),
    ])
    if (response[0]?.data?.success) {
      dispatch({type: userRoleActions.SET_LOADING, payload: false })
      dispatch({type: userRoleActions.USER_ROLE_LIST, payload: response[0]?.data?.data})
      dispatch({type: userRoleActions.SET_PAGINATION, payload: {
          active: page,
          amount: amount,
          total: Math.ceil(response[0]?.data?.meta?.total / amount),
          totalItems: response[0]?.data?.meta?.total,
        }
      })
    }
  }

  return {
    provider: {state, dispatch},
    fetch: {
      userRole: handleUserRole,
      userRoleList: handleUserRoleList,
    },
    functions: {
      handleClickItemAction,
      handleClickCheckAllItem,
      handleShowDetailRow,
      handleClickSidebarRole,
      handleClickAllPermission,
      handleChangeName,
      handleChangeNote,
      handleSubmitUserRole,
      backToList,
      closeModalRoleConfirm,
      acceptanceModalRoleConfirm,
      closeModalRoleConfirmDelete,
      acceptanceModalRoleConfirmDelete,
    },
    value: {
      checkboxItemGroupAll,
      checkboxItemGroup,
      checkboxItemAction,
      listSubHeader,
      showTick,
      nameRole,
      noteRole,
    },
    validate: {
      handleBlurName,
      errorName
    },
    handlePaginationAmountChange,
    handlePaginationPageChange
  }
}

export default useUserRole;