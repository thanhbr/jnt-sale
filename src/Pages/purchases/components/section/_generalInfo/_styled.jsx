import styled from 'styled-components'
import { THEME_COLORS } from '../../../../../common/theme/_colors'

export const StyledGeneralInfo = styled.div`
  .order-single-customer-info {
    &__validate{
      position: absolute;
      top: 0;
    }
    &__corner {
      position: absolute;
      top: 24px;
      right: 24px;
    }

    &__form-group {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__form-input {
      width: calc(50% - 16px);
      margin: 0 8px 24px 8px;

      &[data-size='sm'] {
        width: calc(25% - 16px);
      }

      &[data-size='lg'] {
        width: calc(75% - 16px);
      }

      &[data-size='xl'] {
        width: calc(100% - 16px);
      }
      label{
        margin-bottom: 8px;
        display: block;
        cursor: default;
      }
    }

    &__form-input-list {
      width: calc(100% + 16px);
      margin: 0 -8px;

      display: flex;
      flex-wrap: wrap;
      align-items: flex-end;
    }

    &__form-input-item {
      width: calc(100% / 3 - 16px);
      margin: 0 8px;
    }
  }
  .vendor-modal{
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
  }
`
