import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import {StyledOrderTags} from './_styled'
import {OrderTag} from './_tag'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";
import {INVENTORY_FILTER_TAG_FIELDS} from "../../interfaces/_const";

export const OrderTags = ({...props}) => {
  const {
    dateTime,
    employee,
    shippingStatus,
    warehouse,
    functions,
  } = useInventoryFilterForm()

  const shouldShowResetAll = functions.hasFilter()
  const handleDeleteAll = () => functions.filterTagDeleteAll()
  return (
    <StyledOrderTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </OrderTag>
      )}
      {Array.isArray(employee.activeValue?.value) &&
        employee.activeValue.value.length > 0 && (
          <OrderTag
            onDelete={() =>
              functions.filterTagDelete(INVENTORY_FILTER_TAG_FIELDS[1])
            }
          >
            {employee.activeValue.type.name}:{' '}
            {employee.activeValue.value.map(item => item?.name).join(', ')}
          </OrderTag>
        )}
      {shippingStatus.activeValue?.name && (
          <OrderTag
            onDelete={() =>
              functions.filterTagDelete(INVENTORY_FILTER_TAG_FIELDS[2])
            }
          >
            Trạng thái:{' '}
            {shippingStatus.activeValue?.name}
          </OrderTag>
        )}
      {warehouse?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(INVENTORY_FILTER_TAG_FIELDS[3])}
        >
          Kho: {warehouse.activeValue.name}
        </OrderTag>
      )}

      {shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          Đặt lại mặc định
        </Text>
      )}
    </StyledOrderTags>
  )
}
