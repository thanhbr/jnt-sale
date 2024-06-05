import styled from "styled-components";

export const StyledCreatePaymentType = styled.div`
  @media screen and (max-width: 1440px){
      height: 70vh;
      overflow: auto;
  }
   @media screen and (max-width: 1366px){
      height: 64vh;
      overflow: auto;
  }
  .payment-type-create{
    &_name{
      height: 62px;
      margin-bottom: 24px;
    }
    &_textarea{
      margin-bottom: 28px;
       textarea{
              resize: none;
       }
    }
    &_status{
      display: flex;
      align-items: center;
      
    }
    
    &_default{
      margin-left: 4px;
    }
  }
`
