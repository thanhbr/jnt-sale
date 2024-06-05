const SurveyLoginReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST_BUSINESS':
        return {
          ...state,
          listBusiness: action.payload,
        }
    case 'SET_TYPE_FORM':
      return {
        ...state,
        typeForm: action.payload,
      }
    case 'SET_TYPE_MAJORS':
      return {
        ...state,
        typeMajors: action.payload,
      }
    case 'FORM_ADDRESS_PROVINCE_UPDATE':
      return {
        ...state,
        dataAddress: {
          ...state.dataAddress,
          address: {
            ...state.dataAddress.address,
            province: {
              ...state.dataAddress.address.province,
              value: action.payload?.province?.value,
            },
            district: {
              ...state.dataAddress.address.district,
              keyword: '',
              list: action.payload?.district?.list,
              value: null,
            },
            ward: {
              ...state.dataAddress.address.ward,
              keyword: '',
              list: [],
              value: null,
            },
          },
        },
      }
    case 'FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE':
      return {
        ...state,
        dataAddress: {
            ...state.dataAddress,
            address: {
              ...state.dataAddress.address,
              province: {
                ...state.dataAddress.address.province,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
        },
      }
    case 'FORM_ADDRESS_DISTRICT_UPDATE':
      return {
        ...state,
        dataAddress: {
          ...state.dataAddress,
          address: {
            ...state.dataAddress.address,
            district: {
              ...state.dataAddress.address.district,
              value: action.payload?.district?.value,
            },
            ward: {
              ...state.dataAddress.address.ward,
              keyword: '',
              list: action.payload?.ward?.list,
              value: null,
            },
          },
        },
      }
    case 'FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE':
      return {
        ...state,
        dataAddress: {
            ...state.dataAddress,
            address: {
              ...state.dataAddress.address,
              district: {
                ...state.dataAddress.address.district,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
        },
      }
    case 'FORM_ADDRESS_WARD_UPDATE':
      return {
        ...state,
        dataAddress: {
          ...state.dataAddress,
          address: {
            ...state.dataAddress.address,
            ward: {
              ...state.dataAddress.address.ward,
                value: action.payload?.ward?.value,
            },
          },
        },
      }
    case 'FORM_ADDRESS_WARD_KEYWORD_UPDATE':
      return {
        ...state,
        dataAddress: {
            ...state.dataAddress,
            address: {
              ...state.dataAddress.address,
              ward: {
                ...state.dataAddress.address.ward,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
        },
      }
    case 'FORM_ADDRESS_UPDATE':
      return {
        ...state,
        dataAddress: {
          ...state.dataAddress,
          address: {
            ...state.dataAddress.address,
            value: action.payload?.value,
          },
        }
      }
    case 'SET_SHOPNAME_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          shopname: action.payload
        }
      }
    case 'SET_EMAIL_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          email: action.payload
        }
      }
    case 'SET_ADDRESS_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          address: action.payload
        }
      }
    case 'SET_CITY_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          city_id: action.payload
        }
      }
    case 'SET_DISTRICT_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          district_id: action.payload
        }
      }
    case 'SET_WARD_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          ward_id: action.payload
        }
      }
    case 'SET_BUSINESS_MAJORS_UPDATE':
      return {
        ...state,
        dataUpdate: {
          ...state.dataUpdate,
          business_major_id: action.payload
        }
      }
    default:
      return state;
  }
};

export default SurveyLoginReducer;
