import { Text } from "common/text";
import { SwitchStatus } from "Component/SwitchStatus/SwitchStatus";
import React, {useContext} from "react";
import {PaymentTypeContext} from "../../provider/context";
import {usePaymentTypeModal} from "../../hooks/usePaymentTypeModal";

const Index = _ =>{
    const {pageState} = useContext(PaymentTypeContext)
    const {paymentType} = pageState;
    const {detail} = paymentType;
    const {functions} = usePaymentTypeModal()
    return(
        <div className="payment-type-create_status">
            <SwitchStatus disabled={+detail.is_default === 1} status={detail?.status} handleChange={()=>functions.onChangeStatus(detail?.status)} />
            <Text className='payment-type-create_default'>Kích hoạt/Ngưng sử dụng</Text>
        </div>
    )
}

export default Index;