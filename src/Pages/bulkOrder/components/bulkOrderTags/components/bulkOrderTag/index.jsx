import {Text} from 'common/text'
import {BULK_ORDER_ICONS} from 'Pages/bulkOrder/interface/_icons'
import {StyledBulkOrderTag} from './_styled'

export const BulkOrderTag = ({onDelete, ...props}) => {
  return (
    <StyledBulkOrderTag {...props}>
      {props?.children && <Text>{props.children}</Text>}
      <div className="bulk-order-tag__delete" onClick={onDelete}>
        {BULK_ORDER_ICONS.x}
      </div>
    </StyledBulkOrderTag>
  )
}
