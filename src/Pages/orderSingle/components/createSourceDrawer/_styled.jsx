import styled from 'styled-components'

export const StyledCreateSourceDrawer = styled.div`
  width: 544px;
  height: 100%;
  padding: 24px 24px 88px 24px;

  overflow: auto;

  .create-source-drawer {
    &__header {
      margin-bottom: 32px;
    }

    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 64px;
      padding: 0 24px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      background: #fff;
      border-top: 1px solid #ebeef5;
    }

    &__input-group {
      width: calc(100% + 8px);
      margin: 0 -4px 8px -4px;

      display: flex;
      flex-wrap: wrap;
    }

    &__input-item {
      width: calc(50% - 8px);
      margin: 0 4px 16px 4px;

      &[data-size='lg'] {
        width: calc(100% - 8px);
      }

      &[data-size='sm'] {
        width: calc(100% / 3 - 8px);
      }
    }

    &__address-icon {
      margin-right: 4px;

      svg {
        width: 18px;
        height: 18px;

        transform: translateY(3px);
      }
    }

    &__option-list {
      margin-bottom: 32px;
    }

    &__option-item {
      margin-bottom: 10px;

      display: flex;
    }

    &__toggle-item {
      margin-bottom: 10px;

      display: flex;
    }

    &__loading-modal {
      .modal__body {
        min-height: 150px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
`
