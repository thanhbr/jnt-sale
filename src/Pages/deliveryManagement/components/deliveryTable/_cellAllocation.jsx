import styled from 'styled-components'
import { DELIVERY_ICONS } from '../../interfaces/_icons'
import { Tooltip } from '../../../../common/tooltip'
import { Text } from '../../../../common/text'
import { useTranslation } from 'react-i18next'

export const CellAllocation = ({data, ...props}) => {
  const { t, i18n } = useTranslation()
  let daysBetween = 1
  let dateGotProducts = ''
  if(!!data?.dt_got_products){
    dateGotProducts = new Date(data?.dt_got_products)
    dateGotProducts.setHours(0,0,0,0)
  }
  if(!!data?.dt_delivered){
    if(!!data?.dt_got_products){
      daysBetween = new Date(data?.dt_delivered).getTime() - (dateGotProducts.getTime() + 24 * 60 * 60 * 1000)
    }
  }else
    if([2,22,3,23,17].includes(+data.shipping_status_id)){
      daysBetween = !!data?.dt_got_products ?  new Date().getTime() - (dateGotProducts.getTime() + 24 * 60 * 60 * 1000) : '---'
    }
  daysBetween = Math.ceil(daysBetween / (1000 * 3600 * 24))
  const statusAllocation = [
    {
      status: 1,
      active:(![1,7,20,19,4,6].includes(+data?.shipping_status_id) && daysBetween > 0),
      color: '#FF9F41',
      value: daysBetween,
      icon: (DELIVERY_ICONS.truckTime),
      label: t('order_in_delivery_process'),  
    },
    {
      status: 2,
      active: !!( ![1,7,4,6,20,19].includes(+data?.shipping_status_id) && +daysBetween <= 0),
      color: '#FF9F41',
      value: 0,
      icon: (DELIVERY_ICONS.truckTime),
      label: t('shipping_partner_picked_up_today')
    },
    {
      status: 3,
      active: !![4,6,20,19].includes(+data?.shipping_status_id),
      color: '#00AB56',
      value: daysBetween,
      icon: (DELIVERY_ICONS.greenTruckTime),
      label: ` ${t('delivery_process_completed')} ${daysBetween > 0 ? t('in') + daysBetween + t('day') : t('in_day')} `
    },
    {
      status: 4,
      active: !![1,7].includes(+data?.shipping_status_id),
      color: '#00081D',
      value: '',
      icon: '---',
      label: t('order_not_in_delivery_process')
    },
  ]
  return (
    <Styled {...props}>
      {statusAllocation.map(
        item => {
          if(!!item.active)
            return (
              <Tooltip title={item.label} className={'item-allocation'} placement={'bottom-start'}>
                {item.icon} <Text color={item.color}>{item.value}</Text>
              </Tooltip>
            )
        }
      )}
    </Styled>
  )
}
const Styled = styled.div`

.item-allocation{
  display: flex;
  align-items: center;
}

`
