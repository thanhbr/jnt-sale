import styled from 'styled-components'
export const StyledTitle = styled.div`
display: flex;
justify-content: space-between;
width: 84%;
  .title-content{
    display: flex;
    align-items: center;
    &__left{
      width: 54px;
      height: 37px;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: black;
      img{
          max-width: 100%;
          max-height: 100%;
      }
    }
    &__right{
      margin-left: 12px;
      &-detail{
        display: flex;
        align-items: center;
        .icon-live{
          &[data-live='false']{
            svg{
              rect{
                fill: rgba(0, 0, 0, 0.4);
              }
            }
          }
        }
      }
      &-name{
        margin: 0 6px;
        padding-right: 8px;
        border-right: 1px solid #EBEEF5;
      }
    }
    &__livestream-reaction{
      display: flex;
      align-items: center;
    }
  }
  .other-liveStream{
    border-radius: 60px !important;
  }
@media screen and (max-width: 1440px){
  width: 77%;
}
`