import {useContext} from "react";
import {SupplierManagement} from "../provider/_context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useSupplierManagementAction} from "../provider/_reducer";

export const useSupplierHistory = ()=>{
    const { pageState, pageDispatch } = useContext(SupplierManagement)
    const handleApplyFilter = async (qs,id)=>{
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const res = await sendRequestAuth('get', `${config.API}/supplier/purchase/${id}${queryString}`)
        if(res.data.success){
            pageDispatch({type:useSupplierManagementAction.PURCHASE_LIST,payload:res.data.data})
            pageDispatch({type:useSupplierManagementAction.PURCHASE_META,payload:res.data.meta})
        }
    }
    const handleRefesh = async (id)=>{
        const res = await sendRequestAuth('get', `${config.API}/supplier/purchase/${id}?start_date=&end_date=&keyword=&per_page=10&start=0`)
        if(res.data.success){
            pageDispatch({type:useSupplierManagementAction.PURCHASE_LIST,payload:res.data.data})
            pageDispatch({type:useSupplierManagementAction.PURCHASE_META,payload:res.data.meta})
        }
    }
    return {
        handleApplyFilter,
        handleRefesh
    }
}