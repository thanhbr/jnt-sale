import {Checkbox} from 'common/form/checkbox'
import {Th} from 'layouts/tableLayout/_th'
import useBulkOrderCreate from 'Pages/bulkOrder/hooks/useBulkOrderCreate'
import {StyledBulkOrderCreateTableThead} from './_styled'
import { REPORT_SALE_ICONS } from '../../../../Report/Sales/interfaces/_icons'
import { Tooltip } from '../../../../../common/tooltip'
import { Text } from '../../../../../common/text'

export const BulkOrderTableCreateThead = ({...props}) => {
  const {table} = useBulkOrderCreate()

  return (
    <StyledBulkOrderCreateTableThead
      {...props}
      type="tHead"
      style={{width: 3000}}
    >
      <Th className="bulk-order-create-table-thead__th">
        <Checkbox
          indeterminate={table.methods.onCheckAllSelected() === 2}
          checked={[1, 2].includes(table.methods.onCheckAllSelected())}
          onClick={table.methods.onAllSelectedToggle}
        />
      </Th>
      <Th className="bulk-order-create-table-thead__th">STT</Th>
      <Th className="bulk-order-create-table-thead__th">Mã ĐH riêng</Th>
      <Th className="bulk-order-create-table-thead__th">Người nhận</Th>
      <Th className="bulk-order-create-table-thead__th">Số điện thoại</Th>
      <Th className="bulk-order-create-table-thead__th">Địa chỉ</Th>
      <Th className="bulk-order-create-table-thead__th">Tỉnh/Thành phố</Th>
      <Th className="bulk-order-create-table-thead__th">Quận/Huyện</Th>
      <Th className="bulk-order-create-table-thead__th">Phường/Xã</Th>
      <Th className="bulk-order-create-table-thead__th">Nội dung hàng hoá</Th>
      <Th className="bulk-order-create-table-thead__th">Giá trị hàng hoá</Th>
      <Th className="bulk-order-create-table-thead__th">Thu hộ (COD)</Th>
      <Th className="bulk-order-create-table-thead__th">Trọng lượng (kg)</Th>
      <Th className="bulk-order-create-table-thead__th">Dài (cm)</Th>
      <Th className="bulk-order-create-table-thead__th">Rộng (cm)</Th>
      <Th className="bulk-order-create-table-thead__th">Cao (cm)</Th>
      <Th className="bulk-order-create-table-thead__th">Số Kiện</Th>
      <Th className="bulk-order-create-table-thead__th" style={{display: 'flex', alignItems: 'center'}}>
        <Text fontWeight={600}>Phí giao hàng hộ</Text>
        <Tooltip
          placement={'bottom'}
          title={"Ghi nhận phí vận chuyển thu từ các shop gửi đơn nhờ giao hộ (dành riêng cho các Điểm thu hàng hộ)"}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '4px'
          }}
        >
          {REPORT_SALE_ICONS.question}
        </Tooltip>
      </Th>
      <Th className="bulk-order-create-table-thead__th">Ghi chú</Th>
      <Th className="bulk-order-create-table-thead__th" />
    </StyledBulkOrderCreateTableThead>
  )
}
