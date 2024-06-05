import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useShippingDifferenceFilterForm from 'Pages/Report/Sales/Pages/shippingDifference/hooks/useShippingDifferenceFilterForm'
import { SHIPPING_FILTER_TAG_FIELDS } from '../../interfaces/_constants'
import { StyledShippingDifferenceTags } from './_styled'
import { ShippingDifferenceTag } from './_tag'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ShippingDifferenceContext } from 'Pages/Report/Sales/Pages/shippingDifference/provider/_context'
import { OrderTag } from '../../../../../../refactorOrder/components/orderTags/_tag'
import {ShippingDifferenceInitialState} from  '../../provider/initState'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../../../../../common/button'

export const ShippingDifferenceTags = ({ ...props }) => {
  const { pageState } = useContext(ShippingDifferenceContext)
  const {t} = useTranslation()
  const { table } = pageState
  const {
    dateTime,
    source,
    functions
  } = useShippingDifferenceFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(ShippingDifferenceInitialState.filter.dateTime.activeValue),
    !!source?.activeValue?.name,
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledShippingDifferenceTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ShippingDifferenceTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </ShippingDifferenceTag>
      )}
      {source?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(SHIPPING_FILTER_TAG_FIELDS[1])}
        >
          {t('source_order')}: {source.activeValue.name}
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
    </StyledShippingDifferenceTags>
  )
}
