import styled from 'styled-components'

export const StyledFacebookFanpageWrapper = styled.div`
  position: relative;

  width: calc(100% + 64px);
  height: calc(100vh - 56px);
  margin: -16px -32px -44px -32px;

  .facebook-fanpage-wrapper {
    &__banner {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;

      width: 100%;
      height: 240px;

      object-fit: cover;
      object-position: center;
    }

    &__header {
      position: relative;
    }

    &__container {
      position: relative;

      width: calc(100% - 60px);
      min-height: calc(100% - 240px - 32px + 94px);
      margin: -94px 30px 32px 30px;
      padding-bottom: 74px;

      border-radius: 8px;
    }

    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 48px;
      padding: 0 32px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
