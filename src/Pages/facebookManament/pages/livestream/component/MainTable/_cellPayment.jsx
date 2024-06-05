import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {Tooltip} from 'common/tooltip'
import {ORDER_TABLE_CELL_PAYMENT_TYPES} from '../../interface/_const'
import styled from 'styled-components'

export const CellPayment = ({type, ...props}) => {
  const selectedType = ['danger', 'success', 'warning'].includes(type)
    ? type
    : 'danger'

  return (
    <Tooltip title={ORDER_TABLE_CELL_PAYMENT_TYPES[selectedType]}>
      <StyledCellPayment {...props} data-type={selectedType} />
    </Tooltip>
  )
}

const StyledCellPayment = styled.div`
  width: 16px;
  height: 16px;

  overflow: hidden;

  border-radius: 50%;

  cursor: pointer;

  &[data-type='danger'] {
    background: ${THEME_SEMANTICS.failed};
  }

  &[data-type='success'] {
    background: ${THEME_SEMANTICS.delivered};
  }

  &[data-type='warning'] {
    position: relative;

    border: 1px solid ${THEME_SEMANTICS.preparing};

    &::before {
      position: absolute;
      top: 0;
      left: 0;

      width: 50%;
      height: 100%;

      background: ${THEME_SEMANTICS.preparing};

      content: '';
    }
  }
`
