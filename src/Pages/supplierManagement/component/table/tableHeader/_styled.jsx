import styled from "styled-components";

export const StyledSupplierTableHeader = styled.div`
  .supplier-management{
    &-table_header{
      height: 44px;
      .tr__container{
        height: 100%;
        justify-content: space-evenly;
      }
    }
    &-table_checkbox{
      width: 44px;
       min-height: 44px;
    }
    &-table_code-supplier{
      width: 9.5%;
       min-height: 44px;
       @media screen and (max-width:1440px){
        width: 10.5%;
      }
      @media screen and (max-width:1366px){
        width: 11.5%;
      }
      @media screen and (max-width:1280px){
        width: 12.5%;
      }
    }
    &-table_name-supplier{
      width: 15.6%;
       min-height: 44px;
    }
    &-table_address-supplier{
      width: 28.7%;
       min-height: 44px;
       @media screen and (max-width:1440px){
        width: 21.7%;
      }
      @media screen and (max-width:1280px){
        width: 18.7%;
      }
    }
    &-table_phone-supplier{
        width: 7.5%;
        min-height: 44px;
        @media screen and (max-width:1440px){
          width: 10.5%;
        }
    }
    &-table_note-supplier{
      width: 20.1%;
      flex: 0.71;
       min-height: 44px;
    }
    &-table_status-supplier{
      width: 7.1%;
      padding: 12px 0  !important;
       min-height: 44px;
       @media screen and (max-width:1440px){
        width: 10.1%;
      }
      @media screen and (max-width:1366px){
        width: 11.1%;
      }
      @media screen and (max-width:1280px){
        width: 12.1%;
      }
    }
    &-table_setting{
      width: 6.2%;
       min-height: 44px;
    }
    &-table_setting-dots{
      
    }
     &-table-header__cell{
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
              &-table-header__detail-toggle {
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
          
            &-table-header__selected-action-dropdown {
              position: relative;
              margin-left: 12px;
              button{
                background: #2BB8A9;
                border: 1px solid #2BB8A9;
              }
            }
          
            &-table-header__selected-action-toggle {
              width: 88px;
              padding: 0 !important;
          
              border-radius: 14px !important;
          
              font-size: 14px !important;
              font-weight: 500 !important;
            }
          
            &-table-header__selected-action-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 11;
          
              width: 100vw;
              height: 100vh;
            }
          
            &-table-header__selected-action-menu {
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
          
            &-table-header__selected-action-menu-item {
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

`