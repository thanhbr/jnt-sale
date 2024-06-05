import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledImportAddressSeparatorFileModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 488px;
  width: 640px;
  padding: 24px;

  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);

  transform: translate(-50%, -50%);

  .import-address-separator-file {
    &__header,
    &__body {
      margin-bottom: 24px;
    }

    &__body {
      padding: 16px 12px;

      border: 1px dashed #e2eaf8;
      border-radius: 8px;
    }

    &__upload {
      margin: 0 0 24px 0;

      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__upload-btn {
      min-width: 101px;
      height: 28px;

      border-radius: 14px;

      font-size: 14px;
      font-weight: 400;
      line-height: 26px;
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

    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    &__btn {
      min-width: 110px;
      margin: 0 0 0 8px;

      &:first-child {
        margin: 0;
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
  }
`
