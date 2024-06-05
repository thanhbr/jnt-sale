import styled from 'styled-components'

export const StyledBulkOrderCreateTableAction = styled.div`
  min-height: 50px;
  margin-top: 16px;
  padding-top: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid #e2eaf8;
  .bulk-order-create-table-action{
    &__figure{
      display: flex;
      align-items: center;
      &-checkbox{
        display: flex;
        align-items: center;
        margin-right: 12px;
        padding-right: 12px;
        border-right: 1px solid #DCD9D9;
        .figure-checkbox{
          margin-right: 4px;
        }
      }
    }
  }
`
