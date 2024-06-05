import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleProductTable = styled.div`
  margin-top: 24px;

  user-select: none;

  .order-single-product-table {
    &__table {
      position: relative;
      z-index: 0;

      max-height: 400px;

      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;

      &[data-inventory='true'] {
        .order-single-product-table__th,
        .order-single-product-table__td {
        &:nth-child(1){
          width: 21.9375rem;
        }
          &:nth-child(2) {
            width: 7.875rem;
            justify-content: right;
            text-align: right;
            @media screen and (max-width: 1440px){
              width: 9.875rem;
            }
          }
          &:nth-child(3) {
            width: 13.3125rem;
            justify-content: end;
            text-align: right;
             @media screen and (max-width: 1440px){
              width: 16.3125rem;
            }
          }
          &:nth-child(4) {
            width: 8.5rem;

            text-align: right;
            justify-content:right;
            @media screen and (max-width: 1366px){
               width: 10.5rem;
            }
          }
          &:nth-child(5) {
            width: 44px;

          }
        }
      }
    }

    &__thead {
      position: sticky;
      top: 0;
      z-index: 1;

      background: #f7f9fd;
    }

    &__tbody {
      //display: flex;
      //flex-direction: column-reverse;
      height: 352px;
      overflow: auto;
      .order-single-product-table__tr {
        height : 88px;
      }
    }
    //&__tbody-scroll{
    //  height: 352px;
    //  overflow: auto;
    //}
    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        padding-left: 16px;

        flex: 1;
      }

      &:nth-child(2) {
        width: 124px;

        text-align: right;
      }

      &:nth-child(3) {
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
      font-size: 14px;
      line-height: 20px;

      &:nth-child(1) {
        padding-left: 16px;

        display: flex;
        flex: 1;
        align-items: center;
      }

      &:nth-child(2) {
        width: 124px;

        justify-content: center;

        text-align: right;
      }

      &:nth-child(3) {
        width: 48px;
        padding-right: 16px;
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
      width: 48px;
      height: 48px;
      margin-right: 13px;

      object-fit: cover;
      object-position: center;
      overflow: hidden;

      border-radius: 4px;
    }
    &__tooltip{
      display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    }
    &__tooltip-sku{
       display: -webkit-box;
    height: 100%;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    }
    &__number-arrow {
      position: relative;

      i {
        position: absolute;
        right: 0;

        &:nth-child(1) {
          top: calc(50% - 6px);
        }
        &:nth-child(2) {
          top: calc(50% + 6px);

          transform: rotate(180deg);
        }

        &[data-disabled='true'] {
          cursor: default;

          svg {
            color: #ebeef5;

            path {
              stroke: #ebeef5;
            }
          }
        }

        svg {
          width: 10px;
          height: 10px;
        }
      }
    }

    &__discount-type-dropdown-toggle {
      width: 32px;
      height: 20px;

      text-align: center;

      i {
        display: inline-block;

        transform: rotate(180deg);
        transform-origin: center;
        transition: transform 0.25s;

        &[data-active='true'] {
          transform: rotate(0);
        }
      }

      svg {
        width: 8px;
        height: 8px;

        path {
          stroke: ${THEME_COLORS.primary_300};
        }
      }
    }

    &__discount-type-dropdown-menu {
      width: 32px;
    }

    &__discount-type-dropdown-menu-item {
      margin-bottom: 8px;

      font-weight: 600;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__checkout {
      margin-top: 16px;
      margin-bottom: 24px;
    }

    &__checkout-group {
      margin-bottom: 8px;

      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__checkout-name {
      flex: 1;

      text-align: right;
    }

    &__checkout-value {
      width: 120px;
      margin-left: 73px;

      text-align: right;
    }

    &__empty {
      min-height: 300px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .order-single-product-info-inventory-container__not-found{
      display: grid;
      justify-content: center;
    }
  }

`
