import {ORDER_TABLE_CELL_SHIPPING_STATUSES} from '../../interface/_const'
import styled from 'styled-components'

export const CellStatusOrder = ({id, ...props}) => {
  return (
    <StyledCellStatusOrder
      {...props}
      style={{
        background:id !== null ? ORDER_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].background:'',
        color:id !== null ? ORDER_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].color:'',
      }}
    >
      {props?.children}
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
