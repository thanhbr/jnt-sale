import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledInput = styled.div`
  position: relative;

  .input {
    &__label {
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

    &__container {
      &[data-button='true'] {
        display: flex;
      }
    }

    &__input {
      width: 100%;
      height: 34px;
      padding: 0 21px 0 11px;

      background: #fff;
      border: 1px solid #ebeef5;
      border-radius: 4px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      font-weight: 400;
      text-overflow: ellipsis;

      transition: all 0.25s;

      &::placeholder{
        font-size: 13px;
      }

      &[data-button='true'] {
        border-radius: 6px 0 0 6px;
      }

      &[data-dropdown='true'] {
        position: relative;
        z-index: 11;
      }

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
        box-shadow: 0px 0px 0px 2.5px rgba(26, 148, 255, 0.2);
      }

      &::placeholder {
        color: #7c88a6;
      }
    }

    &__button {
      height: 34px;

      &[data-dropdown='true'] {
        position: relative;
        z-index: 11;
      }

      button {
        height: 100%;

        border-radius: 0 8px 8px 0;

        font-size: 14px;
        line-height: 22px;
      }
    }

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
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__icon {
      position: absolute;
      right: 12px;
      bottom: 7px;

      width: 20px;
      height: 20px;

      &[data-dropdown='true'] {
        z-index: 11;
      }

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
