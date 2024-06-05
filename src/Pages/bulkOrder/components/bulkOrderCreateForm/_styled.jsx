import styled from 'styled-components'

export const StyledBulkOrderCreateForm = styled.div`
  .bulk-order-create-form {
    &__group {
      width: calc(100% + 24px);
      margin: 0 -12px;
      margin-top: 16px;

      display: flex;
      flex-wrap: wrap;

      &:first-child {
        margin-top: 0;
      }
    }

    &__group-item {
      width: calc(25% - 24px);
      margin: 0 12px;
    }
  }
`
