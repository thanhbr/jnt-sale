import {getDateFromNow} from "../utils/date";
import {formatDatetime} from "../utils/_functions";

export const userDeliveryOverviewActions = {
    FETCH_DATA_CHART: 'FETCH_DATA_CHART',
    FILTER_ORIGIN_DATA_UPDATE: "FILTER_ORIGIN_DATA_UPDATE",
    DELIVERY_OVER_VIEW:'DELIVERY_OVER_VIEW',
    OVER_VIEW_FOR_CONTROL:'OVER_VIEW_FOR_CONTROL',
    DATE_FOR_CONTROL:'DATE_FOR_CONTROL',
    FILTER_SHIPPING_PARTNER:'FILTER_SHIPPING_PARTNER',
    LOADING_DELIVERY:'LOADING_DELIVERY',
    DELIVERY_BILL_FEE:'DELIVERY_BILL_FEE',
    DATE_BILL_LADING:'DATE_BILL_LADING',
    DELIVERY_SIGN_ONE_PART:'DELIVERY_SIGN_ONE_PART',
    DATE_SIGN_PART:'DATE_SIGN_PART',
    DATE_DELIVERY:'DATE_DELIVERY',
    LOADING_DATE_DELIVERY:'LOADING_DATE_DELIVERY',
    LOADING_DATE_FOR_CONTROL:'LOADING_DATE_FOR_CONTROL',
    LOADING_DATE_BILL_LADING:'LOADING_DATE_BILL_LADING',
    LOADING_DATE_ONE_SIGN:'LOADING_DATE_ONE_SIGN',
    SEARCH_SHIPPING_PARTNER:'SEARCH_SHIPPING_PARTNER',
    KEY_WORD_SHIPPING:'KEY_WORD_SHIPPING',
}
const date = new Date();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const dateTimeDefaultValue = [firstDay, getDateFromNow(0)]
const formatDateTimeDefaultValue = `${formatDatetime(
    dateTimeDefaultValue[0],
)} - ${formatDatetime(dateTimeDefaultValue[1])}`
const dDay = [getDateFromNow(0), getDateFromNow(0)]
const formateDDay = `${formatDatetime(
    dDay[0],
)} - ${formatDatetime(dDay[1])}`
export const userDeliveryOverviewInitialState = {
    filter: {
        shippingPartner: {
            activeValue: 'Tất cả',
            keyword: '',
            list: [],
            listOrigin: [],
            value: null,
        },
    },
    charts: {
        deliveryStatistics: {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                }
            },
            series: {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        }
    },
    listDelivery: {
        arr_status: [],
        total_cod: 0,
        total_orders: [],
        list_option_delivery:[],
        total_order_delivery:0,
    },
    listControl: {
        data: [],
        arr_percent:[],
        meta:{},
    },
    listTotalDelivery: {
        data:[],
        arr_status: [],
        arr_total_cod:[],
        arr_total_orders:[],
        total_cod: 0,
        total_orders: 0,
        avg_fee: 0,
        total_fee: 0,
        arr_cod_percent:[],
        arr_order_percent:[],
    },
    listSignOnePart:{
        data:[],
        arr_status: [],
        arr_total_cod:[],
        arr_total_orders:[],
        total_cod: 0,
        total_orders: 0,
        total_signart: 0,
        total_return: 0,
        total_delivering:0,
        total_totality:0,
        arr_cod_percent:[],
        arr_order_percent:[],
    },
    date:{
        end: dateTimeDefaultValue[1],
        start: dateTimeDefaultValue[0],
        value: formatDateTimeDefaultValue,
        for_control:{
            date:dateTimeDefaultValue,
            format_date:formatDateTimeDefaultValue
        },
        bill_lading:{
            date:dateTimeDefaultValue,
            format_date:formatDateTimeDefaultValue
        },
        one_part:{
            date:dateTimeDefaultValue,
            format_date:formatDateTimeDefaultValue
        },
        delivery:{
            date:dDay,
            format_date:formateDDay
        }
    },
    loading:false,
    loading_date:{
        delivery:false,
        for_control:false,
        bill_lading:false,
        one_sign:false,
    },

}

export const userDeliveryOverviewReducer = (state, action) => {
    switch (action.type) {
        case userDeliveryOverviewActions.FETCH_DATA_CHART:
            return {
                ...state,
                listDelivery: action?.payload?.listDelivery,
                listControl: action?.payload?.listControl,
                listTotalDelivery: action?.payload?.listTotalDelivery,
            }
        case userDeliveryOverviewActions.FILTER_ORIGIN_DATA_UPDATE:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    shippingPartner: {
                        ...state.filter.shippingPartner,
                        list: action.payload.shippingPartner.list,
                        listOrigin: action.payload.shippingPartner.list,
                    },
                },
            }
        case userDeliveryOverviewActions.FILTER_SHIPPING_PARTNER:
            return{
                ...state,
                filter:{
                    ...state.filter,
                    shippingPartner:{
                        ...state.filter.shippingPartner,
                        list: action.payload.list,
                        listOrigin: action.payload.list,
                        activeValue:action.payload.activeValue,
                        value:action.payload.value
                    }
                }
            }
        case userDeliveryOverviewActions.DELIVERY_OVER_VIEW:
            return {
                ...state,
                listDelivery: {
                    ...state,
                    arr_status:action.payload.arr_status,
                    total_cod: action.payload.total_cod,
                    total_orders:  action.payload.total_orders,
                    list_option_delivery:action.payload.list_option_delivery,
                    total_order_delivery:action.payload.total_order_delivery
                },
            }
        case userDeliveryOverviewActions.OVER_VIEW_FOR_CONTROL:
            return {
                ...state,
                listControl:{
                    ...state.listControl,
                    data:action.payload.data,
                    arr_percent: action.payload.arr_percent,
                    meta : action.payload.meta,
                }
            }
        case userDeliveryOverviewActions.DATE_FOR_CONTROL:
            return{
                ...state,
                date:{
                    ...state.date,
                    for_control:{
                        date:action.payload.date,
                        format_date:action.payload.format_date,
                    }
                }
            }
        case userDeliveryOverviewActions.LOADING_DELIVERY:
            return {
                ...state,
                loading:action.payload,
            }
        case userDeliveryOverviewActions.DELIVERY_BILL_FEE:
            return {
                ...state,
                listTotalDelivery: {
                    data:action.payload.data,
                    arr_status:action.payload.arr_status,
                    arr_total_cod:action.payload.arr_total_cod,
                    arr_total_orders:action.payload.arr_total_orders,
                    total_cod: action.payload.total_cod,
                    total_orders: action.payload.total_orders,
                    avg_fee:action.payload.avg_fee,
                    total_fee:action.payload.total_fee,
                    arr_cod_percent:action.payload.arr_cod_percent,
                    arr_order_percent:action.payload.arr_order_percent,
                },
            }
        case userDeliveryOverviewActions.DATE_BILL_LADING:
            return{
                ...state,
                date:{
                    ...state.date,
                    bill_lading:{
                        date:action.payload.date,
                        format_date:action.payload.format_date,
                    }
                }
            };
        case userDeliveryOverviewActions.DATE_SIGN_PART:
            return{
                ...state,
                date:{
                    ...state.date,
                    one_part:{
                        date:action.payload.date,
                        format_date:action.payload.format_date,
                    }
                }
            };
        case userDeliveryOverviewActions.DATE_DELIVERY:
            return{
                ...state,
                date:{
                    ...state.date,
                    delivery:{
                        date:action.payload.date,
                        format_date:action.payload.format_date,
                    }
                }
            };
        case userDeliveryOverviewActions.DELIVERY_SIGN_ONE_PART:
            return {
                ...state,
                listSignOnePart: {
                    data:action.payload.data,
                    arr_status:action.payload.arr_status,
                    arr_total_cod:action.payload.arr_total_cod,
                    arr_total_orders:action.payload.arr_total_orders,
                    total_cod: action.payload.total_cod,
                    total_orders: action.payload.total_orders,
                    avg_fee:action.payload.avg_fee,
                    total_fee:action.payload.total_fee,
                    arr_cod_percent:action.payload.arr_cod_percent,
                    arr_order_percent:action.payload.arr_order_percent,
                    total_signpart:  action.payload.total_signpart,
                    total_return:  action.payload.total_return,
                    total_delivering: action.payload.total_delivering,
                    total_totality: action.payload.total_totality,
                },
            }
        case userDeliveryOverviewActions.LOADING_DATE_DELIVERY:
            return{
                ...state,
                loading_date:{
                    ...state.loading_date,
                    delivery:action.payload,
                }
            }
        case userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL:
            return{
                ...state,
                loading_date:{
                    ...state.loading_date,
                    for_control:action.payload,
                }
            }
        case userDeliveryOverviewActions.LOADING_DATE_BILL_LADING:
            return{
                ...state,
                loading_date:{
                    ...state.loading_date,
                    bill_lading:action.payload,
                }
            }
        case userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN:
            return{
                ...state,
                loading_date:{
                    ...state.loading_date,
                    one_sign:action.payload,
                }
            }
        case userDeliveryOverviewActions.SEARCH_SHIPPING_PARTNER:
            return{
                ...state,
                filter: {
                    ...state.filter,
                    shippingPartner: {
                        ...state.filter.shippingPartner,
                        list: action.payload,

                    },
                },
            }
        case userDeliveryOverviewActions.KEY_WORD_SHIPPING:
            return{
                ...state,
                filter: {
                    ...state.filter,
                    shippingPartner: {
                        ...state.filter.shippingPartner,
                        keyword: action.payload,

                    },
                },
            }
        default:
            throw new Error()
    }
}