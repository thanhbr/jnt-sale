import { Tr } from '../../../../../../layouts/tableLayout/_tr'
import { Th } from '../../../../../../layouts/tableLayout/_th'
import { FACEBOOK_ICONS } from '../../../../interfaces/_icons'
import { Tooltip } from '../../../../../../common/tooltip'
import { Text } from '../../../../../../common/text'

export const CommentTableHead = ({ ...props }) => {
  return (
    <Tr {...props} type="tHead">
      <Th className={'comment-table__cell'}>Trang</Th>
      <Th className={'comment-table__cell'}>Trạng thái</Th>
      <Th className={'comment-table__cell'}>Ẩn tất cả bình luận</Th>
      <Th className={'comment-table__cell'}>Ẩn bình luận chứa SĐT</Th>
      <Th className={'comment-table__cell'}>
        <Text as={'b'} fontWeight={600} style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          Ẩn bình luận có chứa từ khóa
        </Text>
        <Tooltip
          className={"custom-tooltip-fb"}
          placement="bottom-start"
          title={(<div>
            <p>
              - Các bình luận chứa từ khóa này sẽ bị ẩn trên trang.
            </p>
            <p>
              - Người dùng có thể nhập nhiều từ khóa, nhấn enter để thêm từ khóa.
            </p>
            <p>
              - Nếu bạn khai báo cả từ khóa và SĐT, khi khách hàng bình luận chứa một trong hai điều kiện thì hệ thống
              sẽ tự động ẩn bình luận.
            </p>
          </div>)}>
          {FACEBOOK_ICONS.question01}
        </Tooltip>
      </Th>
    </Tr>
  )
}