export const  userRoleActions = {
  SET_SEARCH: 'SET_SEARCH',
  SET_LOADING: 'SET_LOADING',
  SET_PAGINATION: 'SET_PAGINATION',
  LIST_PERMISSION: 'LIST_PERMISSION',
  LIST_FEATURES: 'LIST_FEATURES',
  LIST_FEATURE_ACTIONS: 'LIST_FEATURE_ACTIONS',
  SET_ACTIVE_SIDE_BAR: 'SET_ACTIVE_SIDE_BAR',
  SET_ACTIVE_CHECK_ALL_PER: 'SET_ACTIVE_CHECK_ALL_PER',
  UPDATE_FORM_CREATE_NAME: 'UPDATE_FORM_CREATE_NAME',
  UPDATE_FORM_CREATE_NOTE: 'UPDATE_FORM_CREATE_NOTE',
  VALIDATE_FORM_CREATE_NAME: 'VALIDATE_FORM_CREATE_NAME',
  VALIDATE_FORM_CREATE_NOTE: 'VALIDATE_FORM_CREATE_NOTE',
  CHANGE_FORM_CREATE: 'CHANGE_FORM_CREATE',
  OPEN_MODAL_CONFIRM: 'OPEN_MODAL_CONFIRM',
  USER_ROLE_LIST: 'USER_ROLE_LIST',
  OPEN_MODAL_CONFIRM_DELETE: 'OPEN_MODAL_CONFIRM_DELETE',
  USER_ROLE_BEFORE_DELETE: 'USER_ROLE_BEFORE_DELETE',
  DATA_EDIT_USER_ROLE: 'DATA_EDIT_USER_ROLE',
}

export const userRoleInitialState = {
  search: '',
  loading: false,
  listPermission: [],
  listFeatures: [],
  featureActions: [],
  activeSidebar: '1',
  activeCheckAllPer: false,
  formCreateRole: {
    name: {
      value: ''
    },
    note: {
      value: ''
    },
  },
  validate: {
    name: {
      status: false,
      message: ''
    },
    note: {
      status: false,
      message: ''
    },
  },
  changeFormCreate: false,
  openModalConfirm: false,
  openModalConfirmDelete: false,
  userRoleList: [],
  paginate: {
    active: 0,
    amount: 20,
    total: 0,
    totalItems: 0,
  },
  userRoleBeforeDelete: [],
  dataEditUserRole: []
}

export const userRoleReducer = (state, action) => {
  switch (action.type) {
    case userRoleActions.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case userRoleActions.LIST_PERMISSION:
      return {
        ...state,
        listPermission: action.payload,
      }
    case userRoleActions.LIST_FEATURES:
      return {
        ...state,
        listFeatures: action.payload,
      }
    case userRoleActions.LIST_FEATURE_ACTIONS:
      return {
        ...state,
        featureActions: action.payload,
      }
    case userRoleActions.SET_ACTIVE_SIDE_BAR:
      return {
        ...state,
        activeSidebar: action.payload
      }
    case userRoleActions.SET_ACTIVE_CHECK_ALL_PER:
      return {
        ...state,
        activeCheckAllPer: action.payload
      }
    case userRoleActions.UPDATE_FORM_CREATE_NAME:
      return {
        ...state,
        formCreateRole: {
          ...state.formCreateRole,
          name: {
            ...state.formCreateRole.name,
            value: action.payload?.value,
          },
        },
      }
    case userRoleActions.UPDATE_FORM_CREATE_NOTE:
      return {
        ...state,
        formCreateRole: {
          ...state.formCreateRole,
          note: {
            ...state.formCreateRole.note,
            value: action.payload?.value,
          },
        },
      }
    case userRoleActions.VALIDATE_FORM_CREATE_NAME:
      return {
        ...state,
        validate: {
          ...state.validate,
          name: {
            ...state.validate.name,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userRoleActions.VALIDATE_FORM_CREATE_NOTE:
      return {
        ...state,
        validate: {
          ...state.validate,
          note: {
            ...state.validate.note,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case userRoleActions.CHANGE_FORM_CREATE:
      return {
        ...state,
        changeFormCreate: action.payload
      }
    case userRoleActions.OPEN_MODAL_CONFIRM:
      return {
        ...state,
        openModalConfirm: action.payload
      }
    case userRoleActions.USER_ROLE_LIST:
      return {
        ...state,
        userRoleList: action.payload,
      }
    case userRoleActions.OPEN_MODAL_CONFIRM_DELETE:
      return {
        ...state,
        openModalConfirmDelete: action.payload,
      }
    case userRoleActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case userRoleActions.SET_PAGINATION:
      return {
        ...state,
        paginate: {
          ...state.paginate,
          active: action.payload?.active,
          amount: action.payload?.amount,
          total: action.payload?.total,
          totalItems: action.payload?.totalItems,
        },
      }
    case userRoleActions.USER_ROLE_BEFORE_DELETE:
      return {
        ...state,
        userRoleBeforeDelete: action.payload,
      }
    case userRoleActions.DATA_EDIT_USER_ROLE:
      return {
        ...state,
        dataEditUserRole: action.payload,
      }
    default:
      throw new Error()
  }
}