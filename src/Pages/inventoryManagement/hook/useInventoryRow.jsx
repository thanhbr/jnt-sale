import { sendRequestAuth } from 'api/api'
import config from 'config'
import useAlert from 'hook/useAlert'
import { useContext, useRef, useState } from 'react'
import { InventoryContext} from '../provider/_context'
import useInventoryFilterForm from "./useInventoryFilterForm";
import {InventoryAction} from "../provider/_action";
import toast from "../../../Component/Toast";

const useInventoryRow = data => {
    const { showAlert } = useAlert()
    const {functions} = useInventoryFilterForm()

    const { pageState, pageDispatch } = useContext(InventoryContext)
    const { table, filter, purchase } = pageState
    const {warehouse} = purchase.generalInfo
    const {pagination} = table;
    const isLoading = table.detail.loading
    const detailActive = table.detail.active
    const detailList = table.detail.list
    const diff = table.detail?.isDiff
    const shouldOpenDetail =
        data?.code && detailActive?.code === data.code
    const {modal} = pageState
    const label = modal.title
    const filterQueries = {
        keyword: filter.search?.value || '',
        start_date: '',
        end_date: '',
        user_id: filter.employee.activeValue?.value?.value || '',
        warehouse_id: filter.warehouse.activeValue?.value || '',
        status: filter.warehouse.activeValue?.value || '',
        per_page:20,
        start:0,
    }
    // ==================== ROW ========================================
    const rowDetailToggle = async () => {
        if (!data?.code) return
        if (data.code === detailActive?.code) {
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: { active: null,isDiff:0},
            })
            return
        }

        const findDetail = detailList.find(item => item?.code === data.code)
        if (findDetail) {
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: { active: findDetail },
            })
            return
        }

        fetchOrderDetail()
    }

    const fetchOrderDetail = async loading => {
        pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: !!loading })
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/detail/${data.id}?is_diff=0`,
        )

        if (!!response?.data?.success) {
            const newItem = response?.data?.data
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: { active: newItem, list: [...detailList,newItem]},
            })
        }
        pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false })
    }
    // ==================== CELL ========================================
    // CODE ORDER

    const cellCodeOrderFormatDateTime = dateTimeParam => {
        const dateTimeSplit = dateTimeParam ? dateTimeParam.split(' ') : []
        const ymd = dateTimeSplit[0] ? dateTimeSplit[0].split('-') : []
        const dmy = `${ymd[2] || '--'}/${ymd[1] || '--'}/${ymd[0] || '--'}`
        const hms = dateTimeSplit[1] ? dateTimeSplit[1].split(':') : []
        const hm = `${hms[0]}:${hms[1]}`
        return `${dmy} ${hm}`.trim()
    }

    const handleCheckDiff =async (e)=>{
        const {checked} = e.target
        pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: true })
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/detail/${data.id}?is_diff=${ checked ? 1 : 0}`,
        )

        if (!!response?.data?.success) {
            const newItem = response?.data?.data
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: { active: newItem, list: [...detailList,newItem],isDiff: checked ? 1 : 0},
            })
        }
        pageDispatch({ type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false })
    }
    //export
    const exportOrderExcel = async () => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/export/${data.id}`,
        )
        if (response?.data?.success && response?.data?.data?.url) {
            showAlert({ content: 'Xuất excel thành công', type: 'success' })
            return response.data.data.url
        } else {
            showAlert({ content: 'Xuất excel thất bại', type: 'danger' })
            return '#'
        }
    }
    const handleFetchFile = async () => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list?keyword&start_date&end_date&warehouse_id&status&user_id&per_page=${pagination.amount}&start=${+pagination.active * +pagination.amount}`,
        )
        if (!!response?.data?.success) {
            if(response.data.data?.find(item=>item.code === detailActive?.code)){
                const res = await sendRequestAuth(
                    'get',
                    `${config.API}/warehouse/inventory/detail/${modal.id}?is_diff=0`,
                )

                if (!!res?.data?.success) {
                    const newItem = res?.data?.data
                    pageDispatch({
                        type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                        payload: { active: newItem, list: [newItem]},
                    })
                }
            }
            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []

            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                    table: {
                        display: {
                            list: displayListData,
                        },
                    },
                },
            })
            //update paginate
            pageDispatch({type:InventoryAction.TABLE_PAGINATE_DATA, payload: {
                    pagination:{
                        totalItems:response?.data?.meta.total
                    }
                },})

        }
    }
    const fetchPostConfirm = async () => {
        const response = await sendRequestAuth(
            'post',
            `${config.API}/warehouse/inventory/${label}/${modal?.id}`,
        )
        if (!!response?.data?.success) {
            toast.success({title: response?.data?.message})
            handleConfirmDismiss()
            handleFetchFile()
        }
    }

    const handleConfirm = () => {
        fetchPostConfirm()
    }

    const handleConfirmDismiss = () => {
        pageDispatch({
            type: InventoryAction.OPEN_MODAL_CONFIRM, payload: {
                cancel: {show: false},
                balance: {show: false},
                import_excel:{show:false},
                title: '',
                id:''
            }
        })
    }
    const handleOpenConfirm = (item) => {
        if(item.label === 'balance') pageDispatch({
            type: InventoryAction.OPEN_MODAL_CONFIRM, payload: {
                balance : {
                    show: true
                },
                title: item.label,
                id:item.id
            }
        })
        else pageDispatch({
            type: InventoryAction.OPEN_MODAL_CONFIRM, payload: {
                cancel : {
                    show: true
                },
                title: label
            }
        })
    }
    //===========import confirm=======
    const handleDeActiveBalance = async _ =>{
        handleConfirmDismiss()
        pageDispatch({
            type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
            payload: {table: {display: {loading: true}}},
        })
        let queryStr = '?'
        let i = 0
        for (const [key, value] of Object.entries(filterQueries)) {
            queryStr += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list${queryStr}`,
        )
        if(response?.data?.success){

            const displayListData = Array.isArray(response?.data?.data)
                ? response.data.data
                : []
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DATA_UPDATE,
                payload: {
                    table: {
                        display: {
                            list: displayListData,
                        },
                    },
                },
            })
            //update paginate
            pageDispatch({type:InventoryAction.TABLE_PAGINATE_DATA, payload: {
                    pagination:{
                        totalItems:response?.data?.meta.total
                    }
                },})
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_LOADING_UPDATE,
                payload: {table: {display: {loading: false}}},
            })
        }
    }
    const handleActiveBalance = async _ =>{
        const res = await sendRequestAuth('post',
                `${config.API}/warehouse/inventory/balance/${modal.id}`
            )
        if(res?.data?.success){
            toast.success({title:res?.data.message})
            handleDeActiveBalance()
        }
    }
    return {
        cell: {
            codeOrder: {
                dateTime: cellCodeOrderFormatDateTime(data?.dt_created),
            },
        },
        detail: {
            isLoading,
            active: detailActive,
            diff: diff,
        },
        row: {
            shouldOpenDetail,
            onToggleDetail: rowDetailToggle,
            refreshOrderDetails: fetchOrderDetail,
            check:handleCheckDiff,
            onExportOrderExcel: exportOrderExcel,
        },
        confirm: {
            confirm: handleConfirm,
            dismiss: handleConfirmDismiss,
            openModal:handleOpenConfirm,
            deActiveBalance : handleDeActiveBalance,
            activeBalance : handleActiveBalance,
        }
    }
}

export default useInventoryRow
