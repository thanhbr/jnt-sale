import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useOrderFilterForm from 'Pages/refactorOrder/hooks/useOrderFilterForm'

export const OrderShippingStatus = () => {
  const {shippingStatus} = useOrderFilterForm()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [{name: 'Trạng thái đơn hàng', value: ''}], // menu list in category dropdown
        categoryWidth: 140,
        placeholder: 'Chọn trạng thái đơn hàng',
        readOnly: true,
        value:
          shippingStatus.value.length > 0
            ? `Đã chọn ${shippingStatus.value.length}`
            : '',
        onIconClick: shippingStatus.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          shippingStatus.list.length <= 0
            ? shippingStatus.tab === 'all'
              ? 'Không tìm thấy trạng thái đơn hàng'
              : 'Bạn chưa chọn trạng thái đơn hàng nào'
            : '',
        multipleChoices: true,
        onReset: shippingStatus.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm trạng thái đơn hàng',
        value: shippingStatus.keyword,
        onChange: shippingStatus.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: shippingStatus.tab,
        checkedNumber: shippingStatus.value.length,
        onChange: shippingStatus.onTabChange,
      }}
    >
      {shippingStatus.list.length > 0 &&
        shippingStatus.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            checked={
              !!shippingStatus.value.find(find => find.value === item.value)
            }
            multipleChoices={true}
            onClick={() => shippingStatus.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
