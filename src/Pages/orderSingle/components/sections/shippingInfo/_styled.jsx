import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledOrderSingleShippingInfo = styled.div`
  .order-single-shipping-info {
    &__corner {
      position: absolute;
      top: 24px;
      right: 24px;
      display: flex;
      align-items: center;
    }
    &__reload {
      :hover{
        cursor: pointer;
      }
    }
    &__action-btn-tab {
      min-width: 172px;

      pointer-events: none;

      &[data-active='false'] {
        background: #eff2f8;
        border-color: #eff2f8;

        color: ${THEME_COLORS.secondary_100};

        pointer-events: all;
      }

      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`
