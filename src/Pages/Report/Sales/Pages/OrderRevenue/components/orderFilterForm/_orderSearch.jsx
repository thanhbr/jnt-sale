import {Input} from 'common/form/input'
import useOrderFilterForm from 'Pages/Report/Sales/Pages/OrderRevenue/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/Report/Sales/Pages/OrderRevenue/interfaces/_icons'
import { useTranslation } from 'react-i18next'

export const OrderSearch = () => {
  const {search,queries} = useOrderFilterForm()
  const {t} = useTranslation()
  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('report__search_order_placeholder')}
      value={search.value}
      onChange={e => search.onChange(e,queries)}
    />
  )
}
