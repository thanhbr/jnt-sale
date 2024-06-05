import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookLivestreamScript_RowMenu = styled.div`
  width: 164px;

  .facebook-livestream-script-row-menu {
    &__item {
      height: 36px;
      padding: 0 4px;

      display: flex;
      align-items: center;

      font-size: 13px;
      line-height: 20px;

      transition: all 0.25s;

      cursor: pointer;

      &[data-type='danger'] {
        &:hover {
          color: ${THEME_SEMANTICS.failed}!important;

          svg {
            path[fill] {
              fill: ${THEME_SEMANTICS.failed};
            }

            path[stroke] {
              stroke: ${THEME_SEMANTICS.failed};
            }
          }
        }
      }

      &:hover {
        color: ${THEME_COLORS.primary_300}!important;

        svg {
          path[fill] {
            fill: ${THEME_COLORS.primary_300};
          }

          path[stroke] {
            stroke: ${THEME_COLORS.primary_300};
          }
        }
      }
    }

    &__icon {
      margin-right: 10px;

      svg {
        transform: translateY(2px);

        path {
          transition: all 0.25s;
        }
      }
    }
  }
`
