import {Text} from 'common/text'
import {Tooltip} from 'common/tooltip'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import styled from 'styled-components'

export const CellCodeOrder = ({id, inventory, time, ...props}) => {
  return (
    <StyledCellCodeOrder {...props}>
      {id && (
        <div className="cell-code-order__upper">
          <Text as="b" className="cell-code-order__id">
            {id}
          </Text>
          <Tooltip
            placement="bottom-start"
            title={
              inventory
                ? 'Đơn hàng có khấu trừ tồn kho'
                : 'Đơn hàng không khấu trừ tồn kho'
            }
          >
            {inventory ? ORDER_ICONS.inventory : ORDER_ICONS.inventoryDanger}
          </Tooltip>
        </div>
      )}
      {time && (
        <div className="cell-code-order__under">
          {ORDER_ICONS.clock}
          <Text
            className="cell-code-order__time"
            color="#7C88A6"
            fontSize={13}
            lineHeight={18}
          >
            {time}
          </Text>
        </div>
      )}
    </StyledCellCodeOrder>
  )
}

const StyledCellCodeOrder = styled.div`
  .cell-code-order {
    &__upper,
    &__under {
      display: flex;
      align-items: center;

      svg {
        width: 16px;
        height: 16px;

        cursor: pointer;
      }
    }

    &__id {
      margin-right: 4px;
    }

    &__time {
      margin-left: 4px;
    }
  }
`
