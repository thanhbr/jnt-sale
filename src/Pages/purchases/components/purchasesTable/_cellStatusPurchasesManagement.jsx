
import { PURCHASES_TABLE_CELL_SHIPPING_STATUSES } from 'Pages/purchases/interfaces/_constants'
import styled from 'styled-components'

export const CellStatusPurchases = ({id, ...props}) => {
  return (
    <StyledCellStatusPurchases
      {...props}
      style={{
        background: id !== null ? PURCHASES_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].background:'',
        color: id !== null ? PURCHASES_TABLE_CELL_SHIPPING_STATUSES[`_${id}`].color:'',
      }}
    >
      {props?.children}
    </StyledCellStatusPurchases>
  )
}

const StyledCellStatusPurchases = styled.div`
  padding: 3px 12px;

  display: inline-block;

  background: #eff3fb;
  border-radius: 4px;

  color: #7c88a6;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`
