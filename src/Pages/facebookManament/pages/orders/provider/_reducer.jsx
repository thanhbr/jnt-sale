import {
  ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES,
  ORDER_FILTER_FACE_BOOK
} from "../interface/_const";
import {facebookConversationActions} from "./_actions"
import {dateTimeDefaultValue, formatDateTimeDefaultValue} from "./_initstate"
export const FacebookOrdersReducer = (state, action) => {
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

    case facebookConversationActions.FILTER_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
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

    case facebookConversationActions.FILTER_DUPLICATE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          duplicate: {
            ...state.filter.duplicate,
            value: action.payload?.value,
          },
        },
      }

    case facebookConversationActions.FILTER_EMPLOYEE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: action.payload.keyword,
            list: action.payload.list,
            type: {
              ...state.filter.employee.type,
              value: action.payload.type?.value,
            },
          },
        },
      }

    case facebookConversationActions.FILTER_EMPLOYEE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            list: action.payload.list,
            value: action.payload.value,
          },
        },
      }

    case facebookConversationActions.FILTER_EMPLOYEE_CATEGORY_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: '',
            list: action.payload?.list,
            tab: 'all',
            type: {
              ...state.filter.employee.type,
              value: action.payload?.type?.value,
            },
            value: [],
          },
        },
      }

    case facebookConversationActions.FILTER_EMPLOYEE_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employee: {
            ...state.filter.employee,
            list: action.payload.employee.list,
            listOrigin: action.payload.employee.list,
            type: {
              ...state.filter.employee.type,
              list: action.payload.employee.type.list,
            },
          },
          product: {
            ...state.filter.product,
            list: action.payload.product.list,
            listOrigin: action.payload.product.list,
          },
          shippingPartner: {
            ...state.filter.shippingPartner,
            list: action.payload.shippingPartner.list,
            listOrigin: action.payload.shippingPartner.list,
          },
          orderStatus: {
            ...state.filter.orderStatus,
            list: action.payload.orderStatus?.list,
            listOrigin: action.payload.orderStatus?.list,
          },
          source: {
            ...state.filter.source,
            list: action.payload.source.list,
            listOrigin: action.payload.source.list,
          },
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload.warehouse.list,
            listOrigin: action.payload.warehouse.list,
          },
        },
      }

    case facebookConversationActions.FILTER_PAYMENT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          payment: {
            ...state.filter.payment,
            value: action.payload?.payment?.value || [],
          },
        },
      }

    case facebookConversationActions.FILTER_PRODUCT_ENABLE_LOADING:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            loading: true,
          },
        },
      }

    case facebookConversationActions.FILTER_PRODUCT_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            keyword: action.payload.keyword,
            list: action.payload.list,
            loading: false,
            tab: action.payload?.tab || state.filter.product.tab,
          },
        },
      }

    case facebookConversationActions.FILTER_PRODUCT_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_PRODUCT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          product: {
            ...state.filter.product,
            list: action?.payload?.list,
            value: action.payload?.value || [],
          },
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

    case facebookConversationActions.FILTER_SHIPPING_PARTNER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_SHIPPING_PARTNER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingPartner: {
            ...state.filter.shippingPartner,
            value: action.payload?.value || null,
          },
        },
      }

    case facebookConversationActions.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          orderStatus: {
            ...state.filter.orderStatus,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_SHIPPING_STATUS_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          orderStatus: {
            ...state.filter.orderStatus,
            keyword: '',
            tab: action.payload.tab,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_SHIPPING_STATUS_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          orderStatus: {
            ...state.filter.orderStatus,
            list: action?.payload?.list,
            value: action.payload?.value || [],
          },
        },
      }

    case facebookConversationActions.FILTER_SOURCE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          source: {
            ...state.filter.source,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_SOURCE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          source: {
            ...state.filter.source,
            value: action.payload?.value || null,
          },
        },
      }

    case facebookConversationActions.FILTER_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case facebookConversationActions.FILTER_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            value: action.payload?.value || null,
          },
        },
      }

    case facebookConversationActions.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
        },
      }

    case facebookConversationActions.OTHER_FILTER_APPLY:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              end: state.filter.dateTime.end,
              start: state.filter.dateTime.start,
              type: state.filter.dateTime.type,
              value: state.filter.dateTime.value,
            },
          },
          employee: {
            ...state.filter.employee,
            activeValue: {
              type: state.filter.employee.type.value,
              value: state.filter.employee.value,
            },
          },
          orderStatus: {
            ...state.filter.orderStatus,
            activeValue: state.filter.orderStatus.value,
          },
          pageSelected:{
            ...state.filter.pageSelected,
            activeValue: {
              type: state.filter.pageSelected?.activeValue.type,
              value: state.filter.pageSelected.value,
            },
          },
          conversation:{
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              activeValue:{
                type: state.filter.conversation?.post?.type.value,
                value: state.filter.conversation?.post?.value,
              } ,
            },
          },
        },
        // panels: {
        //   ...state.panels,
        //   codTotal: action.payload?.panels?.codTotal,
        //   orderTotal: action.payload?.panels?.orderTotal,
        //   orderValueTotal: action.payload?.panels?.orderValueTotal,
        //   shippingFeeTotal: action.payload?.panels?.shippingFeeTotal,
        // },
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
    
    case facebookConversationActions.OTHER_ACTIVE_VALUE_POST:
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation:{
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              activeValue:{
                type: action.payload?.type || '',
                value: action.payload?.value,
              } ,
            },
          },
        },
      }

    case facebookConversationActions.PANELS_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
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

    case facebookConversationActions.PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        paymentMethod: {
          ...state.paymentMethod,
          list: action.payload?.paymentMethod?.list || [],
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
    case 'TABLE_PAGINATE_DATA':
      return {
        ...state,
        table: {
          ...state.table,
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
    case facebookConversationActions.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
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
                ...state.filter.dateTime,
                activeValue: {
                  end: '',
                  start: '',
                  type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case ORDER_FILTER_FACE_BOOK[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: action.payload?.isSingle ? '' : dateTimeDefaultValue[1],
                  start: action.payload?.isSingle
                      ? ''
                      : dateTimeDefaultValue[0],
                  type: action.payload?.isSingle
                      ? ''
                      : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: action.payload?.isSingle
                      ? ''
                      : formatDateTimeDefaultValue,
                },
                end: action.payload?.isSingle ? '' : dateTimeDefaultValue[1],
                start: action.payload?.isSingle ? '' : dateTimeDefaultValue[0],
                type: action.payload?.isSingle
                    ? ''
                    : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: action.payload?.isSingle
                    ? ''
                    : formatDateTimeDefaultValue,
              },
            },
          }
        case ORDER_FILTER_FACE_BOOK[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              employee: {
                ...state.filter.employee,
                activeValue: {
                  ...state.filter.employee.activeValue,
                  type: {name: 'Nhóm nhân viên', value: ''},
                  value: [],
                },
                keyword: '',
                type: {
                  ...state.filter.employee.type,
                  value: {name: 'Nhóm nhân viên', value: ''},
                },
                value: [],
              },
            },
          }
        case ORDER_FILTER_FACE_BOOK[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              pageSelected:{
                ...state.filter.pageSelected,
                activeValue: {
                  type: {name: 'Trang', value: ''},
                  value: [],
                },
                keyword: '',
                type: {
                  ...state.filter.pageSelected.type,
                  value: {name: 'Trang', value: ''},
                },
                value: [],
              },
            },
          }
        case ORDER_FILTER_FACE_BOOK[3]:
          return {
            ...state,
            filter: {
              ...state.filter,
              conversation: {
                ...state.filter.conversation,
                post:{
                  ...state.filter.conversation.post,
                  activeValue:{
                    type: {name: 'Bài viết', value: ''},
                    value: [],
                  },
                  keyword: '',
                  type: {
                    ...state.filter.conversation.post.type,
                    value: {name: 'Bài viết', value: ''},
                  },
                  value: [],
                }

              },
            },
          }
        case ORDER_FILTER_FACE_BOOK[4]:
          return {
            ...state,
            filter: {
              ...state.filter,
              orderStatus: {
                ...state.filter.orderStatus,
                activeValue: [],
                keyword: '',
                tab: 'all', // all | checked
                value: [],
              },
            },
          }
        default:
          return {...state}
      }
    case facebookConversationActions.SET_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload || ''
        },
      }
    case facebookConversationActions.SET_LIST_PAGE:
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

    case facebookConversationActions.FILTER_PAGE_SELECTED_UPDATE:
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


    case facebookConversationActions.FILTER_PAGE_SELECTED_TAB_UPDATE:
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

    case facebookConversationActions.FILTER_PAGE_SELECTED_KEYWORD_UPDATE:
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
    case 'SET_POST_CUSTOMER':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              list: action.payload.post.list,
              listOrigin: action.payload.post.list,
              canLoadMore: action.payload?.post.canLoadMore,
              pagination:{
                  ...state.filter.conversation.post?.pagination,
                totalItem:action.payload?.post?.total?.totals,
                amount: action.payload?.post?.total?.per_page,
                active:  action.payload?.post?.total?.start / action.payload?.post?.total?.per_page,
                loading: action.payload?.post?.loading
              }
            },
          },
        },
      }
    case 'UPDATE_POST_LOAD_MORE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              ...action.payload,
              pagination:{
                ...state.filter.conversation.post?.pagination,
                active: action.payload.active
              }
            },
          },
        },
      }
    case 'FILTER_POST_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              list: action.payload.list,
              value: action.payload.value,

            },
          },
        },
      }

    case 'FILTER_POST_TAB_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              keyword: '',
              tab: action.payload.tab,
              list: action.payload.list,
            },
          }
        },
      }

    case 'FILTER_POST_KEYWORD_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              keyword: action.payload.keyword,
              list: action.payload.list,
            },
          }
        },
      }
    case 'SET_POST':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              list: action.payload.post,
              listOrigin: action.payload.post,
            },
          },
        },
      }
    case 'CLEAR_FILTER_POST':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              active: [],
              value: [],
            },
          }
        }
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
          }
        }
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
          }
        }
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload
        }
      }
    case 'SET_FILTER_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          active: action.payload.active,
          status:action.payload.status,
        }
      }
    case "SET_GROUP_USER":
      return{
        ...state,
        filter:{
          ...state.filter,
          employee: {
            ...state.filter.employee,
            group_user:action.payload
          }
        }
      }
    case "SET_SHOULD_COLLAPSE":
      return{
        ...state,
        filter:{
          ...state.filter,
          shouldCollapse :action.payload
        }
      }
    default:
      return {...state}
      // throw new Error()
  }
}
