import {facebookLivestreamScriptSingleActions as actions} from './_actions'

export const FacebookLivestreamScriptSingleReducer = (state, action) => {
  switch (action.type) {
    // ==================================================================
    // ORIGIN
    // ==================================================================
    case actions.DETAIL_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          name: {
            ...state.form.name,
            value: action.payload?.name,
            valueOrigin: action.payload?.name,
          },
          fanpage: {
            ...state.form.fanpage,
            value: action.payload?.fanpage,
            valueOrigin: action.payload?.fanpage,
          },
          status: {
            ...state.form.status,
            value: action.payload?.status,
            valueOrigin: action.payload?.status,
          },
          warehouse: {
            ...state.form.warehouse,
            value: action.payload?.warehouse,
            valueOrigin: action.payload?.warehouse,
          },
          pricePolicy: {
            ...state.form.pricePolicy,
            value: action.payload?.pricePolicy,
            valueOrigin: action.payload?.pricePolicy,
          },
          product: {
            ...state.form.product,
            value: action.payload?.product,
            valueOrigin: action.payload?.product,
          },
          orderSyntax: {
            ...state.form.orderSyntax,
            value: action.payload?.orderSyntax,
            valueOrigin: action.payload?.orderSyntax,
          },
          orderTime: {
            ...state.form.orderTime,
            value: action.payload?.orderTime,
            valueOrigin: action.payload?.orderTime,
          },
          orderConfirm: {
            ...state.form.orderConfirm,
            value: action.payload?.orderConfirm,
            valueOrigin: action.payload?.orderConfirm,
          },
          shippingPoint: {
            ...state.form.shippingPoint,
            value: action.payload?.shippingPoint,
            valueOrigin: action.payload?.shippingPoint,
          },
          shippingPartner: {
            ...state.form.shippingPartner,
            config: action.payload?.shippingPartner?.config,
            value: action.payload?.shippingPartner?.value,
            valueOrigin: action.payload?.shippingPartner?.value,
          },
          cod: {
            ...state.form.cod,
            value: action.payload?.cod?.value,
            valueOrigin: action.payload?.cod?.value,
            disabled: action.payload?.cod?.disabled,
            disabledOrigin: action.payload?.cod?.disabled,
          },
          insurance: {
            ...state.form.insurance,
            value: action.payload?.insurance?.value,
            valueOrigin: action.payload?.insurance?.value,
            disabled: action.payload?.insurance?.disabled,
            disabledOrigin: action.payload?.insurance?.disabled,
          },
          packageNumber: {
            ...state.form.packageNumber,
            value: action.payload?.packageNumber,
            valueOrigin: action.payload?.packageNumber,
          },
          weight: {
            ...state.form.weight,
            value: action.payload?.weight,
            valueOrigin: action.payload?.weight,
          },
          length: {
            ...state.form.length,
            value: action.payload?.length,
            valueOrigin: action.payload?.length,
          },
          width: {
            ...state.form.width,
            value: action.payload?.width,
            valueOrigin: action.payload?.width,
          },
          height: {
            ...state.form.height,
            value: action.payload?.height,
            valueOrigin: action.payload?.height,
          },
          note: {
            ...state.form.note,
            keyword: action.payload?.note,
            keywordOrigin: action.payload?.note,
          },
        },
      }

    case actions.FANPAGE_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          fanpage: {
            ...state.form.fanpage,
            list: action.payload?.list,
          },
        },
      }

    case actions.WAREHOUSE_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            list: action.payload?.list,
            value: action.payload?.value,
            valueOrigin: action.payload?.value,
            pagination: {
              ...state.form.warehouse.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.PRODUCT_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            list: action.payload?.list,
            pagination: {
              ...state.form.warehouse.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.SHIPPING_POINT_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            list: action.payload?.list,
            value: action.payload?.value,
            valueOrigin: action.payload?.value,
            pagination: {
              ...state.form.warehouse.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.SHIPPING_PARTNER_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            list: action.payload?.list,
            listOrigin: action.payload?.list,
            config: action.payload?.config,
            value: action.payload?.value,
            valueOrigin: action.payload?.value,
          },
        },
      }

    case actions.NOTE_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            list: action.payload?.list,
            keyword: action.payload?.keyword,
            keywordOrigin: action.payload?.keyword,
            pagination: {
              ...state.form.warehouse.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.SCRIPT_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        script: {
          ...state.script,
          list: action.payload?.list,
        },
      }

    case actions.RETURN_ORIGIN:
      return {
        ...state,
        form: {
          ...state.form,
          name: {...state.form.name, value: state.form.name.valueOrigin},
          fanpage: {
            ...state.form.fanpage,
            value: state.form.fanpage.valueOrigin,
          },
          status: {...state.form.status, value: state.form.status.valueOrigin},
          warehouse: {
            ...state.form.warehouse,
            value: state.form.warehouse.valueOrigin,
          },
          pricePolicy: {
            ...state.form.pricePolicy,
            value: state.form.pricePolicy.valueOrigin,
          },
          product: {
            ...state.form.product,
            value: state.form.product.valueOrigin,
          },
          orderSyntax: {
            ...state.form.orderSyntax,
            value: state.form.orderSyntax.valueOrigin,
          },
          orderTime: {
            ...state.form.orderTime,
            value: state.form.orderTime.valueOrigin,
          },
          orderConfirm: {
            ...state.form.orderConfirm,
            value: state.form.orderConfirm.valueOrigin,
          },
          shippingPoint: {
            ...state.form.shippingPoint,
            value: state.form.shippingPoint.valueOrigin,
          },
          shippingPartner: {
            ...state.form.shippingPartner,
            value: state.form.shippingPartner.valueOrigin,
          },
          cod: {
            ...state.form.cod,
            value: state.form.cod.valueOrigin,
            disabled: state.form.cod.disabledOrigin,
          },
          insurance: {
            ...state.form.insurance,
            value: state.form.insurance.valueOrigin,
            disabled: state.form.insurance.disabledOrigin,
          },
          packageNumber: {
            ...state.form.packageNumber,
            value: state.form.packageNumber.valueOrigin,
          },
          weight: {...state.form.weight, value: state.form.weight.valueOrigin},
          length: {...state.form.length, value: state.form.length.valueOrigin},
          width: {...state.form.width, value: state.form.width.valueOrigin},
          height: {...state.form.height, value: state.form.height.valueOrigin},
          note: {...state.form.note, keyword: state.form.note.keywordOrigin},
        },
      }

    // ==================================================================
    // BASIC INFO
    // ==================================================================
    case actions.NAME_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          name: {
            ...state.form.name,
            value: action.payload?.value,
          },
        },
      }

    case actions.FANPAGE_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          fanpage: {
            ...state.form.fanpage,
            value: action.payload?.value,
          },
        },
      }

    case actions.STATUS_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          status: {
            ...state.form.status,
            value: !state.form.status.value,
          },
        },
      }

    // ==================================================================
    // DECLARE ORDER KEYWORD
    // ==================================================================
    case actions.WAREHOUSE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            list: action.payload?.list,
            pagination: {
              ...state.form.warehouse.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.WAREHOUSE_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            value: action.payload?.value,
          },
        },
      }

    case actions.WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.WAREHOUSE_LOADING_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            loading: action.payload?.loading,
          },
        },
      }

    case actions.WAREHOUSE_LOADING_MORE_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          warehouse: {
            ...state.form.warehouse,
            loadingMore: action.payload?.loading,
          },
        },
      }

    case actions.PRICE_POLICY_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          pricePolicy: {
            ...state.form.pricePolicy,
            list: action.payload?.list,
          },
        },
      }

    case actions.PRICE_POLICY_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          pricePolicy: {
            ...state.form.pricePolicy,
            value: action.payload?.value,
          },
        },
      }

    case actions.PRICE_POLICY_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          pricePolicy: {
            ...state.form.pricePolicy,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.PRODUCT_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            list: action.payload?.list,
            pagination: {
              ...state.form.product.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.PRODUCT_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            value: action.payload?.value,
          },
        },
      }

    case actions.PRODUCT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.PRODUCT_LOADING_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            loading: action.payload?.loading,
          },
        },
      }

    case actions.PRODUCT_LOADING_MORE_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          product: {
            ...state.form.product,
            loadingMore: action.payload?.loading,
          },
        },
      }

    // ==================================================================
    // CONFIG AUTO MENU SYNTAX
    // ==================================================================
    case actions.ORDER_SYNTAX_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          orderSyntax: {
            ...state.form.orderSyntax,
            value: action.payload?.value,
          },
        },
      }

    case actions.ORDER_TIME_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          orderTime: {
            ...state.form.orderTime,
            value: action.payload?.value,
          },
        },
      }

    case actions.ORDER_CONFIRM_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          orderConfirm: {
            ...state.form.orderConfirm,
            value: action.payload?.value,
          },
        },
      }

    // ==================================================================
    // SHIPPING INFO
    // ==================================================================
    case actions.SHIPPING_POINT_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            list: action.payload?.list,
            pagination: {
              ...state.form.shippingPoint.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.SHIPPING_POINT_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            value: action.payload?.value,
          },
        },
      }

    case actions.SHIPPING_POINT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.SHIPPING_POINT_LOADING_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            loading: action.payload?.loading,
          },
        },
      }

    case actions.SHIPPING_POINT_LOADING_MORE_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPoint: {
            ...state.form.shippingPoint,
            loadingMore: action.payload?.loading,
          },
        },
      }

    case actions.SHIPPING_PARTNER_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            list: action.payload?.list,
            pagination: {
              ...state.form.shippingPartner.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.SHIPPING_PARTNER_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            config: action.payload?.config,
            value: action.payload?.value,
          },
        },
      }

    case actions.SHIPPING_PARTNER_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.COD_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          cod: {
            ...state.form.cod,
            value: action.payload?.value,
          },
        },
      }

    case actions.COD_DISABLED_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          cod: {
            ...state.form.cod,
            disabled: !state.form.cod.disabled,
          },
        },
      }

    case actions.INSURANCE_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          insurance: {
            ...state.form.insurance,
            value: action.payload?.value,
          },
        },
      }

    case actions.INSURANCE_DISABLED_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          insurance: {
            ...state.form.insurance,
            disabled: !state.form.insurance.disabled,
          },
        },
      }

    case actions.PACKAGE_NUMBER_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          packageNumber: {
            ...state.form.packageNumber,
            value: action.payload?.value,
          },
        },
      }

    case actions.WEIGHT_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          weight: {
            ...state.form.weight,
            value: action.payload?.value,
          },
        },
      }

    case actions.LENGTH_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          length: {
            ...state.form.length,
            value: action.payload?.value,
          },
        },
      }

    case actions.WIDTH_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          width: {
            ...state.form.width,
            value: action.payload?.value,
          },
        },
      }

    case actions.HEIGHT_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          height: {
            ...state.form.height,
            value: action.payload?.value,
          },
        },
      }

    case actions.NOTE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            list: action.payload?.list,
            pagination: {
              ...state.form.note.pagination,
              page: action.payload?.pagination?.page,
              total: action.payload?.pagination?.total,
            },
          },
        },
      }

    case actions.NOTE_VALUE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            value: action.payload?.value,
          },
        },
      }

    case actions.NOTE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            keyword: action.payload?.keyword,
          },
        },
      }

    case actions.NOTE_LOADING_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            loading: action.payload?.loading,
          },
        },
      }

    case actions.NOTE_LOADING_MORE_TOGGLE:
      return {
        ...state,
        form: {
          ...state.form,
          note: {
            ...state.form.note,
            loadingMore: action.payload?.loading,
          },
        },
      }

    case actions.CONFIG_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          shippingPartner: {
            ...state.form.shippingPartner,
            config: {
              ...state.form.shippingPartner.config,
              ...action.payload?.config,
            },
          },
        },
      }

    // ==================================================================
    // VALIDATE
    // ==================================================================
    case actions.VALIDATE_UPDATE:
      return {
        ...state,
        validate: {
          ...state.validate,
          ...action.payload?.validate,
        },
      }

    default:
      throw new Error()
  }
}
