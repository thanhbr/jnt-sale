import styled from "styled-components";
export const StyledSupplierEmpty = styled.div`
  width: 100%;
  .supplier-management-empty{
    .tr__container{
      background: #ffffff !important;
      height: 667px;
    }
    &-td{
      height: 100%;
      width: 100%;
    }
    &_group{
      width: 100%;
      text-align: center;
    }
    &_text{
      width:100% !important;
      text-align: center;
      margin : 12px 0;
    }
    button{
      font-size: 15px;
      svg{
        margin-right: 8px;
        transform: translate(0px, 2px);
      }
    }
  }

`