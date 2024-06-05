import { posOrderActions as actions } from './_actions'

export const PosOrderReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case actions.LOAD_STATE:
      return action.payload
    case actions.UPDATE_BARCODE_STATUS:
      return {
        ...state,
        barcode: {
          ...state.barcode,
          ...action.payload
        }
      }

    case actions.UPDATE_LEAVE_MODAL_STATUS:
      return {
        ...state,
        general: {
          ...state.general,
          modal: {
            ...state.general.modal,
            leave: action.payload
          }
        }
      }
    case actions.UPDATE_REMOVE_ORDER_MODAL_STATUS:
      return {
        ...state,
        general: {
          ...state.general,
          modal: {
            ...state.general.modal,
            removeOrder: {
              ...state.general.modal.removeOrder,
              ...action.payload
            }
          }
        }
      }
    case actions.ORIGIN:
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          list: action.payload.warehouses,
          listOrigin: action.payload.warehouses,
        },
        products: {
          ...state.products,
          list: action.payload.products.list,
          listOrigin: action.payload.products.list,
          meta: action.payload.products.meta,
        },
        payment: {
          ...state.payment,
          method: {
            ...state.payment.method,
            ...action.payload.payment.method
          }
        },
        productSearch: {
          ...state.productSearch,
          list: action.payload.productSearch.list,
          listOrigin: action.payload.productSearch.list,
          meta: action.payload.productSearch.meta,
        },
        customerInfo: {
          ...state.customerInfo,
          list: action.payload.customerInfo.list || [],
          listOrigin: action.payload.customerInfo.listOrigin || [],
          total: action.payload.customerInfo.total || 0,
          totalOrigin: action.payload.customerInfo.totalOrigin || 0,
        },
        orders: {
          ...state.orders,
          warehouse: action.payload.warehouseDefault
        }
      }
    case actions.UPDATE_LIST_POS_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          ...action.payload,
        },
        statusUpdate: true
      }
    case actions.UPDATE_TAB_ORDERS:
      return {
        ...state,
        orders: {
          ...state.orders,
          active: action.payload,
        }
      }

    //warehouse
    case actions.WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        warehouses: {
          ...state.warehouses,
          keyword: action.payload.keyword,
          list: action.payload.list,
        },
      }
    case actions.ORDER_WAREHOUSE_VALUE_UPDATE:
      return {
        ...state,
        orders: {
          ...state.orders,
          warehouse: action.payload
        },
      }

    // product
    case actions.ORDER_PRODUCT_UPDATE:
      return {
        ...state,
        orders: {
          ...state.orders,
          list: action.payload
        },
        statusUpdate: true
      }

    case actions.UPDATE_PRODUCT_SEARCH_INFO:
      return {
        ...state,
        productSearch: {
          ...state.productSearch,
          ...action.payload,
        },
      }

    case actions.QUICK_PRODUCT_UPDATE:
      return {
        ...state,
        products: {
          ...state.products,
          ...action.payload,
        },
      }
    case actions.QUICK_PRODUCT_TOGGLE_UPDATE:
      return {
        ...state,
        products: {
          ...state.products,
          show: action.payload,
        },
      }

    case actions.UPDATE_STATUS_MODAL_SHORTCUT:
      return {
        ...state,
        products: {
          ...state.products,
          shortcut: action.payload,
        },
      }

    case actions.UPDATE_TYPE_VIEW_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          typeView: action.payload,
        },
      }


    //  =================== GROUP PRODUCT ===============
    case actions.FILTER_GROUP_PRODUCT_UPDATE:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter.groupProduct,
              list: action?.payload?.list || [],
              listOrigin: action?.payload?.listOrigin || [],
            }
          }
        }
      }
    case actions.FILTER_GROUP_PRODUCT_UPDATE_LIST_CHILDREN_TWO:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter?.groupProduct,
              listChildTwo: action?.payload || [],
            }
          }
        }
      }
    case actions.FILTER_GROUP_PRODUCT_CHANGE_KEYWORD:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter?.groupProduct,
              search: {
                keyword: action?.payload?.keyword || '',
                list: action?.payload?.list || [],
              },
            }
          }
        }
      }
    case actions.FILTER_GROUP_PRODUCT_CHANGE_ID:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter?.groupProduct,
              id: action?.payload || '',
            }
          }
        }
      }
    case actions.FILTER_GROUP_PRODUCT_UPDATE_VALUE:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter?.groupProduct,
              value: action?.payload || '',
            }
          }
        }
      }
    case actions.FILTER_GROUP_PRODUCT_UPDATE_ACTIVE_VALUE:
      return {
        ...state,
        products: {
          ...state.products,
          filter: {
            ...state.products.filter,
            groupProduct: {
              ...state.products.filter?.groupProduct,
              activeValue: action?.payload || '',
            }
          }
        }
      }
    //  =================== END GROUP PRODUCT ===============

    // ==========  ========== Right Content ==========  ==========
    case actions.RIGHT_CONTENT_UPDATE_PAYMENT_ORDER:
      return {
        ...state,
        payment: {
          ...state.payment,
          method: {
            ...state.payment.method,
            listActive: action.payload || []
          }
        },
        statusUpdate: true
      }
    case actions.RIGHT_CONTENT_TAB_CHANGE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          tab: action.payload || 'guest'
        },
      }

    case actions.RIGHT_CONTENT_MODAL_SELECT_PAYMENT:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            selectPayment: {
              ...state.rightContent.modal.selectPayment,
              open: action.payload
            }
          }
        },
      }

    // Customer

    case actions.ORDER_CUSTOMER_VALUE_UPDATE:
      return {
        ...state,
        orders: {
          ...state.orders,
          customer: action.payload
        },
        statusUpdate: true
      }
    case actions.UPDATE_LIST_CUSTOMER:
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          ...action.payload.customerInfo
        },
      }
    case actions.SET_CUSTOMER_SUGGEST_ADDRESS:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                suggestAddress: action.payload || [],
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  value: action.payload?.value,
                },
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  province: {
                    ...state.rightContent.modal.createCustomer.form.address.province,
                    list: action.payload?.list,
                    keyword: action.payload?.keyword,
                  },
                },
              },
            }
          }
        },
      }

    case actions.FORM_CREATE_CUSTOMER_DISPLAY:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              open: action.payload
            }
          }
        },
      }

    case actions.FORM_CUSTOMER_SHOW_MORE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              showMore: action.payload
            }
          }
        },
      }

    case actions.FORM_GROUP_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                groupCustomer: {
                  ...state.rightContent.modal.createCustomer.form.groupCustomer,
                  ...action.payload
                }
              },
            }
          }
        },
      }

    case actions.FORM_GENDER_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                gender: {
                  ...state.rightContent.modal.createCustomer.form.gender,
                  ...action.payload
                }
              },
            }
          }
        },
      }

    case actions.VALIDATE_FORM_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                validate: {
                  ...state.rightContent.modal.createCustomer.form.validate,
                  ...action.payload
                }
              },
            }
          }
        },
      }

    case actions.FORM_PHONE_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                phone: action.payload
              },
            }
          }
        },
      }

    case actions.FORM_NAME_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                fullName: action.payload
              },
            }
          }
        },
      }

    case actions.FORM_CODE_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                code: action.payload
              },
            }
          }
        },
      }

    case actions.FORM_EMAIL_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                email: action.payload
              },
            }
          }
        },
      }

    case actions.FORM_NOTE_CUSTOMER_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                note: action.payload
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_PROVINCE_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  province: {
                    ...state.rightContent.modal.createCustomer.form.address.province,
                    value: action.payload?.province?.value,
                  },
                  district: {
                    ...state.rightContent.modal.createCustomer.form.address.district,
                    keyword: '',
                    list: action.payload?.district?.list,
                    value: null,
                  },
                  ward: {
                    ...state.rightContent.modal.createCustomer.form.address.ward,
                    keyword: '',
                    list: [],
                    value: null,
                  },
                },
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_DISTRICT_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  district: {
                    ...state.rightContent.modal.createCustomer.form.address.district,
                    value: action.payload?.district?.value,
                  },
                  ward: {
                    ...state.rightContent.modal.createCustomer.form.address.ward,
                    keyword: '',
                    list: action.payload?.ward?.list,
                    value: null,
                  },
                },
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  district: {
                    ...state.rightContent.modal.createCustomer.form.address.district,
                    list: action.payload?.list,
                    keyword: action.payload?.keyword,
                  },
                },
              },
            }
          }
        },
      }

    case actions.FORM_ADDRESS_WARD_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  ward: {
                    ...state.rightContent.modal.createCustomer.form.address.ward,
                    value: action.payload?.ward?.value,
                  },
                },
              },
            }
          }
        },
      }
    case actions.FORM_ADDRESS_WARD_KEYWORD_UPDATE:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  ...state.rightContent.modal.createCustomer.form.address,
                  ward: {
                    ...state.rightContent.modal.createCustomer.form.address.ward,
                    list: action.payload?.list,
                    keyword: action.payload?.keyword,
                  },
                },
              },
            }
          }
        },
      }

    case actions.RESET_FORM_CREATE_CUSTOMER:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            createCustomer: {
              ...state.rightContent.modal.createCustomer,
              form: {
                ...state.rightContent.modal.createCustomer.form,
                address: {
                  value: '',
                  province: {
                    list: state.rightContent.modal.createCustomer.form.address.province.list,
                    keyword: '',
                    value: null
                  },
                  district: { list: [], keyword: '', value: null },
                  ward: { list: [], keyword: '', value: null },
                },
                fullName: '',
                phone: '',
                code: '',
                groupCustomer: {
                  list: state.rightContent.modal.createCustomer.form.groupCustomer.listOrigin,
                  listOrigin: state.rightContent.modal.createCustomer.form.groupCustomer.listOrigin,
                  keyword: '',
                  value: null
                },
                gender: {
                  list: [
                    { name: 'Nam', value: 1 },
                    { name: 'Nữ', value: 2 },
                  ], value: { name: 'Nam', value: 1 }
                },
                email: '',
                note: '',
                validate: {
                  fullName: '',
                  phone: ''
                }
              },
            }
          }
        },
      }
    //End customer

    case actions.RIGHT_CONTENT_MODAL_RESPONSE_SUBMIT:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            responseSubmit: {
              ...state.rightContent.modal.responseSubmit,
              open: action.payload
            }
          }
        },
      }
    case actions.RIGHT_CONTENT_MODAL_RESPONSE_HAS_SUBMIT:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            responseSubmit: {
              ...state.rightContent.modal.responseSubmit,
              sent: action.payload || []
            }
          }
        },
      }

    case actions.SET_CREATED_ORDER_ID:
      return {
        ...state,
        orders: {
          ...state.orders,
          createdOrderID: action.payload || ''
        },
      }
    case actions.SET_CREATED_ERROR_SUBMIT:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          errorSubmit: action.payload || ''
        },
      }
    case actions.RIGHT_CONTENT_MODAL_OPEN_CONFIRM_ORDER:
      return {
        ...state,
        rightContent: {
          ...state.rightContent,
          modal: {
            ...state.rightContent.modal,
            confirmOrder: {
              ...state.rightContent.modal.confirmOrder,
              open: action.payload
            }
          }
        },
      }
    case actions.SET_ADDRESS_ORDER:
      return {
        ...state,
        orders: {
          ...state.orders,
          addressOrder: action.payload || ''
        },
      }
    // ==========  ========== End Right Content ==========  ==========
    default:
      throw new Error()
  }
}
