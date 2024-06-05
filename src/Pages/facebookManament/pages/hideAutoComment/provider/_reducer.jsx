
export const FacebookHideAutoCommentReducer = (state, action) => {
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

    case 'SET_CHANGED':
      return {
        ...state,
        changed: action.payload || false
      }

    case 'SET_CONFIRM':
      return {
        ...state,
        confirm: action.payload || false
      }

    case 'SET_VALIDATE':
      return {
        ...state,
        validate: {
          ...state.validate,
          hide_text: {
            ...state.validate.hide_text,
            ...action.payload
          }
        }
      }

    case 'SET_EXTRA':
      return {
        ...state,
        extra: {
          hiddenAllComment: action.payload?.hiddenAllComment ?? state.extra.hiddenAllComment,
          hiddenAllCommentHasPhone: action.payload?.hiddenAllCommentHasPhone ?? state.extra.hiddenAllCommentHasPhone,
        }
      }

    default:
      throw new Error()
  }
}
