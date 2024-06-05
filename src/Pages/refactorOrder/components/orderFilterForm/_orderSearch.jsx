import {Input} from 'common/form/input'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'

export const OrderSearch = () => {
  const {search} = useOrderFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo mã đơn hàng. Ví dụ: 100002,100003....."
      value={search.value}
      onChange={search.onChange}
    />
  )
}
