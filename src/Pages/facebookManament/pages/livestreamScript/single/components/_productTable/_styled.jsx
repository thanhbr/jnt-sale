import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledFacebookLivestreamScriptSingle_ProductTable = styled.div`
  user-select: none;

  .facebook-livestream-script-single-product-table {
    &__table {
      position: relative;
      z-index: 0;

      max-height: 400px;

      overflow: auto;
    }

    &__thead {
      position: sticky;
      top: 0;
      z-index: 1;

      background: #f7f9fd;
    }

    &__tbody {
      display: flex;
      flex-direction: column-reverse;
    }

    &__tr {
      display: flex;

      border-top: 1px solid #e2eaf8;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        width: 428px;
        padding-left: 16px;
      }
      &:nth-child(2) {
        width: 174px;
      }
      &:nth-child(3) {
        flex: 1;
      }
      &:nth-child(4) {
        width: 48px;
        padding-right: 16px;
      }
    }

    &__td {
      min-height: 56px;
      padding: 18px 12px;

      display: flex;
      align-items: center;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 13px;
      line-height: 20px;

      &:nth-child(1) {
        width: 428px;
        padding-left: 16px;
      }
      &:nth-child(2) {
        width: 174px;
      }
      &:nth-child(3) {
        flex: 1;
      }
      &:nth-child(4) {
        width: 48px;
        padding-right: 16px;
      }

      &.--tooltip {
        & > span {
          width: 100%;

          display: block;
        }
      }

      .--ellipsis {
        max-width: 100%;
        max-height: 40px;

        display: -webkit-box;
        overflow: hidden;

        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }

    &__thumbnail {
      width: 40px;
      height: 40px;
      margin-right: 12px;

      object-fit: cover;
      object-position: center;

      border-radius: 4px;
    }

    &__name {
      display: flex;
      align-items: center;
    }
  }
`
