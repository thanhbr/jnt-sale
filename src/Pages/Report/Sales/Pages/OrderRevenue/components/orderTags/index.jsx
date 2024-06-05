import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import {ORDER_FILTER_TAG_FIELDS} from 'Pages/Report/Sales/Pages/OrderRevenue/interfaces/_constants'
import {StyledOrderTags} from './_styled'
import {OrderTag} from './_tag'
import { useTranslation } from 'react-i18next'

export const OrderTags = ({...props}) => {
  const {t} = useTranslation()
  const {
    dateTime,
    shippingStatus,
    functions,
  } = useOrderFilterForm()
  const shouldShowResetAll = functions.hasFilter()

  const handleDeleteAll = () => functions.filterTagDeleteAll()

  return (
    <StyledOrderTags {...props}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <OrderTag
          icon={false}
          style={{padding: '4px 12px'}}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </OrderTag>
      )}
      {Array.isArray(shippingStatus.activeValue) &&
        shippingStatus.activeValue.length > 0 && (
          <OrderTag
            onDelete={() =>
              functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
            }
          >
            {t('order_status')}:{' '}
            {shippingStatus.activeValue.map(item => item?.name).join(', ')}
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
          {t('general_reset_to_default')}
        </Text>
      )}
    </StyledOrderTags>
  )
}
