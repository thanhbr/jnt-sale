import {useContext} from "react";
import {PaymentTypeContext} from "../provider/context";
import {sendRequestAuth} from "../../../api/api";
import config from "../../../config";
import {PaymentTypeActions} from "../provider/action";
import toast from "../../../Component/Toast";

export const usePaymentTypeTable = _ =>{
    const {pageState,pageDispatch} = useContext(PaymentTypeContext)
    //detail paymnent
    const fetchDetailPayment = async(id)=>{
            const response = await sendRequestAuth('get',
                `${config.API}/cashbook/payments-type/detail/${id}`
                )
        if(response?.data.success){
            pageDispatch({type:PaymentTypeActions.OPEN_MODAL_PAYMENT_TYPE,payload:{
                    create_payment:true
            }})
            pageDispatch({type:PaymentTypeActions.GET_DETAIL_PAYMENT_TYPE,payload:response?.data?.data})
        }
    }

    //delete payment
    const handleDeletePayment = async (id)=>{
        const response = await sendRequestAuth('get',
            `${config.API}/cashbook/payments-type/delete/${id}`
        )
        if(response?.data.success){
            console.log(response?.data?.data)

        }
    }
    //handle checkbox
    return{
        detail_payment:{
            fetch:fetchDetailPayment,
            delete:handleDeletePayment
        }
    }
}