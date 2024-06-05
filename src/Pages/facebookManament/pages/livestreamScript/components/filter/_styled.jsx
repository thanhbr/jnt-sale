import styled from 'styled-components'

export const StyledFacebookLivestreamScriptFilter = styled.div`
  margin-top: 24px;

  .facebook-livestream-script-filter {
    &__container {
      width: calc(100% + 12px);
      margin: 0 -6px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input {
      width: calc(100% / 3 - 12px);
      max-width: 404px;
      margin: 0 6px 12px 6px;
      .alternative-auto-complete__menu {
        padding-bottom: 12px;
      }
    }
  }
`
