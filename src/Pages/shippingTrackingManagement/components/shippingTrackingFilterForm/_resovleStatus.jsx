import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from '../../hooks/useShippingTrackingFilterForm'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'

export const ResoleStatus = () => {
  const {orderStatus} = useFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Trạng thái xử lý', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn trạng thái xử lý',
        readOnly: true,
        value: orderStatus.value?.name || '',
        onIconClick: () => orderStatus.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          orderStatus.list.length <= 0
            ? 'Không tìm thấy trạng thái'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm trạng thái xử lý',
        value: orderStatus.keyword,
        onChange: orderStatus.onKeywordChange,
      }}
    >
      {orderStatus.list.length > 0 &&
      orderStatus.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === orderStatus.value?.value}
          onClick={() => orderStatus.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
