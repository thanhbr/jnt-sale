import {useReducer, useState} from "react";
import {PaymentManagementState} from "../provider/inittialState";
import {PaymentManagementReducer} from "../provider/reducer";
import {PaymentManagementActions} from "../provider/action"
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {PAYMENT_MANAGEMENT_FILTER_FORM_GROUP_SUBMITTER} from "../interfaces/_const"
import {useSearchParams} from "react-router-dom";
export const usePaymentManagement = ()=>{
    const [state,dispatch] = useReducer(PaymentManagementReducer,PaymentManagementState)

    const filter = state?.filter
    const [debounceFilter, setDebounceFilter] = useState(true)
    const [searchParams] = useSearchParams()
    const handleFetchOrigin = async _ => {
        const search = searchParams.get('search') || ''
        const response = await Promise.all([
            sendRequestAuth('get',`${config.API}/cashbook/payments/list?keyword=${search}&start_date&end_date&object_type&payment_method_id&user_id&receipt_type_id&status&per_page=20&start=0`),
            sendRequestAuth('get',`${config.API}/payment/payment-method?keyword&status=&per_page=200&start=0`),
            sendRequestAuth('get',`${config.API}/cashbook/payments-type/list?keyword=&status&per_page=200&start=0`),
            sendRequestAuth('get',`${config.API}/admin/employees?keyword=&group=&status=&per_page=200&start`),
        ])
        // Receipts
        if(response[0]?.data?.success) {
            const receipts = response[0]?.data?.data
            dispatch({type: PaymentManagementActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: receipts, loading: false, listOrigin: receipts}})
            dispatch({type: PaymentManagementActions?.TABLE_PAGINATION_UPDATE,
                payload: {active: response[0]?.data?.meta?.start,
                    amount: response[0]?.data?.meta?.per_page,
                    total: Math.ceil(response[0]?.data?.meta?.total / response[0]?.data?.meta?.per_page),
                    totalItems: response[0]?.data?.meta?.total}})
        }
        // Payment method
        if(response[1]?.data?.success) {
            dispatch({
                type: PaymentManagementActions.FILTER_OTHER_PAYMENT_METHOD,
                payload: {
                    list: response[1]?.data?.data,
                    listOrigin: response[1]?.data?.data
                }
            })
        }
        // Type receipt
        if(response[2]?.data?.success) {
            dispatch({
                type: PaymentManagementActions.FILTER_OTHER_TYPE_RECEIPT,
                payload: {
                    list: response[2]?.data?.data,
                    listOrigin: response[2]?.data?.data
                }
            })
        }
        // Employee create
        if(response[3]?.data?.success) {
            dispatch({
                type: PaymentManagementActions.FILTER_OTHER_EMPLOYEE_CREATE,
                payload: {
                    list: response[3]?.data?.data,
                    listOrigin: response[3]?.data?.data
                }
            })
        }
        // Group submitter
        dispatch({
            type: PaymentManagementActions.FILTER_OTHER_GROUP_SUBMITTER,
            payload: {
                list: PAYMENT_MANAGEMENT_FILTER_FORM_GROUP_SUBMITTER,
                listOrigin: PAYMENT_MANAGEMENT_FILTER_FORM_GROUP_SUBMITTER
            }
        })
        if(!!search) {
            const detailList = state?.table?.detail?.list
            dispatch({type: PaymentManagementActions.FILTER_CHANGE_SEARCH_KEYWORD, payload:search})
            const responseDetail = await sendRequestAuth(
                'get',
                `${config.API}/cashbook/payments/detail/${response[0]?.data?.data[0]?.id}`,
            )

            if (responseDetail?.data?.success) {
                const newItem = responseDetail?.data?.data
                newItem?.order_payments?.length > 0 && newItem?.order_payments.map((item, index) => {
                    if (index > 0) {
                        newItem.order_payments[index].has_paid = item?.total_amount - newItem.order_payments[index - 1].total_amount
                    } else {
                        newItem.order_payments[index].has_paid = item?.total_amount
                    }
                })
                dispatch({
                    type: PaymentManagementActions.TABLE_DISPLAY_DETAIL_UPDATE,
                    payload: { active: newItem, list: [...detailList, newItem] },
                })
                dispatch({
                    type: PaymentManagementActions.TABLE_DISPLAY_DETAIL_ID_UPDATE,
                    payload: {id: newItem?.id || ''},
                })
            }
        }
    }

    const queries = {
        keyword: filter?.keyword || '',
        start_date: filter?.dateTime?.start || '',
        end_date: filter?.dateTime?.end || '',
        object_type: filter?.groupSubmitter?.value?.code || '',
        payment_method_id: filter?.paymentMethod?.value?.map(item => item.id)?.join(',') || '',
        user_id: filter?.employeeCreate?.value?.map(item => item.user_id)?.join(',') || '',
        receipt_type_id: filter?.typeReceipt?.value?.map(item => item.id)?.join(',') || '',
        status: filter?.status || '',
        per_page: filter?.per_page || 20,
        start: filter?.start || 0,
    }

    const fetchReceipt = async (qs) => {
        if(debounceFilter) {
            setDebounceFilter(false)
            setTimeout(() => setDebounceFilter(true), 2000)
            dispatch({type: PaymentManagementActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: [], loading: true}})
            let queryString = '?'
            let i = 0
            for (const [key, value] of Object.entries(qs)) {
                queryString += `${i > 0 ? '&' : ''}${key}=${value}`
                i++
            }
            const response = await sendRequestAuth( 'get', `${config.API}/cashbook/payments/list${queryString}`,)
            if (response?.data?.success) {
                const receipts = response?.data
                dispatch({type: PaymentManagementActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: receipts?.data, loading: false}})
                dispatch({type: PaymentManagementActions.TABLE_PAGINATION_UPDATE,
                    payload: {
                        active: receipts?.meta?.start / receipts?.meta?.per_page,
                        amount: receipts?.meta?.per_page,
                        total: Math.ceil(receipts?.meta?.total / receipts?.meta?.per_page),
                        totalItems: receipts?.meta?.total,
                    }
                })
            }
        }
    }

    const handleAmountChange = amount => {
        const qs = {...queries, per_page: amount, start: 0}
        fetchReceipt(qs)
    }

    const handlePageChange = page => {
        const qs = {...queries,
            per_page: state?.table?.pagination?.amount,
            start: state?.table?.pagination?.amount * page
        }
        fetchReceipt(qs)
    }

    return {
        provider: {
            state,
            dispatch
        },
        fetch: {
            origin: handleFetchOrigin
        },
        pagination: {
            onAmountChange: handleAmountChange,
            onPageChange: handlePageChange,
        }
    }
}