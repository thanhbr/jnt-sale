import {useContext, useState} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {PaymentManagementActions} from "../../../provider/action";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {removeAcent} from "../../../../../common/fieldText/_functions";

export const useCreatePaymentMethod = () => {
    const {pageState, pageDispatch} = useContext(PaymentManagementContext)
    const {formCreate} = pageState
    const {form} = formCreate;
    const {paymentMethod} = form
    const listPaymentMethod = paymentMethod.list

    const queries={
        keyword: paymentMethod?.keyword || '',
        status: 1,
        per_page: paymentMethod?.pagination?.amount || 20,
        start:  0,
    }
    const fetchListPaymentType = async (qs,opt) =>{
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get',`${config.API}/payment/payment-method${queryString}`)
        if(response?.data?.success){
            const listData = response?.data?.data
            const defaultValue = listData.find(find => +find.is_active === 1)
            if(!!defaultValue) pageDispatch({type:PaymentManagementActions.UPDATE_PAYMENT_METHOD,payload:{
                    value:{
                        value:defaultValue?.id,
                        name:defaultValue?.name
                    }
                }})

            pageDispatch({type:PaymentManagementActions.GET_LIST_PAYMENT_METHOD,payload:{
                    list: qs?.query?.start === 0
                        ? listData
                        : [...listPaymentMethod, ...listData],
                    pagination :{
                        totalItems:response?.data?.meta?.total
                    }
                }})
            pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_METHOD,payload: [...listPaymentMethod, ...listData].length >= +response?.data?.meta?.total ? false : true,})
        }
    }
    const handleLoadMorePaymentType = ()=>{
        pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_METHOD,payload:false})
        const currentTotal = paymentMethod.listOrigin.length
        const total = +paymentMethod?.pagination?.totalItems
        if (currentTotal >= total) {
            return
        }

        const page = (+paymentMethod?.pagination?.active +1) * paymentMethod?.pagination?.amount
        const response = fetchListPaymentType(
            {...queries,start :page}
        )
        return response
    }
    const handleSearchChangePayment = (data) => {
        pageDispatch({type:PaymentManagementActions.UPLOAD_CAN_LOAD_MORE_PAYMENT_METHOD,payload:  false })
        const formatDataValue = data?.value.trim()
            ? removeAcent(data?.value.trim()?.toLowerCase())
            : ''
        const postListData = paymentMethod?.listOrigin.filter(item => {
            const formatNameItem = item?.name
                ? removeAcent(item?.name.toLowerCase())
                : ''
            if (formatNameItem.includes(formatDataValue)) return true
            return false
        })
        pageDispatch({type:PaymentManagementActions.SEARCH_PAYMENT_METHOD,payload:{
                list:postListData,
                keyword:data?.value,
                canLoadMore:true,
            }})
    }
    const handleChangePaymentMethod = (data)=>{
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                paymentMethod:{
                    status:false,
                    message: "",
                }
            }})
        pageDispatch({
            type: PaymentManagementActions.UPDATE_PAYMENT_METHOD, payload: {
                value: {
                    name: data.name,
                    value:  data.id
                }
            }
        })
    }
    return {
        functions: {
            fetchOrigin :()=> fetchListPaymentType(queries),
            handlLoadMore: handleLoadMorePaymentType,
            canLoadMore : paymentMethod?.canLoadMore,
            onPaymentKeywordChange: handleSearchChangePayment,
            onChangePaymentMethod : handleChangePaymentMethod,
        }
    }
}