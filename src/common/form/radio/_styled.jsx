import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledRadio = styled.div`
  position: relative;

  width: 18px;
  height: 18px;

  background: #f5f5fa;
  border: 1px solid #dddde3;
  border-radius: 50%;

  transition: all 0.25s;

  cursor: pointer;

  &[data-checked='true'] {
    background: #fff;
    border-color: ${THEME_COLORS.green}!important;

    &::before {
      opacity: 1;
    }
  }

  &[data-disabled='true'] {
    border-color: transparent !important;

    cursor: no-drop;

    &[data-checked='true'] {
      border-color: #dddde3 !important;

      &::before {
        background: #dddde3 !important;
      }
    }

    .radio__input {
      cursor: no-drop;
    }
  }

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 10px;
    height: 10px;

    background: ${THEME_COLORS.green};
    border-radius: 50%;
    opacity: 0;

    content: '';

    transition: opacity 0.25s;
    transform: translate(-50%, -50%);

    pointer-events: none;
  }

  &:hover {
    border-color: ${THEME_COLORS.blue};
  }

  .radio__input {
    width: 100%;
    height: 100%;

    opacity: 0;

    cursor: pointer;
  }
`
