import styled from 'styled-components'
import { Text } from '../../../../../../../common/text'
import useFacebookConversationTyping from '../../../hooks/useFacebookConversationTyping'
import { ICON_CONVERSATION } from '../../../interface/icon'
export const ReplyTyping = () => {
  const {typing,detail, methods} = useFacebookConversationTyping()
  return (
    <Styled>
      <div>
        <Text as={'p'} >Đang trả lời <Text fontWeight={500}>{detail?.customer?.name}</Text></Text>
        <Text as={'p'} color={'#7C88A6'}>{!!typing?.text?.comment?.snippet ? JSON.parse(typing?.text?.comment?.snippet): '---'}</Text>
      </div>
      <div className={'reply-close'} onClick={methods?.clearReply}>
        {ICON_CONVERSATION.close}
      </div>
    </Styled>
  )
}
const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 18px;
  border-width: 1px 0px;
  border-style: solid;
  border-color: #EBEEF5;
  .reply-close{
    cursor: pointer;
  }
`