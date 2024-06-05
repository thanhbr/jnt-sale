import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderFilterForm = styled.div`
  .livestream-filter-facebook-form {
    &__group {
      // width: calc(100% + 12px);
      // margin: 0 -6px 16px -6px;

      display: flex;
      justify-content: space-between;
      // flex-wrap: wrap;
      align-items: center;

      // & > * {
      //   margin: 0 6px;
      // }
    }

    &__group-child {
      width: calc(70% + 12px);

      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    &__collapse {
      display: flex;
      justify-content: flex-start;
      max-height: 0;
      margin-bottom: 0;

      overflow: hidden;

      transition: all 0.25s;

      &[data-collapse='true'] {
        max-height: 50vh;
        margin-top: 16px;

        overflow: unset;
      }
    }

    &__input-wide {
      width: calc(36% - 57.85px);
      // margin: 0 6px;

      //@media screen and (max-width: 1599px) {
      //  width: calc((100% / 3) - 12px);
      //}
    }

    &__input-date-time {
      width: calc(26% - 67.67px);
      margin-right: 12px;
    }

    &__input-status {
      width: calc(26% - 67.67px);
      margin-right: 12px;
    }

    &__option-text {
      min-height: 36px;

      display: flex;
      align-items: center;

      color: ${THEME_COLORS.gray_900};
      font-size: 13px;
      font-weight: 400;

      cursor: pointer;

      transition: color 0.25s;

      &[data-active='true'] {
        color: ${THEME_COLORS.primary_300};
        font-weight: 600;
      }
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
      font-size: 13px;
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
      .livestream-filter-form__input-wide {
        margin-bottom: 16px;
      }
    }

    &__video-question {
      display: flex;
      width: 256px;
      height: 34px;
      align-items: center;
      justify-content: center;
      background: rgba(26, 148, 255, 0.1);
      padding: 8px 12px 8px 12.03px

      border: 1px solid #1a94ff;
      border-radius: 6px;

      font-weight: 400;
      font-size: 13px;
      color: #000028;
    }

    &__input-video {
      width: 392px;
    }

    &__btn-video{
      width: max-content;
    }
  }
`
