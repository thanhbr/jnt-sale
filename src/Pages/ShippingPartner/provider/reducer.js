const ShippingPartnerReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST_PARTNER':
        return {
          ...state,
          listPartner: action.payload,
        }
    case 'GET_PARTNER_INFO':
        return {
          ...state,
          partnerInfo: action.payload,
        }
    case 'GET_PARTNER_SETTING':
      return {
        ...state,
        setting: action.payload,
      }
    case 'SET_FIELD_PARTSIGN':
      return {
        ...state,
        setting: {
          ...state.setting,
          partsign: action.payload
        },
      };
    case 'SET_FIELD_DEFAULT':
        return {
          ...state,
          setting: {
            ...state.setting,
            is_default: action.payload
          },
        };
    case 'SET_FIELD_PAYMENT':
        return {
          ...state,
          setting: {
            ...state.setting,
            payment_method: action.payload
          },
        };
    case 'SET_FIELD_RECIPIENT_VIEW':
        return {
          ...state,
          setting: {
            ...state.setting,
            recipient_view: action.payload
          },
        };
    case 'SET_FIELD_REQUEST_GOODS':
      return {
        ...state,
        setting: {
          ...state.setting,
          request_goods: action.payload
        },
      };
    case 'SET_FIELD_TRANSPORT':
      return {
        ...state,
        setting: {
          ...state.setting,
          transport: action.payload
        },
      };
    case 'SET_FIELD_BG_COD':
      return {
        ...state,
        setting: {
          ...state.setting,
          bg_cod: action.payload
        },
      };
    case 'SET_FIELD_HIDDEN_PHONE':
      return {
        ...state,
        setting: {
          ...state.setting,
          hidden_phone: action.payload
        },
      };
    case 'SET_STATUS_CHANGE':
        return {
          ...state,
          isChange : action.payload
        };
    case 'SET_FIELD_HIDDEN_NAME':
      return {
        ...state,
        setting: {
          ...state.setting,
          hidden_name: action.payload
        },
      }
    case 'SET_FIELD_HIDDEN_COD':
      return {
        ...state,
        setting: {
          ...state.setting,
          hidden_cod: action.payload
        },
      }
    default:
      return state;
  }
};

export default ShippingPartnerReducer;
