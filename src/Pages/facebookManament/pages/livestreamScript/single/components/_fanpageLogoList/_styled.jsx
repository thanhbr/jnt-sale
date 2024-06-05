import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingle_FanpageLogoList = styled.div`
  display: flex;

  .facebook-livestream-script-single-fanpage-logo-list {
    &__item {
      position: relative;

      width: 32px;
      height: 32px;
      margin-left: -8px;

      overflow: hidden;

      border-radius: 50%;

      cursor: pointer;

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

    &__create {
      width: 32px;
      height: 32px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px dashed ${THEME_SEMANTICS.delivering};
      border-radius: 50%;

      cursor: pointer;
    }
  }
`
