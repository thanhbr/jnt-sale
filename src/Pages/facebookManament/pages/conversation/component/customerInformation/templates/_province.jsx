import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import useFacebookCustomerInfor from '../../../hooks/useFacebookCustomerInfor'
import {AutoCompleteSingleOption} from './autocompleteSingleOption'
import { FacebookConversationContext } from '../../../provider/_context'
import { useContext } from 'react'

export const InfoProvince = ({...props}) => {
 
  const {state, dispatch}= useContext(FacebookConversationContext)
  const {province,methods} = useFacebookCustomerInfor()



  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [],
        categoryValue: {name: 'Tỉnh / Thành phố', value: ''}, 
        categoryWidth: 140,
        categoryHidden: true,
        placeholder: 'Chọn tỉnh / thành phố',
        label: '',
        readOnly: true,
        value: state.detail.customerInfor.list.city_id ? province.value?.name : '',
        validateText: state.detail.customerInfor?.isNotEnoughCustomerInfo && (!state.detail.customerInfor.list.city_id) ? " " :"",
        validateType: "danger"
      }}
      menuProps={{
        empty:
        province.list.length <= 0 ? 'Không tìm thấy' : '',
      }}
      searchInputProps={{
        placeholder: 'Tìm kiếm',
        value: province.keyword || '',
        onChange: methods.onProvinceKeywordChange,
      }}
    > 
      {province.list.length > 0 &&
        province.list.map(item => (
          <AutoCompleteSingleOption
            key={item.value}
            data-active={item.value === province.value?.value}
            onClick={() => {
              methods.onProvinceChange(item)
            }}
          >
            {item.name}
          </AutoCompleteSingleOption>
        ))}
    </AlternativeAutoComplete>
  )
}
