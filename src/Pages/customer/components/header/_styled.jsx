import styled from 'styled-components'

export const StyledCustomerHeader = styled.div`
  margin: 0 0 14px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .breadcrumb__title {
    h1 {
      font-weight: 700 !important;
    }
  }

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

    &__action-btn-accept {
      margin: 0 12px 0 0;
      // background: #1e9a98;

      &:last-child {
        margin: 0;
      }

      &:hover {
        // background: rgba(30, 154, 152, 0.8);
      }
    }
  }
`
