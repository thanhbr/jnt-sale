import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useCustomerFilterForm from 'Pages/Report/Sales/Pages/Customer/hooks/useCustomerFilterForm'
import { ORDER_FILTER_TAG_FIELDS } from '../../interfaces/_constants'
import { StyledCustomerTags } from './_styled'
import { CustomerTag } from './_tag'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CustomerContext } from 'Pages/Report/Sales/Pages/Customer/provider/_context'
import { OrderTag } from '../../../../../../refactorOrder/components/orderTags/_tag'
import { CustomerInitialState } from '../../provider/initState'
import { useTranslation } from 'react-i18next'

export const CustomerTags = ({ ...props }) => {
  const {t} = useTranslation()
  const { pageState } = useContext(CustomerContext)
  const { table } = pageState
  const {
    dateTime,
    location,
    functions
  } = useCustomerFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(CustomerInitialState.filter.dateTime.activeValue),
    !!location?.activeValue?.value?.length > 0
  ].includes(true)
  
  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledCustomerTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <CustomerTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </CustomerTag>
      )}
      {Array.isArray(location.activeValue?.value) &&
      location.activeValue.value.length > 0 && (
        <OrderTag
          onDelete={() =>
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
          }
        >
          {t('province_city')}:{' '}
          {location.activeValue.value.map(item => item?.name).join(', ')}
        </OrderTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{ marginBottom: 12, cursor: 'pointer' }}
          onClick={handleDeleteAll}
        >
          {t('general_reset_to_default')}
        </Text>
      )}
    </StyledCustomerTags>
  )
}
