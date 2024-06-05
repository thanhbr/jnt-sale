import {Input} from 'common/form/input'
import usePurchasesFilterForm from 'Pages/purchases/hooks/useFilter'
import { PurchasesContext } from 'Pages/purchases/provider/_context'
import { actionTypes } from 'Pages/purchases/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export const Search = () => {
  const {pageState, pageDispatch} = useContext(PurchasesContext)
  const {search, loading, queries} = usePurchasesFilterForm()
  const {t} = useTranslation()
  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('search_by_inventory_receipt_code')}
      disabled={!loading}
      focus={pageState.focusInputOnSuccess}
      onFocus={() => {
        pageDispatch({
          type: actionTypes.FOCUS_INPUT,
          payload: false,
        })
      }}
      value={search.value}
      onChange={(e) => search.onChange(e, queries)}
    />
  )
}
