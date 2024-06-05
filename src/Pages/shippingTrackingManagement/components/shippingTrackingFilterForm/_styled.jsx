import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderFilterForm = styled.div`
  .order-filter-form {
    &__group {
      width: calc(100% + 12px);
      margin: 0 -6px 16px -6px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      & > * {
        margin: 0 6px;
      }
    }

    &__collapse {
      max-height: 0;
      margin-bottom: 0;

      overflow: hidden;

      transition: all 0.25s;

      &[data-collapse='true'] {
        max-height: 50vh;
        margin-bottom: 16px;

        overflow: unset;
      }
    }

    &__input-wide {
      width: calc(25% - 12px);
      margin: 0 6px;

      @media screen and (max-width: 1599px) {
        width: calc((100% / 3) - 12px);
      }
    }

    &__option-text {
      min-height: 36px;

      display: flex;
      align-items: center;

      color: ${THEME_COLORS.gray_900};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      transition: color 0.25s;
      &[data-active='true'],
      &:hover {
        color: ${THEME_COLORS.primary_300};
      }
    }

    &__option-container {
      min-height: 45px;
      margin-bottom: 4px;

      cursor: pointer;

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__option-tabs {
      position: sticky;
      top: 0;
      z-index: 1;

      width: 100%;
      height: 28px;
      margin-bottom: 16px;

      display: flex;
      align-items: center;

      background: #fff;

      &::before {
        position: absolute;
        top: -20px;
        left: -20px;

        width: calc(100% + 40px);
        height: calc(100% + 36px);

        background: #fff;
        border-radius: 8px 8px 0 0;

        content: '';
      }
    }

    &__option-tab {
      position: relative;
      z-index: 2;

      margin-right: 16px;

      color: #808089;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;

      cursor: pointer;

      &[data-active='true'] {
        color: ${THEME_COLORS.primary_300};
        font-weight: 600;

        cursor: default;
      }
    }

    &__collapse {
      .order-filter-form__input-wide {
        margin-bottom: 16px;
      }
      .order-filter-form__tooltip {
        position: absolute;
        top: 8px;
        left: 244px;
        z-index: 99;
      }
    }
  }
`
