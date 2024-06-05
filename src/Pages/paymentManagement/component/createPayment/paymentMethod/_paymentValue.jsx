import React, {useContext} from "react";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {PaymentManagementContext} from "../../../provider/context";
import {THEME_SEMANTICS} from "../../../../../common/theme/_semantics";
import {useCreatePayment} from "../hooks/useCreatePayment";
import {CurrencyInput} from "./_currentcyInput";

export const PaymentValue = ({props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form,validate} = formCreate
    const {methods} = useCreatePayment()

    return(
        <CurrencyInput
            defaultValue={form?.paymentValue?.value?.name || ''}
            // triggerDefault={totalValueOfGoods}
            icon={
                <Text as="u" color="#7C88A6">
                    đ
                </Text>
            }
            iconProps={{style: {textAlign: 'right'}}}
            label={<span>Giá trị chi <Text color={THEME_SEMANTICS.failed}>*</Text></span>}
            onChange={value => methods.paymentMethods.onChangePaymentValue(value)}
            onBlur={value => methods?.paymentMethods.onBlurPaymentValue(value)}
            validateText={validate?.paymentValue?.status ? validate?.paymentValue?.message : null}
            validateType={!validate?.paymentValue?.status ? 'success' : 'danger'}
            placeholder={'Nhập giá trị chi'}
            maxLength={15}
        />

    )
}