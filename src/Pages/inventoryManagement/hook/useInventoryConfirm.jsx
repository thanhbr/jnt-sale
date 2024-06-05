import {useContext} from "react";
import {InventoryContext} from "../provider/_context";
import {InventoryAction} from "../provider/_action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {NOTIFICATION} from "../interfaces/_notification";
import useInventoryRow from "./useInventoryRow";

export const useInventoryConfirm = () => {
    const {pageState, pageDispatch} = useContext(InventoryContext)
    const {table} = pageState
    const detailActive = table.detail.active
    const detailList = table.detail.list
    const {modal} = pageState
    const label = modal.title
    const {pagination} = table;
    const {row} = useInventoryRow()
    const handleFetchFile = async () => {
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/list?keyword&start_date&end_date&warehouse_id&status&user_id&per_page=${pagination.amount}&start=${pagination.active}`,
        )


        if (!!response?.data?.success) {
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
            if(row.shouldOpenDetail) fetchOrderDetail()
        }
    }
    const fetchOrderDetail = async loading => {
        pageDispatch({type: 'TABLE_DETAIL_LOADING_UPDATE', payload: !!loading})
        const response = await sendRequestAuth(
            'get',
            `${config.API}/warehouse/inventory/detail/${modal?.id}?is_diff=0`,
        )

        if (!!response?.data?.success) {
            const newItem = response?.data?.data
            pageDispatch({
                type: InventoryAction.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: newItem, list: [...detailList, newItem]},
            })
        }
        pageDispatch({type: 'TABLE_DETAIL_LOADING_UPDATE', payload: false})
    }
    const fetchPostConfirm = async () => {
        // const response = await sendRequestAuth(
        //     'post',
        //     `${config.API}/warehouse/inventory/${label}/${modal?.id}`,
        // )
        // if (!!response?.data?.success) {
        //     toast.success({title: response?.data?.message})
        //     handleConfirmDismiss()
        //     handleFetchFile()
        //
        // }
        console.log(row.shouldOpenDetail)
    }


    const handleConfirm = () => {
        fetchPostConfirm()
    }

    const handleConfirmDismiss = () => {
        pageDispatch({
            type: InventoryAction.OPEN_MODAL_CONFIRM, payload: {
                cancel: {show: false},
                balance: {show: false},
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
    return {
        confirm: {
            confirm: handleConfirm,
            dismiss: handleConfirmDismiss,
            openModal:handleOpenConfirm,
        }
    }
}