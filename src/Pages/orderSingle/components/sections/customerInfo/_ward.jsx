import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'

export const OrderSingleCustomerInfoWard = ({...props}) => {
  const {data, methods} = useOrderSingleCustomerInfo()
  const {address} = data
  const {district, ward} = address

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Xã / Phường', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        disabled: !!!district.value,
        placeholder: 'Chọn xã / phường',
        readOnly: true,
        value: ward.value?.name || '',
        validateText: props.validate?.ward,
        validateType: "danger"
      }}
      // search menu dropdown
      menuProps={{
        empty: ward.list.length <= 0 ? 'Không tìm thấy xã / phường' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm xã / phường',
        value: ward.keyword || '',
        onChange: methods.onWardKeywordChange,
      }}
    >
      {ward.list.length > 0 &&
        ward.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === ward.value?.value}
            onClick={() => methods.onWardChange(item)}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}
