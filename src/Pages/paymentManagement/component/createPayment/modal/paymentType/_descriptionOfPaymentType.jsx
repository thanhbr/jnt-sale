import React, {useContext} from "react";
import {PaymentManagementContext} from "../../../../provider/context";
import {Textarea} from "../../../../../../common/form/textarea";
import {useCreatePaymentModal} from "../../hooks/useCreatePaymentModal";

const Index = ({...props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {validate} = formCreate
    const {functions} = useCreatePaymentModal()
    return(
        <div className={'supplier-management-create_group supplier-management-create_textarea'}>
            <Textarea
                {...props}
                className={'payment-type-create_textarea'}
                label={
                    <>
                        Mô tả
                    </>
                }
                maxLength={256}
                autoComplete={'false'}
                // value={detail?.description || ''}
                placeholder='Nhập mô tả'
                validateText={validate?.descriptionPayment?.status ? validate?.descriptionPayment?.message : null}
                validateType={!validate?.descriptionPayment?.status ? 'success' : 'danger'}
                onChange={(e) => functions?.onChangeDescription(e)}
                onBlur={(e) => functions?.onBlurDescription(e)}
            />
        </div>
    )
}
export default Index