import { Text } from "common/text";
import { SwitchStatus } from "Component/SwitchStatus/SwitchStatus";
import React, {useContext} from "react";
import {PaymentManagementContext} from "../../../../provider/context";
import {useCreatePaymentModal} from "../../hooks/useCreatePaymentModal";

const Index = _ =>{
    const {pageState} = useContext(PaymentManagementContext)
    return(
        <div className="payment-type-create_status">
            <SwitchStatus disabled={true} status={1}/>
            <Text className='payment-type-create_default'>Kích hoạt/Ngưng sử dụng</Text>
        </div>
    )
}

export default Index;