import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Th } from '../../../../../../layouts/tableLayout/_th'
import { ICONS} from '../../interface/_constants'

export const AutoResponseTableHead = ({...props}) => {
  return (
    <Tr {...props} type="tHead">
      <Th className={'auto-response-table__cell'}>Tên kịch bản</Th>
      <Th className={'auto-response-table__cell'}>Trang áp dụng</Th>
      <Th className={'auto-response-table__cell'}>Đối tượng áp dụng</Th>
      <Th className={'auto-response-table__cell'}>Trạng thái sử dụng</Th>
      <Th className={'auto-response-table__cell'}></Th>
    </Tr>
  )
}