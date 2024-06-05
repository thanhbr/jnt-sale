import {useReducer} from "react";
import {PaymentTypeReducer} from "../provider/reducer";
import {PaymentTypeState} from "../provider/inittialState";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {PaymentTypeActions} from "../provider/action";
export const usePaymentType = ()=>{
    const [state,dispatch] = useReducer(PaymentTypeReducer,PaymentTypeState)
    const {paymentType} = state;
    const queries = {
        keyword:'',
        status:'',
        per_page:20,
        start:0,
    }
    const collection = (qs)=>{
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        return queryString
    }
    //fetch list payment type
    const fetchPaymentOrigin = async _ =>{
       const query = collection(queries)
        const response = await sendRequestAuth('get',
                `${config.API}/cashbook/payments-type/list${query}`
        )
        if(response?.data.success){
            dispatch({type:PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,payload:true})
            dispatch({type:PaymentTypeActions.GET_LIST_PAYMENT_TYPE,payload:{
                    list: response?.data?.data ,
                    listOrigin:response?.data?.data
            }})
            dispatch({type:PaymentTypeActions.TABLE_PAGINATE_DATA, payload: {
                    pagination:{
                        totalItems:response?.data?.meta.total
                    }
                },})
        }
    }
    //pagination
    const handlePaginationAmountChange = async n => {
        dispatch({
            type: PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,
            payload: false,
        })

        const currentPage = paymentType.pagination.active || 0
        const totalPages = Math.ceil(paymentType.pagination.totalItems / n)
        const page =
            paymentType.pagination.totalItems < currentPage * n
                ? totalPages - 1
                : currentPage

        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...queries,
            per_page: n,
            start: page * n,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get',
            `${config.API}/cashbook/payments-type/list${queryStr}`
        )
        if(response?.data.success){
            dispatch({type:PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,payload:true})
            // dispatch({type:PaymentTypeActions.GET_LIST_PAYMENT_TYPE,payload:{
            //         list: response?.data?.data ,
            //         listOrigin:response?.data?.data
            //     }})
            dispatch({
                type: PaymentTypeActions.TABLE_AMOUNT_UPDATE,
                payload: {
                    paymentType: {
                        list: response?.data?.data,
                        pagination: {active: page, amount: n, total: totalPages, totalItems:response?.data?.meta?.total},
                    }

                },
            })
        }
    }

    const handlePaginationPageChange = async page => {
        dispatch({
            type: PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,
            payload: false,
        })

        const amount = paymentType.pagination?.amount || 20

        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries({
            ...queries,
            per_page: amount,
            start: page * amount,
        })) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get',
            `${config.API}/cashbook/payments-type/list${queryStr}`
        )
        if(response?.data.success){
            dispatch({type:PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,payload:true})
            dispatch({type:PaymentTypeActions.GET_LIST_PAYMENT_TYPE,payload:{
                    list: response?.data?.data ,
                    listOrigin:response?.data?.data
                }})
            dispatch({
                type: PaymentTypeActions.TABLE_PAGINATION_UPDATE,
                payload: {
                    paymentType: {
                        list: response?.data?.data,
                        pagination: {active: page},
                    },

                },
            })
        }

    }
    return{
        provider:{
            state,
            dispatch
        },
        fetch:{
            origin:fetchPaymentOrigin,
        },
        pagination:{
            onAmountChange: handlePaginationAmountChange,
            onPageChange: handlePaginationPageChange,

        }
    }
}