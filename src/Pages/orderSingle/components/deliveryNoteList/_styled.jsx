import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleDeliveryNoteList = styled.div`
  position: relative;

  .order-single-delivery-list {
    &__item {
      margin-bottom: 16px;

      display: flex;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
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

    &__empty {
      min-height: 150px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__footer {
      position: sticky;
      bottom: 0;

      width: 100% !important;
      height: 48px;
      padding: 0 4px;

      display: flex;
      align-items: center;

      background: #fff;

      transform: translateY(12px);

      cursor: pointer;
    }
  }
  .btn-create-delivery-note{
      position: sticky;
      bottom: 0;
      z-index: 1;
      height: 48px;
      display: block;
      background: #fff;
      cursor: pointer;
    }
`
