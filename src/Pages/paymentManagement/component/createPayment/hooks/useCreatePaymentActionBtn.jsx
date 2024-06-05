import {useContext} from "react";
import {PaymentManagementContext} from "../../../provider/context";
import {sendRequestAuth} from "../../../../../api/api";
import config from "../../../../../config";
import {convertDateTimeToApiFormat} from "../../../../purchases/utils/date";
import {PaymentManagementActions} from "../../../provider/action";
import toast from "../../../../../Component/Toast";
import {useNavigate} from "react-router-dom";
import {fNumber} from "../../../../../util/formatNumber";
import {replaceAllCustom} from "../../../../../util/functionUtil";
import {transformMoneyToSendRequest} from "../../../../orderSingle/utils/transform";
import {formatDatetime} from "../../../../../common/form/datePicker/_functions";
export const useCreatePaymentActionBtn = () =>{
    const {pageState,pageDispatch} = useContext(PaymentManagementContext)
    const {formCreate} = pageState
    const {form, validate} = formCreate

    const idEdit = location.pathname.split('/')[4] || ''
    const fromPage = location.state?.from || '/accountant/payment'
    const nav = useNavigate()
    const date = new Date()
    const canSubmitForm = [
        validate?.recipientGroup?.status,
        validate?.recipientPerson?.status,
        validate?.paymentType?.status,
        validate?.paymentCode?.status,
        validate?.paymentValue?.status,
        validate?.description?.status,
        validate?.submit,
    ].includes(true)
    const dataQueries = {
        object_type : form?.recipientGroup?.value?.value || '',
        object_id : form?.recipientPerson?.value?.value || '',
        receipt_code : form?.paymentCode?.value?.value || '',
        receipt_type_id : form?.paymentType?.value?.value || '',
        payment_method_id : form?.paymentMethod?.value?.value || '',
        total_amount : form?.paymentValue?.value?.value || '',
        dt_record :form?.dateTime?.formatValue ? convertDateTimeToApiFormat(form?.dateTime?.formatValue) : convertDateTimeToApiFormat(formatDatetime(date)),
        reference_code : form?.referenceCode.trim() || '',
        description : form?.description || ''
    }
    const handleErrorMessage = (error) =>{
        switch (error?.field) {
            case 'object_type':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    recipientGroup:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;
                case 'object_id':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    recipientPerson:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;
                case 'receipt_type_id':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentType:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;
                case 'payment_method_id':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentMethod:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;
                case 'total_amount':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentValue:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;
                case 'code':
                pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                    paymentCode:{
                        status:true,
                        message:error?.message

                    }
                    }})
                break;

            default:
                break;
        }
    }
    const handleAccept = async ()=>{
        pageDispatch({type:PaymentManagementActions.VALIDATE_FORM_CREATE_PAYMENT,payload:{
                submit:true
            }})
        const url = !!idEdit ? `/cashbook/payments/update/${idEdit}` : `/cashbook/payments/create`
        const response = await sendRequestAuth('post',
            `${config.API}${url}`,
            dataQueries
            )
        if(response.data.success){
            toast.success({title:response.data.message})
            nav(fromPage)
        }else response.data.errors.details.map(item => handleErrorMessage(item))

    }
    const handleDismiss = ()=>{

    }
    return{
        functions:{
            accept : handleAccept,
            dismiss : handleDismiss
        },
        canSubmitForm
    }

}