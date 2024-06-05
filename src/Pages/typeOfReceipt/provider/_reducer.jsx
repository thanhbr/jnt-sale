import {typeReceiptActions} from "./_actions";

export const typeReceiptReducer = (state, action) => {
  switch (action.type) {
    case typeReceiptActions.FILTER_ADVANCED_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action?.payload
        },
      }
    case typeReceiptActions.TABLE_UPDATE_DISPLAY_LIST:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state?.table?.display,
            list: action?.payload?.list || [],
            loading: action?.payload?.loading
          }
        },
      }

    case typeReceiptActions.TABLE_UPDATE_PAGINATION:
      return {
        ...state,
        table: {
          ...state.table,
          pagination: {
            ...state.table.pagination,
            active: action.payload?.active || 0,
            amount: action.payload?.amount || 20,
            total: action.payload?.total || 0,
            totalItems: action.payload?.totalItems || 0,
          },
        },
      }

    case typeReceiptActions.TABLE_SELECTED_LIST_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          selected: {
            ...state.table.selected,
            list: action.payload?.selected?.list || [],
          },
        },
      }

    //  MODAL
    case typeReceiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          createReceipt: {
            ...state?.modal?.createReceipt,
            open: action?.payload
          }
        },
      }
    case typeReceiptActions.MODAL_CREATE_RECEIPT_CHANGE_FORM:
      return {
        ...state,
        modal: {
          ...state.modal,
          createReceipt: {
            ...state?.modal?.createReceipt,
            changeForm: action?.payload
          }
        },
      }
    case typeReceiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM:
      return {
        ...state,
        modal: {
          ...state.modal,
          createReceipt: {
            ...state?.modal?.createReceipt,
            form: {
              ...state?.modal?.createReceipt?.form,
              id: action?.payload?.id || '',
              name: action?.payload?.name || '',
              code: action?.payload?.code || '',
              description: action?.payload?.description || '',
              status: action?.payload?.status,
              is_default: action?.payload?.is_default,
            }
          }
        },
      }
    case typeReceiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE:
      return {
        ...state,
        modal: {
          ...state.modal,
          createReceipt: {
            ...state?.modal?.createReceipt,
            validate: {
              ...state?.modal?.createReceipt?.validate,
              name: action?.payload?.name || {status: false, message: ''},
              code: action?.payload?.code || {status: false, message: ''},
              description: action?.payload?.description || {status: false, message: ''},
            }
          }
        },
      }
    case typeReceiptActions.MODAL_REMOVE_RECEIPT_TOGGLE_OPEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          removeReceipt: {
            ...state?.modal?.removeReceipt,
            open: action?.payload
          }
        },
      }
    case typeReceiptActions.MODAL_REMOVE_RECEIPT_UPDATE_DATA:
      return {
        ...state,
        modal: {
          ...state.modal,
          removeReceipt: {
            ...state?.modal?.removeReceipt,
            data: action?.payload
          }
        },
      }
    case typeReceiptActions.MODAL_INACTIVE_RECEIPT_TOGGLE_OPEN:
      return {
        ...state,
        modal: {
          ...state.modal,
          inactiveStatus: {
            ...state?.modal?.inactiveStatus,
            open: action?.payload?.open,
            data: action?.payload?.data,
          }
        },
      }
    case typeReceiptActions.MODAL_INACTIVE_RECEIPT_DEBOUNCE:
      return {
        ...state,
        modal: {
          ...state.modal,
          inactiveStatus: {
            ...state?.modal?.inactiveStatus,
            debounce: action?.payload
          }
        },
      }
    default:
      throw new Error()
  }
}