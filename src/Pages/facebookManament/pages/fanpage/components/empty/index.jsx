import {Text} from 'common/text'
import {StyledFacebookFanpageEmpty} from './_styled'

export const FacebookFanpageEmpty = ({...props}) => {
  return (
    <StyledFacebookFanpageEmpty {...props}>
      <img
        className="facebook-fanpage-empty__banner"
        src="/img/fb/collections/empty.png"
        alt="empty"
      />
      <div className="facebook-fanpage-empty__container">
        <Text
          as="div"
          fontSize={15}
          fontWeight={600}
          lineHeight={21}
          style={{width: '100%', marginBottom: 12, textAlign: 'center'}}
        >
          Dường như tài khoản Facebook của bạn hiện tại đang không có quản lý
          bất kỳ fanpage nào.
        </Text>
        <Text as="div" style={{marginBottom: 4}}>
          Hãy thực hiện đăng xuất trên evoshop và kiểm tra lại danh sách fanpage mà
          bạn đang quản lý trên Facebook:
        </Text>
        <ul>
          <li className="facebook-fanpage-empty__list-item">
            <Text color="#7C88A6">
              Nếu có ít nhất 1 trang đang quản lý, hãy thực hiện đăng nhập và
              kết nối lại tài khoản Facebook trên evoshop.
            </Text>
          </li>
          <li className="facebook-fanpage-empty__list-item">
            <Text color="#7C88A6">
              Nếu không có trang nào, hãy thực hiện tạo lập Fanpage trên
              Facebook và thực hiện đăng nhập lại để bắt đầu/tiếp tục quản lý
              bán hàng qua kênh Facebook.
            </Text>
          </li>
        </ul>
      </div>
    </StyledFacebookFanpageEmpty>
  )
}
