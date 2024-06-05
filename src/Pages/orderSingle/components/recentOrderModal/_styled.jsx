import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleRecentOrderModal = styled.div`
  padding: 8px 0 16px 0;

  .order-single-recent-order-modal {
    &__table {
      position: relative;

      max-height: 404px;

      overflow: auto;

      border: 1px solid #e2eaf8;
      border-radius: 8px;
    }

    &__thead {
      position: sticky;
      top: 0;

      background: #f7f9fd;
    }

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
        width: 23%;
        padding-left: 24px;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        width: 19%;

        text-align: right;
      }
      &:nth-child(4) {
        width: 26%;

        text-align: center;
      }
    }

    &__td {
      min-height: 56px;
      padding: 16px 12px;

      display: flex;
      align-items: center;

      border-top: 1px solid #e2eaf8;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 20px;

      &:nth-child(1) {
        width: 23%;
        padding-left: 24px;
      }
      &:nth-child(2) {
        flex: 1;
      }
      &:nth-child(3) {
        width: 19%;

        justify-content: flex-end;
      }
      &:nth-child(4) {
        width: 26%;

        justify-content: center;
      }
    }

    &__status {
      padding: 3px 12px;

      display: inline-block;

      background: #eff3fb;
      border-radius: 4px;

      color: #7c88a6;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
    }
  }
`
