import styled from 'styled-components'

export const StyledFacebookLivestreamScript_FanpageLogoModal = styled.div`
  width: calc(100% + 32px);
  max-height: 336px;
  margin: 24px -16px 0 -16px;
  padding: 0 16px;

  overflow: auto;

  .facebook-livestream-script-fanpage-logo-modal {
    &__item {
      margin-bottom: 24px;

      display: flex;
      align-items: center;
    }

    &__image {
      width: 48px;
      height: 48px;
      margin-right: 16px;

      object-fit: cover;
      object-position: center;

      border-radius: 50%;
    }
  }
`
