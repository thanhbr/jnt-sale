import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'

export const OrderShippingPartner = () => {
  const {shippingPartner} = useOrderFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Đối tác vận chuyển', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: 'Chọn đối tác vận chuyển',
        readOnly: true,
        value: shippingPartner.value?.name || '',
        onIconClick: () => shippingPartner.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          shippingPartner.list.length <= 0
            ? 'Không tìm thấy đối tác vận chuyển'
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm đối tác vận chuyển',
        value: shippingPartner.keyword,
        onChange: shippingPartner.onKeywordChange,
      }}
    >
      {shippingPartner.list.length > 0 &&
        shippingPartner.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === shippingPartner.value?.value}
            onClick={() => shippingPartner.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
