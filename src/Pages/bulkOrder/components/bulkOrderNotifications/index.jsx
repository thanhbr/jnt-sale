import {NotificationBar} from 'common/notificationBar'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {StyledBulkOrderNotifications} from './_styled'

export const BulkOrderNotifications = ({...props}) => {
  return (
    <StyledBulkOrderNotifications {...props}>
      <NotificationBar className="bulk-order-notifications__item bulk-order-notifications__default-noti">
        <ul>
          {/*<li>*/}
          {/*  <Text as="b">Lên đơn hàng loạt (Đơn không khấu trừ tồn kho)</Text>{' '}*/}
          {/*  cho phép đẩy đơn hàng loạt (không trừ tồn kho) đến tất cả các đơn vị*/}
          {/*  vận chuyển có trên hệ thống của UPOS, trừ các đơn vị vận chuyển nội*/}
          {/*  thành (Ahamove, Holaship).*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  Sử dụng 1 mẫu excel duy nhất cho tất cả đơn vị vận chuyển. Các cấu*/}
          {/*  hình đặc thù của đơn vị vận chuyển, bạn hoàn toàn có thể chỉnh sửa ở*/}
          {/*  trên trước khi gửi đơn.*/}
          {/*</li>*/}
          <li>
            Bạn có thể sử dụng{' '}
            <Text
              as="a"
              href="/tools/address-separation"
              target="_blank"
              color={THEME_SEMANTICS.delivering}
              fontWeight={600}
            >
              Tools tách địa chỉ
            </Text>{' '}
            để đồng bộ mẫu excel mới, chỉnh sửa địa chỉ phù hợp trước khi lên
            đơn nhằm đảm bảo tỷ lệ thành công cao nhất.
          </li>
          <li>
            Dữ liệu file lên đơn sẽ được lưu{' '}
            <Text as="b">trong vòng 07 ngày</Text> (kể từ ngày Upload file). Hãy
            hoàn tất chỉnh sửa và tải xuống file hoàn chỉnh trong thời gian này!
          </li>
          <li style={{color: '#FF424E'}}>
            <Text as="b" color={'#FF424E'} style={{textDecoration: 'underline'}}>Lưu ý: </Text>
            Từ ngày 21/03/2023, Evoshop có cập nhật file excel nhập mẫu để phù hợp với thêm cho đối tượng là Điểm thu hàng hộ. Để tránh bị lỗi khi lên đơn hàng loạt, quý khách vui lòng tải mẫu mới về để lên đơn.
          </li>
        </ul>
      </NotificationBar>
    </StyledBulkOrderNotifications>
  )
}
