import { upperCase } from 'lodash'
import {
  PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES,
  PURCHASES_FILTER_TAG_FIELDS,
} from '../interfaces/_constants'

export const actionTypes = {
  FOCUS_INPUT: 'FOCUS_INPUT',
  //  FILTER
  FILTER_DATE_TIME_UPDATE: 'FILTER_DATE_TIME_UPDATE',
  FILTER_ACTIVE_DATE_TIME_UPDATE: 'FILTER_ACTIVE_DATE_TIME_UPDATE',
  FILTER_ORIGIN_DATA_UPDATE: 'FILTER_ORIGIN_DATA_UPDATE',
  FILTER_SEARCH_UPDATE: 'FILTER_SEARCH_UPDATE',
  FILTER_SUPPLIER_KEYWORD_UPDATE: 'FILTER_SUPPLIER_KEYWORD_UPDATE',
  FILTER_SUPPLIER_UPDATE: 'FILTER_SUPPLIER_UPDATE',
  FILTER_WAREHOUSE_KEYWORD_UPDATE: 'FILTER_WAREHOUSE_KEYWORD_UPDATE',
  FILTER_WAREHOUSE_UPDATE: 'FILTER_WAREHOUSE_UPDATE',
  OTHER_FILTER_APPLY: 'OTHER_FILTER_APPLY',
  TAG_FILTER_DELETE: 'TAG_FILTER_DELETE',
  // NOTIFICATIONS
  NOTIFICATIONS_LIST_UPDATE: 'NOTIFICATIONS_LIST_UPDATE',
  // TABLE
  TABLE_DISPLAY_DATA_UPDATE: 'TABLE_DISPLAY_DATA_UPDATE',
  TABLE_DISPLAY_DETAIL_UPDATE: 'TABLE_DISPLAY_DETAIL_UPDATE',
  TABLE_PAGINATION_UPDATE: 'TABLE_PAGINATION_UPDATE',
  TABLE_SELECTED_LIST_UPDATE: 'TABLE_SELECTED_LIST_UPDATE',
  TABLE_AMOUNT_UPDATE: 'TABLE_AMOUNT_UPDATE',
  TABLE_DISPLAY_LOADING_UPDATE: 'TABLE_DISPLAY_LOADING_UPDATE',
}
export const useSupplierManagementAction = {
  GET_LIST_SUPPLIER: 'GET_LIST_SUPPLIER',
  GET_LIST_DETAIL: 'GET_LIST_DETAIL',
  SET_LOADING: 'SET_LOADING',
  OPEN_MODAL: 'OPEN_MODAL',
  OPEN_MODAL_CONFIRM: 'OPEN_MODAL_CONFIRM',
  CHANGE_MODAL: 'CHANGE_MODAL',
  CHANGE_MODAL_CONFIRM: 'CHANGE_MODAL_CONFIRM',
  CHECK_SUBMIT_CODE: 'CHECK_SUBMIT_CODE',
  CHECK_SUBMIT_NAME: 'CHECK_SUBMIT_NAME',
  CHECK_SUBMIT_ADDRESS: 'CHECK_SUBMIT_ADDRESS',
  CHECK_SUBMIT_PHONE: 'CHECK_SUBMIT_PHONE',
  CHECK_SUBMIT_SHORT_NAME: 'CHECK_SUBMIT_SHORT_NAME',
  CHECK_SUBMIT_CONTRACT: 'CHECK_SUBMIT_CONTRACT',
  CHECK_SUBMIT_NOTE: 'CHECK_SUBMIT_NOTE',
  CHECK_SUBMIT_EMAIL: 'CHECK_SUBMIT_EMAIL',
  CHANGE_SUPPLIER_CODE: 'CHANGE_SUPPLIER_CODE',
  CHANGE_SUPPLIER_NAME: 'CHANGE_SUPPLIER_NAME',
  CHANGE_SUPPLIER_ADDRESS: 'CHANGE_SUPPLIER_ADDRESS',
  CHANGE_SUPPLIER_PHONE: 'CHANGE_SUPPLIER_PHONE',
  CHANGE_SUPPLIER_SHORT_NAME: 'CHANGE_SUPPLIER_SHORT_NAME',
  CHANGE_SUPPLIER_CONTRACT_NAME: 'CHANGE_SUPPLIER_CONTRACT_NAME',
  CHANGE_SUPPLIER_EMAIL: 'CHANGE_SUPPLIER_EMAIL',
  CHANGE_SUPPLIER_NOTE: 'CHANGE_SUPPLIER_NOTE',
  CHANGE_SUPPLIER_STATUS: 'CHANGE_SUPPLIER_STATUS',
  GET_PAGINATION: 'GET_PAGINATION',
  GET_ID_SUPPLIER: 'GET_ID_SUPPLIER',
  OPEN_CONFIRM_DELETE: 'OPEN_CONFIRM_DELETE',
  SET_LOADING_DETAIL: 'SET_LOADNG_DETAIL',
  DETAIL_ACTIVE: 'DETAIL_ACTIVE',
  PURCHASE_LIST: "PURCHASE_LIST",
  PURCHASE_TOTAL: 'PURCHASE_TOTAL',
  PURCHASE_META: 'PURCHASE_META',
  EMPTY_SUPPLIER: 'EMPTY_SUPPLIER',
  FALSE_CHECK_SUBMIT: 'FALSE_CHECK_SUBMIT',
  SET_DETAIL_SUPPLIER: 'SET_DETAIL_SUPPLIER',
  SET_ACTIVE_CHECK_BOX: 'SET_ACTIVE_CHECK_BOX',
  SET_IS_CHECK_BOX: 'SET_IS_CHECK_BOX',
  SET_COUNT: "SET_COUNT",
  OPEN_CONFIRM_CANCEL: 'OPEN_CONFIRM_CANCEL',
  KEY_WORD_SUPPLIER : 'KEY_WORD_SUPPLIER',
  GET_ORIGIN_LIST:'GET_ORIGIN_LIST',
}
export const PurchasesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_APPLY_FILTER':
      return {
        ...state,
        filter: {
          ...state.filter,
          isApplyFilter: action.payload
        }
      }

    case 'UPDATE_SHOW_EXPORT':
      return {
        ...state,
        table: {
          ...state.table,
          properties: {
            ...state.table.properties,
            canShowExport: action.payload
          }
        }
      }

    case `SET_FILTER_${action.name?.toUpperCase()}`:
      return {
        ...state,
        filter: {
          ...state.filter,
          [action.name]: {
            ...state.filter[action.name],
            value: action.payload
          }
        }
      }

    case actionTypes.FOCUS_INPUT:
      return {
        ...state,
        focusInputOnSuccess: action.payload,
      }

    case actionTypes.FILTER_DATE_TIME_UPDATE:
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

    case actionTypes.FILTER_ACTIVE_DATE_TIME_UPDATE:
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

    case actionTypes.FILTER_ORIGIN_DATA_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          supplier: {
            ...state.filter.supplier,
            list: action.payload.supplier.list,
            listOrigin: action.payload.supplier.list,
          },
          warehouse: {
            ...state.filter.warehouse,
            list: action.payload.warehouse.list,
            listOrigin: action.payload.warehouse.list,
          },
        },
      }

    case actionTypes.FILTER_SEARCH_UPDATE:
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

    case actionTypes.FILTER_SUPPLIER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          supplier: {
            ...state.filter.supplier,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }
    case actionTypes.FILTER_SUPPLIER_KEYWORD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          supplier: {
            ...state.filter.supplier,
            keyword: action.payload.keyword,
            list: action.payload.list,
          },
        },
      }

    case actionTypes.FILTER_WAREHOUSE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          warehouse: {
            ...state.filter.warehouse,
            keyword: action.payload?.value?.name || '',
            value: action.payload?.value || null,
          },
        },
      }
    case actionTypes.FILTER_WAREHOUSE_KEYWORD_UPDATE:
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

    case actionTypes.NOTIFICATIONS_LIST_UPDATE:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          list: action.payload?.notifications?.list || [],
        },
      }

    case actionTypes.OTHER_FILTER_APPLY:
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
          supplier: {
            ...state.filter.supplier,
            activeValue: state.filter.supplier.value,
          },
          warehouse: {
            ...state.filter.warehouse,
            activeValue: state.filter.warehouse.value,
          },
          payment_status: {
            ...state.filter.payment_status,
            activeValue: state.filter.payment_status?.value,
          },
          warehouse_status: {
            ...state.filter.warehouse_status,
            activeValue: state.filter.warehouse_status?.value,
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

    case actionTypes.TABLE_AMOUNT_UPDATE:
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

    case actionTypes.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.display?.list || [],
            report: action.payload?.display?.report || [],
          },
          loading: true,
          pagination: {
            ...state.table.pagination,
            total: action.payload.pagination.total,
            totalItems: action.payload.pagination.totalItems,
          }
        },
      }

    case 'STATUS_LIST_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          shippingStatus: {
            ...state.filter.shippingStatus,
            activeValue: [],
            list: action.payload?.statusList,
            listOrigin: action.payload?.statusList,
          },
        },
      }

    case actionTypes.TABLE_DISPLAY_DETAIL_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            active: action.payload?.active || null,
            list: action.payload?.moreItem
              ? [...state.table.detail.list, action.payload.moreItem]
              : [...state.table.detail.list],
          },
        },
      }

    case actionTypes.TABLE_PAGINATION_UPDATE:
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

    case actionTypes.TABLE_SELECTED_LIST_UPDATE:
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
    case 'TABLE_DISPLAY_LOADING_UPDATE':
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
    case 'TABLE_DETAIL_LOADING_UPDATE':
      return {
        ...state,
        table: {
          ...state.table,
          detail: {
            ...state.table.detail,
            loading: action.payload,
          },
        },
      }
    case actionTypes.TAG_FILTER_DELETE:
      switch (action.payload?.type) {
        case PURCHASES_FILTER_TAG_FIELDS[0]:
          return {
            ...state,
            filter: {
              ...state.filter,
              dateTime: {
                ...state.filter.dateTime,
                activeValue: {
                  end: '',
                  start: '',
                  type: PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                  value: '',
                },
                end: '',
                start: '',
                type: PURCHASES_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                value: '',
              },
            },
          }
        case PURCHASES_FILTER_TAG_FIELDS[1]:
          return {
            ...state,
            filter: {
              ...state.filter,
              supplier: {
                ...state.filter.supplier,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        case PURCHASES_FILTER_TAG_FIELDS[2]:
          return {
            ...state,
            filter: {
              ...state.filter,
              warehouse: {
                ...state.filter.warehouse,
                activeValue: null,
                keyword: '',
                value: null,
              },
            },
          }
        default:
          return {...state}
      }

    case 'SET_LOADING':
      return {
        ...state,
        table: {
          ...state.table,
          loading: action.payload,
        },
      }
    case 'FILTER_DATE_TIME_TRIGGER_UPDATE':
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

    case 'UPDATE_LOADING':
      return {
        ...state,
        loading: action.payload,
      }

      //REFUND PURCHASE




    case 'UPDATE_REFUND_PRODUCT_INFO':
      return {
        ...state,
        refund: {
          ...state.refund,
          productInfo: {
            ...state.refund.productInfo,
            ...action.payload
          }
        },
      }

    case 'FORM_REFUND_PAYMENT_NOTE_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          extraInfo: {
            ...state.refund.extraInfo,
            refundReason: action.payload
          }
        },
      }


    case 'FORM_REFUND_GENERAL_INFO_WAREHOUSE_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          extraInfo: {
            ...state.refund.extraInfo,
            warehouse: {
              ...state.refund.extraInfo.warehouse,
              ...action.payload
            }
          }
        },
      }


    case 'FORM_REFUND_GENERAL_INFO_VENDOR_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          extraInfo: {
            ...state.refund.extraInfo,
            vendor: {
              ...state.refund.extraInfo.vendor,
              ...action.payload
            }
          }
        },
      }


    case 'FORM_REFUND_PAYMENT_METHOD_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          paymentVendor: {
            ...state.refund.paymentVendor,
            paymentMethod: {
              ...state.refund.paymentVendor.paymentMethod,
              ...action.payload
            },
          }
        },
      }

    case 'FORM_REFUND_PAYMENT_MONEY_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          paymentVendor: {
            ...state.refund.paymentVendor,
            price: action.payload
          }
        },
      }

    case 'FORM_REFUND_PAYMENT_STATUS_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          paymentVendor: {
            ...state.refund.paymentVendor,
            status: action.payload
          }
        },
      }

    case 'FORM_REFUND_INVENTORY_UPDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          productInventory: action.payload
        },
      }

    case 'FORM_REFUND_PAYMENT_METHOD__VALIDATE':
      return {
        ...state,
        refund: {
          ...state.refund,
          validate: {
            ...state.refund.validate,
            ...action.payload
          }
        },
      }

    // CREATE PURCHASE

    case 'UPDATE_PRODUCT_INFO':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          productInfo: {
            ...state.purchase.productInfo,
            ...action.payload,
          },
        },
      }

    case 'UPDATE_STATUS_INFO':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          statusInfo: {
            ...state.purchase.statusInfo,
            ...action.payload
          }
        },
      }

    // ======================================================================================
    // PAYMENT METHODS
    // ======================================================================================

    case 'FORM_PAYMENT_METHOD_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          paymentVendor: {
            ...state.purchase.paymentVendor,
            paymentMethod: {
              ...state.purchase.paymentVendor.paymentMethod,
              ...action.payload,
            },
          },
        },
      }

    case 'FORM_PAYMENT_METHOD__VALIDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
            validate: {
              ...state.purchase.validate,
              ...action.payload
            }
        },
      }
    case 'FORM_PAYMENT_MONEY_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          paymentVendor: {
            ...state.purchase.paymentVendor,
            price: action.payload,
          },
        },
      }

    case 'FORM_PAYMENT_STATUS_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          paymentVendor: {
            ...state.purchase.paymentVendor,
            status: action.payload,
          },
        },
      }

    // ======================================================================================
    // GENERAL_INFO
    // ======================================================================================

    case 'FORM_GENERAL_INFO_VENDOR_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          generalInfo: {
            ...state.purchase.generalInfo,
            vendor: {
              ...state.purchase.generalInfo.vendor,
              ...action.payload,
            },
          },
        },
      }

    case 'FORM_GENERAL_INFO_CODE_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          generalInfo: {
            ...state.purchase.generalInfo,
            code: action.payload,
          },
        },
      }

    case 'FORM_GENERAL_INFO_DATE_TIME_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          generalInfo: {
            ...state.purchase.generalInfo,
            dateTime: action.payload,
          },
        },
      }

    case 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          generalInfo: {
            ...state.purchase.generalInfo,
            warehouse: {
              ...state.purchase.generalInfo.warehouse,
              ...action.payload,
            },
          },
        },
      }

    case 'FORM_GENERAL_INFO_VALIDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          generalInfo: {
            ...state.purchase.generalInfo,
            validate: {
              ...state.purchase.generalInfo.validate,
              ...action.payload,
            },
          },
        },
      }

    case 'FORM_PAYMENT_NOTE_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          extraInfo: {
            ...state.purchase.extraInfo,
            note: action.payload,
          },
        },
      }

    case 'SET_PURCHASE_DETAIL':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          detail: action.payload
        },
      }

    case 'SET_REFUND_PURCHASE_DETAIL':
      return {
        ...state,
        refund: {
          ...state.refund,
          detail: action.payload
        },
      }

    case 'FORM_INVENTORY_UPDATE':
      return {
        ...state,
        purchase: {
          ...state.purchase,
          productInventory: action.payload
        },
      }

    // END CREATE PURCHASE


      //SUPPLIER

    case useSupplierManagementAction.GET_LIST_SUPPLIER:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          list: action.payload
        }
      };
    case useSupplierManagementAction.SET_LOADING:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          loading: action.payload
        }
      };
    case useSupplierManagementAction.GET_ID_SUPPLIER:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          id_supplier: action.payload
        }
      }
    case useSupplierManagementAction.OPEN_MODAL:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          open_modal: action.payload
        }
      }
    case useSupplierManagementAction.OPEN_MODAL_CONFIRM:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          open_modal_confirm: action.payload
        }
      }
    case useSupplierManagementAction.OPEN_CONFIRM_CANCEL:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          open_confirm_cancel:{
            ...state.supplier.open_confirm_cancel,
            open:action.payload.open,
            array_id:action.payload.array_id,
          }
        }
      }
    case useSupplierManagementAction.CHANGE_MODAL:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          change_modal: action.payload
        }
      }
    case useSupplierManagementAction.OPEN_CONFIRM_DELETE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          open_confirm_delete: action.payload,
        }
      }
    case useSupplierManagementAction.CHANGE_MODAL_CONFIRM:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          modal_confirm: action.payload
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_CODE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            code_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_NAME:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            name_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_ADDRESS:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            address_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_PHONE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            phone_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_SHORT_NAME:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            short_name_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_CONTRACT:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            contract_name_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_EMAIL:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            email_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHECK_SUBMIT_NOTE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            ...state.supplier.check_submit,
            note_check: {
              status: action.payload.status,
              message: action.payload.message
            }
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_CODE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            code: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_NAME:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            name: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_ADDRESS:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            address: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_PHONE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            mobile: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_SHORT_NAME:
      return {
        ...state,
        supplier: {
            ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            alias: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_CONTRACT_NAME:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            contact_name: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_EMAIL:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            email: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_NOTE:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            details: action.payload
          }
        }
      }
    case useSupplierManagementAction.CHANGE_SUPPLIER_STATUS:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            status: action.payload
          }
        }
      }
    case useSupplierManagementAction.EMPTY_SUPPLIER: {
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            code: "",
            name: "",
            alias: "",
            contact_name: "",
            mobile: "",
            address: "",
            email: "",
            details: "",
            status: 1
          },
          modal_confirm: false,
          open_confirm_cancel: false,
          id_supplier: ''
        }
      }
    }
    case useSupplierManagementAction.FALSE_CHECK_SUBMIT:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          check_submit: {
            code_check: {
              status: false,
              message: '',
            },
            name_check: {
              status: false,
              message: '',
            },
            address_check: {
              status: false,
              message: '',
            },
            phone_check: {
              status: false,
              message: '',
            },
            short_name_check: {
              status: false,
              message: '',
            },
            contract_name_check: {
              status: false,
              message: '',
            },
            email_check: {
              status: false,
              message: '',
            },
            note_check: {
              status: false,
              message: '',
            },
          },
        }
      };
    case useSupplierManagementAction.SET_DETAIL_SUPPLIER:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplier: {
            ...state.supplier.supplier,
            code: action.payload.code,
            name: action.payload.name,
            alias: action.payload.alias,
            contact_name: action.payload.contact_name,
            mobile: action.payload.mobile,
            address: action.payload.address,
            email: action.payload.email,
            details: action.payload.details,
            status: action.payload.status
          },
        }
      }
    case useSupplierManagementAction.SET_ACTIVE_CHECK_BOX:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          is_active: action.payload,
        }
      }
    case useSupplierManagementAction.SET_IS_CHECK_BOX:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          is_check: action.payload
        }

      }
    case useSupplierManagementAction.SET_COUNT:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          count: action.payload
        }
      }
    case useSupplierManagementAction.KEY_WORD_SUPPLIER:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          key_word: action.payload,
        }
      }
    case useSupplierManagementAction.GET_ORIGIN_LIST:
      return{
        ...state,
        supplier: {
          ...state.supplier,
          origin_list:action.payload,
        }
      }


    default:
      throw new Error()
  }
}
