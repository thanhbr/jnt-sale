import React, {useContext} from "react";
import { Input } from "common/form/input";
import { THEME_SEMANTICS } from "common/theme/_semantics";
import { Text } from "common/text";
import { Tooltip } from "common/tooltip";
import { ICON } from "Pages/supplierManagement/interfaces/_icon";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";
const Index = ({props}) =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {paymentType, validate} = pageState;
    const {detail} = paymentType
    const {functions} = usePaymentTypeModal()
    return(
        <Input
        {...props}
        className={'payment-type-create_name'}
        label={
            <>
                Mã loại phiếu chi
                <Tooltip  placement={'right'} title={'Trường hợp bạn không nhập mã loại phiếu chi, evoshop sẽ tự động sinh theo mã hệ thống'}>
                    <Text className={'payment-type-create_default'}>{ICON.question}</Text>
                </Tooltip>
                    
            </>
        }
        maxLength={51}
        autoComplete={'false'}
        value={detail?.code || ''}
        placeholder='Nhập mã loại phiếu chi'
        disabled={+detail.is_default === 1}
        validateText={validate?.code?.status ? validate?.code?.message : null}
        validateType={!validate?.code?.status ? 'success' : 'danger'}
        onChange={(e) => functions?.onChangeCode(e)}
        onBlur={(e) => functions?.onBlurCode(e)}
    />
    )
}
export default Index