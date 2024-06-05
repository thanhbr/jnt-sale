import styled from 'styled-components'

export const StyledConversation = styled.div`
.conversation_grid-layout{
  @media screen and (max-width: 1440px){
    margin-left: 57px !important;
    .fb-layout-left{
          width: 435px !important;
    }
    .fb-layout-right{
      width: calc(100% - 435px) !important;
      .content-conversation__chat{
        width: calc(100% - 410px);
      }
      .content-conversation__info{
        width: 410px;
      }
    }
  }
}
`
