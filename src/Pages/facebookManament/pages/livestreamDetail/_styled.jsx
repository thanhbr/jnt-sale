import styled from 'styled-components'

export const StyledLiveStreamDetail = styled.div`
.liveStream_grid-layout{
  @media screen and (max-width: 1440px){
    margin-left: 57px !important;
    .fb-layout-left{
          width: 435px !important;
    }
    .fb-layout-right{
      width: calc(100% - 435px) !important;
      .content-liveStream__chat{
        width: calc(100% - 410px);
      }
      .content-liveStream__info{
        width: 410px;
      }
    }
  }
}
`
