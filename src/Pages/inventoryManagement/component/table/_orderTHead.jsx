import {Th} from 'layouts/tableLayout/_th'
import {Tr} from 'layouts/tableLayout/_tr'
import "./index.scss"
export const OrderTHead = ({...props}) => {
  return (
    <>
      <Tr {...props} type="tHead">
        <Th className="inventory-table__cell">Mã phiếu kiểm kho</Th>
        <Th className="inventory-table__cell">Kho kiểm hàng</Th>
        <Th className="inventory-table__cell">SL thực tế</Th>
        <Th className="inventory-table__cell">
          Trạng thái
        </Th>
        <Th className="inventory-table__cell">Ngày cân bằng</Th>
        <Th className="inventory-table__cell">Nhân viên cân bằng</Th>
        <Th className="inventory-table__cell">Ghi chú</Th>
        <Th
            className="inventory-table__cell"

            style={{display: 'flex'}}
        />
      </Tr>


    </>
  )
}
