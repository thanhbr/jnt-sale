import styled from 'styled-components'

export const StyledFacecbookLivestreamScriptSingleShippingInfo = styled.div`
  width: calc(100% + 44px);
  margin: 0 -22px;

  display: flex;
  flex-wrap: wrap;

  .facebook-livestream-script-single-shipping-info {
    &__group {
      width: calc(50% - 44px);
      margin: 0 22px 24px 22px;

      &[data-size='lg'] {
        width: calc(100% - 44px);
      }
    }
  }
`
