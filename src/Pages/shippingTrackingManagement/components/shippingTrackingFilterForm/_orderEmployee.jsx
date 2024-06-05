import {Option} from 'common/form/autoComplete/_option'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import useShippingTrackingFilterForm from '../../hooks/useShippingTrackingFilterForm'

export const ShippingTrackingEmployee = () => {
  const {employee} = useShippingTrackingFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nhân viên lên đơn', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn nhân viên lên đơn',
        readOnly: true,
        value: employee.value?.name || '',
        onIconClick: () => employee.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          employee.list.length <= 0
            ? 'Không tìm thấy nhân viên'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nhân viên',
        value: employee.keyword,
        onChange: employee.onKeywordChange,
      }}
    >
      {employee.list.length > 0 &&
      employee.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === employee.value?.value}
          onClick={() => employee.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
