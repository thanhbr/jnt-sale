import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useBulkOrderFilter from 'Pages/bulkOrder/hooks/useBulkOrderFilter'
import {BulkOrderTag as Tag} from './components/bulkOrderTag'
import {StyledBulkOrderTags} from './_styled'

export const BulkOrderTags = ({...props}) => {
  const {dateTime, employee, shippingPartner, properties, methods} =
    useBulkOrderFilter()

  return (
    <StyledBulkOrderTags {...props}>
      {!!shippingPartner.data.activeValue?.value && (
        <Tag onDelete={() => methods.deleteFilterTag('shippingPartner')}>
          Đối tác vận chuyển: {shippingPartner.data.activeValue?.name || '---'}
        </Tag>
      )}
      {!!employee.data.activeValue?.value && (
        <Tag onDelete={() => methods.deleteFilterTag('employee')}>
          Nhân viên lên đơn: {employee.data.activeValue?.name || '---'}
        </Tag>
      )}
      {dateTime.data?.activeValue?.value && (
        <Tag onDelete={() => methods.deleteFilterTag('dateTime.current')}>
          Thời gian tải lên: {dateTime.data.activeValue.value}
        </Tag>
      )}
      {properties.shouldShowResetDefault && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={methods.deleteAllFilterTags}
        >
          Đặt lại mặc định
        </Text>
      )}
    </StyledBulkOrderTags>
  )
}
