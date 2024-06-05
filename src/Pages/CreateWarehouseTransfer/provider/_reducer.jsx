import {actionTypes} from './_actions'
import {createWarehouseTransferInitialState} from './_initialState'

export const CreateWarehouseTransferReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FORM_VALID:
      return {
        ...state,
        form: {
          ...state.form,
          isValid: action.payload
        }
      }
    // ======================================================================================
    // ORIGIN
    // ======================================================================================
    case actionTypes.ORIGIN:
      return {
        ...state,
        form: {
          ...state.form,
          generalInfo: {
            ...state.form.generalInfo,
            warehouseList: action.payload?.generalInfo?.warehouseList,
          },
        },
      }

    // ======================================================================================
    // PRODUCT INFO
    // ======================================================================================
    case actionTypes.FORM_PRODUCT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            value: action.payload?.value,
          },
        },
      }

    case actionTypes.FORM_PRODUCT_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            list: action.payload?.list,
            loading: action.payload?.loading,
            page: action.payload?.page,
            total: action.payload?.total,
          },
        },
      }

    case actionTypes.FORM_PRODUCT_LOADING_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            loading: true,
          },
        },
      }

    case actionTypes.FORM_PRODUCT_SELECTED_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          productInfo: {
            ...state.form.productInfo,
            selected: action.payload?.list,
          },
        },
      }

    // ======================================================================================
    // EXTRA INFO
    // ======================================================================================

    case actionTypes.FORM_NOTE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            note: action.payload,
          },
        },
      }

    // ======================================================================================
    // GENERAL INFO
    // ======================================================================================

    case actionTypes.FORM_WAREHOUSE_EXPORT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          generalInfo: {
            ...state.form.generalInfo,
            warehouseExport: action.payload.value,
          },
        },
      }

    case actionTypes.FORM_WAREHOUSE_IMPORT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          generalInfo: {
            ...state.form.generalInfo,
            warehouseImport: action.payload.value,
          },
        },
      }

    case actionTypes.FORM_WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          generalInfo: {
            ...state.form.generalInfo,
            warehouseKeyword: action.payload.keyword,
          },
        },
      }

    case actionTypes.SET_MODAL_INFO:
      return {
        ...state,
        modalInfo: action.payload,
      }

    case actionTypes.FORM_WAREHOUSE_LIST_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          generalInfo: {
            ...state.form.generalInfo,
            warehouseList: {
              ...action.payload
            },
          },
        },
      }

    case actionTypes.SET_VALIDATE_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          validate: action.payload,
        },
      }

    case actionTypes.RESET_FORM:
      return {
        ...state,
        form: {
          ...state.form,
          validate: {},
        },
      }

    case actionTypes.FORM_EXTRA_INFO_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          extraInfo: {
            ...state.form.extraInfo,
            ...action.payload,
          },
        },
      }

    case 'RESET_VALIDATE_FORM':
      return {
        ...state,
        validate: {},
      }
    case actionTypes.UPDATE_LOADING:
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

    case actionTypes.RESET_FORM_DEFAULT:
      return {
        ...state,
        form: {
          ...createWarehouseTransferInitialState.form,
        },
      }

    case actionTypes.SET_CREATE_MODAL:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          ...action.payload,
        },
      }

    case actionTypes.SET_CREATE_MODAL_ADDRESS_DISTRICT_KEYWORD:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          form: {
            ...state.createModal.form,
            address: {
              ...state.createModal.form.address,
              district: {
                ...state.createModal.form.address.district,
                ...action.payload,
              },
            },
          },
        },
      }
    case actionTypes.SET_CREATE_MODAL_ADDRESS_PROVINCE_KEYWORD:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          form: {
            ...state.createModal.form,
            address: {
              ...state.createModal.form.address,
              province: {
                ...state.createModal.form.address.province,
                ...action.payload,
              },
            },
          },
        },
      }
    case actionTypes.SET_CREATE_MODAL_ADDRESS_WARD_KEYWORD:
      return {
        ...state,
        createModal: {
          ...state.createModal,
          form: {
            ...state.createModal.form,
            address: {
              ...state.createModal.form.address,
              ward: {
                ...state.createModal.form.address.ward,
                ...action.payload,
              },
            },
          },
        },
      }

    default:
      throw new Error()
  }
}
