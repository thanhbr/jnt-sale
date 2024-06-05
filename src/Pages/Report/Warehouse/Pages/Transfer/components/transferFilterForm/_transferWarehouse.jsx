import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import { useTranslation } from 'react-i18next'

export const TransferWarehouse = () => {
  const {warehouse} = useTransferFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="import-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('warehouse_export'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 110,
        placeholder: t('warehouse_export_select'),
        readOnly: true,
        value: warehouse.value?.name || '',
        onIconClick: () => warehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty: warehouse.list.length <= 0 ? t('not_found_warehouse_export') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('find_warehouse_export'),
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
