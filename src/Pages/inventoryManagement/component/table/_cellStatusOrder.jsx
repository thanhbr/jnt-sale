import styled from 'styled-components'
 import {INVENTORY_TABLE_CELL_SHIPPING_STATUSES} from "../../interfaces/_const"

export const CellStatusOrder = ({id, ...props}) => {
  return (
    <StyledCellStatusOrder
      {...props}
      style={{
        background: INVENTORY_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].background,
        color: INVENTORY_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].color,
      }}
    >
      {INVENTORY_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].title}
    </StyledCellStatusOrder>
  )
}

const StyledCellStatusOrder = styled.div`
  padding: 3px 12px;

  display: inline-block;

  background: #eff3fb;
  border-radius: 4px;

  color: #7c88a6;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`
