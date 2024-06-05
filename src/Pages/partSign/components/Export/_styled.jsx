import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledExport = styled.div`
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

  .partSign-export {
    &__container {
      position: relative;
      width: 480px;
      padding: 24px 10px 24px 24px;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__header {
      margin-bottom: 24px;
      padding-top: 8px;

      display: flex;
      flex-direction: column;
      align-items: center;

      text-align: center;
    }

    &__footer {
      padding-top: 8px;

      display: flex;
      flex-direction: column;
      align-items: end;
    }

    &__body {
    }

    &__bg {
      position: absolute;
      top: -18px;
      left: 13px;

      width: calc(100% - 26px);
      height: 172px;

      img {
        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
      }
    }

    &__banner {
      margin-bottom: 12px;

      svg {
        width: 44px;
        height: 44px;
      }
    }

    &__list {
      max-height: 276px;
      padding-right: 8px;

      overflow: auto;
    }

    &__item {
      padding: 12px 16px;

      display: flex;
      align-items: center;

      border-radius: 6px;

      transition: background 0.25s;

      &:hover {
        background: linear-gradient(
            0deg,
            rgba(244, 247, 252, 0.6),
            rgba(244, 247, 252, 0.6)
          ),
          #ffffff;

          .partSign-export__cancel {
            display: block;
          }
      }
    }

    &__info {
      flex: 1;
    }

    &__action {
      position: relative;

      width: 28px;
      height: 28px;
      margin-left: 24px;

      &::before {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        border: 3px solid #f0f3f9;
        border-radius: 50%;

        content: '';
      }
    }

    &__loading {
      color: ${THEME_COLORS.primary_300}!important;
    }

    &__download {
      position: absolute;
      top: 50%;
      left: 50%;

      padding-top: 2px;

      transform: translate(-50%, -50%);

      cursor: pointer;
    }

    &__cancel {
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      display: none;
    }
  }
`
