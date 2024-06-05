export const paymentMethodActions = {
  SET_SEARCH: 'SET_SEARCH',
  LIST_PAYMENT_METHOD: 'LIST_PAYMENT_METHOD',
  LIST_PAYMENT_METHOD_ACTIVE: 'LIST_PAYMENT_METHOD_ACTIVE',
  PM_ACTIVE: 'PM_ACTIVE',
  SET_PAGINATION: 'SET_PAGINATION',
  TOGGLE_ALL_CHECKBOX: 'TOGGLE_ALL_CHECKBOX',
  SET_LOADING: 'SET_LOADING',
  OPEN_MODAL_CREATE: 'OPEN_MODAL_CREATE',
  OPEN_MODAL_CONFIRM: 'OPEN_MODAL_CONFIRM',
  OPEN_MODAL_EDIT: 'OPEN_MODAL_EDIT',
  MODAL_FORM_CREATE: 'MODAL_FORM_CREATE',
  VALIDATE_MODAL_FORM_CREATE_NAME: 'VALIDATE_MODAL_FORM_CREATE_NAME',
  MODAL_FORM_EDIT: 'MODAL_FORM_EDIT',
  OPEN_MODAL_CONFIRM_DELETE: 'OPEN_MODAL_CONFIRM_DELETE',
  DATA_DELETE_ITEM: 'DATA_DELETE_ITEM',
  IS_CHECKED_STATUS: 'IS_CHECKED_STATUS',
  VALIDATE_MODAL_FORM_EDIT_NAME: 'VALIDATE_MODAL_FORM_EDIT_NAME'
}

export const paymentMethodInitialState = {
  search: '',
  list_payment_method: [],
  list_pm_active: [],
  pm_active: [],
  toggleAllCheckbox: false,
  loading: false,
  paginate: {
    active: 0,
    amount: 20,
    total: 0,
    totalItems: 0,
  },
  openModalCreate: false,
  openModalConfirm: false,
  openModalEdit: false,
  formCreate: {
    name: '',
    is_active: false,
    status: true
  },
  validateFormCreate: {
    name: {
      status: false,
      message: ''
    }
  },
  formEdit: {
    name: '',
    is_active: false,
    status: true
  },
  validateFormEdit: {
    name: {
      status: false,
      message: ''
    }
  },
  openModalConfirmDelete: false,
  dataDeleteItem: [],
  isCheckStatus: [],
}

export const paymentMethodReducer = (state, action) => {
  switch (action.type) {
    case paymentMethodActions.SET_SEARCH:
      return {
        ...state,
        search: action.payload
      }
    case paymentMethodActions.LIST_PAYMENT_METHOD:
      return {
        ...state,
        list_payment_method: action.payload
      }
    case paymentMethodActions.LIST_PAYMENT_METHOD_ACTIVE:
      return {
        ...state,
        list_pm_active: action.payload?.list_pm_active
      }
    case paymentMethodActions.PM_ACTIVE:
      return {
        ...state,
        pm_active: action.payload?.pm_active
      }
    case paymentMethodActions.SET_PAGINATION:
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
    case paymentMethodActions.TOGGLE_ALL_CHECKBOX:
      return {
        ...state,
        toggleAllCheckbox: action.payload
      }
    case paymentMethodActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case paymentMethodActions.OPEN_MODAL_CREATE:
      return {
        ...state,
        openModalCreate: action.payload
      }
    case paymentMethodActions.OPEN_MODAL_CONFIRM:
      return {
        ...state,
        openModalConfirm: action.payload
      }
    case paymentMethodActions.OPEN_MODAL_CONFIRM_DELETE:
      return {
        ...state,
        openModalConfirmDelete: action.payload
      }
    case paymentMethodActions.OPEN_MODAL_EDIT:
      return {
        ...state,
        openModalEdit: action.payload
      }
    case paymentMethodActions.MODAL_FORM_CREATE:
      return {
        ...state,
        formCreate: {...state.formCreate, ...action.payload},
      }
    case paymentMethodActions.VALIDATE_MODAL_FORM_CREATE_NAME:
      return {
        ...state,
        validateFormCreate: {
          ...state.validateFormCreate,
          name: {
            ...state.validateFormCreate.name,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    case paymentMethodActions.MODAL_FORM_EDIT:
      return {
        ...state,
        formEdit: {...state.formEdit, ...action.payload},
      }
    case paymentMethodActions.DATA_DELETE_ITEM:
      return {
        ...state,
        dataDeleteItem: action.payload
      }
    case paymentMethodActions.IS_CHECKED_STATUS:
      return {
        ...state,
        isCheckStatus: action.payload
      }
    case paymentMethodActions.VALIDATE_MODAL_FORM_EDIT_NAME:
      return {
        ...state,
        validateFormEdit: {
          ...state.validateFormEdit,
          name: {
            ...state.validateFormEdit.name,
            status: action.payload?.status,
            message: action.payload?.message,
          },
        },
      }
    default:
      throw new Error()
  }
}