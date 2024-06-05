import { ICON_CONVERSATION } from '../../../interface/icon'

import styled from 'styled-components'
import { Input } from '../../../../../../../common/form/input'

export const TypingCustomer = () => {

  return (
    <StyledTyping>
      <div>{ICON_CONVERSATION.image}</div>
      <Input className={'conversation-typing'} placeHolder={'Nhập nội dung phản hồi, /trả lời nhanh, nhấn Shift + Enter để xuống dòng, Enter để gửi'}/>
      <div>{ICON_CONVERSATION.hamburger}</div>
    </StyledTyping>
  )
}
const StyledTyping = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0 24px 0;
  .conversation-typing{
    margin: 0 12px;
    width: 100%;
  }
`