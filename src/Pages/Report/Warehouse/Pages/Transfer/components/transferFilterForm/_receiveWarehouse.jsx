import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import useTransferFilterForm from 'Pages/Report/Warehouse/Pages/Transfer/hooks/useTransferFilterForm'
import { useTranslation } from 'react-i18next'

export const ReceiveWarehouse = () => {
  const {receiveWarehouse} = useTransferFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="import-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('init_warehouse'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 120,
        placeholder: t('select_inventory_location'),
        readOnly: true,
        value: receiveWarehouse.value?.name || '',
        onIconClick: () => receiveWarehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty: receiveWarehouse.list.length <= 0 ? t('no_inventory_location_found') : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_inventory_location'),
        value: receiveWarehouse.keyword,
        onChange: receiveWarehouse.onKeywordChange,
      }}
    >
      {receiveWarehouse.list.length > 0 &&
        receiveWarehouse.list.map(item => (
          <Option
            key={item.value}
            className="import-filter-form__option-text"
            data-active={item.value === receiveWarehouse.value?.value}
            onClick={() => receiveWarehouse.onChange(item)}
          >
            {item.name}
          </Option>
        ))}
    </AlternativeAutoComplete>
  )
}
