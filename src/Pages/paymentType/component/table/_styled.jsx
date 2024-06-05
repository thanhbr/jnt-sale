import styled from "styled-components";

export const StyledPaymentTypeTable = styled.div`
  .payment_type_table{
    &[data-type='tHead']{
      .tr__container{
        height:44px;
      }
    }
    
    &_td{
     .tooltip{
      display: -webkit-box;
      height: 100%;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      }
      .tooltip_v2{
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      width:100%
      }
       &:nth-child(1){
        .MuiSkeleton-root{
          &:nth-child(1){
            width: 20px;
          }
        }
      }
      &:nth-child(2){
        width: 12.5rem;
      }
      &:nth-child(3){
        width: 18.75rem;
      }
      &:nth-child(4){
        flex: 1;
        width: 52.25rem;
      }
      &:nth-child(5){
        width: 6.5rem;
        justify-content: center;
      }
      &:nth-child(6){
        width: 3.5rem;
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
                width: 95.2%;
          
                @media screen and (max-width: 1599px) {
                  width: 25%;
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
              button{
                background: #2BB8A9;
                border: 1px solid #2BB8A9;
              }
            }
          
            &__selected-action-toggle {
              width: 88px;
              padding: 0 !important;
          
              border-radius: 14px !important;
          
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
              height: 80px;
              width: 201px;
              padding: 5px;
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

`