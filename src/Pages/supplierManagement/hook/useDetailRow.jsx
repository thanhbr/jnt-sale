import {getData, sendRequestAuth} from "api/api"
import { getUrlDetailUserManagement } from "api/url"
import React, { useContext } from "react"
import {SupplierManagement} from "../provider/_context"
import {useSupplierManagementAction} from "../provider/_reducer"
import config from "../../../config";
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

export const useDetailRow = (id) => {
    const { pageState, pageDispatch } = useContext(SupplierManagement)
    const detailActive = pageState.detailActive
    const detailList = pageState.detailList
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search') || ''
    
    useEffect(() => {
        pageDispatch({type: useSupplierManagementAction.DETAIL_ACTIVE, payload: search})
    }, [search])

    const shouldOpenDetail = id && detailActive?.supplier_id === id
    const fetchRowDetail = async (id) => {
        const res = await Promise.all([
            sendRequestAuth('get',`${config.API}/supplier/detail/${id}`),
            sendRequestAuth('get',`${config.API}/supplier/purchase/${id}`),
            sendRequestAuth('get',`${config.API}/supplier/totals-purchase/${id}`),
        ])
        if (!!res[0]?.data?.success && !!res[1]?.data?.success && !!res[2]?.data?.success) {
            const newItem = res[0]?.data?.data
            pageDispatch({
                type: useSupplierManagementAction.DETAIL_ACTIVE,
                payload: newItem,
            })
            pageDispatch({
                type: useSupplierManagementAction.DETAIL_LIST,
                payload: [...detailList, newItem],
            })
            pageDispatch({type:useSupplierManagementAction.PURCHASE_LIST,payload:res[1]?.data.data})
            pageDispatch({type:useSupplierManagementAction.PURCHASE_TOTAL,payload:res[2]?.data.data})
            pageDispatch({type:useSupplierManagementAction.PURCHASE_META,payload:res[1]?.data.meta})
            pageDispatch({type:useSupplierManagementAction.GET_ORIGIN_LIST,payload:res[1]?.data.data})
            pageDispatch({
                type: useSupplierManagementAction.SET_LOADING_DETAIL,
                payload: true,
            })
        }

    }

    const rowDetailToggle = async (id) => {
        if (!id) return
        if (id === detailActive?.supplier_id) {
            pageDispatch({
                type: useSupplierManagementAction.DETAIL_ACTIVE,
                payload: null,
            })
            return
        }
        const findDetail = detailList.find(item => item?.supplier_id === id)
        if (findDetail) {
            pageDispatch({
                type: useSupplierManagementAction.DETAIL_ACTIVE,
                payload: findDetail,
            })
        }
        fetchRowDetail(id)
    }
    return {
        fetchRowDetail,
        rowDetailToggle,
        detailActive,
        id,
        shouldOpenDetail,
    }
}