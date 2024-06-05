import {Input} from 'common/form/input'
import {ORDER_ICONS} from 'Pages/refactorOrder/interfaces/_icons'
import useFacebookFilterForm from "../../hooks/useFacebookFilterForm";

export const OrderSearch = () => {
  const {search} = useFacebookFilterForm()

  return (
    <Input
      className="livestream-filter-facebook-form__input-wide"
      icon={ORDER_ICONS.searchMd}
      placeholder="Tìm kiếm theo tên/ ID livestream"
      value={search.value}
      onChange={search.onChange}
    />
  )
}
