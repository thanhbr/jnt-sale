import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledBulkOrderCreateFormOptionGroup = styled.div`
  .bulk-order-create-form-option-group {
    &__option-list {
      width: calc(100% + 16px);
      margin: 16px -8px 0 -8px;

      display: flex;
      flex-wrap: wrap;
    }

    &__select {
      width: calc(100% - 16px);
      margin: 0 8px 16px 8px;
    }

    &__select-item {
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

    &__option-item {
      width: calc(50% - 16px);
      margin: 0 8px 16px 8px;

      display: flex;

      &[data-fluid='true'] {
        width: calc(100% - 16px);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    &__input {
      margin-right: 8px;
    }

    &__label {
      flex: 1;

      cursor: pointer;
    }
  }
`
