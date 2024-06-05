import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useInventoryFilterForm from "../../hook/useInventoryFilterForm";

export const OrderShippingStatus = () => {
  const {shippingStatus} = useInventoryFilterForm()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Trạng thái', value: ''}], // menu list in category dropdown
        categoryWidth: 85,
        placeholder: 'Chọn trạng thái phiếu kiểm',
        readOnly: true,
          value: shippingStatus.value?.name || '',
        onIconClick: shippingStatus.onInputReset,
      }}
      // menu
      menuProps={{
          empty: shippingStatus.list.length <= 0 ? 'Không tìm thấy kho' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm trạng thái phiếu kiểm',
        value: shippingStatus.keyword,
        onChange: shippingStatus.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: shippingStatus.tab,
        // checkedNumber: shippingStatus.value.length,
        onChange: shippingStatus.onTabChange,
      }}
    >
      {shippingStatus.list.length > 0 &&
        shippingStatus.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === shippingStatus.value?.value}
            onClick={() => shippingStatus.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
