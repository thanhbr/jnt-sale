import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useProductRevenueFilterForm from 'Pages/Report/Sales/Pages/ProductRevenue/hooks/useProductRevenueFilterForm'
import { StyledProductRevenueTags } from './_styled'
import { ProductRevenueTag } from './_tag'
import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductRevenueContext } from 'Pages/Report/Sales/Pages/ProductRevenue/provider/_context'
import { ProductRevenueInitialState } from '../../provider/initState'
import { useTranslation } from 'react-i18next'

export const ProductRevenueTags = ({ ...props }) => {
  const { pageState } = useContext(ProductRevenueContext)
  const {t} = useTranslation()
  const { table } = pageState
  const {
    dateTime,
    functions
  } = useProductRevenueFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(ProductRevenueInitialState.filter.dateTime.activeValue),
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledProductRevenueTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <ProductRevenueTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </ProductRevenueTag>
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
    </StyledProductRevenueTags>
  )
}
