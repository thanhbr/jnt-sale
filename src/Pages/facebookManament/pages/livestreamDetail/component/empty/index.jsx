import { Text } from '../../../../../../common/text'
import { Button } from '../../../../../../common/button'
import { ICON_CONVERSATION } from '../../interface/icon'

import styled from 'styled-components'
import useFilterFacebookLiveStreamDetail from '../../hooks/useFilterFacebookLiveStreamDetail'

export const EmptyConversation = () => {

  const { methods } = useFilterFacebookLiveStreamDetail()
  return (
    <Styled>
      <div className={'empty-content'}>
        <img src="/img/facebook/empty-conversation.png" alt="Không có tin nhắn/ bình luận"/>
        <Text as={'p'} color={'#7C88A6'} fontWeight={600} >Không tìm thấy bình luận nào</Text>
        <Button className={'btn-reload'} onClick={methods.syncLiveStream} icon={ICON_CONVERSATION.reload} size={'md'}>Làm mới Livestream</Button>
      </div>
    </Styled>
  )
}

const Styled = styled.div`
  height: calc(100vh - 206px); 
  overflow: auto;
  .empty-content{
    text-align: center;
    position: relative;
    top: 30%;
    p{
      width: auto!important;
      //margin-bottom: 13px;
    }
    .btn-reload{
      margin-top: 8px;
    }
  }
`