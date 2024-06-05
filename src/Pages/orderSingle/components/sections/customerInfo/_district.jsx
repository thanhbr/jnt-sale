import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useOrderSingleCustomerInfo from 'Pages/orderSingle/hooks/useOrderSingleCustomerInfo'
import {AutoCompleteSingleOption} from '../../autocompleteSingleOption'
import { Input } from '../../../../../common/form/input'

export const OrderSingleCustomerInfoDistrict = ({...props}) => {
  const {data, methods} = useOrderSingleCustomerInfo()
  const {address} = data
  const {province, district} = address

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Quận / Huyện', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        disabled: !!!province.value,
        placeholder: 'Chọn quận / huyện',
        readOnly: true,
        value: district.value?.name || '',
        validateText: props.validate?.district,
        validateType: "danger"
      }}
      // search menu dropdown
      menuProps={{
        empty: district.list.length <= 0 ? 'Không tìm thấy quận / huyện' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm quận / huyện',
        value: district.keyword || '',
        onChange: methods.onDistrictKeywordChange,
      }}
    >
      {district.list.length > 0 &&
        district.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === district.value?.value}
            onClick={() => methods.onDistrictChange(item)}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}
