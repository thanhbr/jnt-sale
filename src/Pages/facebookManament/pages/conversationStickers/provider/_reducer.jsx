
export const FacebookConversationStickersReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TABLE':
      return {
        ...state,
        table: {
          ...state.table,
          display : {
            list: action?.payload?.display?.list,
            updateList: action?.payload?.display?.updateList,
          },
          pagination: {
            ...state.pagination,
            totalItems: action?.payload?.pagination?.totalItems
          },
          loading: action?.payload?.loading
        },
      }
    case 'UPDATE_TABLE_ROW':
      return {
        ...state,
        table: {
          ...state.table,
          display : {
            ...state.table.display,
            updateList: action?.payload?.display?.updateList,
          },
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload || false
      }

    case 'SET_MODAL_ACTIVE':
      return {
        ...state,
        modal: {
          ...state.modal,
          status: {
            ...state.modal.status,
            active: action?.payload
          }
        }
      }

    case 'SET_MODAL_CONFIRM':
      return {
        ...state,
        modal: {
          ...state.modal,
          status: {
            ...state.modal.status,
            confirm: action?.payload
          }
        }
      }

    case 'SET_MODAL_CONFIRM_DELETE':
      return {
        ...state,
        modal: {
          ...state.modal,
          status: {
            ...state.modal.status,
            delete: action?.payload
          }
        }
      }

    case 'SET_MODAL_CHANGE':
      return {
        ...state,
        modal: {
          ...state.modal,
          status: {
            ...state.modal.status,
            change: action?.payload
          }
        }
      }

    case 'SET_MODAL_ANIMATE':
      return {
        ...state,
        modal: {
          ...state.modal,
          status: {
            ...state.modal.status,
            animate: action?.payload
          }
        }
      }
    case 'SET_FORM_DATA':
      return {
        ...state,
        modal : {
          ...state.modal,
          form: {
            ...state.modal.form,
            data: {
              stickerName: action?.payload?.stickerName || '',
              color: action?.payload?.color || '',
              id: action?.payload?.id || '',
            }
          }
        }
      }
    case 'SET_FORM_COLOR':
      return {
        ...state,
        modal : {
          ...state.modal,
          form: {
            ...state.modal.form,
            data: {
              ...state.modal.form.data,
              color: action?.payload?.color || '',
            }
          }
        }
      }
    case 'SET_FORM_NAME':
      return {
        ...state,
        modal : {
          ...state.modal,
          form: {
            ...state.modal.form,
            data: {
              ...state.modal.form.data,
              stickerName: action?.payload?.stickerName || '',
            }
          }
        }
      }
    case 'SET_FORM_VALIDATE_COLOR':
      return {
        ...state,
        modal : {
          ...state.modal,
          form: {
            ...state.modal.form,
            validate: {
              ...state.modal.form.validate,
              color: action?.payload?.color || '',
            }
          }
        }
      }
    case 'SET_FORM_VALIDATE_NAME':
      return {
        ...state,
        modal : {
          ...state.modal,
          form: {
            ...state.modal.form,
            validate: {
              ...state.modal.form.validate,
              stickerName: action?.payload?.stickerName || ''
            }
          }
        }
      }

    default:
      throw new Error()
  }
}
