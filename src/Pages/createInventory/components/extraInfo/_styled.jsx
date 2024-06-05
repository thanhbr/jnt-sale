import styled from 'styled-components'

export const StyledOrderSingleExtraInfo = styled.div`
  .order-single-extra-info {
    &__input-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input {
      width: calc(50% - 16px);
      margin: 0 8px 24px 8px;

      &[data-size='lg'] {
        width: calc(100% - 16px);
      }

      &.--screen-sm__style-lg {
        @media screen and (max-width: 1599px) {
          width: calc(100% - 16px);
        }
      }
    }
  }
`
