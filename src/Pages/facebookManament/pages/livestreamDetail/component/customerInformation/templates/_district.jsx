import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import useFacebookCustomerInfor from '../../../hooks/useFacebookCustomerInfor'
import { FacebookLivestreamContext } from '../../../provider/_context'
import {AutoCompleteSingleOption} from './autocompleteSingleOption'
import { useContext } from 'react'

export const InfoDistrict = ({...props}) => {
  const {state, dispatch}= useContext(FacebookLivestreamContext)
  const {province,district,methods} =  useFacebookCustomerInfor()

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Quận / Huyện', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        categoryHidden: true,
        disabled: !!!province.value || province.value.length <= 0 ,
        placeholder: 'Chọn quận / huyện',
        readOnly: true,
        value: state.detail.customerInfor.list.district_id && district.value?.name || '',
        validateText: state.detail.customerInfor?.isNotEnoughCustomerInfo && !state.detail.customerInfor.list.district_id ? " " :"",
        validateType: "danger"
      }}
      // search menu dropdown
      menuProps={{
        empty:  district.list.length <= 0 ? 'Không tìm thấy' :'',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: district.keyword || '',
        onChange: methods.onDistrictKeywordChange,
        // onKeyDown: methods.onEnterSubmit
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
