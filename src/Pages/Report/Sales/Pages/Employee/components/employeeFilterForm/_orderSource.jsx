import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useEmployeeFilterForm from '../../hooks/useEmployeeFilterForm'
import { useTranslation } from 'react-i18next'

export const OrderSource = () => {
  const {source} = useEmployeeFilterForm()
  const {t} = useTranslation()

  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('source_order'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 125,
        placeholder: t('select_source_order'),
        readOnly: true,
        value: source.value?.name || '',
        onIconClick: () => source.onChange(null),
      }}
      // menu
      menuProps={{
        empty: source.list.length <= 0 ? t('no_data_source_order') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_source_order'),
        value: source.keyword,
        onChange: source.onKeywordChange,
      }}
    >
      {source.list.length > 0 &&
        source.list.map(item => (
          <Option
            key={item.value}
            className="order-filter-form__option-text"
            data-active={item.value === source.value?.value}
            onClick={() => source.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
