import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useImportFilterForm from "../../hooks/useImportFilterForm";
import { useTranslation } from 'react-i18next'

export const ImportWarehouse = () => {
  const {warehouse} = useImportFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="import-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('general_warehouse'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 50,
        placeholder: t('general_select_warehouse'),
        readOnly: true,
        value: warehouse.value?.name || '',
        onIconClick: () => warehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty: warehouse.list.length <= 0 ? t('general_warehouse_not_found') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('general_find_warehouse'),
        value: warehouse.keyword,
        onChange: warehouse.onKeywordChange,
      }}
    >
      {warehouse.list.length > 0 &&
        warehouse.list.map(item => (
          <Option
            key={item.value}
            className="import-filter-form__option-text"
            data-active={item.value === warehouse.value?.value}
            onClick={() => warehouse.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
