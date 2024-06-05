import {Input} from 'common/form/input'
import useShippingTrackingFilterForm from '../../hooks/useShippingTrackingFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'

export const OrderSearch = () => {
  const {search} = useShippingTrackingFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo Mã đơn/vận đơn. Ví dụ: 802052892121,..."
      value={search.value}
      onChange={search.onChange}
    />
  )
}
