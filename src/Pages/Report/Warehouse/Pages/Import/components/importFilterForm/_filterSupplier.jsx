import {Option} from 'common/form/autoComplete/_option'
import { AlternativeAutoComplete } from '../../../../../../../common/form/autoComplete/_alternativeAutoComplete'
import useImportFilterForm from '../../hooks/useImportFilterForm'
import { useTranslation } from 'react-i18next'

export const FilterSupplier = () => {
  const {supplier} = useImportFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="import-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('supplier'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 108,
        placeholder: t('select-supplier'),
        readOnly: true,
        value: supplier.value?.name || '',
        onIconClick: () => supplier.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          supplier.list.length <= 0
            ? t('no_supplier_found')
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_supplier'),
        value: supplier.keyword,
        onChange: supplier.onKeywordChange,
      }}
    >
      {supplier.list.length > 0 &&
      supplier.list.map(item => (
        <Option
          key={item.value}
          className="import-filter-form__option-text"
          data-active={item.value === supplier.value?.value}
          onClick={() => supplier.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
