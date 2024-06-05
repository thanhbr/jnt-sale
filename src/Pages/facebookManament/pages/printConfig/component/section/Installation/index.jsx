import { StyledInstallation } from './_styled'
import { useState } from 'react'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'

export const Installation = ({ title, ...props }) => {

  const [showContent, setShowContent] = useState(true)
  return (
    <StyledInstallation>
      <div className="info-step" data-success={true}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.check_success}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className="print-content">
            <Text as={'p'}>Sau khi tải và cài đặt phần mềm theo liên kết phía trên, thực hiện như sau</Text>
          </div>
          <div className="print-content">
              <div className={'print-content__item'}>
                <Text as={'p'} fontWeight={600}>Bước 1: Thiết lập máy in như sau:</Text>
                <Text as={'p'}> &bull;&ensp;1.1. Chọn máy in của bạn tại mục “INVOICE” và lưu ý máy in phải được thiết lập là mặc định</Text>
                <Text as={'p'} style={{marginBottom: '12px'}}> &bull;&ensp;1.2. Bấm “SAVE” (Không thoát khỏi ứng dụng)</Text>
                <a href="/img/facebook/buoc-1.png" target={'_blank'}>
                  <img src="/img/facebook/buoc-1.png" alt="Bước 1"/>
                </a>
              </div>
              <div className={'print-content__item'}>
                <Text as={'p'} fontWeight={600}>Bước 2: </Text>
                <Text as={'p'}> &bull;&ensp;Kiểm tra trạng thái kết nối giữa evoshop và Webapp Hardware Bridge</Text>
                <Text as={'p'} style={{marginBottom: '12px'}}> &bull;&ensp;Đảm bảo rằng ứng dụng Webapp Hardware Bridge được mở</Text>
                <a href="/img/facebook/buoc-2.png" target={'_blank'}><img src="/img/facebook/buoc-2.png" alt="Bước 2"/></a>
              </div>
          </div>
        </div>
      </div>
    </StyledInstallation>
  )
}