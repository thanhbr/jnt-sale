import React, {useContext} from "react";
import {Textarea} from "../../../../common/form/textarea";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";

const Index = ({...props})=>{
    const {pageState} = useContext(PaymentTypeContext)
    const {paymentType,validate} = pageState;
    const {detail} = paymentType;
    const {functions} = usePaymentTypeModal()
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
                value={detail?.description || ''}
                placeholder='Nhập mô tả'
                validateText={validate?.description?.status ? validate?.description?.message : null}
                validateType={!validate?.description?.status ? 'success' : 'danger'}
                onChange={(e) => functions?.onChangeDescription(e)}
                onBlur={(e) => functions?.onBlurDescription(e)}
            />
        </div>
    )
}
export default Index