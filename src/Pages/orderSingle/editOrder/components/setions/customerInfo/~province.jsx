import useOrderSingleCustomerInfo from "../../../../hooks/useOrderSingleCustomerInfo";
import {AlternativeAutoComplete} from "../../../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Text} from "../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../common/theme/_semantics";
import {AutoCompleteSingleOption} from "../../../../components/autocompleteSingleOption";

export const OrderSingleCustomerInfoProvince = ({...props}) => {
  const {data, methods} = useOrderSingleCustomerInfo()
  const {address} = data
  const {province} = address

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Tỉnh / Thành phố', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        label: (
          <>
            Khu vực nhận <Text color={THEME_SEMANTICS.failed}>*</Text>
          </>
        ),
        placeholder: 'Chọn tỉnh / thành phố',
        readOnly: true,
        value: province.value?.name || '',
        validateText: props.validate?.province,
        validateType: "danger"
      }}
      // search menu dropdown
      menuProps={{
        empty:
          province.list.length <= 0 ? 'Không tìm thấy tỉnh / thành phố' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm tỉnh / thành phố',
        value: province.keyword || '',
        onChange: methods.onProvinceKeywordChange,
      }}
    >
      {province.list.length > 0 &&
      province.list.map(item => (
        <AutoCompleteSingleOption
          key={item.value}
          data-active={item.value === province.value?.value}
          onClick={() => methods.onProvinceChange(item)}
        >
          {item.name}
        </AutoCompleteSingleOption>
      ))}
    </AlternativeAutoComplete>
  )
}
