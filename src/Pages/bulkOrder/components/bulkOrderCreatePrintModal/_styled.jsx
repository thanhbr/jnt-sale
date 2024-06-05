import styled from 'styled-components'

export const StyledBulkOrderCreatePrintModal = styled.div`
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

  .bulk-order-create-print-modal {
    &__container {
      width: 640px;
      padding: 24px;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-sm='true'] {
        width: 480px;
      }
    }

    &__header {
      margin-bottom: 32px;
    }

    &__footer {
      margin-top: 32px;
      display: flex;
      justify-content: flex-end;
    }

    &__figures {
      width: calc(100% + 16px);
      margin: 0 -8px 16px -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__figure-item {
      width: calc(50% - 16px);
      margin: 0 8px 16px 8px;
      padding: 16px 12px;

      display: flex;
      align-items: center;

      background: #f6fafe;
      border: 1px solid #f0f5ff;
      border-radius: 4px;
    }

    &__figure-banner {
      width: 36px;
      height: 36px;
      margin-right: 12px;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &__figure-info {
      flex: 1;
    }

    &__btn-list {
      margin-top: 16px;

      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`
