import {useContext, useState} from "react";
import {SupplierManagement} from "../provider/_context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {useSupplierManagementAction} from "../provider/_reducer";
import toast from "../../../Component/Toast";
import {NOTIFICATION_SUPPLIER} from "../interfaces/noteScript";

export const useConfirmDeleteAndCancelStatus = () => {
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const [disable,setDisale] = useState(true)
    const fetchListSupplier = async () => {
        pageDispatch({type: useSupplierManagementAction.SET_LOADING, payload: false})
        const res = await Promise.all([
            sendRequestAuth('get', `${config.API}/supplier/suppliers?keyword=&per_page=20&start=0`),
        ])
        if (res[0].data.success) {
            let meta = res[0]?.data.meta
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
            pageDispatch({type: useSupplierManagementAction.GET_LIST_DETAIL, payload: res[0].data.data})
            pageDispatch({type: useSupplierManagementAction.GET_LIST_SUPPLIER, payload: res[0].data.data})
            pageDispatch({type: useSupplierManagementAction.SET_LOADING, payload: true})
            pageDispatch({type:useSupplierManagementAction.EMPTY_SUPPLIER})
        }
    }
    const setActive = async data => {
        try {
            const res = await sendRequestAuth('post', `${config.API}/supplier/active`, data)
            if (res.data.message === 'Ngưng sử dụng nhà cung cấp thành công') {
                let ArrTemp = []
                data?.id.map(item => {
                    ArrTemp = {...ArrTemp, [item]: data.status}
                })
                toast.success({title: NOTIFICATION_SUPPLIER.TURN_OFF_STATUS_SUCCESS})
                pageDispatch({
                    type: useSupplierManagementAction.OPEN_CONFIRM_CANCEL, payload: {
                        open: false,
                        array_id: []
                    }
                })
                pageDispatch({type: useSupplierManagementAction.SET_IS_CHECK_BOX, payload: []})
                pageDispatch({type: useSupplierManagementAction.SET_ACTIVE_CHECK_BOX, payload: ArrTemp})
            }
        } catch (er) {
            console.log(er)
        }
    }
    const handleConfirmDelete = async () => {
        setDisale(false)
        if(disable){
            const res = await sendRequestAuth('get', `${config.API}/supplier/delete/${pageState.id_supplier}`)
            if (res.data.message === 'Xóa nhà cung cấp thành công!') {
                pageDispatch({type: useSupplierManagementAction.OPEN_CONFIRM_DELETE, payload: false})
                toast.success({title: NOTIFICATION_SUPPLIER.DELETE_SUPPLIER_SUCCESS})
                pageDispatch({type:useSupplierManagementAction.EMPTY_SUPPLIER})
                fetchListSupplier()
                setTimeout(()=>{
                    setDisale(true)
                },2000)
            }else{
                pageDispatch({type: useSupplierManagementAction.OPEN_CONFIRM_DELETE, payload: false})
                toast.error({title: NOTIFICATION_SUPPLIER.DELETE_SUPPLIER_FAILD})
                pageDispatch({type:useSupplierManagementAction.EMPTY_SUPPLIER})
                setTimeout(()=>{
                    setDisale(true)
                },2000)
            }
        }

    }
    const handleConfirmDeleteCancel = () => {
        pageDispatch({type: useSupplierManagementAction.OPEN_CONFIRM_DELETE, payload: false})
    }
    const handleConfirmDeActive = () => {
        const data = {id: pageState.open_confirm_cancel?.array_id, status: 0}
        setActive(data)
    }
    const handleConfirmCancelDeActive = () => {
        pageDispatch({
            type: useSupplierManagementAction.OPEN_CONFIRM_CANCEL, payload: {
                open: false,
                array_id: []
            }
        })
        pageDispatch({type: useSupplierManagementAction.SET_IS_CHECK_BOX, payload: []})
        pageDispatch({type: useSupplierManagementAction.SET_ACTIVE_CHECK_BOX, payload: []})
    }
    return {
        handleConfirmDelete,
        handleConfirmDeleteCancel,
        handleConfirmDeActive,
        handleConfirmCancelDeActive
    }
}