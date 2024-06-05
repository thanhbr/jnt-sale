import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";

export const OrderEmployee = () => {
  const {employee} = useInventoryFilterForm()

  return (
    <AlternativeAutoComplete
      id="employee"
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Nhân viên tạo phiếu', value: ''}], // menu list in category dropdown
        categoryValue: employee.categoryValue, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn nhân viên tạo phiếu',
        readOnly: true,
        value:
          employee.value.length > 0 ? `Đã chọn ${employee.value.length}` : '',
        onIconClick: employee.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          employee.list.length <= 0
            ? employee.tab === 'all'
              ? 'Không tìm thấy nhân viên'
              : 'Bạn chưa chọn nhân viên nào'
            : '',
        multipleChoices: true,
        onReset: employee.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nhân viên',
        value: employee.keyword,
        onChange: employee.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: employee.tab,
        checkedNumber: employee.value.length,
        onChange: employee.onTabChange,
      }}
    >
      {employee.list.length > 0 &&
        employee.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={!!employee.value.find(find => find.value === item.value)}
            multipleChoices={true}
            onClick={() =>
              employee.onChange({
                id: item.value,
                category: employee.categoryValue,
                value: item.name,
              })
            }
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
