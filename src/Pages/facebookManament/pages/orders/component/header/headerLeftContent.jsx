import { Text } from '../../../../../../common/text'
import { Button } from '../../../../../../common/button'
import styled from 'styled-components'
import { ICON_CONVERSATION } from '../../interface/icon'
import useFilterFacebookConversation from '../../hooks/useFilterFacebookConversation'

export const HeaderLeftContent = () => {
  const {methods} = useFilterFacebookConversation()
  return (
    <StyledHeaderLeft>
      <div className="header-content">
        <Text fontWeight={600} fontSize={'16px'} > Quản lý hội thoại </Text>
        <div style={{display: 'flex'}}><Text style={{marginRight: '8px', display: 'flex', cursor: 'pointer'}}>{ICON_CONVERSATION.excel}</Text> <Text style={{display: 'flex', cursor: 'pointer'}} onClick={methods.approveFilter}>{ICON_CONVERSATION.reload}</Text></div>
      </div>
    </StyledHeaderLeft>
  )
}

const StyledHeaderLeft = styled.div`

  .header-content{
    display: flex;
    padding: 8px 8px 16px 8px;
    align-items: center;
    justify-content: space-between;
  }

`