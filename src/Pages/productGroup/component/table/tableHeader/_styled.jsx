import styled from "styled-components";
export const StyledProductTableHeader = styled.div`
    .product-group-table-header{
        height : 44px;
        .tr__container{
            height: 44px;
        }
        &-code {
                width: 14.98rem;
         }
        
        &-name {
                width: 14.98rem;
        }
        
         &-note {
                width: 50.75rem;
                flex: 1 ;
        }
        
        &-status {
                width: 15.98rem;
                text-align: center;
                span{
                    width: 100% !important;
                }
         }
        
        &-setting {
                width: 3rem;
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
              button{
                background: #C40B27;
                border: 1px solid #C40B27;
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
              height: 90px;
              width: 150px;
              padding: 8px;
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
                color: #A4082D;
              }
            }
        }
    }
    @media only screen and (max-width : 1440px){
      .product-group-table_header{
        &-code {
            width: 14.98rem;
     }
    
    &-name {
            width: 14.98rem;
    }
    
     &-note {
            width: 50.75rem;
    }
    
    &-status {
            width: 15.98rem;
            text-align: center;
            span{
                width: 100% !important;
            }
     }
    
    &-setting {
            width: 3rem;
    }
      }
  }
`