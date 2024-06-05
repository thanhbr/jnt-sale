import styled from "styled-components";

export const StyledCreateSupplier = styled.div`
  @media screen and (max-width: 1440px){
      height: 70vh;
      overflow: auto;
  }
   @media screen and (max-width: 1366px){
      height: 64vh;
      overflow: auto;
  }
  .supplier-management-create{
    &_group{
      height: 81px;
      margin-bottom: 5px;
    }
    &_textarea{
      height: 115px;
      margin-bottom: 5px;
       textarea{
              resize: none;
       }
    }
    &_status{
      display: flex;
      align-items: center;
    }
    &_status-txt{
      margin-left: 8px;
    }
    &_question{
      margin-left: 5px;
    }
    &_default{
      margin-left: 4px;
    }
    &_phone-shortName{
      display: flex;
      justify-content: space-between;
    }
    &_abbreviations{
      width: 13.625rem;
    }
    &_note{
      .input__input{
          height: 68px;
       }
    }
  }
`
