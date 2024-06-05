import { Text } from 'common/text'
import { THEME_SEMANTICS } from 'common/theme/_semantics'
import useCashBooksFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import { CASHBOOKS_FILTER_TAG_FIELDS } from 'Pages/CashBooks/interfaces/_constants'
import { CashBooksContext } from 'Pages/CashBooks/provider/_context'
import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CashBooksInitialState } from '../../provider/initState'
import { StyledCashBooksTags } from './_styled'
import { CashBooksTag } from './_tag'
import { useTranslation } from 'react-i18next'

export const CashBooksTags = ({...props}) => {
  const { t } = useTranslation()
  const {pageState} = useContext(CashBooksContext)
  const {table} = pageState
  const {
    dateTime,
    receiptType,
    paymentMethod,
    functions,
  } = useCashBooksFilterForm()
  const shouldShowResetAll = [
    JSON.stringify(dateTime?.activeValue) !==
    JSON.stringify(CashBooksInitialState.filter.dateTime.activeValue),
    !!receiptType.activeValue?.value || receiptType.activeValue?.type?.value !== '0',
    Array.isArray(paymentMethod.activeValue) && paymentMethod.activeValue.length > 0,
  ].includes(true)

  const [searchParams] = useSearchParams()
  const querySearch = searchParams.get('search') || ''

  const handleDeleteAll = () => {
    if (!table.loading) return
    functions.filterTagDeleteAll()
  }
  return (
    <StyledCashBooksTags {...props} style={{ display: querySearch ? 'block' : 'block' }}>
      {dateTime?.activeValue?.value && dateTime?.activeValue?.type?.name && (
        <CashBooksTag
          onDelete={() => functions.filterTagDelete('dateTime.current')}
        >
          {dateTime.activeValue.type.name}: {dateTime.activeValue.value}
        </CashBooksTag>
      )}
      {(!!receiptType.activeValue?.value || receiptType.activeValue?.type?.value !== '0') && (
          <CashBooksTag
            onDelete={() =>
              functions.filterTagDelete(CASHBOOKS_FILTER_TAG_FIELDS[1])
            }
          >
            {receiptType.activeValue?.type?.name}:{' '}
            {receiptType.activeValue?.value?.name || 'All'}
          </CashBooksTag>
        )}
      {Array.isArray(paymentMethod.activeValue) &&
        paymentMethod.activeValue.length > 0 && (
          <CashBooksTag
            onDelete={() =>
              functions.filterTagDelete(CASHBOOKS_FILTER_TAG_FIELDS[2])
            }
          >
            {t('cashbook_payment_method')}:{' '}
            {paymentMethod.activeValue.map(item => item?.name).join(', ')}
          </CashBooksTag>
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
          {t('reset_default')}
        </Text>
      )}
    </StyledCashBooksTags>
  )
}
