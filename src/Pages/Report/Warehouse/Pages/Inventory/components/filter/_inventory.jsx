import React from 'react';
import {Option} from "../../../../../../../common/form/autoComplete/_option";
import {Text} from "../../../../../../../common/text";
import {AlternativeAutoComplete} from "../../../../../../../common/form/autoComplete/_alternativeAutoComplete";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import { useTranslation } from 'react-i18next'

const Inventory = () => {
  const {warehouse} = useFilterReportInventory()
  const {t} = useTranslation()
  return (
    <AlternativeAutoComplete
      className="report-inventory-filter-form__input-wide report-inventory-filter-form__input-wide--submitter"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t('warehouse'), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 95,
        placeholder: t('general_select_warehouse'),
        readOnly: true,
        value: warehouse?.value?.warehouse_name || '',
        onIconClick: () => warehouse.onChange(null),
      }}
      // menu
      menuProps={{
        empty:
          warehouse?.list?.length <= 0
            ? t('general_warehouse_not_found')
            : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t('general_find_warehouse'),
        value: warehouse.keyword,
        onChange: warehouse.onKeywordChange,
      }}
    >
      {warehouse?.list?.length > 0 &&
      warehouse?.list?.map(item => (
        <Option
          key={item?.id}
          className="report-inventory-filter-form__option-text"
          data-active={item?.id === warehouse?.value?.id}
          onClick={() => warehouse.onChange(item)}
        >
          <Text>{item?.warehouse_name}</Text>
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default Inventory;