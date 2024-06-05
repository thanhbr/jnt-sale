const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDER_TAB":
      return {
        ...state,
        OrderTab: action.payload,
      };
    case "UPDATE_LIST":
      return {
        ...state,
        List: {
          ...state.list,
          ...action.payload,
        },
      };
    case "SET_DETAIL_TAB":
      return {
        ...state,
        DetailTab: action.payload,
      };
    case "SET_STATUS_FILTER":
      return {
        ...state,
        isOpenFilter: action.payload,
      };
    case "SET_STRING_VALUE":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          string_querry: {
            ...state.ObjectFilter.string_querry,
            value: action.payload,
          },
        },
      };
    case "SET_STRING_FIELD":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          string_querry: {
            ...state.ObjectFilter.string_querry,
            field: action.payload,
          },
        },
      };
    case "SET_RANGE_DATE":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          date_querry: {
            ...state.ObjectFilter.date_querry,
            range: action.payload,
          },
        },
      };
    case "SET_RANGE_TYPE":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          date_querry: {
            ...state.ObjectFilter.date_querry,
            field: action.payload,
          },
        },
      };
    case "SET_DATE_TEXT":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          date_querry: {
            ...state.ObjectFilter.date_querry,
            text: action.payload,
          },
        },
      };
    // case "SET_FILTER":
    case "SET_SELECT_FILTER": // field and value of filter dropdown
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          ...action.payload,
        },
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        listFilter: action.payload,
      };
    case "CANCEL_FILTER":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          ...{
            warehouse_id: "",
            shipping_partner: "",
            shipping_status: "",
            order_source: "",
            employee: "",
          },
        },
      };
    case "SELECT_FILTER":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          ...action.payload,
        },
      };
    case "UPDATE_ORDER_GRID":
      return {
        ...state,
        dataGrid: action.payload,
      };
    case "UPDATE_SEARCH_STATUS":
      return {
        ...state,
        search: action.payload,
      };
    case "UPDATE_ALL_PAGE":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          ...{
            all_page: action.payload,
          },
        },
      };
    case "UPDATE_OBJ_PAGE":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          page_obj: {
            ...state.ObjectFilter.page_obj,
            ...action.payload,
          },
        },
      };
    case "UPDATE_TOTAL":
      return {
        ...state,
        ObjectFilter: {
          ...state.ObjectFilter,
          ...{
            totals: action.payload,
          },
        },
      };
    case "CHANGE_PRICE_BOARD":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          price_board: action.payload,
        },
      };
    case "SHOW_MODAL":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          showModal: action.payload,
        },
      };
    case "CHANGE_AREA":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: {
            ...state.new_order.client_info,
            area: action.payload,
          },
        },
      };
    case "CHANGE_WARD":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: {
            ...state.new_order.client_info,
            ward: action.payload,
          },
        },
      };

    case "UPDATE_GRID_DATA_NEW_ORDER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          product_info: action.payload,
        },
      };
    case "UPDATE_LIST_SHIPPING_PARTER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          shipping_info: {
            ...state.new_order.shipping_info,
            partner: action.payload,
          },
        },
      };
    case "CHANGE_SHIPPING_PARTNER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          shipping_info: {
            ...state.new_order.shipping_info,
            isSelected: action.payload,
          },
        },
      };
    case "CHANGE_SALE_LOCATION":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          shipping_info: {
            ...state.new_order.shipping_info,
            saleAt: action.payload,
          },
        },
      };
    case "UPDATE_ORGIGIN_NEW_ORDER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          order_info: {
            ...state.new_order.order_info,
            origin: action.payload,
          },
        },
      };
    case "UPDATE_NOTE_NEW_ORDER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          order_info: {
            ...state.new_order.order_info,
            note: action.payload,
          },
        },
      };
    case "UPDATE_CODE_NEW_ORDER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          order_info: {
            ...state.new_order.order_info,
            orderCode: action.payload,
          },
        },
      };
    case "CHANGE_DETAIL_SHIPPING_NEW_ORDER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          shipping_info: {
            ...state.new_order.shipping_info,
            partner: {
              ...state.new_order.shipping_info.partner,
              [action.payload.field]: {
                ...state.new_order.shipping_info.partner[action.payload.field],
                ...{ [action.payload.value]: action.payload.data },
              },
            },
            // isSelected: action.payload,
          },
        },
      };
    case "UPDATE_SHIPPING_SERVICE":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          shipping_info: {
            ...state.new_order.shipping_info,
            serviceSelected: {
              ...state.new_order.shipping_info.serviceSelected,
              [action.payload.field]: action.payload.data,
            },
            // isSelected: action.payload,
          },
        },
      };
    case "UPDATE_MESSAGE":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          message: {
            ...state.new_order.message,
            ...action.payload,
          },
        },
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          message: {},
        },
      };

    case "UPDATE_NAME":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: {
            ...state.new_order.client_info,
            name: action.payload,
          },
        },
      };
    case "UPDATE_PHONE":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: {
            ...state.new_order.client_info,
            mobile: action.payload,
          },
        },
      };
    case "UPDATE_ADDRESS":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: {
            ...state.new_order.client_info,
            address: action.payload,
          },
        },
      };
    case "UPDATE_ALL_INFO_CUSTOMER":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          client_info: action.payload,
        },
      };
    case "CHANGE_NEW_ORDER_WAREHOUSE":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          warehouse: action.payload,
        },
      };
    case "UPDATE_CONTACT_START":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          contact: { ...state.new_order.contact, start: action.payload },
        },
      };
    case "UPDATE_DATA_EDIT":
      return {
        ...state,
        new_order: action.payload,
      };
    case "UPDATE_LIST_ORDER_SELECTED":
      return {
        ...state,
        listOrderSelected: action.payload,
      };
    case "UPDATE_ALL_TRANPORT":
      return {
        ...state,
        new_order: {
          ...state.new_order,
          contact: { ...state.new_order.contact, start: action.payload },
        },
      };
    case "TOGGLE_FILTER__ADVANCE":
      return {
        ...state,
        showFilterAdvance: !state.showFilterAdvance
      };
    case "TOGGLE_ORDER_FILTER":
      return {
        ...state,
        showOrderFilter: !state.showOrderFilter
      }
    case "SET_META":
      return {
        ...state,
        meta: {...state.meta, ...action.payload}
      }
    case "SET_PAGE":
      return {
        ...state,
        meta: {...state.meta, start: action.payload}
      }
    case "SET_PER_PAGE":
      return {
        ...state,
        meta: {...state.meta, per_page: action.payload}
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }
    case "SET_LOADING_PANEL":
      return {
        ...state,
        loadingPanel: action.payload
      }
    case "SET_LOAD_DETAIL":
      return {
        ...state,
        loadDetail: !state.loadDetail
      }
    case "UPDATE_GROUP_FILTER":
      return {
        ...state,
        group: {
          ...state.group,
          ...action.payload
        },
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case "SET_CHIP_FILTER":
      return {
        ...state,
        chipFilter: state.filter
      };
    case "SET_APPLY_SEARCH":
      return {
        ...state,
        applySearch: !state.applySearch
      };
    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};

export default OrderReducer;
