import { THEME_COLORS } from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledPurchaseCreateImportFileModal = styled.div`
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

  .bulk-order-create-import-file-modal {
    &__container {
      width: 640px;
      padding: 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header,
    &__body {
      margin-bottom: 24px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__content {
      padding: 12px;
      border: 1px dashed #e2eaf8;
      border-radius: 8px;
      &-items{
        
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &-general-info{
        display: flex;
        margin-top: 24px;
      }
    }
    &__warehouse-item{
      width: cal(50% - 4px);
      margin-left: 4px;
    }
    &__supplier-item{
      width: cal(50% - 4px);
      margin-right: 4px;
    }

    &__banner {
      width: 56px;
      height: 56px;
      margin-bottom: 16px;

      object-fit: contain;
      object-position: center;
    }

    &__trigger-file {
      min-width: 100px;
      margin-top: 8px;

      border-radius: 14px;
    }

    &__description {
      margin-top: 24px;

      ul {
        li {
          position: relative;

          padding-left: 16px;

          &::before {
            position: absolute;
            top: 8.5px;
            left: 4px;

            width: 3px;
            height: 3px;

            background: #7c88a6;
            border-radius: 50%;

            content: '';
          }
        }
      }
    }

    &__progress {
      position: relative;

      width: 100%;
      margin: 16px 0 0 0;
      padding: 0 16px;
    }

    &__runner {
      position: relative;

      width: calc(100% - 8px);
      height: 4px;
      margin: 8px 0 0 0;

      overflow: hidden;

      background: rgba(34, 62, 98, 0.08);
      border-radius: 2px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;

        width: var(--value);
        max-width: 100%;
        height: 100%;

        background: #3cd6b7;

        content: '';

        transition: width 0.5s linear;
      }
    }

    &__reset {
      position: absolute;
      bottom: 0;
      right: 0;

      width: 16px;
      height: 16px;

      background: transparent;
      border: none;

      transform: translateY(calc(50% - 2px));

      cursor: pointer;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    &__uploading {
      padding: 51px 0 90px 0;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__spinner {
      position: relative;

      overflow: hidden;

      border-radius: 50%;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;

        width: 100%;
        height: 100%;

        border: 6px solid #c7e6e5;
        border-radius: 50%;

        content: '';
      }

      svg {
        position: relative;
        z-index: 2;

        color: ${THEME_COLORS.primary_300};
      }
    }

    &__footer-btn {
      min-width: 110px;
      margin-left: 8px;
    }
  }
  .order-single-customer-info {
    &__corner {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(50% - 16px);
      margin: 0 8px 24px 8px;

      &[data-size='sm'] {
        width: calc(25% - 16px);
      }

      &[data-size='lg'] {
        width: calc(75% - 16px);
      }

      &[data-size='xl'] {
        width: calc(100% - 16px);
      }
      label{
        margin-bottom: 8px;
        display: block;
        cursor: default;
      }
    }

    &__form-input-list {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    &__form-input-item {
      width: calc(100% / 3 - 16px);
      margin: 0 8px;
    }
  }
  .vendor-modal{
    &__avatar {
        width: 32px;
        height: 32px;
        margin: 4px 12px 0 0;
  
        display: flex;
        align-items: center;
        justify-content: center;
  
        background: ${THEME_COLORS.primary_300};
        border-radius: 50%;
      }
  
      &__info {
        flex: 1;
      }
  
      &__name {
        display: -webkit-box;
        overflow: hidden;
  
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
  }
`
