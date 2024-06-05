import {useContext} from "react";
import {DeliveryOverviewContext} from "../provider/~context";
import {userDeliveryOverviewActions} from "../provider/~reducer";
import {formatDatetime} from "../utils/_functions";
import {convertDateTimeToApiFormat} from "../../../common/form/datePicker/_functions";
import {OVER_VIEW_STATUS} from "../interfaces/~contants";
import config from "../../../config";
import {sendRequestAuth} from "../../../api/api";

export const useDateDeliveryOverView = () => {
    const {pageState, pageDispatch} = useContext(DeliveryOverviewContext)
    const queries = {
        partner_id:pageState.filter?.shippingPartner.value ? pageState.filter?.shippingPartner.value : '',
        start_date:'',
        end_date:''
    }
    const handleFetchDataOverView = async (k,date)=>{
        const splitDate = date.split(' - ')
        const start = convertDateTimeToApiFormat(splitDate[0])
        const end = convertDateTimeToApiFormat(splitDate[1])
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...queries,
            start_date:start,
            end_date:end
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const res = await sendRequestAuth('get',`${config.API}/delivery/overview/${k}${queryStr}`)
        if(res?.data?.success){
            switch (k) {
                case OVER_VIEW_STATUS[0]:
                    pageDispatch({
                        type: userDeliveryOverviewActions.DELIVERY_OVER_VIEW,
                        payload: {
                            arr_status: res?.data.data?.arr_status.map(item => item?.status_name) || [],
                            total_cod: res?.data.data?.arr_status.map(item => item?.total_cod),
                            total_orders: res?.data.data?.arr_status.map(item => item?.total_orders),
                            list_option_delivery: res?.data.data?.arr_status,
                            total_order_delivery:res?.data.data.total_orders
                        }
                    })
                    break;
                case OVER_VIEW_STATUS[1]:
                    pageDispatch({
                        type: userDeliveryOverviewActions.OVER_VIEW_FOR_CONTROL, payload: {
                            data: res?.data.data,
                            arr_percent: res?.data.data.map(item => item.orders_percent),
                            meta: res?.data.meta
                        }
                    })
                    break;
                case OVER_VIEW_STATUS[2]:
                    pageDispatch({
                        type: userDeliveryOverviewActions.DELIVERY_BILL_FEE, payload: {
                            data: res?.data.data?.arr_status,
                            arr_status: res?.data.data?.arr_status.map(item => item?.status_name),
                            arr_total_cod: res?.data.data?.arr_status.map(item => item?.total_cod),
                            arr_total_orders: res?.data.data?.arr_status.map(item => item?.total_orders),
                            total_orders: res?.data.data?.total_orders,
                            avg_fee: res?.data.data?.avg_fee,
                            total_fee: res?.data.data?.total_fee,
                            total_cod: res?.data.data?.total_cod,
                            arr_cod_percent: res?.data.data?.arr_status.map(item => item?.arr_cod_percent),
                            arr_order_percent: res?.data.data?.arr_status.map(item => item?.arr_orders_percent),
                        }
                    })
                    break;
                case OVER_VIEW_STATUS[3]:
                    pageDispatch({
                        type: userDeliveryOverviewActions.DELIVERY_SIGN_ONE_PART, payload: {
                            data: res?.data.data?.arr_status,
                            arr_status: res?.data.data?.arr_status.map(item => item?.status_name),
                            arr_total_cod: res?.data.data?.arr_status.map(item => item?.total_cod),
                            arr_total_orders: res?.data.data?.arr_status.map(item => item?.total_orders),
                            total_orders: res?.data.data?.total_orders,
                            avg_fee: res?.data.data?.avg_fee,
                            total_fee: res?.data.data?.total_fee,
                            total_cod: res.data.data?.total_cod,
                            arr_cod_percent: res?.data.data?.arr_status.map(item => item?.arr_cod_percent),
                            arr_order_percent: res?.data.data?.arr_status.map(item => item?.arr_orders_percent),
                            total_signart: res?.data.data.total_signart,
                            total_return: res?.data.data.total_return,
                            total_delivering: res?.data.data.total_delivering,
                            total_totality: res?.data.data.total_totality,
                        }
                    })
                    break;
                default:
                    break;
            }
            pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL, payload: true})
            pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_BILL_LADING, payload: true})
            pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN, payload: true})
            pageDispatch({type: userDeliveryOverviewActions.LOADING_DATE_DELIVERY, payload: true})
        }
    }
    const handleChangeDateControl = (e) => {
        const formatDateTimeDefaultValue = `${formatDatetime(
            e[0],
        )} - ${formatDatetime(e[1])}`
        pageDispatch({
            type: userDeliveryOverviewActions.DATE_FOR_CONTROL,
            payload: {date: e, format_date: formatDateTimeDefaultValue}
        })
        pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_FOR_CONTROL,payload:false})
        handleFetchDataOverView(OVER_VIEW_STATUS[1],formatDateTimeDefaultValue)
    }
    const handleChangeDateBillStatistic = (e) => {
        const formatDateTimeDefaultValue = `${formatDatetime(
            e[0],
        )} - ${formatDatetime(e[1])}`
        pageDispatch({
            type: userDeliveryOverviewActions.DATE_BILL_LADING,
            payload: {date: e, format_date: formatDateTimeDefaultValue}
        })
        pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_BILL_LADING,payload:false})
        handleFetchDataOverView(OVER_VIEW_STATUS[2],formatDateTimeDefaultValue)
    }
    const handleChangeDateSignPart = (e) => {
        const formatDateTimeDefaultValue = `${formatDatetime(
            e[0],
        )} - ${formatDatetime(e[1])}`
        pageDispatch({
            type: userDeliveryOverviewActions.DATE_SIGN_PART,
            payload: {date: e, format_date: formatDateTimeDefaultValue}
        })
        pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_ONE_SIGN,payload:false})
        handleFetchDataOverView(OVER_VIEW_STATUS[3],formatDateTimeDefaultValue)
    }
    const handleChangeDateDeliveryStatistic = (e) => {
        const formatDateTimeDefaultValue = `${formatDatetime(
            e[0],
        )} - ${formatDatetime(e[1])}`
        pageDispatch({
            type: userDeliveryOverviewActions.DATE_DELIVERY,
            payload: {date: e, format_date: formatDateTimeDefaultValue}
        })
        pageDispatch({type:userDeliveryOverviewActions.LOADING_DATE_DELIVERY,payload:false})
        handleFetchDataOverView(OVER_VIEW_STATUS[0],formatDateTimeDefaultValue)
    }
    return {
        for_control: {
            pick_date: handleChangeDateControl,
        },
        bill_lading: {
            pick_date: handleChangeDateBillStatistic,
        },
        sign_part: {
            pick_date: handleChangeDateSignPart,
        },
        delivery: {
            pick_date : handleChangeDateDeliveryStatistic
        },
    }
}