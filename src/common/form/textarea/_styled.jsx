import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledTextarea = styled.div`
  position: relative;
  .input{
    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;

      width: 100vw;
      height: 100vh;
    }
    &__dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 11;

      width: 100%;
      max-height: 296px;
      padding: 12px 20px;

      overflow: auto;

      background: #fff;
      border-radius: 6px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }
  }
  .textarea {
    &__label {
      padding: 0;
      margin: 0 0 8px 0;

      display: block;

      cursor: default;

      svg {
        width: 16px;
        height: 16px;

        transform: translateY(4px);

        cursor: pointer;
      }
    }

    &__input {
      width: 100%;
      min-height: 68px;
      max-height: 200px;
      padding: 10px 16px;

      resize: vertical;

      background: #fff;
      border: 1px solid #ebeef5;
      border-radius: 6px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      transition: all 0.25s;

      &[data-icon='true'] {
        padding-right: 32px;
      }

      &[data-validate='danger'] {
        border-color: ${THEME_SEMANTICS.failed} !important;
      }

      &[data-validate='success'] {
        border-color: ${THEME_SEMANTICS.delivered} !important;
      }

      &:disabled {
        background: #f3f6fc !important;
        border-color: #ebeef5 !important;
        box-shadow: none !important;

        color: #7c88a6 !important;

        cursor: no-drop;
      }

      &:focus {
        border-color: ${THEME_COLORS.blue};

        &:hover {
          box-shadow: none;
        }
      }

      &:hover {
        border-color: ${THEME_COLORS.blue};
      }

      &::placeholder {
        color: #7c88a6;
      }
    }

    &__icon {
      position: absolute;
      right: 7px;
      bottom: 7px;

      width: 20px;
      height: 20px;

      img,
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__validate {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
    }
  }
`
