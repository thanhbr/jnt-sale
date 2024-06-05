import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useShippingTrackingFilterForm from '../../hooks/useShippingTrackingFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from '../../interfaces/_constants'
import {StyledShippingTrackingTag} from './_styled'
import {ShippingTrackingTag} from './_tag'
import { ShippingTrackingInitialState } from '../../provider/initState'
import { OrderTag } from '../../../refactorOrder/components/orderTags/_tag'
import { StyledOrderTags } from '../../../refactorOrder/components/orderTags/_styled'

export const ShippingTrackingTags = ({...props}) => {
  const {
    dateTime,
    orderStatus,
    employee,
    downtime,
    functions,
  } = useShippingTrackingFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(ShippingTrackingInitialState.filter.dateTime.activeValue),
    Array.isArray(employee?.activeValue?.value) &&
    employee.activeValue.value.length > 0 &&
    !!employee?.activeValue?.type?.name,
    Array.isArray(orderStatus.activeValue) &&
    orderStatus.activeValue.length > 0,
    !!orderStatus?.activeValue?.name,
    downtime?.value !== '',
  ].includes(true)
  const handleDeleteAll = () => functions.filterTagDeleteAll()
  
  return (
    <StyledShippingTrackingTag {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ShippingTrackingTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </ShippingTrackingTag>
      )}
      {orderStatus.activeValue?.name && (
          <ShippingTrackingTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
            }
          >
            Trạng thái vận đơn:{' '}
            {orderStatus.activeValue?.name}
          </ShippingTrackingTag>
        )}

      {employee.activeValue?.name && (
        <OrderTag
          onDelete={() =>
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[2])
          }
        >
          Nhân viên lên đơn:{' '}
          {employee.activeValue.name}
        </OrderTag>
      )}
      {!!downtime.activeValue && (
        <ShippingTrackingTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[3])}
        >
          Thời gian ngừng nhận tương tác mới:{' '} {downtime.activeValue}
        </ShippingTrackingTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={THEME_SEMANTICS.delivering}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          Đặt lại mặc định
        </Text>
      )}
    </StyledShippingTrackingTag>
  )
}
