import styled from 'styled-components'

export const StyledFacebookLoginWrapper = styled.div`
  width: calc(100% + 64px);
  height: calc(100vh - 56px);
  margin: -16px -32px -44px -32px;

  display: flex;
  align-items: center;

  .facebook-login-wrapper {
    &__container {
      padding-left: 32px;

      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }

    &__content {
      width: 100%;
      max-width: 615px;
    }

    &__login-btn {
      min-width: 225px;
      margin-bottom: 32px;

      background: #2374e1;
      border-color: #2374e1;

      color: #fff;
    }

    &__background {
      width: 55%;
      height: 100%;

      object-fit: cover;
      object-position: center;
    }
  }
`
