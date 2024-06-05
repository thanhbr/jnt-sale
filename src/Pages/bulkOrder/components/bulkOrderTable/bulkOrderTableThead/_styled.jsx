import {Tr} from 'layouts/tableLayout/_tr'
import styled from 'styled-components'

export const StyledBulkOrderTableThead = styled(Tr)`
  .bulk-order-table-thead {
    &__th {
      &:nth-child(1) {
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

        text-align: center;
      }
      &:nth-child(5) {
        width: 64px;
        padding-right: 16px;

        text-align: right;
      }
    }
  }
`
