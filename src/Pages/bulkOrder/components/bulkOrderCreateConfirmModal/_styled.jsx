import styled from 'styled-components'

export const StyledBulkOrderCreateConfirmModal = styled.div`
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

  .bulk-order-create-confirm-modal {
    &__container {
      width: 480px;
      padding: 24px;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__footer {
      margin-top: 32px;

      display: flex;
      justify-content: flex-end;
    }
  }
`
