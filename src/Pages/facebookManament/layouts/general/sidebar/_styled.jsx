import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledFacebookLayoutGeneralSidebar = styled.aside`
  min-height: 100%;

  .facebook-layout-general-sidebar {
    &__list-item {
      width: 100% !important;
      min-height: 60px;
      padding: 20px 24px 19px 24px;

      display: flex;
      align-items: center;
      border-radius: 8px;
      //border-bottom: 1px solid #e2eaf8;

      transition: background 0.25s;

      cursor: pointer;

      &[data-active='true'] {
        background: #e2eaf8;

        cursor: default;

        .facebook-layout-general-sidebar {
          &__icon {
            svg {
              path[stroke] {
                stroke: ${THEME_COLORS.primary_300};
              }
            }
          }

          &__text {
            font-weight: 600;
          }
        }
      }

      &:hover {
        .facebook-layout-general-sidebar {
          &__icon {
            svg {
              path[stroke] {
                stroke: ${THEME_COLORS.primary_300};
              }
            }
          }

          &__text {
            color: ${THEME_COLORS.primary_300};
          }
        }
      }
    }

    &__icon {
      width: 18px;
      height: 18px;

      margin-right: 12px;
    }

    &__text {
      flex: 1;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      line-height: 20px;

      transition: all 0.25s;
    }
  }
`
