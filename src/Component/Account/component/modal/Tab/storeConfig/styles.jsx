import styled from "styled-components";
import "../../../../../mixin/index.scss";

export const StyledStoreConfigDetail = styled.div`
        height:100%;
    .store-config{
        height:100%;
        padding-top: 11px;
        @media screen and (max-width: 1366px){
          padding-top: 13px;
        }
        &-btn-update{
            display:flex;
            margin-bottom: 24px;
            height: 73px;
           justify-content: space-between;
        }
        &-switch-alert{
           display:flex;
           align-items: center;
           margin-top: 24px;
           width: 108%;
        }
        &-order-inventory{
          height: 79px;
          width: 100%;
          margin-bottom: 24px;
        }
        &-inventory{
          height: 43px;
          margin-top: 14px;
          display: flex;
          align-items: center;
        }
        &-inventory-input{
        input{
          padding-left: 0 !important;
          border: none !important;
          border-bottom: 1px solid #ebeef5 !important;
          border-radius: 0;
          width: 24.5625rem;
          font-size: 15px;
          @media screen and (max-width: 1366px){
            width: 21.5625rem;
          }
        }
           
        }
       // update store config
       &__input-wide{
        width: 24.5625rem;
         @media screen and (max-width: 1366px){
            width: 21.5625rem;
          }
        .category-input__input{
          input{
             padding-left: 0 !important;
             border: none !important;
             border-bottom: 1px solid #ebeef5 !important;
             border-radius: 0;
             width: 24.5625rem;
             font-size: 15px;
              @media screen and (max-width: 1366px){
            width: 21.5625rem;
          }
          }
         
        }
        .store-config__option-text{
          margin: 16px 0;
          cursor: pointer;
          .auto-complete__option-container{
              font-size: 14px;
          }
        }
       }
        &_action-btn{
            position: fixed;
            bottom: 0;
            right: 0;
            width: 38.25rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: end;
            padding-right: 24px;
            border-top: 1px solid #EBEEF5;
            background: #ffffff;
            z-index:999;
        }
        &_accept{
            margin-left: 12px;
        }
      
       
    }
    
   
`