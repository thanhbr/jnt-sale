import { AlternativeAutoComplete } from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useFacebookFilterForm from '../../hooks/useFacebookFilterForm'

export const StatusOption = () => {
  const {status} = useFacebookFilterForm()
  return (
    <AlternativeAutoComplete
      className="livestream-filter-facebook-form__input-status"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: 'Trạng thái', value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 90,
        placeholder: 'Chọn trạng thái',
        readOnly: true,
        value: status.value?.name || '',
        onIconClick: (e) => status.onChange(e),
      }}
      hideSearchBar={true}
    >
      {status.list.length > 0 &&
        status.list.map(item => (
          <Option
            key={item.value}
            className="livestream-filter-facebook-form__option-text"
            data-active={item.value === status.value?.value}
            onClick={() => status.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
