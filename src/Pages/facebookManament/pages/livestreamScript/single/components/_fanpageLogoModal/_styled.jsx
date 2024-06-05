import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingle_FanpageLogoModal = styled.div`
  margin-top: 24px;

  .facebook-livestream-script-single-fanpage-logo-modal {
    &__header {
      margin: -4px 0 24px 0;
      padding-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      border-bottom: 1px solid #eff2f8;
    }

    &__list {
      width: calc(100% + 32px);
      max-height: 336px;
      margin: 0 -16px;
      padding: 0 16px;

      overflow: auto;
    }

    &__item {
      margin-bottom: 24px;

      display: flex;
      align-items: center;

      cursor: pointer;
    }

    &__image {
      width: 48px;
      height: 48px;
      margin: 0 16px;

      object-fit: cover;
      object-position: center;

      border-radius: 50%;
    }
  }
`
