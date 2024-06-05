import {THEME_COLORS} from 'common/theme/_colors'
import {Tr} from 'layouts/tableLayout/_tr'
import styled from 'styled-components'

export const StyledBulkOrderTableTbodyTr = styled(Tr)`
  &:hover {
    .bulk-order-table-tbody-tr {
      &__action-icon {
        &[data-state='default'] {
          display: none;
        }
        &[data-state='hover'] {
          display: block;
        }
      }
    }
  }

  .bulk-order-table-tbody-tr {
    &__td {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        max-width: calc(51% - 64px);
        padding-left: 16px;

        flex: 1;
      }
      &:nth-child(2) {
        width: 21%;
      }
      &:nth-child(3) {
        width: 21%;
      }
      &:nth-child(4) {
        width: 11%;

        justify-content: end;

        text-align: end;
      }
      &:nth-child(5) {
        width: 64px;
        padding-right: 16px;

        justify-content: flex-end;

        text-align: right;
      }
    }

    &__action-icon {
      width: 24px;
      height: 24px;

      cursor: pointer;

      &[data-state='hover'] {
        display: none;
      }

      &:hover {
        svg {
          color: ${THEME_COLORS.primary_300};

          path {
            &[stroke] {
              stroke: ${THEME_COLORS.primary_300};
            }
            &[fill] {
              fill: ${THEME_COLORS.primary_300};
            }
          }
        }
      }
    }
  }
`
