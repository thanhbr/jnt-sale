import styled from 'styled-components'

export const StyledFacebookLivestreamScript_FanpageLogoList = styled.div`
  display: flex;

  cursor: pointer;

  .facebook-livestream-script-fanpage-logo-list {
    &__item {
      position: relative;

      width: 32px;
      height: 32px;
      margin-left: -8px;

      overflow: hidden;

      border-radius: 50%;

      & > img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }

    &__cover {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      background: rgba(30, 154, 152, 0.7);

      color: #fff;
      font-size: 12px;
      font-weight: 600;
    }
  }
`
