import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleContactList = styled.div`
  width: calc(100% + 16px);
  margin: 0 -8px;

  position: relative;

  .order-single-contact-list {
    &__loading {
      min-height: 260px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__load-more {
      padding: 16px 0;

      display: flex;
      align-items: center;
      justify-content: center;
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

    &__item {
      min-height: 48px;
      padding: 4px 8px;
      margin-bottom: 16px;

      display: flex;

      border-radius: 4px;

      cursor: pointer;

      transition: background 0.25s;

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
    }
  }
`
