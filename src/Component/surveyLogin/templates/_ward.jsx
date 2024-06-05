import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import UseSurveyLogin from '../hooks/index'
import {AutoCompleteSingleOption} from './autocompleteSingleOption'

export const InfoWard = ({...props}) => {
  const {district, ward, methods} = UseSurveyLogin()

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
        onKeyDown: methods.onEnterSubmit
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
