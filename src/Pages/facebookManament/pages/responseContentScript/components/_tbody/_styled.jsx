import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookResponseContentScript_Tbody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  background: #fff;
  border-top: 1px solid #e2eaf8;

  transition: background 0.25s;

  &:hover {
    background: #f3f6fc;
  }

  .facebook-response-content-script-tbody {
    &__td {
      height: 100%;
      min-height: 70px;
      padding: 12px;

      display: flex;
      align-items: center;

      font-size: 13px;
      line-height: 20px;

      @media screen and (max-width: 1599px) {
        padding: 12px 8px;
      }

      &:nth-child(1) {
        width: 54px;
        padding-left: 16px;
      }
      &:nth-child(2) {
        width: 178px;

        @media screen and (max-width: 1599px) {
          width: 128px;
        }

        .--ellipsis {
          max-height: 40px;

          -webkit-line-clamp: 2;
        }
      }
      &:nth-child(3) {
        flex: 1;

        .--ellipsis {
          max-height: 60px;

          -webkit-line-clamp: 3;
        }
        .--ellipsis-a {
          display: none 
        }

        @media screen and (max-width: 1368px) {
          .--ellipsis {
            display: none
          }
          .--ellipsis-a {
            display: block
          }
          .--ellipsis-a-view-more {
            color:#1A94FF;
             width: 80px;
             display:inline-block;
             margin-left:3px
          }
        }
      }
      &:nth-child(4) {
        width: 328px;

        @media screen and (max-width: 1599px) {
          width: 228px;
        }
      }
      &:nth-child(5) {
        width: 158px;

        @media screen and (max-width: 1599px) {
          width: 136px;
        }
      }
      &:nth-child(6) {
        width: 54px;
        padding-right: 16px;
      }

      @media screen and (max-width: 1599px) {
        padding: 8px;
      }

      .--ellipsis {
        display: block;
        display: -webkit-box;
        overflow: hidden;
        align-items: center;

        -webkit-box-orient: vertical;
      }
    }

    &__menu {
      width: 164px;
    }

    &__menu-item {
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

    &__menu-icon {
      margin-right: 10px;

      svg {
        transform: translateY(2px);
      }
    }
  }

  .common-ellipsis {
    max-width: 100%;

    overflow: hidden;
    white-space: nowrap;

    text-overflow: ellipsis;

    cursor: pointer;

    &.--multiple {
      display: -webkit-box;

      white-space: unset;

      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`
