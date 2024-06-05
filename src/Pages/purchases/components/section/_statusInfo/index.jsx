import {Text} from "../../../../../common/text";
import styled from 'styled-components'
import useCreatePurchase from "../../../hooks/useCreatePurchase";
import { useTranslation } from 'react-i18next'

export const StatusInfo = () => {
  const {t} = useTranslation()
  const {statusInfo} = useCreatePurchase()
  return (
    <Styled>
      <div className={'status-infomation'}>
        <div className="status-infomation__item">
          <Text>{t('warehouse_status')}</Text>
          <StatusWarehouseLabel status={statusInfo.warehouseStatus}/>
        </div>
        <div className="status-infomation__item">
          <Text>{t('payment_status')}</Text>
          <StatusPaymentLabel status={statusInfo.paymentStatus}/>
        </div>
      </div>
    </Styled>
  )
}

export const StatusWarehouseLabel = ({status, ...props}) => {
  const {t} = useTranslation()

  const statusWarehouse = [
    {
      background: '#FFEBEC',
      color: '#FF424E',
      name: 'not_yet_received',
    },
    {
      background: '#EBFFF5',
      color: '#00AB56',
      name: 'inventory_received',
    },
    {
      background: '#FFF5EB',
      color: '#FC820A',
      name: 'partially_returned',
    },
    {
      background: '#EBF5FF',
      color: '#1A94FF',
      name: 'fully_returned',
    },
  ]
  return (
    <div style={{background: statusWarehouse[+status-1]?.background, borderRadius: '4px', padding: '3px 12px', display: 'flex', alignItems: 'center'}}>
      {statusWarehouse[+status-1]?.icon} &nbsp;
      <Text color={statusWarehouse[+status-1]?.color} lineHeight={16}>{t(statusWarehouse[+status-1]?.name)}</Text>
    </div>
  )
}
export const StatusPaymentLabel = ({status}) => {
  const {t} = useTranslation()
  const statusPayment = [
    {
      background: '#FFEBEC',
      color: '#FF424E',
      name: 'not_payment',
    },
    {
      background: '#FFF5EB',
      color: '#FC820A',
      name: '1_part_payment',
    },
    {
      background: '#EBFFF5',
      color: '#00AB56',
      name: 'paid_short',
    },
    {
      background: '#EBFAFF',
      color: '#038DB2',
      name: '1_part_back_payment',
    },
    {
      background: '#EBF5FF',
      color: '#1A94FF',
      name: 'fully_refunded',
    },
  ]
  return (
    <div style={{background: statusPayment[+status-1]?.background, borderRadius: '4px', padding: '3px 12px', display: 'flex', alignItems: 'center'}}>
      {statusPayment[+status-1]?.icon} &nbsp;
      <Text color={statusPayment[+status-1]?.color} lineHeight={16}>{t(statusPayment[+status-1]?.name)}</Text>
    </div>
  )
}

const Styled = styled.div`
  .status-infomation{
    margin-bottom: 8px;
    &__item{
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
  }
`