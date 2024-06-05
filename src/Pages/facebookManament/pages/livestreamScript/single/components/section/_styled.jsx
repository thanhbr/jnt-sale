import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingleSection = styled.div`
  border-left: 1px solid #c8cbd4;

  &[data-active='true'] {
    border-color: ${THEME_SEMANTICS.delivering};
  }

  .facebook-livestream-script-single-section {
    &__header {
      position: relative;

      padding-left: 24px;

      display: inline-block;
    }

    &__header-status {
      position: absolute;
      top: 0;
      left: -1px;

      width: 24px;
      height: 24px;

      background: #fff;
      border-radius: 50%;

      transform: translateX(-50%);

      & > svg {
        width: 24px;
        height: 24px;
      }
    }

    &__header-toggle {
      position: absolute;
      top: 0;
      right: -28px;

      width: 24px;
      height: 24px;
      margin-left: 4px;

      display: inline-block;

      transform: rotate(180deg);
      transition: transform 0.25s;

      cursor: pointer;

      &[data-expand='true'] {
        transform: rotate(0deg);
      }

      & > svg {
        width: 24px;
        height: 24px;
      }
    }

    &__body {
      transition: all 0.25s;

      &[data-collapse='false'] {
        * {
          opacity: 0;
          pointer-events: none;
        }
      }
    }
  }
`
