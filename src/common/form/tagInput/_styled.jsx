import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledTagInput = styled.div`
  position: relative;

  width: 100%;
  min-height: 36px;
  padding: 10px 16px;

  display: flex;
  flex-wrap: wrap;

  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 6px;

  transition: border 0.25s;

  &[data-disabled='true'] {
    background: linear-gradient(
        0deg,
        rgba(244, 247, 252, 0.98),
        rgba(244, 247, 252, 0.98)
      ),
      #00081d;
    border-color: #ebeef5 !important;

    cursor: no-drop;

    * {
      pointer-events: none !important;
    }
  }

  &[data-validate='true'] {
    border-color: ${THEME_SEMANTICS.failed} !important;
  }

  &[data-focus='true'],
  &:hover {
    border-color: ${THEME_COLORS.primary_300};
  }

  .tag-input {
    &__button {
      margin-right: 4px;
      margin-bottom: 4px;
      padding: 0 4px 0 8px !important;

      background: ${THEME_COLORS.primary_300};

      font-weight: 400;

      cursor: default;

      &[data-danger='true'] {
        background: ${THEME_SEMANTICS.failed};
        border-color: ${THEME_SEMANTICS.failed};

        .button__container {
          svg {
            path {
              stroke: #fff !important;
            }
          }
        }
      }

      &:disabled {
        background: #d9e0ed !important;
        color: #717483 !important;

        .button__container {
          svg {
            path {
              stroke: #717483 !important;
            }
          }
        }
      }

      .button__container {
        svg {
          width: 14px;
          height: 14px;
          margin-left: 4px;

          cursor: pointer;
          pointer-events: all;

          &:hover {
            path {
              stroke: ${THEME_SEMANTICS.failed};
            }
          }

          path {
            transition: stroke 0.25s;
          }
        }
      }
    }

    &__input {
      min-width: 220px;
      height: 24px;

      flex: 1;

      background: transparent;
      border: none;

      font-size: 14px;
      font-weight: 400;

      &::placeholder {
        color: #9ca0ab;
      }
    }

    &__validate {
      position: absolute;
      bottom: -19px;
      left: 0;
    }
  }
`
