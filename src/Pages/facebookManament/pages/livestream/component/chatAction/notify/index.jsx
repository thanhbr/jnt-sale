import { ICON_CONVERSATION } from '../../../interface/icon'
import { Text } from '../../../../../../../common/text'

import styled from 'styled-components'

export const NotifyCustomer = () => {

  return (
    <StyledNotify>
      {ICON_CONVERSATION.warning}
      <Text as={'p'} color={'#000028'} className={'title-warning'}>
        Đã quá 7 ngày kể từ thời điểm cuối cùng khách hàng nhắn tin với trang. Nếu tiếp tục gửi tin nhắn, tin nhắn này có thể sẽ không gửi được đến khách hàng và trang có thể bị đánh dấu spam theo
        <Text as={'a'} color={'#1A94FF'}> điều khoản của Facebook.</Text>
      </Text>
    </StyledNotify>
  )
}
const StyledNotify = styled.div`
  background: rgba(255, 159, 65, 0.1);
  border: 1px solid #FF9F41;
  border-radius: 6px;
  display: flex;
  padding: 8px 12px;
  margin-top: 4px;
  .title-warning{
    margin-left: 8px;
   
  }
`