import styled from "styled-components";


export const StyledSupplierTableBody=styled.div`
   .supplier-management{
   &-table_body{
      .tr__container{
        justify-content: space-evenly;
        cursor: pointer;
      }
      
    }
    &-table_checkbox{
      width: 44px;
      
    }
    &-table_code-supplier{
      width: 9.5%;
      @media screen and (max-width:1440px){
        width: 10.5%;
      }
       @media screen and (max-width:1366px){
        width: 11.5%;
      }
      @media screen and (max-width:1280px){
        width: 12.5%;
      }
       .supplier-management-table_supplier_name-tooltip_code{
         display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      } 
    }
    &-table_name-supplier{
       width: 15.6%;
    }
    &-table_supplier_name-tooltip{
       display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      
    }
    &-table_address-supplier{
      width: 28.7%;
      @media screen and (max-width:1440px){
        width: 21.7%;
      }
      @media screen and (max-width:1280px){
        width: 18.7%;
      }
      .supplier-management-table_address-supplier-tooltip{
      display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      } 
    }
    &-table_phone-supplier{
       width: 7.5%;
        @media screen and (max-width:1440px){
        width: 10.5%;
      }
    }
    &-table_note-supplier{
      width: 20.1%;
      flex: 0.71;
    }
     &-table_note-supplier-tooltip{
      display: -webkit-box;
        height: 100%;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    &-table_status-supplier{
      width: 7.1%;
      padding: 12px 0  !important;
      justify-content: center;
       @media screen and (max-width:1440px){
        width: 10.1%;
      }
       @media screen and (max-width:1366px){
        width: 11.1%;
      }
      @media screen and (max-width:1280px){
        width: 12.1%;
      }
      .switch{
        input:checked + .slider:before{
             transform: translate(13px,0.2px);
             @media screen and (max-width: 1366px){
                transform: translate(13px,0.1px);
             }
        }
        .round::before{
            transform: translate(0px, 0.5px);
        }
      } 
    }
    &-table_setting{
      width: 6.2%;
      justify-content: flex-end;
      position: relative;
    }
    &-table_setting-down{
      margin-right: 10px;
       position: absolute;
            top: 54%;
            right: 42px;
            transform: translateY(-50%) rotate(0deg);
            cursor: pointer;
            &[data-active='true'] {
                position: absolute;
                top: 45%;
                right: 42px;
                transform: translateY(-50%) rotate(180deg);
            }
    }
   
  }

`