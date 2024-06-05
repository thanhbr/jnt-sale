import React, {useReducer} from 'react';
import {
    userDeliveryOverviewActions,
    userDeliveryOverviewInitialState,
    userDeliveryOverviewReducer
} from "../provider/~reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {formatDatetime} from "../utils/_functions";
const UseDeliveryOverview = () => {
    const [state, dispatch] = useReducer(userDeliveryOverviewReducer, userDeliveryOverviewInitialState)
    const dataDate = state.date.value
    const handleFetchDeliveryOverview = async () => {
        const splitDate = dataDate.split(' - ')
        const startDate = convertDateTimeToApiFormat(splitDate[0])
        const endDate = convertDateTimeToApiFormat(splitDate[1])
        const dDay = new Date()
        const formatDDay = formatDatetime(dDay)
        const start = convertDateTimeToApiFormat(formatDDay)
        const response = await Promise.all([
            sendRequestAuth('get', `${config.API}/delivery/overview/delivery?partner_id=1&start_date=${start}&end_date=${start}`),
            sendRequestAuth('get', `${config.API}/delivery/overview/for-control?partner_id=1&start_date=${startDate}&end_date=${endDate}`),
            sendRequestAuth('get', `${config.API}/delivery/overview/total-delivery?partner_id=1&start_date=${startDate}&end_date=${endDate}`),
            sendRequestAuth('get', `${config.API}/delivery/overview/partsign?partner_id=1&start_date=${startDate}&end_date=${endDate}`),
        ])
        if (
            !!response[0]?.data?.success ||
            !!response[1]?.data?.success ||
            !!response[2]?.data?.success ||
            !!response[3]?.data?.success
        ) {
            dispatch({
                type: userDeliveryOverviewActions.DELIVERY_OVER_VIEW,
                payload: {
                    arr_status: response[0]?.data.data?.arr_status.map(item => item?.status_name) || [],
                    total_cod: response[0]?.data.data?.arr_status.map(item => item?.total_cod),
                    total_orders: response[0]?.data.data?.arr_status.map(item => item?.total_orders),
                    list_option_delivery: response[0]?.data.data?.arr_status,
                    total_order_delivery:response[0]?.data.data.total_orders
                }
            })
            dispatch({
                type: userDeliveryOverviewActions.OVER_VIEW_FOR_CONTROL, payload: {
                    data: response[1]?.data.data,
                    arr_percent: response[1]?.data.data.map(item => item.orders_percent),
                    meta: response[1]?.data.meta
                }
            })
            dispatch({
                type: userDeliveryOverviewActions.DELIVERY_BILL_FEE, payload: {
                    data: response[2]?.data.data?.arr_status,
                    arr_status: response[2]?.data.data?.arr_status.map(item => item?.status_name),
                    arr_total_cod: response[2]?.data.data?.arr_status.map(item => item?.total_cod),
                    arr_total_orders: response[2]?.data.data?.arr_status.map(item => item?.total_orders),
                    total_orders: response[2]?.data.data?.total_orders,
                    avg_fee: response[2]?.data.data?.avg_fee,
                    total_fee: response[2]?.data.data?.total_fee,
                    total_cod: response[2]?.data.data?.total_cod,
                    arr_cod_percent: response[2]?.data.data?.arr_status.map(item => item?.arr_cod_percent),
                    arr_order_percent: response[2]?.data.data?.arr_status.map(item => item?.arr_orders_percent),
                }
            })
            dispatch({
                type: userDeliveryOverviewActions.DELIVERY_SIGN_ONE_PART, payload: {
                    data: response[3]?.data.data?.arr_status,
                    arr_status: response[3]?.data.data?.arr_status.map(item => item?.status_name),
                    arr_total_cod: response[3]?.data.data?.arr_status.map(item => item?.total_cod),
                    arr_total_orders: response[3]?.data.data?.arr_status.map(item => item?.total_orders),
                    total_orders: response[3]?.data.data?.total_orders,
                    avg_fee: response[3]?.data.data?.avg_fee,
                    total_fee: response[3]?.data.data?.total_fee,
                    total_cod: response[3].data.data?.total_cod,
                    arr_cod_percent: response[3]?.data.data?.arr_status.map(item => item?.arr_cod_percent),
                    arr_order_percent: response[3]?.data.data?.arr_status.map(item => item?.arr_orders_percent),
                    total_signart: response[3]?.data.data.total_signart,
                    total_return: response[3]?.data.data.total_return,
                    total_delivering: response[3]?.data.data.total_delivering,
                    total_totality: response[3]?.data.data.total_totality,
                }
            })
            dispatch({type: userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL, payload: true})
            dispatch({type: userDeliveryOverviewActions.LOADING_DATE_BILL_LADING, payload: true})
            dispatch({type: userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN, payload: true})
            dispatch({type: userDeliveryOverviewActions.LOADING_DATE_DELIVERY, payload: true})
        }
    }

    return {
        provider: {state, dispatch},
        fetch: {
            handleFetchDeliveryOverview
        }
    }
};

export default UseDeliveryOverview;