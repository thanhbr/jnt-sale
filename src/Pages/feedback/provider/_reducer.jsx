export const feedbackInitialState = {
  table: {
    display: {
      list: [],
      listDefault: [],
      loading: true,
    },
    pagination: {
      active: 0,
      amount: 20,
      total: 3,
      totalItems: 59,
    },
    selected: {
      list: [],
    },
    detail: {
      id: null,
      active: null,
      list: [],
    },
  }
}

export const feedbackActions = {
  TABLE_UPDATE_DISPLAY_LIST: 'TABLE_UPDATE_DISPLAY_LIST',
  TABLE_UPDATE_PAGINATION: 'TABLE_UPDATE_PAGINATION',
  TABLE_DISPLAY_DETAIL_ID_UPDATE: 'TABLE_DISPLAY_DETAIL_ID_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE'
}

export const feedbackReducer = (state, action) => {
  switch (action.type) {
    case feedbackActions.TABLE_UPDATE_DISPLAY_LIST:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state?.table?.display,
            list: action?.payload?.list || [],
            listDefault: action?.payload?.listDefault || [],
            loading: action?.payload?.loading
          }
        },
      }
    case feedbackActions.TABLE_UPDATE_PAGINATION:
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
    case feedbackActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            id: action.payload?.id || null,
          },
        },
      }
    case feedbackActions.TABLE_DISPLAY_DETAIL_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            active: action.payload?.active || null,
            list: action.payload?.list || [],
          },
        },
      }
    case feedbackActions.TABLE_SELECTED_LIST_UPDATE:
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
    default: break
  }
}