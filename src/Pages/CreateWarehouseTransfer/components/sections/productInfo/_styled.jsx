import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledWarehouseTSProductInfo = styled.div`
  .delete-item {
    cursor: pointer;
  }

  .warehouse-transfer-product-info {
    &__corner {
      position: absolute;
      top: 24px;
      right: 24px;

      display: flex;

      cursor: pointer;
    }

    &__empty {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .warehouse-transfer-product-info-container {
    &__not-found {
      display: grid;
      align-items: center;
      justify-items: center;
    }
  }

  .warehouse-transfer-filter-form {
    &__empty {
      display: block;
      text-align: center;
      margin-top: 23px;
      margin-bottom: 53px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-weight: 600;
        font-size: 14px;
        line-height: 140%;
        color: #7c88a6;
      }
    }

    &__info-product {
      width: 100%;
      text-align: right;
      font-size: 14px;
      font-weight: 400;
      color: #00081d;
      margin-top: 24px;
      margin-bottom: 14px;
      span {
        font-weight: 600;
      }
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
  }

  .row-tab-detail {
    &__product {
      display: block;
      margin-left: 13px;
    }
    &__img-thumbnail {
      border-radius: 4px;
      width: 48px;
      height: 48px;
      object-fit: cover;
    }
    &__content {
      position: relative;

      margin-bottom: 24px;

      display: flex;
    }

    &__info-table {
      margin-bottom: 12px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__table {
      margin-bottom: 12px;

      overflow: hidden;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      .row-tab-detail__tr {
        background: #f7f9fd;
      }
    }

    &__tr {
      display: flex;
    }

    &__th {
      min-height: 44px;
      padding: 12px;

      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      &:nth-child(1) {
        width: 40%;
      }
      &:nth-child(2) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(3) {
        width: 20%;
        text-align: center;
      }
      &:nth-child(4) {
        width: 15%;
        text-align: center;
      }
      &:nth-child(5) {
        width: 5%;
        text-align: center;
      }
    }

    &__td {
      min-height: 88px;
      padding: 18px 12px;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      &:nth-child(1) {
        width: 40%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &:nth-child(2) {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:nth-child(3) {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:nth-child(4) {
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      &:nth-child(5) {
        width: 5%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .input__input {
        max-width: 104px;
      }

      .tooltipv2-sku {
        max-width: 320px;
        padding: 0;
        overflow: hidden;
        position: relative;
        display: inline-block;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &__result {
      margin: 0.75rem 0 1.5rem;
    }

    &__result-item {
      margin-bottom: 8px;

      display: flex;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__result-label {
      padding: 0 12px;

      flex: 1;

      text-align: right;
    }

    &__result-value {
      width: 13%;
      padding: 0 12px;

      text-align: right;
    }

    &__note {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;

      margin-top: 2.25rem;
      span {
        font-weight: 600;
      }
    }

    &__link-hover {
      color: #1a94ff;
      &:hover {
        color: #1373db;
      }
    }
  }

  .input__dropdown{
    z-index: 20;
  }
`
