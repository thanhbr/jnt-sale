import {useContext} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {PaymentManagementActions} from "../../../provider/action";
import {CREATE_PAYMENT_FORM_VALIDATE} from "../../../interfaces/_const";

export const useCreatePaymentExtra = ()=>{
    const {pageState,pageDispatch} = useContext(PaymentManagementContext)
    const handleDateTimeChange = data =>
        pageDispatch({
            type: PaymentManagementActions.FORM_PAYMENT_DATETIME_UPDATE,
            payload: { ...data },
        })

    const handleDescriptionChange = e =>{
        const {value} = e.target
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
            description:{
                status:false,
                message:''
            },
                submit:false,
            }})
        pageDispatch({type:PaymentManagementActions.GET_DESCRIPTION_UPDATE,payload: value})
    }
    const handleDescriptionBlur = e =>{
        const {value} = e.target
        if(value.length > 255)  pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                description:{
                    status:true,
                    message:CREATE_PAYMENT_FORM_VALIDATE.description.MAX
                }
            }})
       else{
            pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    description:{
                        status:false,
                        message:''
                    }
                }})
            pageDispatch({type:PaymentManagementActions.GET_DESCRIPTION_UPDATE,payload: value.trim()})
        }
    }
    const handleChangeReferenceCode = e=>{
        const {value} = e.target
        if(value.length > 30) pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                referenceCode:{
                    status:true,
                    message:'Mã chứng từ chỉ được phép nhập tối đa 30 ký tự'
                }

            }})
        else{
            pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    referenceCode:{
                        status:false,
                        message:''
                    },
                    submit:false,
                }})

        }
        pageDispatch({type:PaymentManagementActions.GET_REFERENCE_UPDATE,payload:e.target.value})
    }
    return{
        methods:{
            onDateTimeChange:handleDateTimeChange,
            onChangeDescription : handleDescriptionChange,
            onBlurDescription : handleDescriptionBlur,
            onChangeReference : handleChangeReferenceCode,
        }
    }
}