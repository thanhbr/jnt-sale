import {useCallback, useState} from "react"
import {useContext} from "react"
import {PaymentTypeActions} from "../provider/action"
import {PaymentTypeContext} from "../provider/context"
import {REGEX_CUSTOMER_CODE} from "../../../util/regex";
import {VALIDATE_VALUE} from "../interfaces/_const";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";
import {debounce} from "@mui/material";

export const usePaymentTypeModal = _ => {
    const {pageState, pageDispatch} = useContext(PaymentTypeContext)
    const {validate, paymentType} = pageState
    const [animate, setAnimate] = useState(false)
    //create-update payment type
    const handleOpenModal = _ => {
        pageDispatch({
            type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                create_payment: true,

            }
        })
    }
    const handleCloseModal = _ => {
        if(pageState.haveEdit){
            pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                confirm_leave_page: true,
                }})
        }else{
            setAnimate(true)
            setTimeout(() => {
                pageDispatch({
                    type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                        create_payment: false,
                        close_modal:false,
                        confirm_status:false,
                        delete_payment:false,
                        confirm_same_name:false,
                        confirm_leave_page: false,
                    }
                })
                pageDispatch({type: PaymentTypeActions.SET_DETAIL_EMPTY})
                setAnimate(false)
            }, 300)
        }
    }

    //handle and validate create
    const canSubmitRule = [
        validate?.code?.status,
        validate?.name?.status,
        validate?.description?.status,
        validate?.submit,
    ].includes(true)
    const handleChangeCode = (e) => {
        pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                code: {
                    status: false,
                    message: ''
                },
                submit:false,
            }
        })
        pageDispatch({
            type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                code: e.target.value
            }
        })
    }
    const handleBlurCode = e => {
       pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:true})
        const regex = REGEX_CUSTOMER_CODE;
        const {value} = e.target
        if (value !== '' && !regex.test(value)) {
            if (value.length > 50) pageDispatch({
                type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    code: {
                        status: true,
                        message: VALIDATE_VALUE.val_code.MAX
                    }
                }
            })
            else pageDispatch({
                type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    code: {
                        status: true,
                        message: VALIDATE_VALUE.val_code.VALID
                    }
                }
            })

        }  else{
            pageDispatch({
                type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                    code: e.target.value.trim()
                }
            })
            pageDispatch({
                type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    code: {
                        status: false,
                        message: ''
                    },
                    submit:false,
                }
            })
        }
    }
    const handleChangeName = (e) => {
        pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:true})
        pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                name: {
                    status: false,
                    message: ''
                },
                submit: false
            }
        })
        pageDispatch({
            type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                name: e.target.value
            }
        })
    }
    const handleBlurName = e => {
        pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:true})
        const {value} = e.target
        if (value === '') {
            pageDispatch({
                type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    name: {
                        status: true,
                        message: VALIDATE_VALUE.val_name.EMPTY
                    }
                }
            })
        } else if (value.length > 30 ) pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                name: {
                    status: true,
                    message: VALIDATE_VALUE.val_name.MAX
                }
            }
        })
        else{
            pageDispatch({
                type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                    name: e.target.value.trim()
                }
            })
            pageDispatch({
                type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    name: {
                        status: false,
                        message: ''
                    },
                    submit: false
                }
            })
        }
    }
    const handleChangeDescription = (e) => {
        pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                description: {
                    status: false,
                    message: ''
                },
                submit: false
            }
        })
        pageDispatch({
            type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                description: e.target.value
            }
        })
    }
    const handleBlurDescription = e => {
        pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:true})
        const {value} = e.target
         if (value.length > 255) pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                description: {
                    status: true,
                    message: VALIDATE_VALUE.val_description.MAX
                }
            }
        })
        else{
             pageDispatch({
                 type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                     description: e.target.value.trim()
                 }
             })
             pageDispatch({
                 type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                     description: {
                         status: false,
                         message: ''
                     },
                     submit: false
                 }
             })
         }
    }
    const handleChangeStatus = (val)=>{
        pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:true})
        pageDispatch({
            type: PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                status: +val === 1 ? 0 : 1
            }
        })
    }

    //create update payment
    const handleCheckName = async (name)=>{
        const data = paymentType?.detail
        const url = !!data?.id ? `/cashbook/payments-type/update/${data?.id}` : `/cashbook/payments-type/create`
        const urlCheckName = !!data?.id ? `name=${name}&id=${data?.id}` : `name=${name}&id`
        const response = await sendRequestAuth('get',  `${config.API}/cashbook/payments-type/check?${urlCheckName}`)
        if(response?.data.success){
            pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                    confirm_same_name:true,
                }})
        }else{
            handleCreatePaymentType(url,data)
        }
    }
    const handleCreatePaymentType = async (url,data) =>{
        const response = await sendRequestAuth('post',
            `${config.API}${url}`
            ,data)
        if(response.data.success){
            pageDispatch({type: PaymentTypeActions.SET_ACTIVE_CHECK_BOX, payload: []})
            if(!!data?.id) fetchOrderByFilter(queries)
            else fetchOrderByFilter({...queries,start : 0})

            toast.success({title:response?.data.message})
            setAnimate(true)
            setTimeout(() => {
                pageDispatch({
                    type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                        create_payment: false,
                        close_modal:false,
                        confirm_status:false,
                        delete_payment:false,
                        confirm_same_name:false,
                        confirm_leave_page: false,
                    }
                })
                pageDispatch({type: PaymentTypeActions.SET_DETAIL_EMPTY})
                setAnimate(false)
            }, 300)
            pageDispatch({type: PaymentTypeActions.SET_HAVE_EDIT,payload: false})
        }else{
            const detail = response?.data?.errors?.details
            pageDispatch({
                type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    confirm_same_name:false,
                }
            })
            detail.map(item=>{
                switch (item.message) {
                    case 'Tên loại phiếu chi không được để trống':
                        pageDispatch({
                            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                                name: {
                                    status: true,
                                    message: item.message
                                }
                            }
                        })
                        break;
                    case 'Mã loại phiếu chi đã tồn tại, vui lòng kiểm tra lại':
                        pageDispatch({
                            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                                code: {
                                    status: true,
                                    message: item.message
                                }
                            }
                        })
                        break;
                    default:
                        toast.error({title:item.message})
                        break
                }

            })
        }
    }
    const handleCreate = async ()=>{
        const data = paymentType?.detail
        pageDispatch({
            type: PaymentTypeActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                submit: true
            }
        })
         handleCheckName(data?.name,data)
    }

    //confirm Modal
    const acceptSameName = ()=>{
        const data = paymentType?.detail
        const url = !!data?.id ? `/cashbook/payments-type/update/${data?.id}` : `/cashbook/payments-type/create`
        handleCreatePaymentType(url,data)
    }
    const dismissSameName = ()=>{
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                confirm_same_name:false
            }})
    }

    //confirm delete
    const acceptDelete = async ()=>{
        const response = await sendRequestAuth('delete',
            `${config.API}/cashbook/payments-type/delete/${paymentType?.id_delete}`
            )
        pageDispatch({type:PaymentTypeActions.GET_ID,payload:''})
        if(response.data.success){
            fetchOrderByFilter(queries)
            toast.success({title:response?.data.message})
            handleCloseModal()
        }else{
            toast.error({title:response?.data.message})
            handleCloseModal()
        }
    }
    const dismissDelete = ()=>{
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                delete_payment:false
            }})
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:''})
    }

    //confirm leave page
    const acceptLeave = async ()=>{
        pageDispatch({type:PaymentTypeActions.SET_HAVE_EDIT,payload:false})
        setAnimate(true)
        setTimeout(() => {
            pageDispatch({
                type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    create_payment: false,
                    close_modal:false,
                    confirm_status:false,
                    delete_payment:false,
                    confirm_same_name:false,
                    confirm_leave_page: false,
                }
            })
            pageDispatch({type: PaymentTypeActions.SET_DETAIL_EMPTY})
            setAnimate(false)
        }, 300)
    }
    const dismissLeave = ()=>{
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                confirm_leave_page:false
            }})

    }

    //confirm deActive status
    const setActive = async data => {
        let ArrTemp = []
        data?.id.map(item => {
            ArrTemp = {...ArrTemp, [item]: data.status}
        })
        const res = await sendRequestAuth('post', `${config.API}/cashbook/payments-type/active`, data)
        if(res.data.success){
            toast.success({title:res.data.message})
            pageDispatch({type: PaymentTypeActions.SET_ACTIVE_CHECK_BOX, payload: ArrTemp})
            pageDispatch({type: PaymentTypeActions.SET_COUNT, payload: 0})
            pageDispatch({type:PaymentTypeActions.GET_ID,payload:''})
            pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                    confirm_status:false
                }})
        }
    }
    const acceptDeActive = async ()=>{
        const arrayId = paymentType.is_check
        const id_status = paymentType.id_delete
        if(!!id_status){
            setActive({id:[id_status],status:0})
        }else{
            setActive({id:arrayId,status:0})
            pageDispatch({type: PaymentTypeActions.SET_IS_CHECK_BOX, payload: []})
        }
    }
    const dismissDeActive = ()=>{
        pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                confirm_status:false
            }})
        pageDispatch({type:PaymentTypeActions.GET_ID,payload:''})
    }


    //search
    const queries = {
        keyword:paymentType?.keyword || '',
        status:'',
        per_page:paymentType?.pagination?.amount || 20,
        start: paymentType?.pagination?.active * paymentType?.pagination?.amount || 0,
    }
    const fetchOrderByFilter = async (qs, opt) => {
        pageDispatch({type:PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,payload:false})
        let queryString = '?'
        let i = 0
        for (const [key, value] of Object.entries(qs)) {
            queryString += `${i > 0 ? '&' : ''}${key}=${value}`
            i++
        }
        const response = await sendRequestAuth('get', `${config.API}/cashbook/payments-type/list${queryString}`)
        if(response?.data.success){
            pageDispatch({
                type: PaymentTypeActions.SET_SEARCH_PAYMENT_TYPE,
                payload: qs?.keyword,
            })
            pageDispatch({type:PaymentTypeActions.SET_LOADING_PAYMENT_TYPE,payload:true})
            pageDispatch({type:PaymentTypeActions.GET_LIST_PAYMENT_TYPE,payload:{
                    list: response?.data?.data ,
                    listOrigin:response?.data?.data
                }})
            pageDispatch({type:PaymentTypeActions.TABLE_AMOUNT_UPDATE, payload: {
                    paymentType: {
                        list: response?.data?.data || [],
                        pagination: {
                            active:(+response?.data?.meta?.start / (response?.data?.meta?.per_page || 20)) ,
                            amount: response?.data?.meta?.per_page || 20,
                            total: Math.ceil(response?.data?.meta?.total / (response?.data?.meta?.per_page || 20)),
                            totalItems: response?.data?.meta?.total,
                        },
                    },
                },})
            pageDispatch({type: PaymentTypeActions.SET_HAVE_EDIT,payload: false})

        }
    }
    const debounceOrderByFilter = useCallback(debounce((keyword) => {
        fetchOrderByFilter(
            {...queries, keyword: keyword.trim()},
            0,
        )
    }, 500), [])
    const handleSearchChange = e => {
        const keyword = e?.target?.value || ''
        debounceOrderByFilter(keyword.trim())
    }
    return {
        functions: {
            //create-update payment type
            openModal: handleOpenModal,
            cancelConfirm: handleCloseModal,
            //handle and validate
            onChangeName: handleChangeName,
            onBlurName: handleBlurName,
            onChangeCode: handleChangeCode,
            onBlurCode: handleBlurCode,
            onChangeDescription: handleChangeDescription,
            onBlurDescription: handleBlurDescription,
            onChangeStatus: handleChangeStatus,
            createPayment : handleCreate,
        },
        confirm:{
            sameName:{
                accept: acceptSameName,
                dismiss: dismissSameName,
            },
            deletePayment:{
                accept: acceptDelete,
                dismiss: dismissDelete,
            },
            leavePage:{
                accept: acceptLeave,
                dismiss: dismissLeave,
            },
            deActive:{
                accept: acceptDeActive,
                dismiss: dismissDeActive,
            }
        },
        animate,
        canSubmitRule,
        changeSearch:{
            value:paymentType.keyword,
            searchPayment: handleSearchChange,
        },
        fetchOrderByFilter,
    }
}