import React, {useContext} from "react";
import { Input } from "common/form/input";
import { THEME_SEMANTICS } from "common/theme/_semantics";
import { Text } from "common/text";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = ({props}) =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {paymentType, validate} = pageState;
    const {detail} = paymentType;
    const {functions} = usePaymentTypeModal()
    return(
        <Input
        {...props}
        className={'payment-type-create_name'}
        label={
            <>
                Tên loại phiếu chi
                    <Text color={THEME_SEMANTICS.failed} className={'payment-type-create_default'}>*</Text>
            </>
        }
        maxLength={31}
        autoComplete={'false'}
        value={detail?.name || ''}
        placeholder='Nhập tên loại phiếu chi'
        validateText={validate?.name?.status ? validate?.name?.message : null}
        validateType={!validate?.name?.status ? 'success' : 'danger'}
        onChange={(e) => functions?.onChangeName(e)}
        onBlur={(e) => functions?.onBlurName(e)}
    />
    )
}
export default Index