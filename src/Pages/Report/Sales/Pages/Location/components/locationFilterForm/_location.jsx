import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useLocationFilterForm from '../../hooks/useLocationFilterForm'
import { useTranslation } from 'react-i18next'

export const Location = () => {
  const {t} = useTranslation()
  const {location} = useLocationFilterForm()
  return (
    <AlternativeAutoComplete
      id="location"
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('area'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t('all'),
        readOnly: true,
        value:
          location?.value?.length > 0 ? `${t('selected')} ${location?.value?.length}` : '',
        onIconClick: location.onInputReset,
      }}
      // menu
      menuProps={{
        empty:
          location.list.length <= 0
            ? location.tab === 'all'
            ? t('search_no_data_area')
            : t('have_no_selected_area')
            : '',
        multipleChoices: true,
        onReset: location.onInputReset, // only use this prop for multiple choice
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_area'),
        value: location.keyword,
        onChange: location.onKeywordChange,
      }}
      // tab list <only use this prop for multiple choices>
      tabProps={{
        active: location.tab,
        checkedNumber: location.value.length,
        onChange: location.onTabChange,
      }}
    >
      {location.list.length > 0 &&
      location.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          checked={!!location.value.find(find => find.value === item.value)}
          multipleChoices={true}
          onClick={() =>{
            location.onChange({
              value: item.value,
              name: item.name,
            })
          }}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
