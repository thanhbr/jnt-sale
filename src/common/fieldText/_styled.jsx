import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFieldText = styled.div`
  position: relative;

  height: 34px;

  .field-text {
    &__label {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 0;

      color: #151624;
      font-size: 14px;
      font-weight: 400;
      line-height: 20;

      svg {
        transform: translate(4px, 4px);
      }
    }

    &__input {
      width: 100%;
      height: 100%;
      padding: 7px 12px;

      background: #fff;
      border: 1px solid #ebeef5;
      border-radius: 6px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      transition: all 0.25s;

      &:disabled {
        background: #f3f6fc;

        cursor: no-drop;
      }

      &[data-exist-icon='true'] {
        padding: 7px 30px 7px 12px;
      }

      &[data-validate='success'] {
        border-color: ${THEME_SEMANTICS.delivered};
      }

      &[data-validate='danger'] {
        border-color: ${THEME_SEMANTICS.failed};
      }

      &:focus {
        border-color: ${THEME_COLORS.primary_400};
      }

      &::placeholder {
        color: #7c88a6;
      }
    }

    &__icon {
      position: absolute;
      top: 7px;
      right: 7px;
    }

    &__validate {
      position: absolute;
      top: calc(100% + 2px);
      left: 0;
    }
  }
`
