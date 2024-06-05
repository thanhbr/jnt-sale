import {Input} from 'common/form/input'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useShippingDifferenceFilterForm from '../../hooks/useShippingDifferenceFilterForm'

export const OrderSearch = () => {
  const {search} = useShippingDifferenceFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo Tên/SĐT nhân viên"
      value={search?.value}
      onChange={search?.onChange}
    />
  )
}
