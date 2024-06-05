import {THEME_COLORS} from 'common/theme/_colors'
import styled from 'styled-components'

export const StyledTableLayout = styled.div`
  background: #fff;
  border-radius: 8px 8px 0 0;

  &[data-exist-pagination='true'] {
    margin-bottom: 54px;
  }

  &[data-exist-table='false'] {
    border-radius: 8px;
  }

  .table-layout {
    &__header {
      position: relative;
      padding: 0;
    }

    &__table {
      position: relative;
      background: #f3f6fc;

      height: calc(100% - 50px);

      border: 1px solid #E2EAF8;
      border-radius: 8px;
      
      overflow: hidden;

      &[data-has-scroll='true'] {
        // max-height: 485px;
      }
    }

    &__table-t-head,
    &__table-t-footer {
      width: 1512px;

      .tr__container {
        height: 43px !important;
      }
    }

    &__table-t-body {
      height: calc(100% - 88px);
      width: 1512px;
      overflow: scroll;
    }

    &__table-container {
      height: 100%;

      overflow-y: hidden;

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
  }

  .tr__container {
    height: 64px !important;
  }
`
