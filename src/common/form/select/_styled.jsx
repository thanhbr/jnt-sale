import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledSelect = styled.div`
  position: relative;

  .select {
    &__toggle {
      position: relative;

      cursor: pointer;
    }

    &__input {
      & > input {
        cursor: pointer;
      }
    }

    &__menu {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 1;

      width: 100%;
      max-height: 320px;
      padding: 8px 20px;

      overflow: auto;

      background: #ffffff;
      border-radius: 4px;
      box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    }

    &__option {
      &[data-hover='true'] {
        color: ${THEME_COLORS.primary_300}!important;
      }
    }

    &__option-container {
      display: flex;
      align-items: center;
    }
  }
`
