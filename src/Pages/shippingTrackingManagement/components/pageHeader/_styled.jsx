import styled from 'styled-components'

export const StyledPageHeader = styled.div`
  margin: 0 0 14px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-header {
    &__actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__action-item {
      margin: 0 12px 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
`
