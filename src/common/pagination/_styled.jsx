import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;

  .pagination {
    &__btn-list {
      display: flex;
      align-items: center;
    }

    &__btn {
      min-width: 28px;
      height: 28px;
      padding: 0;

      transition: all 0.25s;
    }

    &__arrow {
      border: none;

      &[data-disabled='true'] {
        cursor: no-drop;

        svg {
          path[fill] {
            fill: #7c88a6;
          }
        }
      }

      &[data-type='prev'] {
        svg {
          transform: rotate(180deg);
        }
      }

      svg {
        width: 28px;
        height: 28px;

        path[fill] {
          fill: ${THEME_COLORS.secondary_100};
        }
      }
    }

    &__dots {
      border: none;

      pointer-events: none;
    }

    &__number {
      margin: 0 4px;
      padding: 0 8px;

      border-color: #ebeef5;

      color: #7c88a6;
      font-size: 14px;
      font-weight: 400;
      line-height: 28px;

      &[data-active='true'] {
        color: #fff;

        pointer-events: none;
      }
    }

    &__popover {
      margin: 0 0 0 12px;

      display: flex;
      align-items: center;

      cursor: pointer;
    }

    &__popover-toggle {
      width: 20px;
      height: 20px;
      margin: 0 0 0 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: transparent;
      border: none;

      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`
