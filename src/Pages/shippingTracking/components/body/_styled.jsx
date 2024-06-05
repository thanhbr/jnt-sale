import styled from 'styled-components'

export const StyledShippingTrackingBody = styled.div`

  .shipping-tracking-tool-body {
    &__heading {
      border-radius: 4px;
      background: #fff;
      padding: 16px;
    }

    &__content {
      margin-top: 16px;
    }
  }

  .bt-filter {
    &__header {
      padding-top: 8px;
      display: flex;
      align-items: center;

      &div {
        width:100%;
      }
      &-input {
        width: 100%;
      }
    }

    &__action-btn {
      width: 90px;
      height: 34px;
      margin: 0 0 0 12px;
      line-height: 34px;
    }
  }
`