import {Text} from "../../../../../common/text";
import {ICON_PAYMENT} from "../../../interfaces/_icon";
export const StatusPaymentLabel = ({status,payment}) => {
    const statusPayment = [
        {
            background: '#FFEBEC',
            color: '#FF424E',
            name: 'not_payment',
            icon:ICON_PAYMENT.none
        },
        {
            background: '#FFF5EB',
            color: '#FC820A',
            name: '1_part_payment',
            icon:ICON_PAYMENT.one_part
        },
        {
            background: '#EBFFF5',
            color: '#00AB56',
            name: 'paid_short',
            icon:ICON_PAYMENT.full
        },
        {
            background: '#EBFAFF',
            color: '#038DB2',
            name: '1_part_back_payment',
            icon:ICON_PAYMENT.return_one_part
        },
        {
            background: '#EBF5FF',
            color: '#1A94FF',
            name: 'fully_refunded',
            icon:ICON_PAYMENT.return_full
        },
    ]
    return (
        <div style={{background: statusPayment[+status-1]?.background, borderRadius: '4px', padding: '3px 12px', display: 'flex', alignItems: 'center',justifyContent:'space-between',width:'100%'}}>
            {statusPayment[+status-1]?.icon} &nbsp;
            <Text color={statusPayment[+status-1]?.color} lineHeight={16}>{payment}</Text>
        </div>
    )
}