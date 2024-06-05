import { NotificationBar } from 'common/notificationBar'
import { Text } from 'common/text'
import { AddressSeparationHistoryTable } from '../table'
import { StyledAddressSeparationToolBody } from './_styled'

export const AddressSeparationToolBody = ({ ...props }) => {
  return (
    <StyledAddressSeparationToolBody {...props}>
      <div className="address-separate-tool-body__heading">
        <Text as="h4" fontSize={16} lineHeight={22}>
          Lịch sử tách địa chỉ
        </Text>
        <NotificationBar
          className="address-separate-tool-body__noti"
          type="warning"
          canClose={false}
        >
          Dữ liệu file tách địa chỉ sẽ được lưu trong vòng 07 ngày (kể từ ngày
          Upload file). Hãy hoàn tất chỉnh sửa và tải xuống file hoàn chỉnh
          trong thời gian này!
        </NotificationBar>
        <ul>
          <li style={{ color: '#FF424E', listStyleType: 'disc', margin: '16px 0 0 10px', fontSize: '14px' }}>
            <Text as="b" color={'#FF424E'} style={{ textDecoration: 'underline' }}>Lưu ý: </Text>
            Từ ngày 21/03/2023, Evoshop có cập nhật file excel nhập mẫu để phù hợp với thêm cho đối tượng là Điểm thu hàng
            hộ. Để tránh bị lỗi khi lên đơn hàng loạt, quý khách vui lòng tải mẫu mới về để lên đơn.
          </li>
        </ul>
      </div>
      <div className="address-separate-tool-body__content">
        <AddressSeparationHistoryTable/>
      </div>
    </StyledAddressSeparationToolBody>
  )
}
