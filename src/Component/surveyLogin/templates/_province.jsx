import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Text} from 'common/text'
import {THEME_SEMANTICS} from 'common/theme/_semantics'
import UseSurveyLogin from '../hooks/index'
import {AutoCompleteSingleOption} from './autocompleteSingleOption'

export const InfoProvince = ({...props}) => {
 
  const {province,methods} = UseSurveyLogin()

  return (
    <AlternativeAutoComplete
      {...props}
      // main input
      inputProps={{
        categoryList: [],
        categoryValue: {name: 'Tỉnh / Thành phố', value: ''}, 
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
      }}
      menuProps={{
        empty:
        province.list.length <= 0 ? 'Không tìm thấy tỉnh / thành phố' : '',
      }}
      searchInputProps={{
        placeholder: 'Tìm kiếm tỉnh / thành phố',
        value: province.keyword || '',
        onChange: methods.onProvinceKeywordChange,
        onKeyDown: methods.onEnterSubmit
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
