import styled from "styled-components";
export const StyledUserTableHeader = styled.div`
    .user-managment-table_header{
        height : 44px;
        .tr__container{
            height: 44px;
        }
        &-height{
            min-height: 44px !important;
        }
        &-fullName{
          width: 18.75rem;
          margin-left:24px;
        }
        &-phone{
          width: 10rem;
          margin-left:24px;
        }
        &-email{
          width: 18.75rem;
          margin-left:24px;
        }
        &-managment{
          width: 28.5rem;
          margin-left:24px;
            flex:1;
        }
        &-status{
          width: 12.5rem;
          margin-left:24px;
            text-align: center;
            span{
                width: 100% !important;
            }
        }
        &-setting{
            width: 4.75rem;
            margin-left:24px;
            text-align: right;
            span{
                width:100% !important;
            }
        }
        &__cell{
            &[data-menu='true'] {
                position: relative;
              }
          
              &[data-type='td'] {
                &:nth-child(5) {
                  justify-content: center;
                }
                &:nth-child(6) {
                  justify-content: flex-end;
                }
                &:nth-child(7) {
                  justify-content: flex-end;
                }
                &:nth-child(8) {
                  justify-content: center;
                }
              }
          
              &[data-type='th'] {
                &[data-selected='true'] {
                  display: flex;
                  flex: 1;
                  align-items: center;
                }
              }
          
              &:nth-child(1) {
                width: 47px;
                padding-left: 17px;
              }
              &:nth-child(2) {
                width: 13%;
          
                @media screen and (max-width: 1599px) {
                  width: 18%;
                }
              }
              &:nth-child(3) {
                flex: 1;
              }
              &:nth-child(4) {
                width: 11%;
              }
              &:nth-child(5) {
                width: 7%;
          
                text-align: center;
          
                @media screen and (max-width: 1599px) {
                  width: 10%;
                }
              }
              &:nth-child(6) {
                width: 12%;
          
                text-align: right;
              }
              &:nth-child(7) {
                width: 12%;
          
                text-align: right;
              }
              &:nth-child(8) {
                width: 16%;
          
                text-align: center;
              }
              &:nth-child(9) {
                width: 68px;
          
                justify-content: flex-end;
          
                @media screen and (max-width: 1599px) {
                  width: 38px;
                }
              }
            }
          
            &__detail-toggle {
              position: absolute;
              top: 50%;
              right: 42px;
          
              width: 20px;
              height: 20px !important;
              display: none;
          
              background: transparent;
              border: none;
              border-radius: 12px !important;
          
              font-size: 12px !important;
              line-height: 24px !important;
          
              transform: translateY(-50%) rotate(180deg);
          
              cursor: pointer;
          
              &[data-active='true'] {
                display: block !important;
          
                transform: translateY(-50%) rotate(0deg);
              }
          
              @media screen and (max-width: 1599px) {
                display: none !important;
              }
            }
          
            &__selected-action-dropdown {
              position: relative;
          
              margin-left: 12px;
            }
          
            &__selected-action-toggle {
              width: 88px;
              padding: 0 !important;
              background: #2BB8A9;
          
              border-radius: 14px !important;
              border: 1px solid #2BB8A9;
          
              font-size: 14px !important;
              font-weight: 500 !important;
            }
          
            &__selected-action-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 11;
          
              width: 100vw;
              height: 100vh;
            }
          
            &__selected-action-menu {
              position: absolute;
              top: calc(100% + 4px);
              left: 0;
              z-index: 12;
          
              width: 201px;
              padding: 4px 8px;
          
              background: #ffffff;
              border-radius: 6px;
              box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1) !important;
            }
          
            &__selected-action-menu-item {
              padding: 8px;
          
              color: #191d32;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
          
              transition: color 0.25s;
          
              cursor: pointer;
          
              &:hover {
                color: #1e9a98;
              }
            }
        }
    }
    @media screen and (max-width : 1366px){
      .user-managment-table_header{
          &-fullName{
              width: 19.52rem !important;
          }
          &-phone{
              width: 13.27rem;
          }
          &-email{
              width: 21.39rem;
          }
          &-managment{
              width: 22.64rem;
          }
          &-status{
              width: 8.52rem;
          }
          &-setting{
              width: 4.75rem;
          }
      }
  }
    @media screen and (max-width : 1559px){
      .user-managment-table_header{
          &-fullName{
              width: 12.52rem;
          }
          &-phone{
              width: 9.27rem;
          }
          &-email{
              width: 15.39rem;
          }
          &-managment{
              width: 22.64rem;
          }
          &-status{
              width: 10.52rem;
          }
          &-setting{
              width: 3.75rem;
          }
      }
  }
   
`