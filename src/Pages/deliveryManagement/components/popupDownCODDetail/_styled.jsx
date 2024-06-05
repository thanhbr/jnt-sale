import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledDeliveryDownCOD = styled.div`
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

  .delivery-down-COD {
    &__container {
      position: relative;
      width: 860px;
      height: 376px;
      padding: 12px 20px;
      overflow: hidden;

      background: #ffffff;
      border-radius: 8px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;

      span {
        margin-bottom: 0 !important;
      }
    }
    &__modal_text_hd {
      width: 170px;
      height: 22px;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 140%;
      color: #00081D;
      margin-bottom: 12px;
    }
    &__modal_btn_hd
    {
      display: flex;
      justify-content: space-between;
    }
    &__table_header {
      background: #F7F9FD;
      border-width: 1px 1px 0px 1px;
      border-style: solid;
      border-color: #E2EAF8;
      border-radius: 8px 8px 0px 0px;
    }
    &__table_cell {
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
      color: #00081D;
      background: #FFFFFF;
      border: 1px solid #E2EAF8;
    }
    &__table_th {
      font-weight: 600;
      font-size: 14px;
      line-height: 140%;
      color: #00081D;
      padding: 12px 16px;
    }

    &__bg {
      position: absolute;
      top: -38px;
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

    &__header {
      margin-bottom: 24px;
      padding-top: 8px;

      display: flex;
      align-items: center;

      text-align: center;
    }

    &__body {
      display: flex;
      height: 84px;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    &__note {
      width: 550px;
      height: 93px;
      display: flex;
      justify-content: flex-start;

      background: rgba(26, 148, 255, 0.1);
      border: 1px solid #1a94ff;
      border-radius: 6px;
      padding: 6.5px 12px;
      margin-bottom: 2rem;

      li {
        font-size: 14px;
        ::marker {
          list-style-type: disc;
          font-size: 12px;
          display: inline-block;
        }
      }
    }

    &__style-input {
      position: relative;

      .border-error input {
        border: 1px solid #ff424e;
      }
    }

    &__icon-price {
      position: absolute;
      top: 12px;
      right: 10px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    &__btn-update-cod {
      width: 110px;
      height: 32px;
      padding: 10.5px 6px;
      display: flex;
      align-items: center;
      justify-content: center;
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

        .delivery-down-COD__cancel {
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

  .input__input {
    &::placeholder {
      color: #9ca0ab;
      font-weight: 400;
    }
  }
`
