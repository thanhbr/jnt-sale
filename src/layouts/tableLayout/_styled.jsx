import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledTableLayout = styled.div`
  background: #fff;
  border-radius: 8px 8px 0 0;

  &[data-exist-pagination='true'] {
    margin-bottom: 54px;
  }

  &[data-exist-table='false'] {
    border-radius: 4px;
  }

  .table-layout {
    &__header {
      position: relative;

      padding: 16px;
    }

    &__table {
      position: relative;

      background: #f3f6fc;
    }

    &__custom-scrollbar {
      position: sticky;
      bottom: -44px;

      height: 6px;

      overflow-x: auto;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }

      &::-webkit-scrollbar-track {
        background: #fff;
      }

      &::-webkit-scrollbar-thumb {
        background: ${THEME_COLORS.primary_400};
        border-radius: 0;
      }
    }

    &__table-container {
      &[data-scrollable='true'] {
        overflow-x: auto;
      }

      &[data-scrollable='false'] {
        cursor: default;
      }
    }
  }
`
