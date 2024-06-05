import {useContext, useState} from "react";
import {SupplierManagement} from "../provider/_context";
import {useSupplierManagementAction} from "../provider/_reducer";
import {postData, sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {NOTE_SCRIPT, NOTIFICATION_SUPPLIER} from "../interfaces/noteScript";
import {useProductAction} from "../../productGroup/provider/_reducer";
import {SCRIPT_NOTE_PRODUCT} from "../../productGroup/interface/script";
import {createProductGroup, updateProductGroup} from "../../../api/url";
import toast from "../../../Component/Toast";

export const useModal = () => {
    const [animate, setAnimate] = useState(false)
    const {pageState, pageDispatch} = useContext(SupplierManagement)
    const detailList = pageState.detailList
    const detailActive = pageState.detailActive
    const checkBeforeSubmit = [
        pageState.check_submit?.code_check?.status,
        pageState.check_submit?.name_check?.status,
        pageState.check_submit?.phone_check?.status,
        pageState.check_submit?.address_check?.status,
        pageState.check_submit?.short_name_check?.status,
        pageState.check_submit?.contract_name_check?.status,
        pageState.check_submit?.email_check?.status,
        pageState.check_submit?.note_check?.status,
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
        if (pageState.modal_confirm) {
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
            let meta = res?.data.meta
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
            pageDispatch({type: useSupplierManagementAction.GET_LIST_DETAIL, payload: res.data.data})
            pageDispatch({type: useSupplierManagementAction.GET_LIST_SUPPLIER, payload: res.data.data})
            pageDispatch({type: useSupplierManagementAction.SET_LOADING, payload: true})
        }
    }
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
    const handleAccept = async () => {
        const {supplier} = pageState
        if (!checkBeforeSubmit) {
            if (supplier.name === '' || supplier.address === '' || supplier.mobile === '') {
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_NAME,
                    payload: {
                        status: supplier.name === '' ? true : false,
                        message: NOTE_SCRIPT.NAME_SUPPLIER.EMPTY
                    }
                })
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_ADDRESS,
                    payload: {
                        status: supplier.address === '' ? true : false,
                        message: NOTE_SCRIPT.ADDRESS.EMPTY
                    }
                })
                pageDispatch({
                    type: useSupplierManagementAction.CHECK_SUBMIT_PHONE,
                    payload: {
                        status: supplier.mobile === '' ? true : false,
                        message: NOTE_SCRIPT.PHONE.EMPTY
                    }
                })
            } else {
                try {
                    if (pageState.id_supplier) {
                        const res = await sendRequestAuth('post', `${config.API}/supplier/update/${pageState.id_supplier}`, supplier)
                        if (res.data.success) {
                            if(detailActive?.supplier_id === pageState.id_supplier){
                                setAnimate(true)
                                setTimeout(() => {
                                    pageDispatch({type: useSupplierManagementAction.OPEN_MODAL, payload: false})
                                    setAnimate(false)
                                }, 300)
                                pageDispatch({type: useSupplierManagementAction.EMPTY_SUPPLIER})
                                toast.success({title: NOTIFICATION_SUPPLIER.UPDATE_SUPPLIER_SUCCESS})
                                pageDispatch({type: useSupplierManagementAction.GET_ID_SUPPLIER, payload: ''})
                                pageDispatch({type: useSupplierManagementAction.FALSE_CHECK_SUBMIT})
                                fetchSupplier()
                                fetchRowDetail(pageState.id_supplier)
                            }else{
                                pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:false})
                                setAnimate(true)
                                setTimeout(() => {
                                    pageDispatch({type: useSupplierManagementAction.OPEN_MODAL, payload: false})
                                    setAnimate(false)
                                }, 300)
                                pageDispatch({type: useSupplierManagementAction.EMPTY_SUPPLIER})
                                toast.success({title: NOTIFICATION_SUPPLIER.UPDATE_SUPPLIER_SUCCESS})
                                pageDispatch({type: useSupplierManagementAction.GET_ID_SUPPLIER, payload: ''})
                                pageDispatch({type: useSupplierManagementAction.FALSE_CHECK_SUBMIT})
                                fetchSupplier()
                                fetchRowDetail(pageState.id_supplier)
                                pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:false})
                            }

                        } else {
                            checkSubmit(res.data?.errors?.message)
                        }
                    } else {
                        pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:false})
                        const res = await sendRequestAuth('post', `${config.API}/supplier/create`, supplier)
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
    const refesh = async() => {
        pageDispatch({type:useSupplierManagementAction.SET_LOADING,payload:false})
        let keyword = pageState.key_word ? pageState.key_word : ''
        const res = await sendRequestAuth('get',`${config.API}/supplier/suppliers?keyword=${keyword}&per_page=${pageState.pagination?.amount}&start=${pageState.pagination?.active}`)
        if(res.data.success){
            let  meta  = res?.data.meta
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
            pageDispatch({type:useSupplierManagementAction.GET_LIST_DETAIL,payload:res.data.data})
            pageDispatch({type:useSupplierManagementAction.GET_LIST_SUPPLIER,payload:res.data.data})
            pageDispatch({ type:useSupplierManagementAction.SET_LOADING, payload: true })
        }
    }
    return {
        animate,
        modal: {
            handleClose,
            handleAccept
        },
        function_supplier: {
            open_modal,
            refesh
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