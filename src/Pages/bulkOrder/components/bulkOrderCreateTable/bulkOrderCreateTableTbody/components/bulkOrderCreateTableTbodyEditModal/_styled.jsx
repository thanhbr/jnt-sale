import styled from 'styled-components'

export const StyledBulkOrderCreateTableTbodyEditModal = styled.div`
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

  .bulk-order-create-table-tbody-edit-modal {
    &__container {
      width: 880px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px 8px -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(50% - 16px);
      margin: 0 8px 16px 8px;
    }

    &__note-dropdown {
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
  }
`
