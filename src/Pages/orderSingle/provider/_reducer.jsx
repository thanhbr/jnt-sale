import { orderSingleAction } from './_actions'
import {
  orderSingleInitialState,
  paymentDefaultDateTime,
  provinceData,
} from './_initialState'
import { ORDER_SINGLE_CONSTANTS } from '../interface/_constants'
import { formatDatetime } from '../../../common/form/datePicker/_functions'

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
          customerInfo: {
            ...state.form.customerInfo,
            fullName: {
              ...state.form.customerInfo.fullName,
              list: action.payload?.customerInfo?.fullName?.list,
              listOrigin: action.payload?.customerInfo?.fullName?.list,
              total: action.payload?.customerInfo?.fullName?.total,
              totalOrigin: action.payload?.customerInfo?.fullName?.total,
            },
            phone: {
              ...state.form.customerInfo.phone,
              list: action.payload?.customerInfo?.phone?.list,
              listOrigin: action.payload?.customerInfo?.phone?.list,
              total: action.payload?.customerInfo?.phone?.total,
              totalOrigin: action.payload?.customerInfo?.phone?.total,
            },
          },
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
            shippingPoint: {
              ...state.form.extraInfo.shippingPoint,
              list: action.payload?.extraInfo?.shippingPoint?.list,
              total: action.payload?.extraInfo?.shippingPoint?.total,
              value: action.payload?.extraInfo?.shippingPoint?.value,
            },
            source: {
              ...state.form.extraInfo.source,
              list: action.payload?.extraInfo?.source?.list,
              listOrigin: action.payload?.extraInfo?.source?.list,
              total: action.payload?.extraInfo?.source?.total,
              value: action.payload?.extraInfo?.source?.value,
            },
          },
          paymentMethod: {
            ...state.form.paymentMethod,
            method: {
              ...state.form.paymentMethod.method,
              list: action.payload?.paymentMethod?.method?.list,
              listOrigin: action.payload?.paymentMethod?.method?.list,
              total: action.payload?.paymentMethod?.method?.total,
              value: action.payload?.paymentMethod?.method?.value,
            },
          },
        },
      }

    // ======================================================================================
    // CUSTOMER INFO
    // ======================================================================================
    case orderSingleAction.FORM_PHONE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_DETAIL_DELETE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              detail: null,
              order: orderSingleInitialState.form.customerInfo.phone.order,
              report: [],
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_DETAIL_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              detail: action.payload?.detail,
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_ORDER_FIGURE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              order: {
                ...state.form.customerInfo.phone.order,
                figures: action.payload?.figures,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_ORDER_FIGURE_LOADING_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              order: {
                ...state.form.customerInfo.phone.order,
                loading: !state.form.customerInfo.phone.order.loading,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_ORDER_RECENT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              order: {
                ...state.form.customerInfo.phone.order,
                recentList: action.payload?.recentList,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_PHONE_REPORT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            phone: {
              ...state.form.customerInfo.phone,
              report: action.payload?.list,
            },
          },
        },
      }

    case orderSingleAction.FORM_FULL_NAME_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            fullName: {
              ...state.form.customerInfo.fullName,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case orderSingleAction.FORM_FULL_NAME_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            fullName: {
              ...state.form.customerInfo.fullName,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }

    case orderSingleAction.FORM_FULL_NAME_LOADING_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            fullName: {
              ...state.form.customerInfo.fullName,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case orderSingleAction.FORM_FULL_NAME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            fullName: {
              ...state.form.customerInfo.fullName,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              district: {
                ...state.form.customerInfo.address.district,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_DISTRICT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              district: {
                ...state.form.customerInfo.address.district,
                value: action.payload?.district?.value,
              },
              ward: {
                ...state.form.customerInfo.address.ward,
                keyword: '',
                list: action.payload?.ward?.list,
                value: null,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              province: {
                ...state.form.customerInfo.address.province,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_PROVINCE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              province: {
                ...state.form.customerInfo.address.province,
                value: action.payload?.province?.value,
              },
              district: {
                ...state.form.customerInfo.address.district,
                keyword: '',
                list: action.payload?.district?.list,
                value: null,
              },
              ward: {
                ...state.form.customerInfo.address.ward,
                keyword: '',
                list: [],
                value: null,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_PROVINCE_RESET:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              province: {
                ...state.form.customerInfo.address.province,
                value: null,
              },
              district: {
                ...state.form.customerInfo.address.district,
                keyword: '',
                value: null,
              },
              ward: {
                ...state.form.customerInfo.address.ward,
                keyword: '',
                value: null,
              },
            },
          },
        },
      }
    case orderSingleAction.FORM_ADDRESS_WARD_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              ward: {
                ...state.form.customerInfo.address.ward,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_WARD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              ward: {
                ...state.form.customerInfo.address.ward,
                value: action.payload?.ward?.value,
              },
            },
          },
        },
      }

    case orderSingleAction.FORM_ADDRESS_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            address: {
              ...state.form.customerInfo.address,
              value: action.payload?.value,
            },
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

    case orderSingleAction.FORM_WITH_INVENTORY_PRICE_TYPE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              priceType: {
                ...state.form.productInfo.withInventoryConfig.priceType,
                value: action.payload?.value,
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

    case orderSingleAction.FORM_WITH_INVENTORY_TOTAL_DISCOUNT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            withInventoryConfig: {
              ...state.form.productInfo.withInventoryConfig,
              discount: {
                ...state.form.productInfo.withInventoryConfig.discount,
                type: action.payload?.type,
                value: action.payload?.value,
                triggerDefault: action.payload?.triggerDefault,
              },
            },
          },
        },
      }

    case orderSingleAction.VALIDATE_EMPTY_PRODUCT_FORM_WITH_INVENTORY_PRICE:
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
                validateEmptyProduct: action.payload,
              },
            },
          },
        },
      }

    // ======================================================================================
    // SHIPPING PARTNER
    // ======================================================================================
    case orderSingleAction.UPDATE_LIST_SHIPPING_PARTNER:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              list:
                action.payload?.list ||
                state.form.shippingInfo.shippingPartner?.list,
              listOrigin:
                action.payload?.listOrigin ||
                state.form.shippingInfo.shippingPartner?.listOrigin,
            },
          },
        },
      }
    case orderSingleAction.RESET_LIST_SHIPPING_FEE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,

            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              list: [],
            },
          },
        },
      }
    case orderSingleAction.UPDATE_LIST_SHIPPING_FEE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              list: action.payload?.list,
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_FEE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              list: action.payload?.list,
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_SELECTED:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              selected: action.payload,
            },
          },
        },
      }
    case orderSingleAction.SET_SHIPPING_PARTNER_DEFAULT:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              default: action.payload,
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_INFO:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              ...action.payload,
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_PICKUP:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                requestPickUp: action.payload.optionValue,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_STATUS:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                cargoInsurrance: {
                  ...state.form.shippingInfo.shippingPartner.optionValue
                    .cargoInsurrance,
                  active:
                    !state.form.shippingInfo.shippingPartner.optionValue
                      .cargoInsurrance.active,
                },
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_VALUE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                cargoInsurrance: {
                  ...state.form.shippingInfo.shippingPartner.optionValue
                    .cargoInsurrance,
                  value: action.payload.value,
                },
              },
            },
          },
        },
      }
    case orderSingleAction.SET_VALUE_PACKAGE_QUANTITY:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                packageQuantity: action.payload.value || 1,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_REQUEST:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                requestDelivery: action.payload.optionValue,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_SHIPPING_METHOD:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                shippingMethod: action.payload.optionValue,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_PICKUPSHIFT:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                pickUpShift: action.payload.optionValue,
              },
            },
          },
        },
      }
    case orderSingleAction.FORM_SHIPPING_DATETIME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                pickUpDate: action.payload,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_SHIPPING_PARTNER_OPTION_PARTSIGN:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              optionValue: {
                ...state.form.shippingInfo.shippingPartner.optionValue,
                partSign:
                  !state.form.shippingInfo.shippingPartner.optionValue.partSign,
              },
            },
          },
        },
      }
    case orderSingleAction.UPDATE_LIST_DELIVERY_NOTE:
      return {
        ...state,
        deliveryNote: action.payload,
      }
    case orderSingleAction.UPDATE_SHIPPING_INFO:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            collectMoney:
              action.payload?.collectMoney !== undefined
                ? action.payload?.collectMoney
                : state.form.shippingInfo.collectMoney,
            weight:
              action.payload?.weight !== undefined
                ? action.payload?.weight
                : state.form.shippingInfo.weight,
            deliveryNote:
              action.payload?.deliveryNote !== undefined
                ? action.payload?.deliveryNote
                : state.form.shippingInfo.deliveryNote,
            size: {
              longs:
                action.payload?.size?.longs !== undefined
                  ? action.payload?.size?.longs
                  : state.form.shippingInfo.size.longs,
              width:
                action.payload?.size?.width !== undefined
                  ? action.payload?.size?.width
                  : state.form.shippingInfo.size.width,
              height:
                action.payload?.size?.height !== undefined
                  ? action.payload?.size?.height
                  : state.form.shippingInfo.size.height,
            },
          },
        },
      }

    case orderSingleAction.RESET_INSURRANCE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              list: action.payload,
            },
          },
        },
      }
    case orderSingleAction.SET_COLLAPSE_SHIPING:
      return {
        ...state,
        collapseStatus: action.payload,
      }

    case orderSingleAction.UPDATE_SHIPPING_INFO_PICK_UP_STORE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            isStorePickUp: !state.form.shippingInfo.isStorePickUp,
          },
        },
      }

    // ======================================================================================
    // EXTRA INFO
    // ======================================================================================
    case orderSingleAction.FORM_SHIPPING_POINT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            shippingPoint: {
              ...state.form.extraInfo.shippingPoint,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_SHIPPING_POINT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            shippingPoint: {
              ...state.form.extraInfo.shippingPoint,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case orderSingleAction.FORM_SHIPPING_POINT_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            shippingPoint: {
              ...state.form.extraInfo.shippingPoint,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }
    case orderSingleAction.SET_SHIPPING_SERVICE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            shippingPartner: {
              ...state.form.shippingInfo.shippingPartner,
              service: action.payload,
            },
          },
        },
      }

    case orderSingleAction.FORM_SOURCE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            source: {
              ...state.form.extraInfo.source,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_SOURCE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            source: {
              ...state.form.extraInfo.source,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case orderSingleAction.FORM_SOURCE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            source: {
              ...state.form.extraInfo.source,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
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

    case orderSingleAction.FORM_SHIPPING_FEE_CUSTOM_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            shipFeeCustom: {
              ...state.form.extraInfo.shipFeeCustom,
              value: action.payload?.value,
              triggerCollectDefault: !state.form.extraInfo.shipFeeCustom.triggerCollectDefault,
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

    // ======================================================================================
    // PAYMENT METHODS
    // ======================================================================================
    case orderSingleAction.FORM_PAYMENT_METHOD_TYPE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            type: action.payload?.type,
          },
        },
      }

    case orderSingleAction.FORM_PAYMENT_METHOD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            method: {
              ...state.form.paymentMethod.method,
              value: action.payload?.value,
            },
          },
        },
      }

    case orderSingleAction.FORM_PAYMENT_METHOD_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            method: {
              ...state.form.paymentMethod.method,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case orderSingleAction.FORM_PAYMENT_METHOD_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            method: {
              ...state.form.paymentMethod.method,
              list: action.payload?.list,
              page: action.payload?.page,
              total: action.payload?.total,
            },
          },
        },
      }

    case orderSingleAction.FORM_PAYMENT_MONEY_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            money: {
              ...state.form.paymentMethod.money,
              value: action.payload?.value,
              triggerDefault: !state.form.paymentMethod.money.triggerDefault
            },
          },
        },
      }

    case orderSingleAction.FORM_PAYMENT_DATETIME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          paymentMethod: {
            ...state.form.paymentMethod,
            dateTime: {
              ...state.form.paymentMethod.dateTime,
              ...action.payload,
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
          customerInfo: {
            address: {
              value: '',
              province: { list: provinceData, keyword: '', value: null },
              district: { list: [], keyword: '', value: null },
              ward: { list: [], keyword: '', value: null },
            },
            fullName: {
              keyword: '',
              list: [],
              listOrigin: [],
              loading: false,
              page: 0,
              total: 0,
              totalOrigin: 0,
              value: '',
            },
            phone: {
              detail: null,
              list: [],
              listOrigin: [],
              order: { figures: [], recentList: [] },
              report: [],
              value: '',
            },
          },
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
              manual: { value: '' },
              type: 'manual', // manual | auto
            },
            withInventoryConfig: {
              discount: { value: 0, type: '%' },
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
          shippingInfo: {
            isStorePickUp: false,
            collectMoney: 0,
            weight: 1,
            deliveryNote: { selected: 0, content: '' },
            size: {
              longs: 0,
              width: 0,
              height: 0,
            },
            shippingPartner: {
              id: 0,
              list: [],
              listOrigin: [],
              service: [],
              subService: {
                subServiceId: '',
                name: '',
              },
            },
          },
          extraInfo: {
            shippingPoint: {
              keyword: '',
              list: [],
              value: null,
            },
            source: {
              keyword: '',
              list: [],
              listOrigin: [],
              value: null,
            },
            uniqueOrderNumber: { value: '' },
            note: { value: '' },
          },
          paymentMethod: {
            type: 'cod', // before | cod | after
            method: {
              keyword: '',
              list: [],
              listOrigin: [],
              value: null,
            },
            money: { value: 0 },
            dateTime: {
              formatValue: formatDatetime(paymentDefaultDateTime),
              value: paymentDefaultDateTime,
            },
          },
        },
      }

    case orderSingleAction.RESET_FORM_CUSTOMER_INFO:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            address: {
              value: '',
              province: { list: provinceData, keyword: '', value: null },
              district: { list: [], keyword: '', value: null },
              ward: { list: [], keyword: '', value: null },
            },
            fullName: {
              keyword: '',
              list: [],
              listOrigin: [],
              loading: false,
              page: 0,
              total: 0,
              totalOrigin: 0,
              value: '',
            },
            phone: {
              detail: null,
              list: [],
              listOrigin: [],
              order: { figures: [], recentList: [] },
              report: [],
              value: '',
            },
          },
          paymentMethod: {
            type: 'cod', // before | cod | after
            method: {
              keyword: '',
              list: [],
              listOrigin: [],
              value: null,
            },
            money: { value: 0 },
            dateTime: {
              formatValue: formatDatetime(paymentDefaultDateTime),
              value: paymentDefaultDateTime,
            },
          },
        },
      }


    //  EDIT REDUCER
    case orderSingleAction.EDIT_FORM_CREATOR:
      return {
        ...state,
        creator: action?.payload,
      }
    case orderSingleAction.EDIT_FORM_SHIPPING_STATUS:
      return {
        ...state,
        shipping_status: action?.payload,
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
    case orderSingleAction.EDIT_FORM_PRICE_ORDER:
      return {
        ...state,
        priceOrder: {
          ...state.priceOrder,
          amount: action?.payload?.amount,
          discount: action?.payload?.discount,
          cod_amount: action?.payload?.cod_amount,
        }
      }
    case orderSingleAction.EDIT_FORM_PRICE_INIT_ORDER:
      return {
        ...state,
        priceOrder: {
          ...state.priceOrder,
          init: action?.payload,
        }
      }
    case orderSingleAction.SET_CUSTOMER_SUGGEST_ADDRESS:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            suggestAddress: action.payload || [],
          },
        },
      }
    case orderSingleAction.UPDATE_PRODUCT_CHANGE_PRODUCT:
      return {
        ...state,
        form: {
          ...state.form,
          shippingInfo: {
            ...state.form.shippingInfo,
            changeWeight: action.payload,
          },
        },
      }
    case orderSingleAction.FORM_UPDATE_ADDRESS:
      return {
        ...state,
        form: {
          ...state.form,
          customerInfo: {
            ...state.form.customerInfo,
            updateAddress: {
              ...state.form.customerInfo.updateAddress,
              open: action.payload.open,
              check: action.payload.check,
            }
          },
        },
      }
    case orderSingleAction.SET_WARNING_PHONE:
      return {
        ...state,
        warningPhone: action.payload,
      }
    default:
      throw new Error()
  }
}
