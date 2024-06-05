import styled from 'styled-components'

export const StyledRightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .conversation-spinner-content{
    position: absolute;
    top: 40%;
    left: 48%;
  }
  .dialogue-content-wrapper {
    flex: 2 0 0%;
    height: calc(100%);
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .content-conversation{
    display: flex;
    width: 100%;
    &__empty{
      width: 100%;
      height: calc(100vh - 80px);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__body{
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
      &-xxx{
        display: flex;
        flex-direction: column;
        max-height: 100%;
        min-height: 0;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: linear-gradient(89.91deg, rgb(239, 246, 252) 0.08%, rgb(227, 240, 252) 30.62%, rgb(225, 239, 252) 64.57%, rgb(229, 241, 252) 88%, rgb(238, 245, 252) 99.93%);
      }
    }
    &__chat{
      width: calc(100% - 621px);
      border-right: 1px solid #EBEEF5;
      height: calc(100vh - 80px);
      position: relative;
      transition: width 0.3s;
      &[data-active='false']{
        width: 100%;
      }
      &-name{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100% - 52px);
      }
      &-icon{
        transform: rotate(0deg);
        &[data-active = 'false']{
          transform: rotate(180deg);
        }
        transition: transform 0.6s;
      }
      &-title{
        display: flex;
        align-items: center;
        padding: 8px 16px;
        background: #FFFFFF;
        border-bottom: 1px solid #EBEEF5;
      }
      &-avatar{
        width: 36px;
        height: 36px;
        overflow: hidden;
        position: relative;
        margin-right: 16px;
        img{
          width: 100%;
          border-radius: 50%;
        }
        svg{
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
      &-description{
        overflow: hidden;
        .item-message{
          display: flex;
          align-items: flex-end;
          margin: 2px 0;
          padding: 0 16px;
          :hover{
              .item-message__content-action{
                display: flex!important;
                align-items: center;
              }
             }
          &__right{
            display: flex;
            align-items: center;
            margin: 2px 0;
            padding: 0 16px;
            justify-content: flex-end;
             .spinner-mess-content{
              padding: 16px 16px;
             }
            &-content{
             font-size: 13px;
             padding: 8px 12px;
             background: #0086FF;
             border-radius: 18px;
             max-width: 70%;
             display: flex;
             align-items: center;
             .spinner-mess-content{
              padding: 16px 16px;
             }
             &-text{
              color: #ffffff;
              width: 100%;
             }
             a{
              color: #fff;
             }
            }   
          }
          &__chat-avatar{
            width: 28px;
            height: 28px;
            overflow: hidden;
            margin-right: 8px;
            img{
              width: 100%;
              border-radius: 50%;
            }
          }
          &__container{
            max-width: 70%;
            position: relative;
          }
          &__parent{
            display: flex;
            align-items: center;
            margin-top: 4px;
            position: relative;
          }
          &__content{
             padding: 8px 12px;
             background: #ffffff;
             border-radius: 18px;
             max-width: 100%;
             margin-right: 4px;
             display: flex;
             &-child{
               padding: 8px 12px;
               background: #ffffff;
               border-radius: 18px;
               margin-left: 36px;
               max-width: 100%;
               margin-right: 4px;
             }
             &-action{
              cursor:pointer;
              display: none;
              // position: absolute;
              // right: -36px;
              // height: 100px;
              :hover{
                display: flex!important;
                align-items: center;
              }
             }
             .xxx-xxl{
              word-break: break-all;
             }
          }
        }
      }
      &-action{
        background: #ffffff;
        //position: absolute;
        //bottom: 0;
        z-index: 10;
        width: 100%;
      }
    }
    &__info{
      width: 621px;
      @media screen and (max-width: 1336px) {
        width: 500px;
      }
      height: calc(100vh - 80px);
      &[data-active='false']{
        display: none;
      }
      .conversation-info{
        &__title{
          display: flex;
          background: #EFF3FB;
          &-tab{
            width: 50%;
            padding: 8px 24px;
            overflow:hidden;
            cursor: pointer;
            position: relative;
            @media screen and (max-width : 1440px){
              .tooltip{
              display: -webkit-box!important;
              height: 39%;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
                }
            }
            
            &[data-active='true']{
              background: #ffffff;
            }
            .bottom-line{
              width: 48px;
              height: 2px;
              background: #1E9A98;
              position: absolute;
              bottom: 0;
              left: 24px;
            }
          }
        }
        &__content{
          background: #ffffff;
          height: 100vh;
        }
      }
    }
  }
  
  .customer-title{
    &[data-error='true']{
      color: #FF424E!important;
    }
  }
  @media screen and (max-width: 1440px) {
    .content-conversation__chat {
      width: calc(100% - 500px);
    }
    .content-conversation__info {
      width: 500px;
    }
  }
`