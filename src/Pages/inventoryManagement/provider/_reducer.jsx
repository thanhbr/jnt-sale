import {InventoryState} from "./_infiniteState";
import {getDateFromNow} from "../../deliveryManagement/utils/date";
import {formatDatetime} from "../../../common/form/datePicker/_functions";
import {
    ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES
} from "../../deliveryManagement/interfaces/_constants";
import {InventoryAction} from "./_action";
import {INVENTORY_FILTER_TAG_FIELDS} from "../interfaces/_const";

const dateTimeDefaultValue = [
    getDateFromNow(-7),
    getDateFromNow(0, {type: 'end'}),
]
export const formatDateTimeDefaultValue = `${formatDatetime(
    dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`
export const InventoryReducer = (state = InventoryState, action) => {
    switch (action.type) {
        case InventoryAction.FOCUS_INPUT:
            return {
                ...state,
                focusInputOnSuccess: action.payload
            }
        case InventoryAction.FILTER_ADVANCED_SEARCH_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    advancedSearch: {
                        ...state.filter.advancedSearch,
                        customer: {
                            ...state.filter.advancedSearch.customer,
                            keyword:
                                typeof action.payload?.customer?.keyword === 'string'
                                    ? action.payload.customer.keyword
                                    : state.filter.advancedSearch.customer.keyword,
                            value:
                                typeof action.payload?.customer?.value === 'string'
                                    ? action.payload.customer.value
                                    : state.filter.advancedSearch.customer.value,
                        },
                        itemDetails:
                            typeof action.payload?.itemDetails === 'string'
                                ? action.payload.itemDetails
                                : state.filter.advancedSearch.itemDetails,
                    },
                },
            }

        case InventoryAction.FILTER_DATE_TIME_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        end: action.payload?.end,
                        start: action.payload?.start,
                        type: action.payload?.type,
                        value: action.payload?.value,
                    },
                },
            }

        case InventoryAction.FILTER_ACTIVE_DATE_TIME_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        activeValue: {
                            ...state.filter.dateTime.activeValue,
                            end: action.payload?.end,
                            start: action.payload?.start,
                            type: action.payload?.type,
                            value: action.payload?.value,
                        }
                    },
                },
            }

        case InventoryAction.FILTER_PRINT_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    print: {
                        ...state.filter.print,
                        value: action.payload?.value || null,
                        keyword: action.payload?.value?.name || '',
                    },
                },
            }
        case InventoryAction.FILTER_ORIGIN_DATA_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employee: {
                        ...state.filter.employee,
                        list: action.payload.employee.list,
                        listOrigin: action.payload.employee.list,
                        type: {
                            ...state.filter.employee.type,
                            list: action.payload.employee.type.list,
                        },
                    },
                    warehouse: {
                        ...state.filter.warehouse,
                        list: action.payload.warehouse.list,
                        listOrigin: action.payload.warehouse.list,
                    },
                },
            }
        case InventoryAction.FILTER_WAREHOUSE_KEYWORD_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    warehouse: {
                        ...state.filter.warehouse,
                        keyword: action.payload.keyword,
                        list: action.payload.list,
                    },
                },
            }
        case InventoryAction.FILTER_WAREHOUSE_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    warehouse: {
                        ...state.filter.warehouse,
                        value: action.payload?.value || null,
                    },
                },
            }
        case InventoryAction.FILTER_PRODUCT_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    product: {
                        ...state.filter.product,
                        tab: action.payload.tab,
                        list: action.payload.list,
                    },
                },
            }

        case InventoryAction.FILTER_SEARCH_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    search: {
                        ...state.filter.search,
                        value: action.payload.value || '',
                    },
                },
            }

        case InventoryAction.FILTER_PRINT_KEYWORD_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    print: {
                        ...state.filter.print,
                        keyword: action.payload.keyword,
                        list: action.payload.list,
                    },
                },
            }

        case InventoryAction.FILTER_SHIPPING_STATUS_KEYWORD_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        keyword: action.payload.keyword,
                        list: action.payload.list,
                    },
                },
            }

        case InventoryAction.FILTER_SHIPPING_STATUS_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        tab: action.payload.tab,
                        list: action.payload.list,
                    },
                },
            }

        case InventoryAction.FILTER_SHIPPING_STATUS_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        // list: action?.payload?.list,
                        value: action.payload?.value || [],
                    },
                },
            }

        case InventoryAction.NOTIFICATIONS_LIST_UPDATE:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    list: action.payload?.notifications?.list || [],
                    total: action.payload?.notifications?.total || '',
                },
            }

        case InventoryAction.FILTER_SHIPPING_STATUS_LIST_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        list: action.payload,
                        listOrigin: action.payload,
                    },
                },
            }

        case InventoryAction.OTHER_FILTER_APPLY:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        activeValue: {
                            end: state.filter.dateTime.end,
                            start: state.filter.dateTime.start,
                            type: state.filter.dateTime.type,
                            value: state.filter.dateTime.value,
                        },
                    },
                    employee: {
                        ...state.filter.employee,
                        activeValue: {
                            type: state.filter.employee.type.value,
                            value: state.filter.employee.value,
                        },
                    },
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        activeValue: state.filter.shippingStatus.value,
                    },
                    warehouse: {
                        ...state.filter.warehouse,
                        activeValue: state.filter.warehouse.value,
                    },
                },
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        list: action.payload?.display?.list || [],
                        arr_details: action.payload?.display?.arr_details || {},
                    },
                    pagination: {
                        ...state.table.pagination,
                        active: action.payload?.pagination?.active,
                        amount: action.payload?.pagination?.amount,
                        total: action.payload?.pagination?.total,
                        totalItems: action.payload?.pagination?.totalItems,
                    },
                },
            }

        case InventoryAction.FILTER_EMPLOYEE_KEYWORD_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employee: {
                        ...state.filter.employee,
                        keyword: action.payload.keyword,
                        list: action.payload.list,
                        type: {
                            ...state.filter.employee.type,
                            value: action.payload.type?.value,
                        },
                    },
                },
            }

        case InventoryAction.FILTER_EMPLOYEE_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employee: {
                        ...state.filter.employee,
                        list: action.payload.list,
                        value: action.payload.value,
                    },
                },
            }

        case InventoryAction.FILTER_EMPLOYEE_CATEGORY_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employee: {
                        ...state.filter.employee,
                        keyword: '',
                        list: action.payload?.list,
                        tab: 'all',
                        type: {
                            ...state.filter.employee.type,
                            value: action.payload?.type?.value,
                        },
                        value: [],
                    },
                },
            }

        case InventoryAction.FILTER_EMPLOYEE_TAB_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    employee: {
                        ...state.filter.employee,
                        keyword: '',
                        tab: action.payload.tab,
                        list: action.payload.list,
                    },
                },
            }

        case InventoryAction.TABLE_AMOUNT_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        list: action.payload?.display?.list || [],
                        arr_details: action.payload?.display?.arr_details || {},
                    },
                    pagination: {
                        ...state.table.pagination,
                        active: action.payload?.pagination?.active,
                        amount: action.payload?.pagination?.amount,
                        total: action.payload?.pagination?.total,
                    },
                },
            }

        case InventoryAction.TABLE_DISPLAY_DATA_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        list: action.payload?.table.display?.list || [],
                    },
                    loading: true,
                },
            }

        case 'STATUS_LIST_UPDATE':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingStatus: {
                        ...state.filter.shippingStatus,
                        activeValue: [],
                        list: action.payload?.statusList,
                        listOrigin: action.payload?.statusList,
                    },
                },
            }

        case InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    detail: {
                        ...state.table.detail,
                        active: action.payload?.active || null,
                        list: action.payload?.list || state.table.detail?.list,
                        isDiff: action.payload?.isDiff || 0,
                    },
                },
            }
        case InventoryAction.TABLE_DISPLAY_DETAIL_ID_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    detail: {
                        ...state.table.detail,
                        id: action.payload?.id || null,
                    },
                },
            }
        case InventoryAction.TABLE_PAGINATION_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        list: action.payload?.display?.list || [],
                        arr_details: action.payload?.display?.arr_details || {},
                    },
                    pagination: {
                        ...state.table.pagination,
                        active: action.payload?.pagination?.active,
                    },
                },
            }

        case InventoryAction.TABLE_SELECTED_LIST_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    selected: {
                        ...state.table.selected,
                        list: action.payload?.selected?.list || [],
                    },
                },
            }
        case InventoryAction.TABLE_DISPLAY_LOADING_UPDATE:
            return {
                ...state,
                table: {
                    ...state.table,
                    display: {
                        ...state.table.display,
                        loading: action.payload?.table?.display?.loading,
                    },
                },
            }
        case 'TABLE_DETAIL_LOADING_UPDATE':
            return {
                ...state,
                table: {
                    ...state.table,
                    detail: {
                        ...state.table.detail,
                        loading: action.payload,
                    },
                },
            }
        case InventoryAction.TAG_FILTER_DELETE:
            switch (action.payload?.type) {
                case 'dateTime.current':
                    return {
                        ...state,
                        filter: {
                            ...state.filter,
                            dateTime: {
                                ...state.filter.dateTime,
                                activeValue: {
                                    end: '',
                                    start: '',
                                    type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                                    value: '',
                                },
                                end: '',
                                start: '',
                                type: ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                                value: '',
                            },
                        },
                    }
                case INVENTORY_FILTER_TAG_FIELDS[0]:
                    return {
                        ...state,
                        filter: {
                            ...state.filter,
                            dateTime: {
                                ...state.filter.dateTime,
                                activeValue: {
                                    end: '',
                                    start:'',
                                    type: action.payload?.isSingle
                                        ? ''
                                        : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                                    value: '',
                                },
                                end:'',
                                start: '',
                                type: action.payload?.isSingle
                                    ? ''
                                    : ORDER_FILTER_FORM_DATE_TIME_SORT_TYPES[0],
                                value: '',
                            },
                        },
                    }
                case INVENTORY_FILTER_TAG_FIELDS[1]:
                    return {
                        ...state,
                        filter: {
                            ...state.filter,
                            employee: {
                                ...state.filter.employee,
                                activeValue: {
                                    ...state.filter.employee.activeValue,
                                    type: {name: 'Nhóm nhân viên', value: ''},
                                    value: [],
                                },
                                keyword: '',
                                type: {
                                    ...state.filter.employee.type,
                                    value: {name: 'Nhóm nhân viên', value: ''},
                                },
                                value: [],
                            },
                        },
                    }
                case INVENTORY_FILTER_TAG_FIELDS[2]:
                    return {
                        ...state,
                        filter: {
                            ...state.filter,
                            shippingStatus: {
                                ...state.filter.shippingStatus,
                                activeValue: null,
                                keyword: '',
                                tab: 'all', // all | checked
                                value: null,
                            },
                        },
                    }
                case INVENTORY_FILTER_TAG_FIELDS[3]:
                    return {
                        ...state,
                        filter: {
                            ...state.filter,
                            warehouse: {
                                ...state.filter.warehouse,
                                activeValue: null,
                                keyword: '',
                                value: null,
                            },
                        },
                    }
                default:
                    return {...state}
            }

        case 'SET_LOADING':
            return {
                ...state,
                table: {
                    ...state.table,
                    loading: action.payload,
                },
            }
        case InventoryAction.FILTER_DATE_TIME_TRIGGER_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    dateTime: {
                        ...state.filter.dateTime,
                        trigger: action.payload?.trigger,
                    },
                },
            }

        case 'UPDATE_LOADING':
            return {
                ...state,
                table: {
                    ...state.table,
                    loading: action.payload,
                }
            }
        case InventoryAction.TABLE_PAGINATE_DATA:
            return {
                ...state,
                table: {
                    ...state.table,
                    pagination: {
                        ...state.table.pagination,
                        total: Math.ceil(
                            action.payload.pagination.totalItems /
                            state.table.pagination.amount,
                        ),
                        totalItems: action.payload.pagination.totalItems,
                    },
                },
            }
        case InventoryAction.OPEN_MODAL_CONFIRM:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...action.payload
                }
            }
            //import
        case 'UPDATE_SHOW_EXPORT':
            return {
                ...state,
                table: {
                    ...state.table,
                    properties: {
                        ...state.table.properties,
                        canShowExport: action.payload
                    }
                }
            }
        case 'FORM_GENERAL_INFO_WAREHOUSE_UPDATE':
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    generalInfo: {
                        ...state.purchase.generalInfo,
                        warehouse: {
                            ...state.purchase.generalInfo.warehouse,
                            ...action.payload,
                        },
                    },
                },
            }
            case 'FORM_GENERAL_INFO_VALIDATE':
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    generalInfo: {
                        ...state.purchase.generalInfo,
                        validate: {
                            ...state.purchase.generalInfo.validate,
                            ...action.payload,
                        },
                    },
                },
            }

        default:
            throw new Error()
    }
}