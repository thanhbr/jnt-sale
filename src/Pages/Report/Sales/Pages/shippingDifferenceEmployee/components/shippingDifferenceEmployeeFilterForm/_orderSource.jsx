import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useShippingDifferenceEmployeeFilterForm from '../../hooks/useShippingDifferenceEmployeeFilterForm'

export const OrderSource = () => {
  const {source} = useShippingDifferenceEmployeeFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Nguồn đơn hàng', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 125,
        placeholder: 'Chọn nguồn đơn hàng',
        readOnly: true,
        value: source.value?.name || '',
        onIconClick: () => source.onChange(null),
      }}
      // menu
      menuProps={{
        empty: source.list.length <= 0 ? 'Không tìm thấy nguồn đơn hàng' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm nguồn đơn hàng',
        value: source.keyword,
        onChange: source.onKeywordChange,
      }}
    >
      {source.list.length > 0 &&
        source.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === source.value?.value}
            onClick={() => source.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
