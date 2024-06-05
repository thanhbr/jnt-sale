
import {StyledGeneralInfo} from './_styled'
import {useContext} from 'react'
import {PaymentManagementContext} from "../../../provider/context";
import {RecipientGroup} from "./_recipientGroup";
import {RecipientPerson} from "./_recipientPerson";
import {PaymentType} from "./_paymentType";
import {PaymentCode} from "./_paymentCode";

export const GeneralInformation = ({...props}) => {
    const {pageState} = useContext(PaymentManagementContext)

    return (
        <StyledGeneralInfo {...props}>
            <div className="payment-management-info__form-group">
                <div className="payment-management-info__form-input">
                    <RecipientGroup/>
                </div>
                <div className="payment-management-info__form-input">
                    <RecipientPerson/>
                </div>
                <div className="payment-management-info__form-input">
                    <PaymentType />
                </div><div className="payment-management-info__form-input">
                    <PaymentCode />
                </div>
            </div>
        </StyledGeneralInfo>
    )
}
