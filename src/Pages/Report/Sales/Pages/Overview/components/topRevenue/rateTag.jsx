import { REPORT_SALE_ICONS } from '../../../../interfaces/_icons'
import { Text } from '../../../../../../../common/text'
import styled from 'styled-components'

export const RateTag = ({ data, ...props }) => {
  return (
    <StyleTag rate={data?.rate || 0}>
      {REPORT_SALE_ICONS.circleActive}
      <Text fontSize={12} color={data?.rate > 80 ? '#00AB56' : data?.rate > 50 ? '#FF9F41' : '#FF424E'}>
        Tỉ lệ thành công: {data?.rate}%</Text>
    </StyleTag>
  )
}

const StyleTag = styled.div`
  padding: 1px 4px 1px 2px;
  background: #FFFFFF;
  border-radius: 60px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  svg{
    margin-right: 4px;
    path{
      fill: ${props => (props.rate > 80  ? '#00AB56' : props.rate > 50 ? '#FF9F41' :'#FF424E') };
    }
  }
`