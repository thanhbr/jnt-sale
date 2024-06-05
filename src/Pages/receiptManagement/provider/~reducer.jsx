import {receiptActions} from "./~initState";

export const receiptReducer = (state, action) => {
  switch (action.type) {
    case receiptActions.FILTER_CHANGE_SEARCH_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          keyword: action.payload
        },
      }
    case receiptActions.FILTER_DATE_TIME_UPDATE:
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
    case receiptActions.FILTER_ACTIVE_DATE_TIME_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            activeValue: {
              ...state.filter.dateTime.activeValue,
              end: action.payload?.end || '',
              start: action.payload?.start || '',
              type: action.payload?.type || 'create',
              value: action.payload?.value || '',
            },
            end: action.payload?.end || '',
            start: action.payload?.start || '',
            type: action.payload?.type || 'create',
            value: action.payload?.value || '',
          },
        },
      }
    case receiptActions.FILTER_DATE_TIME_TRIGGER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          dateTime: {
            ...state.filter.dateTime,
            trigger: action.payload,
          },
        },
      }
    //===================  FILTER PAYMENT METHOD  ===================
    case receiptActions.FILTER_OTHER_PAYMENT_METHOD:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            activeValue: action?.payload?.activeValue || [],
            keyword: action?.payload?.keyword || '',
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case receiptActions.FILTER_OTHER_PAYMENT_METHOD_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            keyword: action?.payload || '',
          }
        },
      }
    case receiptActions.FILTER_OTHER_PAYMENT_METHOD_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            list: action?.payload?.list || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case receiptActions.FILTER_OTHER_PAYMENT_METHOD_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            list: action?.payload?.list || [],
            tab: action?.payload?.tab || 'all',
          }
        },
      }
    case receiptActions.FILTER_ACTIVE_OTHER_PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          paymentMethod: {
            ...state.filter.paymentMethod,
            activeValue: action?.payload || [],
          }
        },
      }

    //=================== END FILTER PAYMENT METHOD  ===================
    case receiptActions.FILTER_OTHER_GROUP_SUBMITTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupSubmitter: {
            ...state.filter.groupSubmitter,
            activeValue: action?.payload?.activeValue || [],
            keyword: action?.payload?.keyword || '',
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case receiptActions.FILTER_OTHER_GROUP_SUBMITTER_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupSubmitter: {
            ...state.filter.groupSubmitter,
            keyword: action?.payload || '',
          }
        },
      }
    case receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupSubmitter: {
            ...state.filter.groupSubmitter,
            value: action?.payload || {},
          }
        },
      }
    case receiptActions.FILTER_OTHER_GROUP_SUBMITTER_UPDATE_LIST:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupSubmitter: {
            ...state.filter.groupSubmitter,
            list: action?.payload,
          }
        },
      }
    case receiptActions.FILTER_ACTIVE_OTHER_GROUP_SUBMITTER_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          groupSubmitter: {
            ...state.filter.groupSubmitter,
            activeValue: action?.payload || [],
          }
        },
      }

    //===================  FILTER EMPLOYEE_CREATE  ===================
    case receiptActions.FILTER_OTHER_EMPLOYEE_CREATE:
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
    case receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          employeeCreate: {
            ...state.filter.employeeCreate,
            keyword: action?.payload || '',
          }
        },
      }
    case receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employeeCreate: {
            ...state.filter.employeeCreate,
            list: action?.payload?.list || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case receiptActions.FILTER_OTHER_EMPLOYEE_CREATE_TAB_UPDATE:
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
    case receiptActions.FILTER_ACTIVE_OTHER_EMPLOYEE_CREATE_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          employeeCreate: {
            ...state.filter.employeeCreate,
            activeValue: action?.payload || [],
          }
        },
      }
    //=================== END  FILTER EMPLOYEE_CREATE  ===================

    // =================== TYPE CREATE ===================
    case receiptActions.FILTER_OTHER_TYPE_RECEIPT:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeReceipt: {
            ...state.filter.typeReceipt,
            activeValue: action?.payload?.activeValue || [],
            keyword: action?.payload?.keyword || '',
            list: action?.payload?.list || [],
            listOrigin: action?.payload?.listOrigin || [],
            value: action?.payload?.value || [],
          }
        },
      }

    case receiptActions.FILTER_OTHER_TYPE_RECEIPT_CHANGE_KEYWORD:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeReceipt: {
            ...state.filter.typeReceipt,
            keyword: action?.payload || '',
          }
        },
      }
    case receiptActions.FILTER_OTHER_TYPE_RECEIPT_UPDATE_VALUE:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeReceipt: {
            ...state.filter.typeReceipt,
            list: action?.payload?.list || [],
            value: action?.payload?.value || [],
          }
        },
      }
    case receiptActions.FILTER_OTHER_TYPE_RECEIPT_TAB_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeReceipt: {
            ...state.filter.typeReceipt,
            list: action?.payload?.list || [],
            tab: action?.payload?.tab || 'all',
          }
        },
      }
    case receiptActions.FILTER_ACTIVE_OTHER_TYPE_RECEIPT_UPDATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          typeReceipt: {
            ...state.filter.typeReceipt,
            activeValue: action?.payload || [],
          }
        },
      }
    //  ========== END TYPE CREATE =============
    case receiptActions.FILTER_ACTIVE_OTHER_STATUS:
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action?.payload || [],
        },
      }
    case receiptActions.TABLE_LIST_DEFAULT:
      return {
        ...state,
        table: {
          ...state.table,
          listDefault: action.payload
        },
      }
    case receiptActions?.TABLE_DISPLAY_DATA_UPDATE:
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            list: action.payload?.list || [],
            loading: action.payload?.loading,
          },
        },
      }
    case receiptActions.TABLE_DISPLAY_DETAIL_UPDATE:
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

    case receiptActions.TABLE_DISPLAY_DETAIL_ID_UPDATE:
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

    case receiptActions.TABLE_PAGINATION_UPDATE:
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
    case receiptActions.TOGGLE_MODAL_EDIT_DESCRIPTION:
      return {
        ...state,
        table: {
          ...state.table,
          modal: {
            ...state.table.modal,
            editDesc: {
              ...state.table.modal.editDesc,
              open: action.payload
            }
          },
        },
      }
    case receiptActions.UPDATE_MODAL_EDIT_DESCRIPTION:
      return {
        ...state,
        table: {
          ...state.table,
          modal: {
            ...state.table.modal,
            editDesc: {
              ...state.table.modal.editDesc,
              data: action.payload
            }
          },
        },
      }
    case receiptActions.TOGGLE_MODAL_CANCEL_RECEIPT:
      return {
        ...state,
        table: {
          ...state.table,
          modal: {
            ...state.table.modal,
            cancelReceipt: {
              ...state.table.modal.cancelReceipt,
              open: action?.payload?.open,
              id: action?.payload?.id,
            }
          },
        },
      }


    // FORM CREATE
    case receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            groupSubmitter: {
              ...state.formCreate.fetch.groupSubmitter,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_VALUE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            groupSubmitter: {
              ...state.formCreate.fetch.groupSubmitter,
              value: action?.payload || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_KEYWORD:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            groupSubmitter: {
              ...state.formCreate.fetch.groupSubmitter,
              keyword: action?.payload || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_GROUP_SUBMITTER_UPDATE_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            groupSubmitter: {
              ...state.formCreate.fetch.groupSubmitter,
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            submitter: {
              ...state.formCreate.fetch.submitter,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
              other: action?.payload?.other || '',
              type: action?.payload?.type || '',
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_LIST_UPDATE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            submitter: {
              ...state.formCreate.fetch.submitter,
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_VALUE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            submitter: {
              ...state.formCreate.fetch.submitter,
              value: action?.payload
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_SUBMITTER_OTHER:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            submitter: {
              ...state.formCreate.fetch.submitter,
              other: action?.payload
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_SUPPLIER_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            supplier: {
              ...state.formCreate.fetch.supplier,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_CUSTOMER_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            customer: {
              ...state.formCreate.fetch.customer,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_EMPLOYEE_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            employee: {
              ...state.formCreate.fetch.user,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_PARTNER_SHIP_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            partnerShip: {
              ...state.formCreate.fetch.partnerShip,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            typeReceipt: {
              ...state.formCreate.fetch.typeReceipt,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_VALUE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            typeReceipt: {
              ...state.formCreate.fetch.typeReceipt,
              value: action?.payload || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_TYPE_RECEIPT_KEYWORD:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            typeReceipt: {
              ...state.formCreate.fetch.typeReceipt,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_LIST:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            paymentMethod: {
              ...state.formCreate.fetch.paymentMethod,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
              value: action?.payload?.value || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_VALUE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            paymentMethod: {
              ...state.formCreate.fetch.paymentMethod,
              value: action?.payload || [],
            }
          }
        },
      }
    case receiptActions.FETCH_FORM_RECEIPT_PAYMENT_METHOD_KEYWORD:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          fetch: {
            ...state.formCreate.fetch,
            paymentMethod: {
              ...state.formCreate.fetch.paymentMethod,
              keyword: action?.payload?.keyword || '',
              list: action?.payload?.list || [],
            }
          }
        },
      }

    //  FORM CREATE
    //  MODAL
    case receiptActions.MODAL_CREATE_RECEIPT_TOGGLE_OPEN:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createReceipt: {
              ...state?.formCreate?.modal?.createReceipt,
              open: action?.payload
            }
          },
        }
      }
    case receiptActions.MODAL_CREATE_RECEIPT_CHANGE_FORM:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createReceipt: {
              ...state?.formCreate?.modal?.createReceipt,
              changeForm: action?.payload
            }
          },
        }
      }
    case receiptActions.MODAL_CREATE_RECEIPT_UPDATE_FORM:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createReceipt: {
              ...state?.formCreate?.modal?.createReceipt,
              form: {
                ...state?.formCreate?.modal?.createReceipt?.form,
                id: action?.payload?.id || '',
                name: action?.payload?.name || '',
                code: action?.payload?.code || '',
                description: action?.payload?.description || '',
                status: action?.payload?.status,
                is_default: action?.payload?.is_default || '',
              }
            }
          }
        },
      }
    case receiptActions.MODAL_CREATE_RECEIPT_UPDATE_VALIDATE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createReceipt: {
              ...state?.formCreate?.modal?.createReceipt,
              validate: {
                ...state?.formCreate?.modal?.createReceipt?.validate,
                name: action?.payload?.name || {status: false, message: ''},
                code: action?.payload?.code || {status: false, message: ''},
                description: action?.payload?.description || {status: false, message: ''},
              }
            }
          }
        },
      }

    case receiptActions.FORM_CREATE_RECEIPT_UPDATE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          form: {
            ...state.formCreate.form,
            object_type : action?.payload?.object_type || '',
            object_id : action?.payload?.object_id || '',
            receipt_code : action?.payload?.receipt_code || '',
            receipt_type_id : action?.payload?.receipt_type_id || '',
            payment_method_id : action?.payload?.payment_method_id || '',
            total_amount : action?.payload?.total_amount || '',
            dt_record : action?.payload?.dt_record || '',
            reference_code : action?.payload?.reference_code || '',
            description : action?.payload?.description || '',
          }
        },
      }

    //  MODAL CREATE PAYMENT METHOD

    case receiptActions.MODAL_CREATE_PAYMENT_METHOD_TOGGLE_OPEN:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createPaymentMethod: {
              ...state?.formCreate?.modal?.createPaymentMethod,
              open: action?.payload
            }
          },
        }
      }
    case receiptActions.MODAL_CREATE_PAYMENT_METHOD_CHANGE_FORM:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createPaymentMethod: {
              ...state?.formCreate?.modal?.createPaymentMethod,
              changeForm: action?.payload
            }
          },
        }
      }
    case receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_FORM:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createPaymentMethod: {
              ...state?.formCreate?.modal?.createPaymentMethod,
              form: {
                ...state?.formCreate?.modal?.createPaymentMethod?.form,
                id: action?.payload?.id || '',
                name: action?.payload?.name || '',
                is_active: action?.payload?.is_active || false,
                status: action?.payload?.status || true,
              }
            }
          }
        },
      }
    case receiptActions.MODAL_CREATE_PAYMENT_METHOD_UPDATE_VALIDATE:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          modal: {
            ...state.formCreate.modal,
            createPaymentMethod: {
              ...state?.formCreate?.modal?.createPaymentMethod,
              validate: {
                ...state?.formCreate?.modal?.createPaymentMethod?.validate,
                name: action?.payload?.name || {status: false, message: ''},
              }
            }
          }
        },
      }

    // VALIDATE FORM
    case receiptActions.VALIDATE_FORM_CREATE_RECEIPT:
      return {
        ...state,
        formCreate: {
          ...state.formCreate,
          validate: {
            ...state.formCreate.validate,
            groupSubmitter: {
              ...state.formCreate.validate.groupSubmitter,
              status: action?.payload?.groupSubmitter?.status || false,
              message: action?.payload?.groupSubmitter?.message || '',
            },
            submitter: {
              ...state.formCreate.validate.submitter,
              status: action?.payload?.submitter?.status || false,
              message: action?.payload?.submitter?.message || '',
            },
            typeReceipt: {
              ...state.formCreate.validate.typeReceipt,
              status: action?.payload?.typeReceipt?.status || false,
              message: action?.payload?.typeReceipt?.message || '',
            },
            receiptCode: {
              ...state.formCreate.validate.receiptCode,
              status: action?.payload?.receiptCode?.status || false,
              message: action?.payload?.receiptCode?.message || '',
            },
            revenueValue: {
              ...state.formCreate.validate.revenueValue,
              status: action?.payload?.revenueValue?.status || false,
              message: action?.payload?.revenueValue?.message || '',
            },
            description: {
              ...state.formCreate.validate.description,
              status: action?.payload?.description?.status || false,
              message: action?.payload?.description?.message || '',
            },
          }
        }
    }

    default: break
  }
}