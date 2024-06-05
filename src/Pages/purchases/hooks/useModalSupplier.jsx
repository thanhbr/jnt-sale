import {useContext, useState} from "react";
import { PurchasesContext } from '../provider/_context'
import {useSupplierManagementAction} from "../provider/_reducer";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {NOTE_SCRIPT, NOTIFICATION_SUPPLIER} from "../interfaces/noteScript";
import {useProductAction} from "../../productGroup/provider/_reducer";
import toast from "../../../Component/Toast";

export const useModalSupplier = () => {
    const [animate, setAnimate] = useState(false)
    const {pageState, pageDispatch} = useContext(PurchasesContext)
    const {supplier} = pageState
    const detailList = pageState.detailList
    const detailActive = pageState.detailActive
    const checkBeforeSubmit = [
        supplier.check_submit?.code_check?.status,
        supplier.check_submit?.name_check?.status,
        supplier.check_submit?.phone_check?.status,
        supplier.check_submit?.address_check?.status,
        supplier.check_submit?.short_name_check?.status,
        supplier.check_submit?.contract_name_check?.status,
        supplier.check_submit?.email_check?.status,
        supplier.check_submit?.note_check?.status,
    ].includes(true)
    const fetchDetailSupplier = async () => {
        const res = await sendRequestAuth('get', `${config.API}/supplier/detail/${pageState.id_supplier}`)
        if (res.data.success) {
            pageDispatch({
                type: useSupplierManagementAction.SET_DETAIL_SUPPLIER, payload: {
                    name: res.data?.data.supplier_name,
                    alias: res.data?.data.supplier_name_alias,
                    contact_name: res.data?.data.people_contact,
                    mobile: res.data?.data.mobile,
                    address: res.data?.data.address,
                    email: res.data?.data.email,
                    details: res.data?.data.details,
                    status: res.data?.data.status,
                    code:res.data?.data.supplier_code
                }
            })
            // pageDispatch({type:useSupplierManagementAction.GET_ID_SUPPLIER,payload:res.data?.data.supplier_id})
        }
    }

    const handleClose = () => {
        if (supplier.modal_confirm) {
            pageDispatch({type: useSupplierManagementAction.OPEN_MODAL_CONFIRM, payload: true})
        } else {
            setAnimate(true)
            setTimeout(() => {
                pageDispatch({type: useSupplierManagementAction.OPEN_MODAL, payload: false})
                pageDispatch({type: useSupplierManagementAction.EMPTY_SUPPLIER})
                pageDispatch({type: useSupplierManagementAction.FALSE_CHECK_SUBMIT})
                pageDispatch({type: useSupplierManagementAction.OPEN_MODAL_CONFIRM, payload: false})
                setAnimate(false)
            }, 300)
        }

    }
    const checkSubmit = (mess) => {
        switch (mess) {
            case "Tên nhà cung cấp là bắt buộc!":
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_NAME,
                    payload: NOTE_SCRIPT.NAME_SUPPLIER.EMPTY
                })
                break;
            case   "Địa chỉ là bắt buộc!":
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS,
                    payload: NOTE_SCRIPT.ADDRESS.EMPTY
                })
                break;
            case   "Số điện thoại là bắt buộc!":
                pageDispatch({type: useSupplierManagementAction.CHECK_SUBMIT_PHONE, payload: NOTE_SCRIPT.PHONE.EMPTY})
                break;
            default:
                break;
        }
    }
    const fetchSupplier = async () => {
        const res = await sendRequestAuth('get', `${config.API}/supplier/suppliers?keyword=&per_page=20&start=0`)
        if (res.data.success) {
            pageDispatch({type: useSupplierManagementAction.GET_LIST_SUPPLIER, payload: res.data.data})
            pageDispatch({type: useSupplierManagementAction.SET_LOADING, payload: true})
        }
    }
    const handleAccept = async () => {
        if (!checkBeforeSubmit) {
            if (supplier.supplier.supplier_name === '' || supplier.supplier.address === '' || supplier.supplier.mobile === '') {
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_NAME,
                    payload: {
                        status: supplier.supplier.supplier_name === '' ? true : false,
                        message: NOTE_SCRIPT.NAME_SUPPLIER.EMPTY
                    }
                })
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS,
                    payload: {
                        status: supplier.supplier.address === '' ? true : false,
                        message: NOTE_SCRIPT.ADDRESS.EMPTY
                    }
                })
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_PHONE,
                    payload: {
                        status: supplier.supplier.mobile === '' ? true : false,
                        message: NOTE_SCRIPT.PHONE.EMPTY
                    }
                })
            } else {
                try {
                    pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:false})
                    const res = await sendRequestAuth('post', `${config.API}/supplier/create`, supplier.supplier)
                    if (res.data.success) {
                        setAnimate(true)
                        setTimeout(() => {
                            pageDispatch({type: useProductAction.OPEN_MODAL, payload: false})
                            setAnimate(false)
                        }, 300)
                        pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:true})
                        toast.success({title: NOTIFICATION_SUPPLIER.CREATE_SUPPLIER_SUCCESS})
                        pageDispatch({type: useSupplierManagementAction.FALSE_CHECK_SUBMIT})
                        pageDispatch({type: useSupplierManagementAction.EMPTY_SUPPLIER})
                        fetchSupplier()
                    } else {
                        checkSubmit(res.data?.errors?.message)
                    }

                } catch (e) {
                    console.log(e)
                }
            }
        }

    }
    const handleCancelConfirm = () => {
        pageDispatch({type: useSupplierManagementAction.OPEN_MODAL_CONFIRM, payload: false})
    }
    const handleAcceptConfirm = () => {
        pageDispatch({type: useSupplierManagementAction.OPEN_MODAL_CONFIRM, payload: false})
        setAnimate(true)
        setTimeout(() => {
            pageDispatch({type: useSupplierManagementAction.OPEN_MODAL, payload: false})
            setAnimate(false)
        }, 300)
        pageDispatch({type: useSupplierManagementAction.EMPTY_SUPPLIER})
        pageDispatch({type: useSupplierManagementAction.FALSE_CHECK_SUBMIT})
    }
    const open_modal = () => {
        pageDispatch({type: useSupplierManagementAction.OPEN_MODAL, payload: true})
        pageDispatch({type: useSupplierManagementAction.OPEN_MODAL_CONFIRM, payload: false})
        pageDispatch({type:useSupplierManagementAction.EMPTY_SUPPLIER})
    }
    return {
        supplier,pageDispatch,
        animate,
        modal: {
            handleClose,
            handleAccept
        },
        function_supplier: {
            open_modal,
        },
        confirm: {
            handleAcceptConfirm,
            handleCancelConfirm
        },
        submit: {
            checkBeforeSubmit,
        },
        detail: {
            fetchDetailSupplier,
        }

    }
}