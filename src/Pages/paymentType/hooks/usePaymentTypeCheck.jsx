import {useContext, useEffect, useState} from "react";
import {PaymentTypeContext} from "../provider/context";
import {useSupplierManagementAction} from "../../supplierManagement/provider/_reducer";
import {PaymentTypeActions} from "../provider/action";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import toast from "../../../Component/Toast";

export const usePaymentTypeCheck = ()=>{
    const {pageState,pageDispatch} = useContext(PaymentTypeContext)
    const {paymentType} = pageState
    const [isActive, setIsActive] = useState(paymentType.is_active)
    const [disable, setDisabled] = useState(false)
    const list = paymentType.list
    const isCheck = paymentType.is_check
    const shouldActiveCheckbox = isCheck?.length > 0
    useEffect(() => {
        setIsActive({...isActive, ...paymentType.is_active})
    }, [paymentType.is_active])
    const setActive = async data => {
        const res = await sendRequestAuth('post', `${config.API}/cashbook/payments-type/active`, data)
        if(res.data.success){
            toast.success({title:res.data.message})
            pageDispatch({type:PaymentTypeActions.GET_ID,payload:''})
        }
    }

    const isActiveAll =
        list.length <= 0
            ? false
            : isCheck?.length < list.filter(filter=> +filter?.is_default !== 1).length
            ? false
            : !!!list.find(
                item => {if(+item?.is_default !== 1) return  !!!isCheck?.find(find => find === item?.id)},
            )

    const checkAll = () => {
        let newSelectedList = []
        let id_default = []
         list?.filter(filter =>{
            if(+filter?.is_default === 1) id_default.push(filter?.id)
        })
        if (isActiveAll) {
            newSelectedList = isCheck?.filter(
                item => !!!list.find(find => {
                    if(+find?.is_default !== 1) return find?.id === item

                }),
            )
        } else {
            let addingList = []
            list.forEach(item => {
                if (!!!isCheck?.find(find => find === item?.id)) {
                    addingList.push(item?.id)
                }

            })
            newSelectedList = [...isCheck, ...addingList]
        }
        const arrayId = newSelectedList.filter(item=>{
            if(!!!id_default?.includes(item)) return item
        })
        pageDispatch({
            type: PaymentTypeActions.SET_IS_CHECK_BOX,
            payload: arrayId,
        })
    }
    const is_check = (id) => {
        let check = isCheck.find(item => item === id)
        if (check !== undefined) {
            pageDispatch({
                type: PaymentTypeActions.SET_IS_CHECK_BOX,
                payload: isCheck.filter(item => item !== id)
            })
        } else {
            pageDispatch({type: PaymentTypeActions.SET_IS_CHECK_BOX, payload: [...isCheck, id]})
        }

    }
    const handleStatus = (e) => {
        const {checked, id} = e.target
        setDisabled(true)
        if (!checked) {
            pageDispatch({
                type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    confirm_status:true
                }
            })
            pageDispatch({type:PaymentTypeActions.GET_ID,payload:id})
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        } else {
            pageDispatch({
                type: PaymentTypeActions.SET_ACTIVE_CHECK_BOX,
                payload: {...paymentType.is_active, [id]: 1}
            })
            setActive({id: [id], status: 1})
            setTimeout(() => {
                setDisabled(false)
            }, 2000)
        }
    }
    const handleActive = async (data) => {
        let ArrTemp = []
        data?.id.map(item => {
            ArrTemp = {...ArrTemp, [item]: data.status}
        })
        if (data.status === 0) {
            pageDispatch({
                type: PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE, payload: {
                    confirm_status:true
                }
            })
        } else {
            setActive(data)
            pageDispatch({type: PaymentTypeActions.SET_COUNT, payload: 0})
            pageDispatch({type: PaymentTypeActions.SET_IS_CHECK_BOX, payload: []})
            pageDispatch({type: PaymentTypeActions.SET_ACTIVE_CHECK_BOX, payload: ArrTemp})
        }

    }


    return{
        checkAll,
        is_check,
        handleStatus,
        isActive,
        handleActive,
        disable,
        shouldActiveCheckbox,
    }
}