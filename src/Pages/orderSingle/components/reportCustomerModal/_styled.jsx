import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleReportCustomerModal = styled.div`
  padding: 8px 0 16px 0;

  .order-single-report-customer-modal {
    &__table {
      position: relative;

      max-height: 200px;

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
        padding-left: 24px;

        flex: 1;
      }

      &:nth-child(2) {
        width: 125px;
      }

      &:nth-child(3) {
        padding-right: 24px;

        flex: 1;

        text-align: right;
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
        padding-left: 24px;

        flex: 1;
      }

      &:nth-child(2) {
        width: 125px;
      }

      &:nth-child(3) {
        padding-right: 24px;

        flex: 1;

        justify-content: flex-end;
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
  }
`
