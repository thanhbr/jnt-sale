import {StyledFacebookLivestreamScript_Thead} from './_styled'

export const FacebookLivestreamScript_Thead = ({...props}) => {
  return (
    <StyledFacebookLivestreamScript_Thead {...props}>
      <div className="facebook-livestream-script-thead__th">Tên kịch bản</div>
      <div className="facebook-livestream-script-thead__th">Từ khóa</div>
      <div className="facebook-livestream-script-thead__th">Trang áp dụng</div>
      <div className="facebook-livestream-script-thead__th">
        Đơn vị vận chuyển
      </div>
      <div className="facebook-livestream-script-thead__th">
        Trạng thái sử dụng
      </div>
      <div className="facebook-livestream-script-thead__th"></div>
    </StyledFacebookLivestreamScript_Thead>
  )
}
