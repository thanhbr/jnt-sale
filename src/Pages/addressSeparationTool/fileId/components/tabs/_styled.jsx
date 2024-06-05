import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledSingleAddressTabs = styled.div`
  position: relative;

  height: 66px;
  margin: 13px 0 0 0;

  background: #fff;
  border-radius: 8px 8px 0 0;

  .single-address-tabs {
    &__list {
      height: 100%;

      display: flex;
      align-items: center;
    }

    &__item {
      height: 100%;
      padding: 0 16px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-bottom: 2.5px solid transparent;

      color: ${THEME_COLORS.secondary_100};
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;

      transition: border 0.25s;

      cursor: pointer;

      &[data-active='true'] {
        border-color: ${THEME_COLORS.primary_300};

        font-weight: 600;

        cursor: default;
      }
    }

    &__hint {
      position: absolute;
      top: 50%;
      right: 16px;

      display: flex;
      align-items: center;

      transform: translateY(-50%);
    }
  }
`
