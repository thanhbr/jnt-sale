import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useLocationFilterForm from 'Pages/Report/Sales/Pages/Location/hooks/useLocationFilterForm'
import { ORDER_FILTER_TAG_FIELDS } from '../../interfaces/_constants'
import { StyledLocationTags } from './_styled'
import { LocationTag } from './_tag'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LocationContext } from 'Pages/Report/Sales/Pages/Location/provider/_context'
import { OrderTag } from '../../../../../../refactorOrder/components/orderTags/_tag'
import { LocationInitialState } from '../../provider/initState'
import { useTranslation } from 'react-i18next'

export const LocationTags = ({ ...props }) => {
  const {t} = useTranslation()
  const { pageState } = useContext(LocationContext)
  const { table } = pageState
  const {
    dateTime,
    location,
    functions
  } = useLocationFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(LocationInitialState.filter.dateTime.activeValue),
    !!location?.activeValue?.value?.length > 0
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledLocationTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <LocationTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </LocationTag>
      )}
      {Array.isArray(location.activeValue?.value) &&
      location.activeValue.value.length > 0 && (
        <OrderTag
          onDelete={() =>
            functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])
          }
        >
          {t('area')}:{' '}
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
    </StyledLocationTags>
  )
}
