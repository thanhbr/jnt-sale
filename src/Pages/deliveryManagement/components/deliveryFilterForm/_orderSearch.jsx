import {Input} from 'common/form/input'
import useDeliveryFilterForm from 'Pages/deliveryManagement/hooks/useDeliveryFilterForm'
import { DeliveryContext } from 'Pages/deliveryManagement/provider/_context'
import { orderActions } from 'Pages/deliveryManagement/provider/_reducer'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export const OrderSearch = () => {
  const { t, i18n } = useTranslation()
  const {pageState, pageDispatch} = useContext(DeliveryContext)
  const {search, loading, queries} = useDeliveryFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('search_order_manager')}
      disabled={!loading}
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
