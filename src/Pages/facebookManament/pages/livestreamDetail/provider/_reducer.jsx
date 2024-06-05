import { facebookLiveStreamDetailActions as actions } from './_actions'
import { orderSingleAction } from '../../../../orderSingle/provider/_actions'
import { FACEBOOK_CONSTANTS } from '../../../interfaces/_constants'
import { formatDatetime } from '../../../../../common/form/datePicker/_functions'
import { paymentDefaultDateTime } from '../../../../orderSingle/provider/_initialState'

export const FacebookLiveStreamDetailReducer = (state, action) => {
  switch (action.type) {
    case actions?.OPEN_MODAL_SETTING_DETAIL_LIVE_STREAM:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          openModal: action?.payload,
        },
      }
    case actions?.SETTING_DETAIL_LIVE_STREAM:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          settingDetail: action?.payload,
        },
      }
    case actions?.CONFIG_TOGGLE_TAG:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          activeTag: action?.payload,
        },
      }
    case actions?.CONFIG_LIST_PAGE_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            listPage: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_STATUS_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            autoHideComment: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_AUTO_COMMENT_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            listOption: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_UPDATE_TAGS:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            listKeyword: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_HEIGHT_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            height: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_CONTENT_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            content: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_AUTO_PRINT_UPDATE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagComment: {
            ...state.configLiveStream.tagComment,
            auto_print: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_TOGGLE_DROPDOWN_PAGE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            toggleDropdownPage: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_COMMENT_TEXT_DROPDOWN_PAGE:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            pageActive: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_SCRIPT_STATUS_AUTO_POST:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            autoPostScript: action?.payload,
          },
        },
      }
    case actions?.CONFIG_TAG_SCRIPT_LIST_AUTO_POST:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            autoPost: {
              ...state.configLiveStream.tagScript.autoPost,
              list: action?.payload,
            }
          },
        },
      }
    case actions?.CONFIG_TAG_SCRIPT_ACTIVE_AUTO_POST:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            autoPost: {
              ...state.configLiveStream.tagScript.autoPost,
              active: action?.payload,
            }
          },
        },
      }
    case actions?.CONFIG_TAG_SCRIPT_LOADING_POST:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          tagScript: {
            ...state.configLiveStream.tagScript,
            autoPost: {
              ...state.configLiveStream.tagScript.autoPost,
              loading: action?.payload,
            }
          },
        },
      }
    case actions?.CONFIG_CHANGE_DATA:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          change: action?.payload,
        },
      }
    case actions?.CONFIG_CONFIRM_OPEN_MODAL:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          confirmStatus: action?.payload,
        },
      }
    case actions?.UPDATE_STATUS_ORDER_SCRIPT:
      return {
        ...state,
        configLiveStream: {
          ...state.configLiveStream,
          orderScriptStatus: action.payload
        },
      }
    case 'UPDATE_LIVESTREAM':
      return {
        ...state,
        loadingOrigin: true,
        liveStream: {
          ...state.liveStream,
          display: {
            list: action?.payload?.list,
          },
        },
      }
    case 'SET_ORIGIN_LOADING':
      return {
        ...state,
        loadingOrigin: false,
      }
    case 'UPDATE_SOCKET_PRINTER':
      return {
        ...state,
        socketPrinter: action?.payload
      }
    case 'UPDATE_LIVESTREAM_DETAIL':
      return {
        ...state,
        liveStream: {
          ...state.liveStream,
          detail: action?.payload
        },
      }
    case 'UPDATE_TABLE_ROW':
      return {
        ...state,
        table: {
          ...state.table,
          display: {
            ...state.table.display,
            updateList: action?.payload?.display?.updateList,
          },
        },
      }

    case 'SET_LIVESTREAM_LOADING':
      return {
        ...state,
        liveStream: {
          ...state.liveStream,
          loading: action.payload,
        },
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_NOTIFY':
      return {
        ...state,
        notification: action.payload,
      }
    case 'SET_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          ...action.payload,
        },
      }
    case 'SET_META_LIVESTREAM':
      return {
        ...state,
        meta: {
          ...state.meta,
          ...action.payload,
        },
      }
    case 'SET_FILTER_TYPE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            type: action.payload,
          },
        },
      }
    case 'SET_FILTER_PAGE':
      return {
        ...state,
        page: {
          ...state.page,
          active: action.payload,
        },
      }
    case 'SET_FILTER_KEYWORD':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            keyword: action.payload,
          },
        },
      }
    case 'SET_FILTER_DATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            date: action.payload,
          },
        },
      }
    case 'SET_FILTER_STATUS_READ':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isRead: {
              ...state.filter.liveStream.isRead,
              ...action.payload,
            },
          },
        },
      }
    case 'SET_FILTER_GROUP_PERSON':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            groupPerson: action.payload,
          },
        },
      }
    case 'SET_FILTER_STATUS_ORDER':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            orderStatus: {
              ...state.filter.liveStream.orderStatus,
              ...action.payload,
            },
          },
        },
      }
    case 'SET_FILTER_ACTIVE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isRead: {
              ...state.filter.liveStream.isRead,
              active: state.filter.liveStream.isRead.id !== '' ? true : false,
            },
            isPhone: {
              ...state.filter.liveStream.isPhone,
              active: state.filter.liveStream.isPhone.id,
            },
            isStar: {
              ...state.filter.liveStream.isStar,
              active: state.filter.liveStream.isStar.id,
            },
            orderStatus: {
              ...state.filter.liveStream.orderStatus,
              active: state.filter.liveStream.orderStatus.id,
            },
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              active: state.filter.liveStream.tagsCustomer.value,
            },
          },
        },
      }
    case 'SET_FILTER_SELECTED':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isRead: {
              ...state.filter.liveStream.isRead,
              id: state.filter.liveStream.isRead.id,
            },
            isPhone: {
              ...state.filter.liveStream.isPhone,
              id: state.filter.liveStream.isPhone.active,
            },
            orderStatus: {
              ...state.filter.liveStream.orderStatus,
              id: state.filter.liveStream.orderStatus.active,
            },
            isStar: {
              ...state.filter.liveStream.isStar,
              id: state.filter.liveStream.isStar.active,
            },
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              value: state.filter.liveStream.tagsCustomer.active,
            },
          },
        },
      }

    case 'CLEAR_FILTER_STAR_COMMENT':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isStar: {
              name: 'Tất cả',
              active: 0,
              id: 0,
            },
          },
        },
      }

    case 'CLEAR_FILTER_PHONE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isPhone: {
              name: 'Tất cả',
              active: 0,
              id: 0,
            },
          },
        },
      }

    case 'CLEAR_FILTER_DATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            date: {
              start_date: '',
              end_date: '',
              value: '',
            },
          },
        },
      }

    case 'CLEAR_FILTER_READ_STATUS':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isRead: {
              name: 'Tất cả',
              active: false,
              id: '',
            },
          },
        },
      }

    case 'CLEAR_FILTER_ORDER_STATUS':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            orderStatus: {
              name: 'Tất cả',
              active: '',
              id: '',
            },
          },
        },
      }

    case 'CLEAR_FILTER_TAGS_CUSTOMER':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              active: [],
              value: [],
            },
          },
        },
      }

    case 'SET_FILTER_PHONE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isPhone: {
              ...state.filter.liveStream.isPhone,
              ...action.payload,
            },
          },
        },
      }

    case 'SET_FILTER_STAR_COMMENT':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            isStar: {
              ...state.filter.liveStream.isStar,
              ...action.payload,
            },
          },
        },
      }

    case 'FILTER_TAGS_CUSTOMER_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              list: action?.payload?.list,
              value: action.payload?.value || [],
            },
          },
        },
      }

    case 'FILTER_TAGS_CUSTOMER_TAB_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              keyword: '',
              tab: action.payload.tab,
              list: action.payload.list,
            },
          },
        },
      }

    case 'FILTER_TAGS_CUSTOMER_KEYWORD_UPDATE':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              keyword: action.payload.keyword,
              list: action.payload.list,
            },
          },
        },
      }
    case 'SET_TAGS_CUSTOMER':
      return {
        ...state,
        filter: {
          ...state.filter,
          liveStream: {
            ...state.filter.liveStream,
            tagsCustomer: {
              ...state.filter.liveStream.tagsCustomer,
              list: action.payload.tagsCustomer,
              listOrigin: action.payload.tagsCustomer,
            },
          },
        },
      }

    // DETAIL LIVESTREAM
    case 'SET_DETAIL_LIVESTREAM':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            ...action.payload,
          },
        },
      }

    case 'UPDATE_LOADING_LIVESTREAM':
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: action.payload,
        },
      }

    // add tags

    case 'SET_MODAL_ACTIVE':
      return {
        ...state,
        tags: {
          ...state.tags,
          active: action?.payload,
        },
      }

    case 'SET_FORM_DATA':
      return {
        ...state,
        tags: {
          ...state.tags,
          form: {
            ...state.tags.form,
            data: {
              stickerName: action?.payload?.stickerName || '',
              color: action?.payload?.color || '',
              id: action?.payload?.id || '',
            },
          },
        },
      }

    case 'SET_MODAL_CONFIRM':
      return {
        ...state,
        tags: {
          ...state.tags,
          status: {
            ...state.tags.status,
            confirm: action?.payload,
          },
        },
      }

    case 'SET_MODAL_ANIMATE':
      return {
        ...state,
        tags: {
          ...state.tags,
          animate: action?.payload,
        },
      }
    case 'SET_FORM_COLOR':
      return {
        ...state,
        tags: {
          ...state.tags,
          form: {
            ...state.tags.form,
            data: {
              ...state.tags.form.data,
              color: action?.payload?.color || '',
            },
          },
        },
      }
    case 'SET_FORM_NAME':
      return {
        ...state,
        tags: {
          ...state.tags,
          form: {
            ...state.tags.form,
            data: {
              ...state.tags.form.data,
              stickerName: action?.payload?.stickerName || '',
            },
          },
        },
      }
    case 'SET_FORM_VALIDATE_COLOR':
      return {
        ...state,
        tags: {
          ...state.tags,
          form: {
            ...state.tags.form,
            validate: {
              ...state.tags.form.validate,
              color: action?.payload?.color || '',
            },
          },
        },
      }
    case 'SET_FORM_VALIDATE_NAME':
      return {
        ...state,
        tags: {
          ...state.tags,
          form: {
            ...state.tags.form,
            validate: {
              ...state.tags.form.validate,
              stickerName: action?.payload?.stickerName || '',
            },
          },
        },
      }
    case 'SET_MODAL_CHANGE':
      return {
        ...state,
        tags: {
          ...state.tags,
          change: action?.payload,
        },
      }
    //Typing

    case 'SCRIPT_RESPONSE_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            typing: {
              ...state.detail.liveStream.typing,
              scriptResponse: {
                ...state.detail.liveStream.typing.scriptResponse,
                ...action.payload,
              },
            },
          },
        },
      }

    case 'SET_INPUT_TYPING':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            typing: {
              ...state.detail.liveStream.typing,
              text: {
                ...state.detail.liveStream.typing.text,
                ...action.payload,
              },
            },
          },
        },
      }

    case 'SET_INPUT_MESSAGE':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            message: {
              ...state.detail.liveStream.message,
              value: action.payload,
            },
          },
        },
      }

    case 'SET_MEDIA_TYPING':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            typing: {
              ...state.detail.liveStream.typing,
              media: {
                ...state.detail.liveStream.typing.media,
                ...action.payload,
              },
            },
          },
        },
      }

    case 'SET_MEDIA_MESSAGE':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            message: {
              ...state.detail.liveStream.message,
              media: {
                ...state.detail.liveStream.message.media,
                ...action.payload,
              },
            },
          },
        },
      }

    case 'SET_TAB_ACTIVE':
      return {
        ...state,
        detail: {
          ...state.detail,
          tabInfo: action.payload
        },
      }

    case 'SET_LOADING_MESSAGE':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            message: {
              ...state.detail.liveStream.message,
              loading: action.payload,
            },
          },
        },
      }

    case 'RESET_TYPING':
      return {
        ...state,
        detail: {
          ...state.detail,
          liveStream: {
            ...state.detail.liveStream,
            typing: {
              ...state.detail.liveStream.typing,
              media: {
                images: [],
                imageTemp: [],
                imageFiles: [],
              },
              text: {
                commentType: '',
                comment: {},
                type: '',
                value: '',
                search: false,
              },
            },
          },
          productInfo: {
            ...state.detail.productInfo,
            inventory: false,
            nonInventoryConfig: {
              manual: { value: '' },
            },
          },

          paymentInfo: {
            ...state.detail.paymentInfo,
            type: 'cod',
            method: {
              ...state.detail.paymentInfo.method,
              value: state.detail.paymentInfo.method.valueOrigin || null,
              keyword: '',
              loading: false,
              loadingMore: false,
            },
            money: 0,
            dateTime: {
              formatValue: formatDatetime(paymentDefaultDateTime),
              value: paymentDefaultDateTime,
            },
          },

          shippingInfo: {
            ...state.detail.shippingInfo,
            isStorePickUp: false,
            cod: 0,
            weight: 1,
            longs: 1,
            width: 1,
            height: 1,
            cargoInsurrance: {},
            note: {
              ...state.detail.shippingInfo.note,
              value: null,
              valueOrigin: null,
              keyword: '',
              loading: false,
              loadingMore: false,
            },
          },

          loading: false,
          tabInfo: 1,
        },
      }

    // Customer Infor
    case 'SET_CUSTOMER_LIST':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: action.payload || [],
          },
        },
      }
    case 'SET_CUSTOMER_VALID':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            isNotEnoughCustomerInfo: action.payload,
          },
        },
      }
    case 'SET_CUSTOMER_NAME_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              customer_name: action.payload || '',
            },
          },
        },
      }
    case 'SET_ADDRESS_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              customer_address: action.payload?.value || '',
            },
            address: {
              ...state.detail.customerInfor.address,
              value: action.payload?.value || '',
            },
          },
        },
      }
    case 'SET_ADDRESS_PROVINCE_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              city_id: action.payload?.city_id || '',
            },
            address: {
              ...state.detail.customerInfor.address,
              province: {
                ...state.detail.customerInfor.address.province,
                value: action?.payload?.province?.value || null,
              },
              district: {
                ...state.detail.customerInfor.address.district,
                keyword: '',
                list: action.payload?.district?.list,
                value: action?.payload?.district?.value || null,
              },
              ward: {
                ...state.detail.customerInfor.address.ward,
                keyword: '',
                list: [],
                value: null,
              },
            },
          },
        },
      }
    case 'SET_ADDRESS_DISTRICT_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              district_id: action.payload?.district_id || '',
            },
            address: {
              ...state.detail.customerInfor.address,
              district: {
                ...state.detail.customerInfor.address.district,
                value: action.payload?.district?.value,
              },
              ward: {
                ...state.detail.customerInfor.address.ward,
                keyword: '',
                list: action.payload?.ward?.list,
                value: action.payload?.ward?.value,
              },
            },
          },
        },
      }
    case 'SET_ADDRESS_WARD_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              ward_id: action.payload?.ward_id || '',
            },
            address: {
              ...state.detail.customerInfor.address,
              ward: {
                ...state.detail.customerInfor.address.ward,
                value: action.payload?.ward?.value,
              },
            },
          },
        },
      }
    case 'SET_ADDRESS_PROVINCE_KEYWORD_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            address: {
              ...state.detail.customerInfor.address,
              province: {
                ...state.detail.customerInfor.address.province,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }
    case 'SET_ADDRESS_DISTRICT_KEYWORD_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            address: {
              ...state.detail.customerInfor.address,
              district: {
                ...state.detail.customerInfor.address.district,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }
    case 'SET_ADDRESS_WARD_KEYWORD_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            address: {
              ...state.detail.customerInfor.address,
              ward: {
                ...state.detail.customerInfor.address.ward,
                list: action.payload?.list,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }
    case 'SET_CUSTOMER_PHONE_LIST':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            listPhone: action.payload || [],
          },
        },
      }
    case 'SET_CUSTOMER_ADDRESS_LIST':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            listAddress: action.payload || [],
          },
        },
      }
    case 'SET_CUSTOMER_ORDER_LIST':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            listOrder: action.payload || [],
          },
        },
      }
    case 'SET_CUSTOMER_MOBILE_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              customer_mobile: action.payload || '',
            },
          },
        },
      }
    case 'SET_CUSTOMER_NOTES_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              customer_notes: action.payload || '',
            },
          },
        },
      }
    case 'SET_CUSTOMER_TOTAL_REPORTS':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            total_reports: action.payload || 0,
          },
        },
      }
    case 'SET_LIST_REPORT':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list_report: action.payload || [],
          },
        },
      }
    case 'SET_ADDRESS_SPLIT_UPDATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            list: {
              ...state.detail.customerInfor.list,
              customer_mobile: action.payload || '',
            },
          },
        },
      }
    case 'UPDATE_PAGE_LOAD_MORE':
      return {
        ...state,
        liveStream: {
          ...state.liveStream,
          page: action.payload,
        },
      }
    case 'SET_LIVESTREAM_LOADING_MORE':
      return {
        ...state,
        liveStream: {
          ...state.liveStream,
          loading: action.payload,
        },
      }
    case 'UPDATE_PAGE_POST_LOAD_MORE':
      return {
        ...state,
        filter: {
          ...state.filter,
          conversation: {
            ...state.filter.conversation,
            post: {
              ...state.filter.conversation.post,
              page: action.payload,
            },
          },
        },
      }
    case 'SET_CUSTOMER_SUGGEST_ADDRESS':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            suggestAddress: action.payload || [],
          },
        },
      }
    case 'SET_CUSTOMER_DISABLED_NAME':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            disabledNameDefault: action.payload,
          },
        },
      }
    case 'SET_FORM_VALIDATE_CUSTOMER_NAME':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            validate: {
              ...state.detail.customerInfor.validate,
              customer_name: action.payload || false,
            },
          },
        },
      }
    case 'SET_FORM_VALIDATE_CUSTOMER_MOBILE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            validate: {
              ...state.detail.customerInfor.validate,
              customer_mobile: action.payload || false,
            },
          },
        },
      }
    case 'SET_FORM_VALIDATE_CUSTOMER_NOTES':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            validate: {
              ...state.detail.customerInfor.validate,
              customer_notes: action.payload || false,
            },
          },
        },
      }
    case 'RESET_VALIDATE_FORM_CUSTOMER':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            validate: {
              ...state.detail.customerInfor.validate,
              customer_name: false,
              customer_mobile: {status: false,message:''},
              customer_notes: false,
            },
            errorSeparate: false,
          },
        },
      }
    case 'SET_ERROR_SEPARATE':
      return {
        ...state,
        detail: {
          ...state.detail,
          customerInfor: {
            ...state.detail.customerInfor,
            errorSeparate: action.payload || false,
          },
        },
      }
      
      case actions.WAREHOUSE_LIST_ORIGIN_UPDATE:
        return {
          ...state,
          detail: {
            ...state.detail,
            productInfo: {
              ...state.detail.productInfo,
              inventoryConfig: {
                ...state.detail.productInfo.inventoryConfig,
                warehouse: {
                  ...state.detail.productInfo.inventoryConfig.warehouse,
                  list: action.payload?.list,
                  value: action.payload?.value,
                  valueOrigin: action.payload?.value,
                  pagination: {
                    ...state.detail.productInfo.inventoryConfig.warehouse
                      .pagination,
                    page: action.payload?.pagination?.page,
                    total: action.payload?.pagination?.total,
                  },
                },
              },
            },
          },
        }

    case actions.PRODUCT_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                list: action.payload?.list,
                pagination: {
                  ...state.detail.productInfo.inventoryConfig.product
                    .pagination,
                  page: action.payload?.pagination?.page,
                  total: action.payload?.pagination?.total,
                },
              },
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              list: action.payload?.list,
              value: action.payload?.value,
              valueOrigin: action.payload?.value,
              pagination: {
                ...state.detail.paymentInfo.method.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.SHIPPING_POINT_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              list: action.payload?.list,
              value: action.payload?.value,
              valueOrigin: action.payload?.value,
              pagination: {
                ...state.detail.shippingInfo.shippingPoint.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.NOTE_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              list: action.payload?.list,
              keyword: action.payload?.value?.name || '',
              value: action.payload?.value,
              valueOrigin: action.payload?.value,
              pagination: {
                ...state.detail.shippingInfo.note.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.SHIPPING_PARTNER_LIST_ORIGIN_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              list: action.payload?.list,
              value: action.payload?.value,
              valueOrigin: action.payload?.value,
              config: action.payload?.config,
            },
          },
        },
      }

    case actions.ORDER_PRODUCT_NON_INVENTORY_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            nonInventoryConfig: {
              ...state.detail.productInfo.nonInventoryConfig,
              manual: {
                ...state.detail.productInfo.nonInventoryConfig.manual,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case actions.ORDER_PRODUCT_INVENTORY_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventory: !state.detail.productInfo.inventory,
          },
        },
      }

    case actions.WAREHOUSE_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              warehouse: {
                ...state.detail.productInfo.inventoryConfig.warehouse,
                list: action.payload?.list,
                pagination: {
                  ...state.detail.productInfo.inventoryConfig.warehouse
                    .pagination,
                  page: action.payload?.pagination?.page,
                  total: action.payload?.pagination?.total,
                },
              },
            },
          },
        },
      }

    case actions.WAREHOUSE_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              warehouse: {
                ...state.detail.productInfo.inventoryConfig.warehouse,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case actions.WAREHOUSE_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              warehouse: {
                ...state.detail.productInfo.inventoryConfig.warehouse,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case actions.WAREHOUSE_LOADING_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              warehouse: {
                ...state.detail.productInfo.inventoryConfig.warehouse,
                loading: action.payload?.loading,
              },
            },
          },
        },
      }

    case actions.WAREHOUSE_LOADING_MORE_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              warehouse: {
                ...state.detail.productInfo.inventoryConfig.warehouse,
                loadingMore: action.payload?.loading,
              },
            },
          },
        },
      }

    case actions.PRICE_POLICY_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              pricePolicy: {
                ...state.detail.productInfo.inventoryConfig.pricePolicy,
                list: action.payload?.list,
              },
            },
          },
        },
      }

    case actions.PRICE_POLICY_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              pricePolicy: {
                ...state.detail.productInfo.inventoryConfig.pricePolicy,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case actions.PRICE_POLICY_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              pricePolicy: {
                ...state.detail.productInfo.inventoryConfig.pricePolicy,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case actions.PRODUCT_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                list: action.payload?.list,
                pagination: {
                  ...state.detail.productInfo.inventoryConfig.product
                    .pagination,
                  page: action.payload?.pagination?.page,
                  total: action.payload?.pagination?.total,
                },
              },
            },
          },
        },
      }

    case actions.PRODUCT_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                value: action.payload?.value,
              },
            },
          },
        },
      }

    case actions.PRODUCT_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                keyword: action.payload?.keyword,
              },
            },
          },
        },
      }

    case actions.PRODUCT_LOADING_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                loading: action.payload?.loading,
              },
            },
          },
        },
      }

    case actions.PRODUCT_LOADING_MORE_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                loadingMore: action.payload?.loading,
              },
            },
          },
        },
      }

    case actions.PRODUCT_TOTAL_DISCOUNT_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          productInfo: {
            ...state.detail.productInfo,
            inventoryConfig: {
              ...state.detail.productInfo.inventoryConfig,
              product: {
                ...state.detail.productInfo.inventoryConfig.product,
                discount_value: action.payload?.value,
                discountType: action.payload?.type,
              },
            },
          },
        },
      }

    case actions.PAYMENT_TYPE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            type: action.payload?.type,
          },
        },
      }

    case actions.PAYMENT_MONEY_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            money: action.payload?.money,
          },
        },
      }

    case actions.PAYMENT_DATE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            dateTime: {
              ...state.detail.paymentInfo.dateTime,
              ...action.payload,
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              list: action.payload?.list,
              pagination: {
                ...state.detail.paymentInfo.method.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              value: action.payload?.value,
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_LOADING_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case actions.PAYMENT_METHOD_LOADING_MORE_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentInfo: {
            ...state.detail.paymentInfo,
            method: {
              ...state.detail.paymentInfo.method,
              loadingMore: action.payload?.loading,
            },
          },
        },
      }

    case actions.SHIPPING_COD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            cod: action.payload,
          },
        },
      }

    case actions.SHIPPING_WEIGHT_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            weight: action.payload?.weight,
          },
        },
      }

    case actions.SHIPPING_INSURRANCE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            cargoInsurrance: {
              ...state.detail.shippingInfo.cargoInsurrance,
              ...action.payload
            },
          },
        },
      }

    case actions.SHIPPING_HEIGHT_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            height: action.payload?.height,
          },
        },
      }

    case actions.SHIPPING_LENGTH_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            longs: action.payload?.longs,
          },
        },
      }

    case actions.SHIPPING_WIDTH_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            width: action.payload?.width,
          },
        },
      }

    case actions.SHIPPING_POINT_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              list: action.payload?.list,
              pagination: {
                ...state.detail.shippingInfo.shippingPoint.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.SHIPPING_POINT_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              value: action.payload?.value,
            },
          },
        },
      }

    case actions.SHIPPING_POINT_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case actions.SHIPPING_POINT_LOADING_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case actions.SHIPPING_POINT_LOADING_MORE_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPoint: {
              ...state.detail.shippingInfo.shippingPoint,
              loadingMore: action.payload?.loading,
            },
          },
        },
      }

    case actions.NOTE_LIST_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              list: action.payload?.list,
              pagination: {
                ...state.detail.shippingInfo.note.pagination,
                page: action.payload?.pagination?.page,
                total: action.payload?.pagination?.total,
              },
            },
          },
        },
      }

    case actions.NOTE_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              value: action.payload?.value,
            },
          },
        },
      }

    case actions.NOTE_KEYWORD_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              keyword: action.payload?.keyword,
            },
          },
        },
      }

    case actions.NOTE_LOADING_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              loading: action.payload?.loading,
            },
          },
        },
      }

    case actions.NOTE_LOADING_MORE_TOGGLE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            note: {
              ...state.detail.shippingInfo.note,
              loadingMore: action.payload?.loading,
            },
          },
        },
      }

    case actions.SHIPPING_PARTNER_VALUE_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              value: action.payload?.value,
            },
          },
        },
      }

    case actions.CONFIG_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              config: {
                ...state.detail.shippingInfo.shippingPartner.config,
                ...action.payload?.config,
              },
            },
          },
        },
      }
    // ======================================================================================
    // SHIPPING PARTNER
    // ======================================================================================
    case actions.UPDATE_LIST_SHIPPING_PARTNER:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              list:
                action.payload?.list ||
                state.detail.shippingInfo.shippingPartner?.list,
              listOrigin:
                action.payload?.listOrigin ||
                state.detail.shippingInfo.shippingPartner?.listOrigin,
            },
          },
        },
      }
    case actions.RESET_LIST_SHIPPING_FEE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,

            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              list: [],
            },
          },
        },
      }
    case actions.UPDATE_LIST_SHIPPING_FEE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              list: action.payload?.list,
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_FEE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              list: action.payload?.list,
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_SELECTED:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              selected: action.payload,
            },
          },
        },
      }
    case actions.SET_SHIPPING_PARTNER_DEFAULT:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              default: action.payload,
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_INFO:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              ...action.payload,
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_PICKUP:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                requestPickUp: action.payload.optionValue,
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_STATUS:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                cargoInsurrance: {
                  ...state.detail.shippingInfo.shippingPartner.optionValue
                    .cargoInsurrance,
                  active:
                    !state.detail.shippingInfo.shippingPartner.optionValue
                      .cargoInsurrance.active,
                },
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_INSURRANCE_VALUE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                cargoInsurrance: {
                  ...state.detail.shippingInfo.shippingPartner.optionValue
                    .cargoInsurrance,
                  value: action.payload.value,
                },
              },
            },
          },
        },
      }
    case actions.SET_VALUE_PACKAGE_QUANTITY:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                packageQuantity: action.payload.value || 1,
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_REQUEST:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                requestDelivery: action.payload.optionValue,
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_SHIPPING_METHOD:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                shippingMethod: action.payload.optionValue,
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_PICKUPSHIFT:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                pickUpShift: action.payload.optionValue,
              },
            },
          },
        },
      }
    case actions.FORM_SHIPPING_DATETIME_UPDATE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                pickUpDate: action.payload,
              },
            },
          },
        },
      }
    case actions.UPDATE_SHIPPING_PARTNER_OPTION_PARTSIGN:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              optionValue: {
                ...state.detail.shippingInfo.shippingPartner.optionValue,
                partSign:
                  !state.detail.shippingInfo.shippingPartner.optionValue.partSign,
              },
            },
          },
        },
      }
    case actions.UPDATE_LIST_DELIVERY_NOTE:
      return {
        ...state,
        deliveryNote: action.payload,
      }
    case actions.UPDATE_SHIPPING_INFO:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            cod:
              action.payload?.cod !== undefined
                ? action.payload?.cod
                : state.detail.shippingInfo.cod,
            weight:
              action.payload?.weight !== undefined
                ? action.payload?.weight
                : state.detail.shippingInfo.weight,
            deliveryNote:
              action.payload?.deliveryNote !== undefined
                ? action.payload?.deliveryNote
                : state.detail.shippingInfo.deliveryNote,
            longs:
              action.payload?.size?.longs !== undefined
                ? action.payload?.size?.longs
                : state.detail.shippingInfo.longs,
            width:
              action.payload?.size?.width !== undefined
                ? action.payload?.size?.width
                : state.detail.shippingInfo.width,
            height:
              action.payload?.size?.height !== undefined
                ? action.payload?.size?.height
                : state.detail.shippingInfo.height,
          },
        },
      }
    case actions.SET_COLLAPSE_SHIPING:
      return {
        ...state,
        collapseStatus: action.payload,
      }

    case actions.UPDATE_SHIPPING_INFO_PICK_UP_STORE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            isStorePickUp: !state.detail.shippingInfo.isStorePickUp,
          },
        },
      }
    case actions.SET_VALIDATE_FORM:
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
    case actions.SET_VALIDATE_SHIPPING_PARTNER:
      return {
        ...state,
        validate: {
          ...state.validate,
          shippingPartner: action.payload,
        },
      }
    case actions.SET_VALIDATE_INSURRANCE:
      return {
        ...state,
        validate: {
          ...state.validate,
          cargoInsurrance: action.payload,
        },
      }
    case actions.SET_VALIDATE_WEIGHT:
      return {
        ...state,
        validate: {
          ...state.validate,
          weight: action.payload,
        },
      }
    case actions.SET_VALIDATE_COD:
      return {
        ...state,
        validate: {
          ...state.validate,
          cod: action.payload,
        },
      }
    case actions.SET_VALIDATE_PRODUCT_INFOR:
      return {
        ...state,
        validate: {
          ...state.validate,
          productValidate: action.payload,
        },
      }
    case 'UPDATE_LOADING' :
      return {
        ...state,
        loading: action?.payload,
      }

    case 'UPDATE_LOADING_FEE':
      return {
        ...state,
        loadingFee: action?.payload,
      }

    case 'UPDATE_COLLECT_TRIGGER':
      return {
        ...state,
        triggerCollectDefault: action.payload,
      }

    case actions.SET_SHIPPING_SERVICE:
      return {
        ...state,
        detail: {
          ...state.detail,
          shippingInfo: {
            ...state.detail.shippingInfo,
            shippingPartner: {
              ...state.detail.shippingInfo.shippingPartner,
              service: action.payload,
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
    case orderSingleAction.SET_VALIDATE_SHIPPING_PARTNER:
      return {
        ...state,
        validate: {
          ...state.validate,
          shippingPartner: action.payload,
        },
      }
    case actions.EXTRA_SORT_TITLE:
      return{
        ...state,
        extraSort: action.payload
      }
    case actions.SET_PAGE_DETAILS:
      return{
        ...state,
        page: {
          ...state.page,
          detail: action.payload
        }
      }
    case actions.SET_OTHER_LIVE_STREAM:
      return {
        ...state,
        otherLiveStream:{
           ...state.otherLiveStream,
          display: {
            ...state.otherLiveStream.display,
            list: action.payload?.display?.list || [],
            loading:action.payload?.display?.loading,
          },
          pagination: {
            ...state.otherLiveStream.pagination,
            total: Math.ceil(
                action.payload.pagination.totalItems /
                state.otherLiveStream.pagination.amount,
            ),
            totalItems: action.payload.pagination.totalItems,
          },
        }
      }
    case actions.SET_OPEN_MODAL:
      return {
        ...state,
        otherLiveStream:{
          ...state.otherLiveStream,
         ...action.payload
        }
      }
    case actions.SET_CHECK_OTHER_LIVE_STREAM:
      return{
        ...state,
        otherLiveStream:{
          ...state.otherLiveStream,
          ...action.payload
        }
      }
    case actions.SET_SEARCH_OTHER_LIVE_STREAM:
      return{
        ...state,
        otherLiveStream:{
          ...state.otherLiveStream,
          ...action.payload
        }
      }

      //mini game
    case actions.OPEN_MODAL_SETTING_MINI_GAME:
      return{
        ...state,
        miniGame:{
          ...state.miniGame,
          open:action.payload,
        }
      }
    case actions.SETTING_CONDITION_MINI_GAME:
      return{
        ...state,
        miniGame:{
          ...state.miniGame,
          ...action.payload
        }
      }
    case actions.SET_START_DATE_TIME:
      return {
        ...state,
        miniGame:{
          ...state.miniGame,
          time:{
            ...state.miniGame?.time,
            start:action.payload?.start,
            end : action.payload?.end
          },
          miniGame_id: action.payload?.miniGame_id,
          createTime: action.payload?.createTime
        }
      }
    case actions.RESET_SETTING_MINI_GAME:
      return{
        ...state,
        setting:{
          ...state.setting,
          participation:{
            type:action.payload? +action.payload.cond_participation === 1 ?'all comments' : 'comments with phone': 'all comments',
            cond: action.payload?+action.payload.cond_participation: 0,
          },
          priority:{
            type:action.payload? +action.payload.cond_priority === 0 ? +action.payload.priority === 1 ? 'priority with comments' : 'non priority' : 'priority with phone':'non priority',
            cond:action.payload? +action.payload.cond_priority : 0,
          },
          winner:{
            type:action.payload? +action.payload.cond_winner === 0 ? 'non winner' : 'repeat winner':'non winner',
            cond:action.payload? +action.payload.cond_winner: 0,
          },
          time:{
            type: action.payload?+action.payload.cond_time.status === 0 ?'full time' :'period time':'full time',
            status:action.payload?+action.payload.cond_time.status:0,
            start:action.payload?action.payload?.cond_time.dt_start:'',
            end:action.payload?action.payload?.cond_time.dt_end:''
          },
        },

      }
    case actions.SETTING_MINI_GAME_TIME:
      return{
        ...state,
        miniGame:{
          ...state.miniGame,
          time:{
            ...state.miniGame.time,
            ...action.payload,
          }
        }
      }
    case actions.SET_SUBMIT_BUTTON:
      return{
        ...state,
        miniGame:{
          ...state.miniGame,
          submit:action.payload
        }
      }
    case 'SET_DETAIL_MINI_GAME_LIVE_STREAM':
      return{
        ...state,
        miniGame:{
          ...state.miniGame,
          miniGameDetail:action.payload
        }
      }
    default:
      throw new Error()
  }
}
