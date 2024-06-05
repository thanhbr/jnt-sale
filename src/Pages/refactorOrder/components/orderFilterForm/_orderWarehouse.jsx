import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {CategoryAutoComplete} from 'common/form/autoComplete/_categoryAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'

export const OrderWarehouse = () => {
  const {warehouse} = useOrderFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Kho', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 50,
        placeholder: 'Chọn kho',
        readOnly: true,
        value: warehouse.value?.name || '',
        onIconClick: () => warehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty: warehouse.list.length <= 0 ? 'Không tìm thấy kho' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm kho',
        value: warehouse.keyword,
        onChange: warehouse.onKeywordChange,
      }}
    >
      {warehouse.list.length > 0 &&
        warehouse.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === warehouse.value?.value}
            onClick={() => warehouse.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
