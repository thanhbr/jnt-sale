import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleCustomerModal = styled.div`
  position: relative;

  .order-single-customer-modal {
    &__close {
      position: absolute;
      top: -44px;
      right: 0;

      cursor: pointer;
    }

    &__list {
      width: calc(100% + 24px);
      height: 417px;
      margin: 16px -16px 0 -8px;

      overflow: auto;
    }

    &__item {
      width: calc(100% - 8px);
      min-height: 48px;
      margin: 0 8px 16px 0;
      padding: 4px 8px;

      display: flex;

      border-radius: 4px;

      transition: background 0.25s;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background: #f3f6fc;
      }
    }

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

    &__empty {
      height: 90%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__fetching {
      min-height: 417px;
      margin-top: 16px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__loading {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
