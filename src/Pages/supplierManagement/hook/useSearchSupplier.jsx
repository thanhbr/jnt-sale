import {useContext, useEffect} from "react";
import {SupplierManagement} from "../provider/_context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useSupplierManagementAction} from "../provider/_reducer";
import { useSearchParams } from "react-router-dom";

export const useSearchSupplier = ()=>{
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const [searchParams, setSearchParams] = useSearchParams()

    const searchSupplier =  (e)=>{
        const {value} = e.target;
        let params = {search: value}
        setSearchParams(params);
        if(value !== ''){

            const timeOutId = setTimeout(async() => {
                const response = await  sendRequestAuth('get',`${config.API}/supplier/suppliers?keyword=${value.trim()}&per_page=20&start=0`)
                if(response.data.success){
                    let  meta  = response?.data.meta
                    const perPage = meta?.per_page || 0
                    const start = meta?.start || 0
                    const total = meta?.totals || 0
                    pageDispatch({
                        type: useSupplierManagementAction.GET_PAGINATION, payload: {
                            active: Math.floor(start / perPage),
                            amount: perPage,
                            total: Math.ceil(total / perPage),
                            totalItems: total,
                        }
                    })
                    pageDispatch({type:useSupplierManagementAction.GET_LIST_SUPPLIER,payload:response.data.data})
                    pageDispatch({type:useSupplierManagementAction.KEY_WORD_SUPPLIER,payload:value.trim()})
                }


            }, 500)
            return () => clearTimeout(timeOutId)
        }else{

            const timeOutId = setTimeout(async() => {
                const response = await  sendRequestAuth('get',`${config.API}/supplier/suppliers?keyword=&per_page=20&start=0`)
                if(response.data.success){
                    let  meta  = response?.data.meta
                    const perPage = meta?.per_page || 0
                    const start = meta?.start || 0
                    const total = meta?.totals || 0
                    pageDispatch({
                        type: useSupplierManagementAction.GET_PAGINATION, payload: {
                            active: Math.floor(start / perPage),
                            amount: perPage,
                            total: Math.ceil(total / perPage),
                            totalItems: total,
                        }
                    })
                    pageDispatch({type:useSupplierManagementAction.GET_LIST_SUPPLIER,payload:response.data.data})
                    pageDispatch({type:useSupplierManagementAction.KEY_WORD_SUPPLIER,payload:''})
                }


            }, 500)
            return () => clearTimeout(timeOutId)
        }

    }
    return {
        searchSupplier
    }
}