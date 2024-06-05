import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useShippingDifferenceEmployeeFilterForm from '../../hooks/useShippingDifferenceEmployeeFilterForm'
import { useTranslation } from 'react-i18next'

export const OrderSearch = () => {
  const {search} = useShippingDifferenceEmployeeFilterForm()
  const {t} = useTranslation()
  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder={t('search_employee_placeholder')}
      value={search?.value}
      onChange={search?.onChange}
    />
  )
}
