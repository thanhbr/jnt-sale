import {Input} from 'common/form/input'
import { orderActions } from '../../provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import { ProductRevenueContext } from '../../provider/_context'
import useProductRevenueFilterForm from '../../hooks/useProductRevenueFilterForm'
import { useTranslation } from 'react-i18next'

export const ProductSearch = () => {
  const {pageState, pageDispatch} = useContext(ProductRevenueContext)
  const {search, loading, queries} = useProductRevenueFilterForm()
  const {t} = useTranslation()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('report__search_by_product')}
      disabled={loading}
      focus={pageState.focusInputOnSuccess}
      onFocus={() => {
        pageDispatch({
          type: orderActions.FOCUS_INPUT,
          payload: false,
        })
      }}
      value={search.value}
      onChange={(e) => search.onChange(e, queries)}
    />
  )
}
