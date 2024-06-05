import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledBulkOrderCreateTableTbodyReportModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.25);

  cursor: default;
  pointer-events: all;

  .bulk-order-create-table-tbody-report-modal {
    &__container {
      width: 600px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 16px;
    }

    &__tabs {
      margin-bottom: 24px;

      display: flex;
    }

    &__tab-item {
      height: 32px;
      margin-right: 24px;

      border-bottom: 1px solid transparent;

      transition: border 0.25s;

      color: ${THEME_COLORS.secondary_100};
      font-size: 14px;
      line-height: 32px;

      cursor: pointer;

      &[data-active='true'] {
        border-color: ${THEME_COLORS.primary_300};

        cursor: default;
      }
    }

    &__input-group {
      width: calc(100% + 24px);
      margin: 0 -12px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input-item {
      width: calc(50% - 24px);
      margin: 0 12px 24px 12px;
    }

    &__textarea-item {
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__tab-list {
      margin-bottom: 32px;
    }

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
