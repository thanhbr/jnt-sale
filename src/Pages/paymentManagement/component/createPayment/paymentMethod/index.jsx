
import {StyledGeneralInfo} from './_styled'
import {useContext} from 'react'
import {PaymentManagementContext} from "../../../provider/context";
import {PaymentMethod} from "./_paymentMethod";
import {PaymentValue} from "./_paymentValue"
export const PaymentMethodGroup = ({...props}) => {
    const {pageState} = useContext(PaymentManagementContext)

    return (
        <StyledGeneralInfo {...props}>
            <div className="payment-management-info__form-group">
                <div className="payment-management-info__form-input">
                    <PaymentMethod/>
                </div>
                <div className="payment-management-info__form-input">
                    <PaymentValue/>
                </div>
            </div>
        </StyledGeneralInfo>
    )
}
