import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm"
import { StyledOrderTags } from './_styled'
import { OrderTag } from './_tag'

export const FilterTags = ({...props}) => {
  const {
    dateTime,
    status,
    functions,
  } = useFacebookFilterForm()
  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()
  return (
    <StyledOrderTags {...props}>
      {dateTime?.activeValue?.value && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </OrderTag>
      )}
      
      {status?.activeValue && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('status.current')}
        >
          Trạng thái: {status.activeValue.name}
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
