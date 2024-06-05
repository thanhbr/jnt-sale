import {Option} from 'common/form/autoComplete/_option'
import useFilterForm from 'Pages/purchases/hooks/useFilter'
import { AlternativeAutoComplete } from '../../../../common/form/autoComplete/_alternativeAutoComplete'
import { useTranslation } from 'react-i18next'

export const FilterWarehouse = () => {
  const {warehouse} = useFilterForm()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="order-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('init_warehouse'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 140,
        placeholder: t('select_inventory_location'),
        readOnly: true,
        value: warehouse.value?.name || '',
        onIconClick: () => warehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          warehouse.list.length <= 0
            ? t('no_inventory_location_found')
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('search_inventory_location'),
        value: warehouse.keyword,
        onChange: warehouse.onKeywordChange,
      }}
    >
      {warehouse.list.length > 0 &&
      warehouse.list.map(item => (
        <Option
          key={item.value}
          className="order-filter-form__option-text"
          data-active={item.value === warehouse.value?.value}
          onClick={() => warehouse.onChange(item)}
        >
          {item.name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}
