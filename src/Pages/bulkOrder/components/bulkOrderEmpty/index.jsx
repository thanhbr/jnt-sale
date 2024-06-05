import {StyledBulkOrderEmpty} from './_styled'

export const BulkOrderEmpty = ({...props}) => {
  return (
    <StyledBulkOrderEmpty {...props}>
      <div className="bulk-order-empty__banner">
        <img src="/img/bulks-order/empty.png" alt="Empty" />
      </div>
      {props?.children}
    </StyledBulkOrderEmpty>
  )
}
