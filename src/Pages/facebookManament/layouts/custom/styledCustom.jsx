import styled from 'styled-components'

export const StyledCustom = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  background-image: url("/img/facebook/background-fb-conversation.png");
  .facebook-layout{
    height: calc(100vh);
    position: relative;
    .conversation-content{
      display: flex;
    }
    .conversation-content-left{
      width: 25.6%;
    }
    .conversation-content-right{
      width: 74.4%;
      background: #00e5b9;
    }
    .fb-layout-left{
      width: 476px !important;
    }
    .fb-layout-right{
      width: calc(100% - 476px) !important;
    }
  }
`
