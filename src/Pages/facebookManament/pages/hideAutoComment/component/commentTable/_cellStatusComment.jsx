import styled from 'styled-components'

export const CellStatusComment = ({id, ...props}) => {
  return (
    <StyledCellStatusOrder
      {...props}
      style={{
        background: COMMENT_TABLE_CELL_STATUSES[`_${id}`].background,
        color: COMMENT_TABLE_CELL_STATUSES[`_${id}`].color,
      }}
    >
      {props?.children}
    </StyledCellStatusOrder>
  )
}
const COMMENT_TABLE_CELL_STATUSES = {
  _1: {background: '#EBFFF5', color: '#00AB56'},
  _0: {background: '#FFEBEC', color: '#FF424E'},
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
