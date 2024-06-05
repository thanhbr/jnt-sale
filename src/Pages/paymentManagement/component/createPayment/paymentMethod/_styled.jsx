import styled from 'styled-components';

export const StyledGeneralInfo = styled.div`
  .payment-management-info {
    &__corner {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(50% - 16px);
      margin: 0 8px 24px 8px;

      &[data-size='sm'] {
        width: calc(25% - 16px);
      }

      &[data-size='lg'] {
        width: calc(75% - 16px);
      }

      &[data-size='xl'] {
        width: calc(100% - 16px);
      }
    }

    &__form-input-list {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    &__form-input-item {
      width: calc(100% / 3 - 16px);
      margin: 0 8px;
    }
  }

`