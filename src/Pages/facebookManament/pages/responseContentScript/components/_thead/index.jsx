import {Tooltip} from 'common/tooltip'
import {FACEBOOK_ICONS} from 'Pages/facebookManament/interfaces/_icons'
import {StyledFacebookResponseContentScript_Thead} from './_styled'

export const FacebookResponseContentScript_Thead = ({...props}) => {
  return (
    <StyledFacebookResponseContentScript_Thead {...props}>
      <div className="facebook-response-content-script-thead__th"></div>
      <div className="facebook-response-content-script-thead__th">
        Từ viết tắt{' '}
        <Tooltip
          className="unset-max-width"
          placement="bottom-start"
          title={
            <div style={{maxWidth: 641}}>
              Khi gửi tin nhắn, bạn chỉ cần nhập Từ viết tắt ( cú pháp bao gồm
              dấu / trước từ viết tắt) và nhấn Enter.
              <br />
              Hệ thống sẽ tự động chọn và hiển thị nội dung tin nhắn mẫu theo
              nội dung mà bạn đã tạo tương ứng cho từ viết tắt đó.
            </div>
          }
        >
          <i
            style={{
              marginLeft: 4,
              display: 'inline-block',
              transform: 'translateY(3px)',
            }}
          >
            {FACEBOOK_ICONS.question01}
          </i>
        </Tooltip>
      </div>
      <div className="facebook-response-content-script-thead__th">Nội dung</div>
      <div className="facebook-response-content-script-thead__th">Hình ảnh</div>
      <div className="facebook-response-content-script-thead__th">Ngày tạo</div>
      <div className="facebook-response-content-script-thead__th"></div>
    </StyledFacebookResponseContentScript_Thead>
  )
}
