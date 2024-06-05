import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import usePurchasesFilterForm from 'Pages/purchases/hooks/useFilter'
import { PURCHASES_FILTER_TAG_FIELDS } from 'Pages/purchases/interfaces/_constants'
import { PurchasesContext } from 'Pages/purchases/provider/_context'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { StyledPurchasesTags } from './_styled'
import { PurchasesTag } from './_tag'
import { useTranslation } from 'react-i18next'

export const PurchasesTags = ({...props}) => {
  const {t} = useTranslation()
  const {pageState} = useContext(PurchasesContext)
  const {table} = pageState
  const {
    dateTime,
    supplier,
    warehouse,
    functions,
  } = usePurchasesFilterForm()

  const shouldShowResetAll = [
    !!dateTime?.activeValue.value,
    !!supplier?.activeValue?.name,
    !!warehouse?.activeValue?.name,
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledPurchasesTags
      {...props}
      style={{display: querySearch ? 'block' : 'block'}}
    >
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <PurchasesTag
          onDelete={() =>
            functions.filterTagDelete(PURCHASES_FILTER_TAG_FIELDS[0])
          }
        >
          {t(dateTime.activeValue.type.name)}: {dateTime.activeValue.value}
        </PurchasesTag>
      )}
      {supplier?.activeValue?.name && (
        <PurchasesTag
          onDelete={() =>
            functions.filterTagDelete(PURCHASES_FILTER_TAG_FIELDS[1])
          }
        >
          {t('supplier')}: {supplier.activeValue.name}
        </PurchasesTag>
      )}
      {warehouse?.activeValue?.name && (
        <PurchasesTag
          onDelete={() =>
            functions.filterTagDelete(PURCHASES_FILTER_TAG_FIELDS[2])
          }
        >
          {t('init_warehouse')}: {warehouse.activeValue.name}
        </PurchasesTag>
      )}
      {shouldShowResetAll && (
        <Text
          color={table.loading ? THEME_SEMANTICS.delivering : 'gray'}
          fontSize={14}
          fontWeight={600}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={handleDeleteAll}
        >
          {t('general_reset_to_default')}
        </Text>
      )}
    </StyledPurchasesTags>
  )
}
