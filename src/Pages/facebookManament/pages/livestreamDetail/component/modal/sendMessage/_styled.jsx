import {THEME_COLORS} from 'common/theme/_colors'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import styled from 'styled-components'

export const StyledFacebookResponseContentScriptDetailDrawer = styled.div`
  height: 100%;
  overflow: auto;

  .facebook-response-content-script-detail-drawer {
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

    &__galleries-list {
      width: calc(100% + 8px);
      margin: 12px -4px 0 -4px;
      padding-left: 12px;
  
      display: flex;
      flex-wrap: wrap;
    }

    &__galleries-item {
      position: relative;

      width: 84px;
      height: 84px;
      margin: 0 4px 8px 4px;

      border-radius: 8px;

      cursor: pointer;

      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;

        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          ),
          url(image.png);
        border-radius: 8px;
        opacity: 0;

        color: #fff;
        content: 'Xem ảnh';
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;

        transition: opacity 0.25s;

        pointer-events: none;
      }

      &:hover {
        &::before {
          opacity: 1;
        }
      }
    }

    &__galleries-background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      width: 100%;
      height: 100%;

      border-radius: 8px;

      object-fit: cover;
      object-position: center;
    }

    &__galleries-delete {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3;

      width: 18px;
      height: 18px;

      transform: translate(50%, -50%);

      svg {
        width: 18px;
        height: 18px;
      }
    }

    &__galleries-create {
      width: 84px;
      height: 84px;
      margin: 0 4px 8px 4px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      border: 1px dashed #ebeef5;
      border-radius: 8px;

      cursor: pointer;
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

export const StyledFacebookResponseContentScriptCarouselModal = styled.div`
  user-select: none;

  .facebook-response-content-script-carousel-modal {
    &__container {
      position: relative;
      z-index: 0;
    }

    &__slides {
      position: relative;

      height: 408px;

      overflow: hidden;
    }

    &__slide {
      position: absolute;
      top: 0;

      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      transition: left 0.25s;

      & > img {
        width: 544px;
        height: 408px;

        object-fit: contain;
        object-position: center;

        border-radius: 8px;
      }
    }

    &__arrows {
      position: absolute;
      top: calc(50% - 18px);
      left: 0;

      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      pointer-events: none;
    }

    &__arrow {
      width: 36px;
      height: 36px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${THEME_COLORS.secondary_100};
      box-shadow: 0px 0px 1.5px rgba(0, 0, 0, 0.1);
      border-radius: 43px 0px 0px 43px;
      opacity: 0.4;

      cursor: pointer;
      pointer-events: all;

      &[data-arrow='prev'] {
        transform: rotate(180deg);
      }

      &[data-disabled='true'] {
        opacity: 0.1;
        cursor: no-drop;
      }

      & > svg {
        transform: rotate(-90deg);
      }
    }

    &__indicators {
      margin-top: 28px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__indicator {
      position: relative;

      width: 92px;
      height: 92px;
      margin: 0 4px;
      padding: 1px;

      border: 2px solid transparent;
      border-radius: 8px;

      transition: all 0.25s;

      &[data-active='true'] {
        border-color: ${THEME_SEMANTICS.delivering};
      }

      &::before {
        position: absolute;
        top: 1px;
        left: 1px;

        width: calc(100% - 2px);
        height: calc(100% - 2px);

        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          url(image);
        border-radius: 6px;

        content: '';

        transition: opacity 0.25s;

        pointer-events: none;
      }

      &:hover {
        &::before {
          opacity: 0;
        }
      }

      & > img {
        width: 100%;
        height: 100%;

        object-fit: cover;
        object-position: center;
      }
    }
  }
`
