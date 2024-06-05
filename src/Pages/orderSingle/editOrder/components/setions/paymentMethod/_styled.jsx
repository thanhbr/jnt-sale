import styled from 'styled-components'

export const StyledOrderSinglePaymentMethod = styled.div`
  .order-single-payment-method {
    &__group {
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 24px;
      }
    }

    &__group-radio {
      display: flex;

      cursor: pointer;
    }

    &__group-container {
      margin-top: 24px;
    }

    &__group-input {
      margin-bottom: 24px;
    }
  }
`
