import styled from 'styled-components'

export const StyledGrCustomerHeader = styled.div`
  margin: 0 0 14px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .address-separate-tool-header {
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__action-btn {
      margin: 0 12px 0 0;

      &:last-child {
        margin: 0;
      }
    }


  }
  .gr_btn_add_header{
    padding: 0 12px 0 10.3px;
  }
`
