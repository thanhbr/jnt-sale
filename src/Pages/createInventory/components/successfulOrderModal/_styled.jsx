import styled from 'styled-components'

export const StyledOrderCreatePrintModal = styled.div`
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

  .success-banner {
    svg {
      width: 44px;
      height: 44px;
    }
  }

  .order-create-print-modal {
    &__container {
      width: 700px;
      padding: 24px;

      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

      &[data-sm='true'] {
        width: 480px;
      }
      &[data-success='true'] {
        width: 640px;
      }
    }

    &__header {
      margin-bottom: 24px;
    }

    &__body {
      .content-error {
        padding: 16px 10px 4px 10px;
        background: #f3f6fc;
        border-radius: 6px;
        p {
          margin-bottom: 16px;
          svg {
            margin-right: 12px;
          }
        }
      }
      .content-success {
        margin-bottom: 24px;
      }
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
      border-radius: 8px;
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

  .order-popover__selected-action-menu-item {
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #00081d;
    margin-bottom: 16px;
    :hover {
      cursor: pointer;
      color: #1e9a98;
    }
    :last-child {
      margin-bottom: 4px;
    }
  }
  .order-popover__selected-action-menu-item:last-child {
    margin-bottom: 4px;
  }
  
  .popper__container[data-placement='bottom-start'] {
    top: calc(100% + 16px) !important;
  }
`
