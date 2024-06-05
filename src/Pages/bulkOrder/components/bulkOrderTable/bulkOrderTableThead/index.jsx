import {Tooltip} from 'common/tooltip'
import {Th} from 'layouts/tableLayout/_th'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {StyledBulkOrderTableThead} from './_styled'
import './index.scss'

export const BulkOrderTableThead = ({...props}) => {
  return (
    <StyledBulkOrderTableThead {...props} type="tHead">
      <Th className="bulk-order-table-thead__th">File</Th>
      {/*<Th className="bulk-order-table-thead__th">Đơn vị vận chuyển</Th>*/}
      <Th className="bulk-order-table-thead__th">Nhân viên lên đơn</Th>
      <Th
        className="bulk-order-table-thead__th"
        icon={
          <Tooltip
            className="bulk-order-table-thead__tooltip"
            placement="bottom"
            title="Tổng số đơn đã gửi giao hàng / Tổng số đơn hàng"
          >
            <span>{BULK_ORDER_ICONS.question}</span>
          </Tooltip>
        }
      >
        Trạng thái
      </Th>
      <Th className="bulk-order-table-thead__th" />
    </StyledBulkOrderTableThead>
  )
}
