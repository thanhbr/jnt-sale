import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import { useContext } from 'react'
import useFacebookCustomerInfor from '../../../hooks/useFacebookCustomerInfor'
import { FacebookLivestreamContext } from '../../../provider/_context'
import {AutoCompleteSingleOption} from './autocompleteSingleOption'

export const InfoWard = ({...props}) => {
  const {state, dispatch}= useContext(FacebookLivestreamContext)
  const {district, ward, methods} =  useFacebookCustomerInfor()

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
        validateText: state.detail.customerInfor?.isNotEnoughCustomerInfo && !state.detail.customerInfor.list.ward_id ? " " :"",
        validateType: "danger"
      }}
      // search menu dropdown
      menuProps={{
        empty: ward.list.length <= 0 ? 'Không tìm thấy' : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: ward.keyword || '',
        onChange: methods.onWardKeywordChange,
        // onKeyDown: methods.onEnterSubmit
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
