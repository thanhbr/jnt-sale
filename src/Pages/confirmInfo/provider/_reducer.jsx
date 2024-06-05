import { currentPageActions } from './_actions'

export const reducer = (state, action) => {
  switch (action.type) {

    case currentPageActions.FORM_ADDRESS_DISTRICT_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              district: {
                ...state.form.info.address.district,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_DISTRICT_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              district: {
                ...state.form.info.address.district,
                value: action.payload?.district?.value,
              },
              ward: {
                ...state.form.info.address.ward,
                keyword: '',
                list: action.payload?.ward?.list,
                value: null,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_PROVINCE_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              province: {
                ...state.form.info.address.province,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_PROVINCE_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              province: {
                ...state.form.info.address.province,
                value: action.payload?.province?.value,
              },
              district: {
                ...state.form.info.address.district,
                keyword: '',
                list: action.payload?.district?.list,
                value: null,
              },
              ward: {
                ...state.form.info.address.ward,
                keyword: '',
                list: [],
                value: null,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_PROVINCE_RESET:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              province: {
                ...state.form.info.address.province,
                value: null,
              },
              district: {
                ...state.form.info.address.district,
                keyword: '',
                value: null,
              },
              ward: {
                ...state.form.info.address.ward,
                keyword: '',
                value: null,
              },
            },
          },
        },
      }
    case currentPageActions.FORM_ADDRESS_WARD_KEYWORD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              ward: {
                ...state.form.info.address.ward,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_WARD_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              ward: {
                ...state.form.info.address.ward,
                value: action.payload?.ward?.value,
              },
            },
          },
        },
      }

    case currentPageActions.FORM_ADDRESS_UPDATE:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            address: {
              ...state.form.info.address,
              value: action.payload?.value,
            },
          },
        },
      }

    case currentPageActions.SET_USER_SUGGEST_ADDRESS:
      return {
        ...state,
        form: {
          ...state.form,
          info: {
            ...state.form.info,
            suggestAddress: action.payload || [],
          },
        },
      }

    case currentPageActions.SET_VALIDATE_FORM:
      return {
        ...state,
        validate: {
          ...state.validate,
          ...action.payload,
        },
      }
    default:
      throw new Error()
  }
}
