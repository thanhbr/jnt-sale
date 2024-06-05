import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";

export const OrderSearch = () => {
  const {search} = useInventoryFilterForm()

  return (
    <Input
      className="order-filter-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo mã phiếu kiểm/nội dung ghi chú"
      value={search.value}
      onChange={search.onChange}
    />
  )
}
