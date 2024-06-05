import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useOrderOriginFilterForm from 'Pages/Report/Sales/Pages/OrderOrigin/hooks/useOrderOriginFilterForm'
import { ORDER_FILTER_TAG_FIELDS } from '../../interfaces/_constants'
import { StyledOrderOriginTags } from './_styled'
import { OrderOriginTag } from './_tag'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { OrderOriginContext } from 'Pages/Report/Sales/Pages/OrderOrigin/provider/_context'
import { OrderTag } from '../../../../../../refactorOrder/components/orderTags/_tag'
import {OrderOriginInitialState} from  '../../provider/initState'
import { useTranslation } from 'react-i18next'

export const OrderOriginTags = ({ ...props }) => {
  const {t} = useTranslation()
  const { pageState } = useContext(OrderOriginContext)
  const { table } = pageState
  const {
    dateTime,
    source,
    functions
  } = useOrderOriginFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(OrderOriginInitialState.filter.dateTime.activeValue),
    !!source?.activeValue?.name,
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledOrderOriginTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <OrderOriginTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </OrderOriginTag>
      )}
      {source?.activeValue?.name && (
        <OrderTag
          onDelete={() => functions.filterTagDelete(ORDER_FILTER_TAG_FIELDS[1])}
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
    </StyledOrderOriginTags>
  )
}
