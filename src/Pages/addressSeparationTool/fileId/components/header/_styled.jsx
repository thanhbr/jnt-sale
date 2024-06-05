const {default: styled} = require('styled-components')

export const StyledAddressSeparationSingleFileHeader = styled.div`
  margin: 0 0 14px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .address-separation-single-file-header {
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
