import styled from 'styled-components'
import { Text } from '../../../../../../common/text'

export const CellColor = ({ id,...props }) => {
  return (
    <StyledCellStatusOrder
      colorProps={props?.data?.color}
    >
      <div className={'color-label'}>

      </div>
      <div>
        <Text as={'p'} color={'#7C88A6'} fontSize={'12px'}>Mã màu</Text>
        <Text as={'p'} color={'#00081D'} style={{textTransform: 'uppercase'}} >{props?.data?.color.replace('#', '')}</Text>
      </div>
    </StyledCellStatusOrder>
  )
}

const StyledCellStatusOrder = styled.div`
    display: flex;
    align-items: center;
    .color-label{
      width: 16px;
      height: 16px;
      background: ${props => props.colorProps};
      border-radius: 50%;
      margin-right: 12px;
    }
  `