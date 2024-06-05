import {facebookConversationActions} from './_actions'
import {facebookLivestreamInitialState} from './_initstate'
export const FacebookLivestreamReducer = (state, action) => {
  switch (action.type) {
    case facebookConversationActions.FILTER_ADVANCED_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          advancedSearch: {
            ...state.filter.advancedSearch,
            customer: {
              ...state.filter.advancedSearch.customer,
              keyword:
                typeof action.payload?.customer?.keyword === 'string'
                  ? action.payload.customer.keyword
                  : state.filter.advancedSearch.customer.keyword,
              value:
                typeof action.payload?.customer?.value === 'string'
                  ? action.payload.customer.value
                  : state.filter.advancedSearch.customer.value,
            },
            liveVideoId:
              typeof action.payload?.liveVideoId === 'string'
                ? action.payload.liveVideoId
                : state.filter.advancedSearch.liveVideoId,
          },
        },
      }

    case facebookConversationActions.FILTER_STATUS_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          status: {
            ...state.filter.status,
            ...action.payload,
          },
        },
      }

    case facebookConversationActions.FILTER_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: true,
            end: action.payload?.end,
            start: action.payload?.start,
            type: action.payload?.type,
            value: action.payload?.value,
          },
        },
      }

    case facebookConversationActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: true,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: action.payload?.end,
              start: action.payload?.start,
              type: action.payload?.type,
              value: action.payload?.value,
            },
          },
        },
      }

    case facebookConversationActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: action.payload?.trigger,
          },
        },
      }

    case facebookConversationActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
        },
      }

    case facebookConversationActions.FILTER_SEARCH_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          search: {
            ...state.filter.search,
            value: action.payload.value || '',
          },
        },
      }

    case facebookConversationActions.OTHER_FILTER_APPLY:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: true,
            activeValue: {
              end: state.filter.dateTime.end,
              start: state.filter.dateTime.start,
              type: state.filter.dateTime.type,
              value: state.filter.dateTime.value,
            },
          },
          status: {
            ...state.filter.status,
            activeValue: state.filter.status.value,
          },
        },
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
            totalItems: action.payload?.pagination?.totalItems,
          },
        },
      }

    case facebookConversationActions.TABLE_AMOUNT_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
            amount: action.payload?.pagination?.amount,
            total: action.payload?.pagination?.total,
          },
        },
      }

    case facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            total: Math.ceil(
              action.payload.pagination.totalItems /
              state.table.pagination.amount,
            ),
            totalItems: action.payload.pagination.totalItems,
          },
        },
      }

    case facebookConversationActions.TABLE_DISPLAY_DETAIL_UPDATE:
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

    case facebookConversationActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
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

    case facebookConversationActions.TABLE_DISPLAY_LOADING_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            loading: action.payload?.table?.display?.loading,
          },
        },
      }

    case facebookConversationActions.TABLE_PAGINATION_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
          },
          pagination: {
            ...state.table.pagination,
            active: action.payload?.pagination?.active,
          },
        },
      }

    case facebookConversationActions.TABLE_SELECTED_LIST_UPDATE:
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

    case facebookConversationActions.TAG_FILTER_DELETE:
      switch (action.payload?.type) {
        case 'dateTime.current':
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...facebookLivestreamInitialState.filter.dateTime
              }
            }
          }
        
        case 'status.current':
          return {
            ...state,
            filter: {
              ...state.filter,
              status: {
                ...facebookLivestreamInitialState.filter.status
              }
            }
          }

        default: return {
          ...state,
          filter: {
            ...facebookLivestreamInitialState.filter,
          },
        }
      }

    case facebookConversationActions.SET_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload || '',
        },
      }

    case 'SET_FILTER_ACTIVE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            tagsCustomer: {
              ...state.filter.conversation.tagsCustomer,
              active: state.filter.conversation.tagsCustomer.value,
            },
            post: {
              ...state.filter.conversation.post,
              active: state.filter.conversation.post.value,
            },
          },
        },
      }
    case 'SET_FILTER_SELECTED':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              value: state.filter.conversation.post.active,
            },
          },
        },
      }

    case 'SET_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload,
        },
      }
    
    case 'SET_FILTER_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          active: action.payload,
        },
      }

    case 'SET_SYNC_VIDEO_SEARCH':
      return {
        ...state,
        syncVideo: {
          ...state.syncVideo,
          ...action.payload
        }
      }

    default:
      return { ...state }
    // throw new Error()
  }
}
