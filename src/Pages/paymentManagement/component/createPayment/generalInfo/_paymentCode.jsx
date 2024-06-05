import React, {useContext} from "react";
import {Input} from "../../../../../common/form/input";
import {Text} from "../../../../../common/text";
import {PaymentManagementContext} from "../../../provider/context";
import {CONSIGNMENT} from "../../../../../Component/Icons";
import {ICON} from "../../../../supplierManagement/interfaces/_icon";
import {Tooltip} from "../../../../../common/tooltip";
import {useCreatePayment} from "../hooks/useCreatePayment";

export const PaymentCode = ({props})=>{
    const {pageState} = useContext(PaymentManagementContext)
    const {formCreate} = pageState;
    const {form,validate} = formCreate
    const {methods} = useCreatePayment()
    return(
        <Input
            label={
                <>
                    Mã phiếu chi  <Tooltip placement={'right'} title={'Trường hợp bạn không nhập mã phiếu chi, evoshop sẽ tự động sinh theo mã hệ thống'}>
                        <Text>{ICON.question}</Text>
                </Tooltip>
                </>
            }
            className="payment-management-person-input"
            placeholder={'Nhập mã phiếu chi'}
            autoComplete={'false'}
            validateText={validate?.paymentCode?.status ? validate?.paymentCode?.message : null}
            validateType={!validate?.paymentCode?.status ? 'success' : 'danger'}
            // defaultValue={searchParams.get('search')}
            value={form.paymentCode?.value?.name || ''}
            onChange={e => methods.paymentMethods.onChangePaymentCode(e)}
            maxLength={51}
            onBlur={e => methods.paymentMethods.onBlurChangePaymentCode(e)}
        />
    )
}