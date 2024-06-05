import {CapitalAdjustmentState} from "./inittialState";
import {CapitalAdjustmentActions} from "./action";


export const CapitalAdjustmentReducer = (state = CapitalAdjustmentState,action)=>{
    switch (action.type) {
        // create capital adjustment price
        case CapitalAdjustmentActions.GET_LIST_PRODUCT:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    productInfo: {
                        ...state.formCreate.productInfo,
                        ...action.payload,
                    }
                }
            }

        case CapitalAdjustmentActions.SET_LOADING_GET_LIST_PRODUCT:
            return {
            ...state,
            formCreate: {
                ...state.formCreate,
                productInfo: {
                    ...state.formCreate.productInfo,
                    loading:action.payload
                }
            }
        }

        case CapitalAdjustmentActions.FORM_SELECTED_SEARCH_PRODUCT:
            return {
                ...state,
                formCreate: {
                    ...state.formCreate,
                    search: {
                        ...state.formCreate.search,
                        selected: action.payload?.list,
                    },
                },
            }
      case CapitalAdjustmentActions.VALIDATE_CREATE_CAPITAL_ADJUSTMENT:
        return{
          ...state,
          formCreate: {
            ...state.formCreate,
            validate: {
              ...state.formCreate.validate,
              ...action.payload,
            },
          },
        }
      case CapitalAdjustmentActions.GET_EXTRA_INFO_CAPITAL_ADJUSTMENT:
        return {
          ...state,
          formCreate: {
            ...state.formCreate,
            extraInfo: {
              ...state.formCreate.extraInfo,
              ...action.payload,
            },
          },
        }
      case CapitalAdjustmentActions.OPEN_MODAL_CONFIRM_CAPITAL_ADJUSTMENT:
        return {
          ...state,
          formCreate: {
            ...state.formCreate,
            modal: {
              ...state.formCreate.modal,
              ...action.payload,
            },
          },
        }

        //end capital create

      // ======================== FILTER  ========================
      case CapitalAdjustmentActions.FILTER_ADVANCED_SEARCH_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            keyword: action?.payload
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            employeeCreate: {
              ...state.filter.employeeCreate,
              activeValue: action?.payload?.activeValue || [],
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_VALUE_CHANGE:
        return {
          ...state,
          filter: {
            ...state.filter,
            employeeCreate: {
              ...state.filter.employeeCreate,
              value: action?.payload || [],
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_TAB_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            employeeCreate: {
              ...state.filter.employeeCreate,
              list: action?.payload?.list || [],
              tab: action?.payload?.tab || 'all',
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_KEYWORD_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            employeeCreate: {
              ...state.filter.employeeCreate,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_DATE_TIME_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            dateTime: {
              ...state.filter.dateTime,
              end: action?.payload?.end || '',
              start: action?.payload?.start || '',
              value: action?.payload?.value || [],
              type: action?.payload?.type || 'create',
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_EMPLOYEE_CREATE_ACTIVE_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            dateTime: {
              ...state.filter.dateTime,
              activeValue: action?.payload?.dateTime?.activeValue || '',
              value: action?.payload?.dateTime?.value || '',
              start: action?.payload?.dateTime?.start || '',
              end: action?.payload?.dateTime?.end || '',
              trigger: action?.payload?.dateTime?.trigger,
            },
            employeeCreate: {
              ...state.filter.employeeCreate,
              activeValue: action?.payload?.employeeCreate?.activeValue || [],
              value: action?.payload?.employeeCreate?.value || [],
            },
            statusState: {
              ...state.filter.statusState,
              activeValue: action?.payload?.statusState?.activeValue || '',
              value: action?.payload?.statusState?.value || '',
            }
          },
        }
      case CapitalAdjustmentActions.FILTER_ADVANCED_STATUS_STATE_UPDATE:
        return {
          ...state,
          filter: {
            ...state.filter,
            statusState: {
              ...state.filter.statusState,
              value: action?.payload?.value || [],
              activeValue: action?.payload?.activeValue || [],
            }
          },
        }


      // ======================== END FILTER  ========================


      // TABLE
      case CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST:
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
      case CapitalAdjustmentActions.TABLE_UPDATE_DISPLAY_LIST_ORIGIN:
        return {
          ...state,
          table: {
            ...state.table,
            display: {
              ...state?.table?.display,
              listOrigin: action?.payload || [],
            }
          },
        }

      case CapitalAdjustmentActions.TABLE_UPDATE_PAGINATION:
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

      case CapitalAdjustmentActions.TABLE_SELECTED_LIST_UPDATE:
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
      case CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_UPDATE:
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
      case CapitalAdjustmentActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
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

      case CapitalAdjustmentActions.MODAL_CANCEL_BILL_UPDATE:
        return {
          ...state,
          table: {
            ...state.table,
            modal: {
              ...state.table.modal,
              cancelBill: {
                ...state.table.modal.cancelBill,
                open: action.payload?.open,
                id: action.payload?.id,
              }
            },
          },
        }

      case CapitalAdjustmentActions.MODAL_APPROVE_BILL_UPDATE:
        return {
          ...state,
          table: {
            ...state.table,
            modal: {
              ...state.table.modal,
              approveBill: {
                ...state.table.modal.approveBill,
                open: action.payload?.open,
                id: action.payload?.id,
              }
            },
          },
        }
        default:
            throw new Error()
    }
}