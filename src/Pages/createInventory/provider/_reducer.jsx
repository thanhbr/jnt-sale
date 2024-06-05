import {orderSingleAction} from './_actions'
import {
  orderSingleInitialState,
  paymentDefaultDateTime,
  provinceData,
} from './_initialState'
import {ORDER_SINGLE_CONSTANTS} from '../interface/_constants'
import {formatDatetime} from '../../../common/form/datePicker/_functions'

export const orderSingleReducer = (state, action) => {
  switch (action.type) {
    // ======================================================================================
    // ORIGIN
    // ======================================================================================
    case orderSingleAction.ORIGIN:
      return {
        ...state,
        form: {
          ...state.form,

          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              auto: {
                ...state.form.productInfo.inventoryConfig.auto,
                list: action.payload?.productInfo?.inventoryConfig?.auto?.list,
                listOrigin:
                  action.payload?.productInfo?.inventoryConfig?.auto?.list,
                total:
                  action.payload?.productInfo?.inventoryConfig?.auto?.total,
                totalOrigin:
                  action.payload?.productInfo?.inventoryConfig?.auto?.total,
              },
            },
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                list: action.payload?.productInfo?.withInventoryConfig?.search
                  ?.list,
                listOrigin:
                  action.payload?.productInfo?.withInventoryConfig?.search
                    ?.list,
                total:
                  action.payload?.productInfo?.withInventoryConfig?.search
                    ?.total,
                totalOrigin:
                  action.payload?.productInfo?.withInventoryConfig?.search
                    ?.total,
              },
              warehouse: {
                ...state.form.productInfo.withInventoryConfig.warehouse,
                list: action.payload?.productInfo?.withInventoryConfig
                  ?.warehouse?.list,
                listOrigin:
                  action.payload?.productInfo?.withInventoryConfig?.warehouse
                    ?.list,
                total:
                  action.payload?.productInfo?.withInventoryConfig?.warehouse
                    ?.total,
                value:
                  action.payload?.productInfo?.withInventoryConfig?.warehouse
                    ?.value,
              },
            },
          },
          extraInfo: {
            ...state.form.extraInfo,
          },

        },
      }

    // ======================================================================================
    // PRODUCT INFO
    // ======================================================================================
    case orderSingleAction.FORM_INVENTORY_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventory: !state.form.productInfo.inventory,
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_TYPE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              type: action.payload?.type,
            },
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_MANUAL_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              manual: {
                ...state.form.productInfo.inventoryConfig.manual,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_AUTO_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              auto: {
                ...state.form.productInfo.inventoryConfig.auto,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_AUTO_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              auto: {
                ...state.form.productInfo.inventoryConfig.auto,
                list: action.payload?.list,
                loading: action.payload?.loading,
                page: action.payload?.page,
                total: action.payload?.total,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_AUTO_LOADING_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              auto: {
                ...state.form.productInfo.inventoryConfig.auto,
                loading: true,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_INVENTORY_AUTO_SELECTED_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventoryConfig: {
              ...state.form.productInfo.inventoryConfig,
              auto: {
                ...state.form.productInfo.inventoryConfig.auto,
                selected: action.payload?.list,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_SEARCH_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                list: action.payload?.list,
                loading: action.payload?.loading,
                page: action.payload?.page,
                total: action.payload?.total,
              },
            },
            canLoadMore : action.payload?.canLoadMore
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_SEARCH_LOADING_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                loading: true,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_SEARCH_SELECTED_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                selected: action.payload?.list,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              warehouse: {
                ...state.form.productInfo.withInventoryConfig.warehouse,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              warehouse: {
                ...state.form.productInfo.withInventoryConfig.warehouse,
                list: action.payload?.list,
                page: action.payload?.page,
                total: action.payload?.total,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_WITH_INVENTORY_WAREHOUSE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              search: {
                ...state.form.productInfo.withInventoryConfig.search,
                selected: [],
              },
              warehouse: {
                ...state.form.productInfo.withInventoryConfig.warehouse,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_UNIQUE_ORDER_NUMBER_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            uniqueOrderNumber: {
              ...state.form.extraInfo.uniqueOrderNumber,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_NOTE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            note: {
              ...state.form.extraInfo.note,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.SET_VALIDATE_FORM:
      return {
        ...state,
        validate: {
          ...state.validate,
          ...action.payload,
        },
      }
    case 'RESET_VALIDATE_FORM':
      return {
        ...state,
        validate: {},
      }
    case orderSingleAction.SET_VALIDATE_SHIPPING_PARTNER:
      return {
        ...state,
        validate: {
          ...state.validate,
          shippingPartner: action.payload,
        },
      }
    case orderSingleAction.UPDATE_LOADING:
      return {
        ...state,
        loading: action?.payload,
      }

    case 'UPDATE_SKELETON':
      return {
        ...state,
        skeleton: action?.payload,
      }

    case 'UPDATE_COLLECT_TRIGGER':
      return {
        ...state,
        triggerCollectDefault: action.payload,
      }

    case orderSingleAction.RESET_FORM_DEFAULT:
      return {
        ...state,
        form: {

          productInfo: {
            inventory: false,
            inventoryConfig: {
              auto: {
                list: [],
                listOrigin: [],
                loading: false,
                page: 0,
                selected: [], // {data, quantity}[]
                total: 0,
                totalOrigin: 0,
                value: '',
              },
              manual: {value: ''},
              type: 'manual', // manual | auto
            },
            withInventoryConfig: {
              discount: {value: 0, type: '%'},
              priceType: {
                list: ORDER_SINGLE_CONSTANTS.form.productInfo
                  .withInventoryPriceType,
                value:
                  ORDER_SINGLE_CONSTANTS.form.productInfo
                    .withInventoryPriceType[0],
              },
              search: {
                list: [],
                listOrigin: [],
                loading: false,
                page: 0,
                selected: [], // {data, quantity, price, discount, discountType}[]
                total: 0,
                totalOrigin: 0,
                value: '',
              },
              warehouse: {
                keyword: '',
                list: [],
                listOrigin: [],
                value: null,
              },
            },
          },
          extraInfo: {
            uniqueOrderNumber: {value: ''},
            note: {value: ''},
          },
        },
      }


    //  EDIT REDUCER
    case orderSingleAction.EDIT_FORM_CREATOR:
      return {
        ...state,
        creator: action?.payload,
      }

    case orderSingleAction.EDIT_FORM_INVENTORY_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            inventory: action?.payload,
          },
        },
      }
    case orderSingleAction.EDIT_FORM_TEXT_PAID:
      return {
        ...state,
        field_paid: action?.payload,
      }

    case orderSingleAction.EDIT_UPDATE_PICK_UP_STORE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            isStorePickUp: action?.payload,
          },
        },
      }


    // Modal payment method
    case orderSingleAction.EDIT_TOGGLE_MODAL_PAYMENT:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          open: action?.payload,
        }
      }
    case orderSingleAction.EDIT_MODAL_PAYMENT_CHANGE_NAME:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          form: {
            ...state.editModalPayment.form,
            name: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_FORM_NAME:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          validate: {
            ...state.editModalPayment.validate,
            name: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_PAYMENT_IS_ACTIVE:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          form: {
            ...state.editModalPayment.form,
            is_active: action?.payload,
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_PAYMENT_STATUS:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          form: {
            ...state.editModalPayment.form,
            status: action?.payload,
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_PAYMENT_FORM:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          form: {
            ...state.editModalPayment.form,
            name: action?.payload?.name,
            is_active: action?.payload?.is_active,
            status: action?.payload?.status,
          }
        }
      }
    case orderSingleAction.TOGGLE_MODAL_CONFIRM_PAYMENT_FORM:
      return {
        ...state,
        editModalPayment: {
          ...state.editModalPayment,
          modalConfirm: action?.payload,
        }
      }

    // Modal delivery note
    case orderSingleAction.EDIT_TOGGLE_MODAL_DELIVERY_NOTE:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          open: action?.payload,
        }
      }
    case orderSingleAction.EDIT_MODAL_DELIVERY_NOTE:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          form: {
            ...state.editModalDeliveryNote.form,
            note: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          validate: {
            ...state.editModalDeliveryNote.validate,
            note: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_POSITION:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          form: {
            ...state.editModalDeliveryNote.form,
            position: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_DELIVERY_NOTE_POSITION:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          validate: {
            ...state.editModalDeliveryNote.validate,
            position: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_IS_ACTIVE:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          form: {
            ...state.editModalDeliveryNote.form,
            is_active: action?.payload,
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_STATUS:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          form: {
            ...state.editModalDeliveryNote.form,
            status: action?.payload,
          }
        }
      }

    case orderSingleAction.EDIT_MODAL_DELIVERY_NOTE_FORM:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          form: {
            ...state.editModalDeliveryNote.form,
            note: action?.payload?.note,
            position: action?.payload?.position,
            is_active: action?.payload?.is_active,
            status: action?.payload?.status,
          }
        }
      }
    case orderSingleAction.TOGGLE_MODAL_CONFIRM_DELIVERY_NOTE:
      return {
        ...state,
        editModalDeliveryNote: {
          ...state.editModalDeliveryNote,
          modalConfirm: action?.payload,
        }
      }

    // Modal shipping point
    case orderSingleAction.EDIT_TOGGLE_MODAL_SHIPPING_POINT:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          open: action?.payload,
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_NAME:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            name: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_NAME:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            name: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_PHONE:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            phone: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_PHONE:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            phone: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_EMAIL:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            email: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_EMAIL:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            email: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_CITY:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            city: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_CITY:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            city: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_DISTRICT:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            district: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_DISTRICT:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            district: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_WARD:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            ward: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_WARD:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            ward: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_ADDRESS:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            address: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SHIPPING_POINT_ADDRESS:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          validate: {
            ...state.editModalShippingPoint.validate,
            address: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_SELECT_OPTION:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            selectedOptions: action?.payload,
          }
        }
      }
    case orderSingleAction.EDIT_MODAL_CONFIRM_SHIPPING_POINT:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          modalConfirm: action?.payload,
        }
      }

    case orderSingleAction.EDIT_MODAL_SHIPPING_POINT_FORM:
      return {
        ...state,
        editModalShippingPoint: {
          ...state.editModalShippingPoint,
          form: {
            ...state.editModalShippingPoint.form,
            name: action?.payload?.name,
            phone: action?.payload?.phone,
            email: action?.payload?.email,
            city: action?.payload?.city,
            district: action?.payload?.district,
            ward: action?.payload?.ward,
            address: action?.payload?.address,
            selectedOptions: action?.payload?.selectedOptions,
          }
        }
      }

    // Modal source order
    case orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          open: action?.payload,
        }
      }
    case orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER_NAME:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          form: {
            ...state.editModalSourceOrder.form,
            name: action?.payload,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_MODAL_SOURCE_ORDER_NAME:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          validate: {
            ...state.editModalSourceOrder.validate,
            name: {
              status: action?.payload?.status,
              message: action?.payload?.message,
            }
          }
        }
      }
    case orderSingleAction.EDIT_TOGGLE_MODAL_SOURCE_ORDER_POSITION:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          form: {
            ...state.editModalSourceOrder.form,
            position: action?.payload,
          }
        }
      }
    case orderSingleAction.TOGGLE_MODAL_CONFIRM_SOURCE_ORDER_FORM:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          modalConfirm: action?.payload,
        }
      }

    case orderSingleAction.EDIT_MODAL_SOURCE_ORDER_FORM:
      return {
        ...state,
        editModalSourceOrder: {
          ...state.editModalSourceOrder,
          form: {
            ...state.editModalShippingPoint.form,
            name: action?.payload?.name,
            position: action?.payload?.position,
          }
        }
      }
    case orderSingleAction.VALIDATE_EDIT_FORM_DELIVERY_NOTE:
      return {
        ...state,
        validateEdit: {
          ...state.validateEdit,
          deliveryNote: {
            status: action?.payload?.status,
            message: action?.payload?.message,
          }
        }
      }
    case 'UPDATE_PRODUCT_INFO':
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            ...action.payload,
          },
        },
      }
    case 'CHECK_VALIDATE_TABLE':
      return {
        ...state,
        validateTable: action.payload,
      }
    default:
      throw new Error()
  }
}
