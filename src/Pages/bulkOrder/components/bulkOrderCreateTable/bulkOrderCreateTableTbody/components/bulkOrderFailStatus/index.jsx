import { FAILSTATUS_ICONS } from './_icon'
import styled from 'styled-components'
import { Text } from '../../../../../../../common/text'
import { Tooltip } from '../../../../../../../common/tooltip'

export const BulkOrderFailStatus = ({ type, tooltip, tooltipApi, ...props }) => {
  const StatusContent = [
    {
      type: 3,
      color: '#00AB56',
      icon: FAILSTATUS_ICONS.warningCircle,
      label: 'Có thể gửi giao hàng'
    },
    {
      type: 2,
      color: '#FF9F41',
      icon: FAILSTATUS_ICONS.failDelivery,
      label: 'Có lỗi khi gửi giao hàng',
      tooltip: [tooltipApi]
    },
    {
      active: false,
      type: 1,
      color: '#FF424E',
      icon: FAILSTATUS_ICONS.error,
      label: 'Đơn thiếu thông tin',
      tooltip: tooltip.length > 0 ? tooltip : ''
    },
  ]
  return (
    <Styled>
      {
        StatusContent.map(item => {
          if (item.type == type) {
            return (
              item?.tooltip && item?.tooltip.length > 0
                ?
                <Tooltip
                  className={'alert-address'}
                  placement={'bottom-start'}
                  title={
                    item.tooltip.map(tt => !!tt && <Text as={'p'} color={'#ffffff'} fontSize={13}>- {tt}</Text>)
                  }>
                  <div className="status-bulk-order" style={{ background: item.color }}>
                    {item.icon} <Text className="status-bulk-order__item" color={'#ffffff'}
                                      fontSize={12}>{item.label}</Text>
                  </div>
                </Tooltip>
                :
                <div className="status-bulk-order" style={{ background: item.color }}>
                  {item.icon} <Text className="status-bulk-order__item" color={'#ffffff'}
                                    fontSize={12}>{item.label}</Text>
                </div>
            )
          }
        })
      }
    </Styled>
  )

}
const Styled = styled.div`
  .status-bulk-order{
    display: flex;
    align-items: center;
    padding: 0 6px 0 2px;
    border-radius: 60px;
    width: fit-content;
    &__item{
      margin-left: 2px;
    }
  }
`