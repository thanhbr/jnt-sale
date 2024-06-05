import {Text} from 'common/text'
import styled from 'styled-components'
import { formatMoney } from '../../../../util/functionUtil'
import { fNumber } from '../../../../util/formatNumber'

export const CellOrder = ({money, amount, ...props}) => {
  return (
    <StyledCellCodeOrder {...props}>
        <div className="cell-order">
          <Text as={'p'} >{formatMoney(money)}</Text>
          <Text as={'p'} color={'#7C88A6'} fontSize={13}>{fNumber(amount)} đơn</Text>
        </div>
    </StyledCellCodeOrder>
  )
}

const StyledCellCodeOrder = styled.div`
  .cell-order{
    text-align: right;
  }
`
