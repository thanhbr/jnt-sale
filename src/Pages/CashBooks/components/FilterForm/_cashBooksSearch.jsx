import {Input} from 'common/form/input'
import useCashBooksFilterForm from 'Pages/CashBooks/hooks/useCashBooksFilterForm'
import { CashBooksContext } from 'Pages/CashBooks/provider/_context'
import { actions } from 'Pages/CashBooks/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export const CashBooksSearch = () => {
  const {t} = useTranslation()
  const {pageState, pageDispatch} = useContext(CashBooksContext)
  const {search, loading, queries} = useCashBooksFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('cashbook_search_by_receipt_code')}
      disabled={!loading}
      focus={pageState.focusInputOnSuccess}
      onFocus={() => {
        pageDispatch({
          type: actions.FOCUS_INPUT,
          payload: false,
        })
      }}
      value={search.value}
      onChange={(e) => search.onChange(e, queries)}
    />
  )
}
