import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useContext} from "react";
import {SupplierManagement} from "../provider/_context";
import {useSupplierManagementAction} from "../provider/_reducer";

export const useTableSupplier = ()=>{
    const {pageState,pageDispatch} = useContext(SupplierManagement)
    const queryStartFrom = pageState.pagination.active * pageState.pagination.amount

    const queries = {
        per_page: pageState.pagination.amount,
        start: queryStartFrom,
    }
    const hadnleFetchTable = async q => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/supplier/suppliers${q}`,
        )

        if (response.data.success) {
            const perPage = response?.data?.meta?.per_page || 0
            const start = response?.data?.meta?.start || 0
            const total = response?.data?.meta?.totals || 0
            pageDispatch({
                type: useSupplierManagementAction.GET_PAGINATION,
                payload: {
                    active: Math.floor(start / perPage),
                    amount: perPage,
                    total: Math.ceil(total / perPage),
                    totalItems: total,
                },
            })
            pageDispatch({ type: useSupplierManagementAction.GET_LIST_SUPPLIER, payload: response.data.data })
            pageDispatch({ type: useSupplierManagementAction.SET_LOADING, payload: true })
        }

    }
    const generateQuery = obj => {
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(obj)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        return queryString
    }
    const handleTablePaginationAmountChange = async n => {
        pageDispatch({ type: useSupplierManagementAction.SET_LOADING, payload: false })
        const currentPage = pageState.pagination.active || 0
        const totalPages = pageState.pagination.total
        const totalItems = pageState.pagination.totalItems
        const page = totalItems < currentPage * n ? totalPages - 1 : currentPage
        const q = generateQuery({ ...queries, per_page: n, start: 0 })
        hadnleFetchTable(q)
    }

    const handleTablePaginationPageChange = async page => {
        pageDispatch({ type: useSupplierManagementAction.SET_LOADING, payload: false })
        const amount = pageState.pagination?.amount || 0

        const q = generateQuery({ ...queries, start: page * amount })
        hadnleFetchTable(q)
    }
    return{
        handleTablePaginationAmountChange,
        handleTablePaginationPageChange
    }
}