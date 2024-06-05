import { useEffect, useReducer } from "react";
import { useSearchParams } from 'react-router-dom';
import { sendRequestAuth } from "../../../api/api";
import config from "../../../config";
import {
    useSupplierManagementAction,
    useSupplierManagementReducer,
    useSupplierManagementState
} from "../provider/_reducer";

export const useSupplierManagement = ()=>{
    const [state, dispatch] = useReducer(useSupplierManagementReducer,useSupplierManagementState )
    let [searchParams] = useSearchParams();

    const fetchListSupplier = async()=>{
        const search = searchParams.get('search') || ''

        const res = await Promise.all([
            sendRequestAuth('get', `${config.API}/supplier/suppliers?keyword=${search}&per_page=20&start=0`),
        ])
        if(res[0].data.success){
            let  meta  = res[0]?.data.meta
            const perPage = meta?.per_page || 0
            const start = meta?.start || 0
            const total = meta?.totals || 0
            dispatch({
                type: useSupplierManagementAction.GET_PAGINATION, payload: {
                    active: Math.floor(start / perPage),
                    amount: perPage,
                    total: Math.ceil(total / perPage),
                    totalItems: total,
                }
            })
            dispatch({type:useSupplierManagementAction.GET_LIST_DETAIL,payload:res[0].data.data})
            dispatch({type:useSupplierManagementAction.GET_LIST_SUPPLIER,payload:res[0].data.data})
            dispatch({ type:useSupplierManagementAction.SET_LOADING, payload: true })
        }
    }
    useEffect(()=>{
        fetchListSupplier()
    },[])
    return {
        provider: { state, dispatch },
    }
}