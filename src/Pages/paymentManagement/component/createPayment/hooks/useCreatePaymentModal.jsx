import {useContext, useState} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {REGEX_CUSTOMER_CODE} from "../../../../../util/regex";
import {VALIDATE_VALUE} from "../../../../paymentType/interfaces/_const";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import toast from "../../../../../Component/Toast";
import {PaymentManagementActions} from "../../../provider/action"
import {PaymentTypeActions} from "../../../../paymentType/provider/action";
export const useCreatePaymentModal = () =>{
    const {pageState, pageDispatch} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {addNew, validate, contentModal} = formCreate;
    const {paymentType, paymentMethods} = addNew
    const [animate, setAnimate] = useState(false)
    const paymentMethodName = paymentMethods.name
    //open modal
    const handleOpenModal = (typeContent) =>{
        pageDispatch({type: PaymentManagementActions.SET_DETAIL_EMPTY})
        pageDispatch({type:PaymentManagementActions.OPEN_MODAL_ADD_NEW,payload:{
            type:typeContent,
                open:true
        }})

    }
    const handleCloseModal = ()=>{
        if(addNew.haveEdit){
            pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                    leavePage: true,
                }})
        }else{
            pageDispatch({type: PaymentManagementActions.SET_DETAIL_EMPTY})
            pageDispatch({type:PaymentManagementActions.OPEN_MODAL_ADD_NEW,payload:{
                    type:'payment type',
                    open:false
                }})
        }


    }
    const canSubmitRule = [
        validate?.code?.status,
        validate?.name?.status,
        validate?.description?.status,
        validate?.submit,
        validate?.paymentMethodName?.status
    ].includes(true)
    const handleChangeCode = (e) => {
        pageDispatch({
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                code: {
                    status: false,
                    message: ''
                },
                submit:false,
            }
        })
        pageDispatch({
            type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                code: e.target.value
            }
        })
    }
    const handleBlurCode = e => {
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        const regex = REGEX_CUSTOMER_CODE;
        const {value} = e.target
        if (value !== '' && !regex.test(value)) {
            if (value.length > 50) pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    code: {
                        status: true,
                        message: VALIDATE_VALUE.val_code.MAX
                    }
                }
            })
            else pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    code: {
                        status: true,
                        message: VALIDATE_VALUE.val_code.VALID
                    }
                }
            })

        }  else{
            pageDispatch({
                type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                    code: e.target.value.trim()
                }
            })
            pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
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
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        pageDispatch({
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                name: {
                    status: false,
                    message: ''
                },
                submit: false
            }
        })
        pageDispatch({
            type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                name: e.target.value
            }
        })
    }
    const handleBlurName = e => {
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        const {value} = e.target
        if (value === '') {
            pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    name: {
                        status: true,
                        message: VALIDATE_VALUE.val_name.EMPTY
                    }
                }
            })
        } else if (value.length > 30 ) pageDispatch({
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                name: {
                    status: true,
                    message: VALIDATE_VALUE.val_name.MAX
                }
            }
        })
        else{
            pageDispatch({
                type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                    name: e.target.value.trim()
                }
            })
            pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
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
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                description: {
                    status: false,
                    message: ''
                },
                submit: false
            }
        })
        pageDispatch({
            type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                description: e.target.value
            }
        })
    }
    const handleBlurDescription = e => {
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        const {value} = e.target
        if (value.length > 255) pageDispatch({
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                description: {
                    status: true,
                    message: VALIDATE_VALUE.val_description.MAX
                }
            }
        })
        else{
            pageDispatch({
                type: PaymentManagementActions.GET_DETAIL_PAYMENT_TYPE, payload: {
                    description: e.target.value.trim()
                }
            })
            pageDispatch({
                type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                    description: {
                        status: false,
                        message: ''
                    },
                    submit: false
                }
            })
        }
    }
    //create update payment
    const handleCheckName = async (name)=>{
        const url =  `/cashbook/payments-type/create`
        const urlCheckName =`name=${name}&id`
        const response = await sendRequestAuth('get',  `${config.API}/cashbook/payments-type/check?${urlCheckName}`)
        if(response?.data.success){
            pageDispatch({type:PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                    sameName:true,
                }})
        }else{
            handleCreatePaymentType(url,paymentType)
        }
    }
    const handleCreatePaymentType = async (url,data) =>{
        const response = await sendRequestAuth('post',
            `${config.API}${url}`
            ,data)
        if(response.data.success){
            handleFetchAfterCreate(contentModal?.type)
            if(contentModal?.type !== "payment type") toast.success({title:'Thêm mới phương thức thanh toán thành công.'})
            else toast.success({title:response?.data.message})
            setAnimate(true)
            setTimeout(() => {
                pageDispatch({
                    type: PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                        leavePage:false,
                        sameName:false,
                    }
                })
                pageDispatch({type: PaymentManagementActions.SET_DETAIL_EMPTY})
                setAnimate(false)
            }, 300)
            pageDispatch({type: PaymentManagementActions.SET_HAVE_EDIT,payload: false})
            pageDispatch({type:PaymentManagementActions.OPEN_MODAL_ADD_NEW,payload:{
                    type:'payment type',
                    open:false
                }})
        }else{
            const detail = response?.data?.errors?.details
            if(contentModal?.type !== "payment type") {
                if(response?.data?.errors[0]?.message === 'Tên phương thức thanh toán là bắt buộc!')  pageDispatch({
                    type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                        paymentMethodsName: {
                            status: true,
                            message: 'Phương thức thanh toán không được bỏ trống!'
                        }
                    }
                })
                else  toast.error({title:'Thêm mới phương thức thanh toán thất bại!'})

            }
            pageDispatch({
                type: PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    sameName:false,
                }
            })
            detail?.map(item=>{
                switch (item.message) {
                    case 'Tên loại phiếu chi không được để trống':
                        pageDispatch({
                            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                                name: {
                                    status: true,
                                    message: item.message
                                }
                            }
                        })
                        break;
                    case 'Mã loại phiếu chi đã tồn tại, vui lòng kiểm tra lại':
                        pageDispatch({
                            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                                code: {
                                    status: true,
                                    message: item.message
                                }
                            }
                        })
                        break;
                        case 'Mã phiếu chi đã tồn tại, vui lòng kiểm tra lại':
                        pageDispatch({
                            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                                paymentCode: {
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
    const handleFetchAfterCreate = async (type)=>{
        const url = type === 'payment type' ?`/cashbook/payments-type/list?keyword=&status=1&per_page=20&start=0` : `/payment/payment-method?keyword&status=1&per_page=20&start=0`
        const response = await sendRequestAuth('get',`${config.API}${url}`)
        if(response?.data?.success){
            if(type === 'payment type')  pageDispatch({type:PaymentManagementActions.GET_LIST_PAYMENT_TYPE,payload:{
                    list: response?.data?.data,
                    pagination :{
                        totalItems:response?.data?.meta?.total
                    }
                }})
            else {
                const defaultValue = response?.data?.data.find(find => +find.is_active === 1)
                if(!!defaultValue) pageDispatch({type:PaymentManagementActions.UPDATE_PAYMENT_METHOD,payload:{
                        value:{
                            value:defaultValue?.id,
                            name:defaultValue?.name
                        }
                    }})

                pageDispatch({type:PaymentManagementActions.GET_LIST_PAYMENT_METHOD,payload:{
                        list:response?.data?.data,
                        pagination :{
                            totalItems:response?.data?.meta?.total
                        }
                    }})
            }
        }
    }
    const handleCreate = async ()=>{
        pageDispatch({
            type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload: {
                submit: true
            }
        })
        if(contentModal?.type !== 'payment type'){
            const url = `/payment/create`
            const data = {
                name: paymentMethods?.name.trim(),
                is_active: paymentMethods.is_active,
                status: 1
            }
            handleCreatePaymentType(url,data)
        }else{
            handleCheckName(paymentType?.name,paymentType)
        }

    }

    //confirm Modal
    const acceptSameName = ()=>{
        const url =  `/cashbook/payments-type/create`
        handleCreatePaymentType(url,paymentType)
    }
    const dismissSameName = ()=>{
        pageDispatch({type:PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                sameName:false
            }})
    }
    //leave page
    const acceptLeave = async ()=>{
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:false})
        setAnimate(true)
        setTimeout(() => {
            pageDispatch({
                type: PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    sameName: false,
                    leavePage:false,
                }
            })
            pageDispatch({type:PaymentManagementActions.OPEN_MODAL_ADD_NEW,payload:{
                    type:'payment type',
                    open:false
                }})
            pageDispatch({type: PaymentManagementActions.SET_DETAIL_EMPTY})
            setAnimate(false)
        }, 300)
    }
    const dismissLeave = ()=>{
        pageDispatch({type:PaymentManagementActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                leavePage:false
            }})

    }
    //payment method
    const onChangeName = value => {
        pageDispatch({ type: PaymentManagementActions.MODAL_FORM_CREATE, payload: {name: value} })
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        if(!!value) {
            pageDispatch({ type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload:{
                    paymentMethodsName:  { status: false, message: '' },
                    submit: false
                }})
        }
    }
    const onBlurName = () => {
        if(!!!paymentMethodName) {
            pageDispatch({ type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload:{
                paymentMethodsName:  { status: true, message: 'Phương thức thanh toán không được bỏ trống!' },
                    submit: true
            }})
        } else {
            pageDispatch({ type: PaymentManagementActions.VALIDATE_DETAIL_PAYMENT_TYPE, payload:{
                    paymentMethodsName:  { status: false, message: '' },
                    submit: false
                }})
        }
    }
    const checkBoxPaymentMethod = (e)=>{
        pageDispatch({type:PaymentManagementActions.SET_HAVE_EDIT,payload:true})
        const {checked} = e.target
        pageDispatch({ type: PaymentManagementActions.MODAL_FORM_CREATE, payload: {is_active: !checked ? 0: 1} })
    }
    return{
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
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
            createPayment : handleCreate,
            //
            paymentFunction :{
                onChangeName:onChangeName,
                onBlurName:onBlurName,
                checkBoxPaymentMethod,
            }
        },
        confirmModal:{
            sameName:{
                accept: acceptSameName,
                dismiss: dismissSameName,
            },

            leavePage:{
                accept: acceptLeave,
                dismiss: dismissLeave,
            },
        },
        animate,
        canSubmitRule,
        formCreate,
    }
}