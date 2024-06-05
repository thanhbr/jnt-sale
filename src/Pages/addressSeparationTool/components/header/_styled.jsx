import styled from 'styled-components'

export const StyledAddressSeparationToolHeader = styled.div`
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
`
