import React, {useContext, useState} from 'react';
import {PaymentManagementContext} from "../provider/context";
import toast from "../../../Component/Toast";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {PaymentManagementActions} from '../provider/action'
const usePaymentManagementTable = () => {
    const {pageState, pageDispatch} = useContext(PaymentManagementContext)
    const paginationPage = pageState?.table?.pagination
    const displayList = pageState?.table?.display
    const modalDesc = pageState?.table?.modal?.editDesc
    const modalCancel = pageState?.table?.modal?.cancelReceipt
    const detailList = pageState?.table.detail.list
    const detailListOrigin = pageState?.table.display.listOrigin
    const handleToggleEditModal = _ => {
        pageDispatch({type: PaymentManagementActions.TOGGLE_MODAL_EDIT_DESCRIPTION, payload: !pageState?.table?.modal?.editDesc?.open})
        pageDispatch({type: PaymentManagementActions.UPDATE_MODAL_EDIT_DESCRIPTION, payload: ''})
    }

    const handleChangeNote = value => pageDispatch({type: PaymentManagementActions.UPDATE_MODAL_EDIT_DESCRIPTION, payload: value})

    const handleUpdateNote = async _ => {
        const detailActive = {...pageState?.table?.detail?.active, description: pageState?.table?.modal?.editDesc?.data?.trim()}
        const dataPost = {
            object_type : detailActive?.object_type,
            object_id : detailActive?.object_id,
            receipt_code : detailActive?.receipt_code,
            receipt_type_id : detailActive?.receipt_type_id,
            payment_method_id : detailActive?.payment_method_id,
            total_amount : detailActive?.amount,
            dt_record : detailActive?.dt_record,
            reference_code : detailActive?.receipt_code,
            description : detailActive?.description,
        }

        const response = await sendRequestAuth('post',`${config.API}/cashbook/payments/update/${detailActive?.id}`, dataPost)
        if(response?.data?.success) {
            pageDispatch({
                type: PaymentManagementActions.TABLE_DISPLAY_DETAIL_UPDATE,
                payload: {active: detailActive, list: detailList}
            })
            toast.success('Cập nhật mô tả phiếu chi thành công')
        }
    }

    const shouldShowCreateBtn =
        !!!pageState?.filter?.keyword &&
        +paginationPage?.totalItems === 0 &&
        !!pageState?.filter?.dateTime?.start &&
        !!pageState?.filter?.groupSubmitter?.activeValue?.code &&
        !!pageState?.filter?.paymentMethod?.activeValue?.length === 0 &&
        !!pageState?.filter?.employeeCreate?.activeValue?.length === 0 &&
        !!pageState?.filter?.typeReceipt?.activeValue?.length === 0
    const handleToggleCancelModal = _ =>
        pageDispatch({type: PaymentManagementActions.TOGGLE_MODAL_CANCEL_RECEIPT,
            payload: {
                open: !modalCancel?.open,
                id: ''
            }})

    const submitCancelModal = async _ => {
        const response = await sendRequestAuth('post',`${config.API}/cashbook/payments/cancel/${modalCancel?.id}`)
        if(response?.data?.success) {
            toast.success('Đã hủy phiếu chi thành công')
            const receipts = displayList?.list?.map(item => {
                if(+item.id === +modalCancel?.id) item.status = '2'
                return item
            })
            pageDispatch({type: PaymentManagementActions?.TABLE_DISPLAY_DATA_UPDATE, payload: {list: receipts, loading: false}})
        } else {
            toast.error('Đã hủy phiếu chi thất bại')
        }
    }

    return {
        displayList,
        modalDesc,
        modalCancel,
        methods: {
            handleToggleEditModal,
            handleChangeNote,
            handleUpdateNote,

            handleToggleCancelModal,
            submitCancelModal,
        },
        shouldShowCreateBtn,
        detailListOrigin
    }
}

export default usePaymentManagementTable