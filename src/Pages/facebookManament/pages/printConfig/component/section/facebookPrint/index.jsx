import { StyledFacebookPrint } from './_styled'
import { useState } from 'react'
import { FACEBOOK_ICONS } from '../../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'

export const FacebookPrint = ({ title, ...props }) => {

  const [showContent, setShowContent] = useState(true)
  return (
    <StyledFacebookPrint>
      <div className="info-step" data-success={true}>
        <div className={'title-step'}>
          <div className={'title-step__radio'}>{FACEBOOK_ICONS.check_success}</div>
          <Text fontSize={'15px'} fontWeight={600}>{title}</Text>
        </div>
        <div className="form-step" data-active={showContent}>
          <div className="print-content">
            <Text as={'p'} style={{marginBottom: '12px'}}>Khuyến nghị sử dụng các dòng máy in nhiệt, máy in loại ESC/POS với khổ giấy ~ K80 - 80mm</Text>
            <Text as={'p'}>Để có thể in tự động các bình luận từ Facebook Livetream trên máy tính bạn phải cài đặt Webapp Hardware Bridge (phần mềm hỗ trợ kết nối evoshop và máy In)
            </Text>
          </div>
          <div className="print-content">
              <div className={'print-content__item'}>
                <Text as={'p'} fontWeight={600} style={{marginBottom: '12px'}}>Windows</Text>
                <Text as={'p'}>Tải xuống ứng dụng:</Text>
                <div><Text as={'a'} color={'#1A94FF'} href={'http://www.mediafire.com/file/b9xah2iy3jgawb6/whb_win64.exe/file'} target={'_blank'}>Webapp Hardware Bridge cho Windows (x64) 64 bit</Text></div>
                <div><Text as={'a'} color={'#1A94FF'} href={'http://www.mediafire.com/file/8ylvqwst9v08xer/whb_win84.exe/file'} target={'_blank'}>Webapp Hardware Bridge cho Windows (x84) 32 bit</Text></div>
              </div>
              <div className={'print-content__item'}>
                <Text as={'p'} fontWeight={600} style={{marginBottom: '12px'}}>MacOS</Text>
                <Text as={'p'}>Phiên bản cho MacOS chưa hỗ trợ.</Text>
                {/*<div><Text as={'a'} color={'#1A94FF'}>Webapp Hardware Bridge cho Window (x64) 64 bit</Text></div>*/}
                {/*<div><Text as={'a'} color={'#1A94FF'}>Webapp Hardware Bridge cho Window (x84) 32 bit</Text></div>*/}
              </div>
          </div>
        </div>
      </div>
    </StyledFacebookPrint>
  )
}