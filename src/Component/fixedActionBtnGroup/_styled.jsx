import styled from 'styled-components'
import {THEME_COLORS} from 'common/theme/_colors'

export const StyledFixedActionBtnGroup = styled.div`
  position: fixed;
  bottom: 104px;
  right: -8px;
  z-index: 3;

  transform: rotate(-90deg) translateY(630%);
  transform-origin: left;
`

export const StyledActionBtn = styled.button`
  height: 32px;
  margin: 0 8px 0 0;
  padding: 0 10px;

  background: #fff;
  border: none;
  border-radius: 8px 8px 0 0;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  font-size: 14px;
  line-height: 32px;

  transition: color 0.25s;

  cursor: pointer;

  a{
    color: #27272A;
    &:hover {
      color: ${THEME_COLORS.primary_300};
    }
  }

  &:hover {
    color: ${THEME_COLORS.primary_300};

    .action-btn {
      &__icon {
        svg {
          color: ${THEME_COLORS.primary_300};

          path[stroke] {
            stroke: ${THEME_COLORS.primary_300};
          }
        }
      }
    }
  }

  .action-btn {
    &__icon {
      margin: 0 10px 0 0;

      svg {
        display: inline;

        transform: rotate(90deg) translateX(5px);
        transition: color 0.25s;

        path[stroke] {
          transition: stroke 0.25s;
        }
      }
    }
  }
`
