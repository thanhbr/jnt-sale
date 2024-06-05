import { orderActions } from '../../../../refactorOrder/provider/_reducer'
import { orderSingleAction } from '../../../../orderSingle/provider/_actions'

export const FacebookAutoResponsesReducer = (state, action) => {
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
    case 'UPDATE_TABLE_LOADING':
      return {
        ...state,
        table: {
          ...state.table,
          loading: action.payload
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
    case 'SET_KEYWORD':
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload || ''
        },
      }
    case 'SET_PAGE':
      return {
        ...state,
        filter: {
          ...state.filter,
          pageSelected: {
            ...state.filter.pageSelected,
            list: action.payload.pageSelected,
            listOrigin: action.payload.pageSelected,
          },
        },
      }

    case 'FILTER_PAGE_SELECTED_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          pageSelected: {
            ...state.filter.pageSelected,
            list: action?.payload?.list,
            value: action.payload?.value || [],
          },
        },
      }


    case 'FILTER_PAGE_SELECTED_TAB_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          pageSelected: {
            ...state.filter.pageSelected,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case 'FILTER_PAGE_SELECTED_KEYWORD_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          pageSelected: {
            ...state.filter.pageSelected,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload || false
      }


      // Create auto response
    case 'UPDATE_LIST_FAN_PAGE':
      return {
        ...state,
        create: {
          ...state.create,
          basicInfo: {
            ...state.create.basicInfo,
            fanPage: {
              ...state.create.basicInfo.fanPage,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }
    case 'FORM_FAN_PAGE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          basicInfo: {
            ...state.create.basicInfo,
            fanPage: {
              ...state.create.basicInfo.fanPage,
              value: action.payload?.value,
            },
          },
        },
      }

    case 'FORM_FAN_PAGE_KEYWORD_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          basicInfo: {
            ...state.create.basicInfo,
            fanPage: {
              ...state.create.basicInfo.fanPage,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case 'FORM_SCRIPT_NAME_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          basicInfo: {
            ...state.create.basicInfo,
            scriptName:  action.payload,
          },
        },
      }

    case 'FORM_POST_TYPE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post:  {
              ...state.create.postAndComment.post,
              type: action?.payload?.type
            },
          },
        },
      }


    case 'FORM_SCRIPT_STATUS_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          basicInfo: {
            ...state.create.basicInfo,
            scriptStatus:  action?.payload || !state.create.basicInfo.scriptStatus,
          },
        },
      }

    case 'UPDATE_SHOW_POST_MODAL':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post:  {
              ...state.create.postAndComment.post,
              showModal: action.payload
            },
          },
        },
      }

    case 'UPDATE_FETCHING_MODAL':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post:  {
              ...state.create.postAndComment.post,
              fetching: action.payload
            },
          },
        },
      }

    case 'POST_LIST_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }

    case 'POST_LIST_SELECTED_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              listSelected: action.payload?.listSelected,
              totalSelected: action.payload?.totalSelected,
            },
          },
        },
      }

    case 'POST_LIST_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              value: action.payload
            },
          },
        },
      }

    case 'POST_LOADING_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case 'POST_KEYWORD_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case 'POST_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            post: {
              ...state.create.postAndComment.post,
              value: action.payload?.value,
            },
          },
        },
      }

      //COMMENT

    case 'COMMENT_TYPE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            comment:  {
              ...state.create.postAndComment.comment,
              type: action?.payload
            },
          },
        },
      }

    case 'COMMENT_TYPE_PHONE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            comment:  {
              ...state.create.postAndComment.comment,
              phone: action?.payload || !state.create.postAndComment.comment.phone
            },
          },
        },
      }

    case 'COMMENT_TYPE_KEYWORD_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            comment:  {
              ...state.create.postAndComment.comment,
              keyword: {
                ...state.create.postAndComment.comment.keyword,
                status: action?.payload || !state.create.postAndComment.comment.keyword.status
              }
            },
          },
        },
      }

    case 'COMMENT_VALUE_KEYWORD_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          postAndComment: {
            ...state.create.postAndComment,
            comment:  {
              ...state.create.postAndComment.comment,
              keyword: {
                ...state.create.postAndComment.comment.keyword,
                value: action.payload || ''
              }
            },
          },
        },
      }

      //auto response

    case 'UPDATE_AUTO_RESPONSE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            ...action?.payload
          },
        },
      }


    case 'FIT_CONDITION_COMMENT_STATUS_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            fitCondition:  {
              ...state.create.autoResponse.fitCondition,
              commentResponse: {
                ...state.create.autoResponse.fitCondition.commentResponse,
                status: !state.create.autoResponse.fitCondition.commentResponse.status,
              }
            },
          },
        },
      }

    case 'FIT_CONDITION_COMMENT_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            fitCondition:  {
              ...state.create.autoResponse.fitCondition,
              commentResponse: {
                ...state.create.autoResponse.fitCondition.commentResponse,
                value: action.payload || ''
              }
            },
          },
        },
      }

    case 'FIT_CONDITION_MESSAGE_STATUS_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            fitCondition:  {
              ...state.create.autoResponse.fitCondition,
              messageResponse: {
                ...state.create.autoResponse.fitCondition.messageResponse,
                status: !state.create.autoResponse.fitCondition.messageResponse.status,
              },
            },
          },
        },
      }

    case 'FIT_CONDITION_MESSAGE_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            fitCondition:  {
              ...state.create.autoResponse.fitCondition,
              messageResponse: {
                ...state.create.autoResponse.fitCondition.messageResponse,
                value: action.payload || ''
              }
            },
          },
        },
      }

    case 'UNFIT_CONDITION_COMMENT_STATUS_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            unfitCondition:  {
              ...state.create.autoResponse.unfitCondition,
              commentResponse: {
                ...state.create.autoResponse.unfitCondition.commentResponse,
                status: !state.create.autoResponse.unfitCondition.commentResponse.status,
              }
            },
          },
        },
      }

    case 'UNFIT_CONDITION_COMMENT_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            unfitCondition:  {
              ...state.create.autoResponse.unfitCondition,
              commentResponse: {
                ...state.create.autoResponse.unfitCondition.commentResponse,
                value: action.payload || ''
              }
            },
          },
        },
      }

    case 'UNFIT_CONDITION_MESSAGE_STATUS_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            unfitCondition:  {
              ...state.create.autoResponse.unfitCondition,
              messageResponse: {
                ...state.create.autoResponse.unfitCondition.messageResponse,
                status: !state.create.autoResponse.unfitCondition.messageResponse.status,
              }
            },
          },
        },
      }


    case 'UNFIT_CONDITION_MESSAGE_VALUE_UPDATE':
      return {
        ...state,
        create: {
          ...state.create,
          autoResponse: {
            ...state.create.autoResponse,
            unfitCondition:  {
              ...state.create.autoResponse.unfitCondition,
              messageResponse: {
                ...state.create.autoResponse.unfitCondition.messageResponse,
                value: action.payload || ''
              }
            },
          },
        },
      }

      //details
    case 'UPDATE_DETAIL_AUTO_RESPONSE':
      return {
        ...state,
        detail: action?.payload || {},
      }

      //confirm
    case 'SET_CONFIRM_MODAL':
      return {
        ...state,
        confirm: {
          ...state.confirm,
          ...action?.payload
        }
      }
    //validate
    case 'SET_VALIDATE_FORM':
      return {
        ...state,
        validate: {
          ...state.validate,
          basicInfo: {
            ...state.validate.basicInfo,
            ...action.payload?.basicInfo,
          },
          autoResponse: {
            ...state.validate.autoResponse,
            fitCondition: {
              ...state.validate.autoResponse.fitCondition,
              ...action.payload?.autoResponse?.fitCondition,
            },
            unfitCondition: {
              ...state.validate.autoResponse.unfitCondition,
              ...action.payload?.autoResponse?.unfitCondition,
            },
          },
          postAndComment: {
            ...state.validate.postAndComment,
            ...action.payload?.postAndComment,
          },
        },
      }
    default:
      throw new Error()
  }
}
