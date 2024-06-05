import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Th } from '../../../../../../layouts/tableLayout/_th'
import { ICONS} from '../../interface/_constants'

export const CommentTableHead = ({...props}) => {
  return (
    <Tr {...props} type="tHead">
      <Th className={'AutoResponses-table__cell'}></Th>
      <Th className={'AutoResponses-table__cell'}>Tên nhãn</Th>
      <Th className={'AutoResponses-table__cell'}>Màu sắc</Th>
      <Th className={'AutoResponses-table__cell'}>Ngày tạo</Th>
      <Th className={'AutoResponses-table__cell'}></Th>
    </Tr>
  )
}