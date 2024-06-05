import React from 'react';
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import {Option} from "../../../../common/form/autoComplete/_option";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const InventoryInfoExport = () => {
  const {t} = useTranslation()
  const {filter, functions} = useHeaderGivebackProduct()
  const warehouses = filter?.warehouse

  return (
    <AlternativeAutoComplete
      className="giveback-product-filter-form__input-wide"
      // main input
      inputProps={{
        categoryList: [], // menu list in category dropdown
        categoryValue: {name: t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.WAREHOUSE_EXPORT), value: ''}, // if not exist this value -> default category: categoryList[0]
        categoryWidth: 135,
        placeholder: t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.SELECT_WAREHOUSE_EXPORT),
        readOnly: true,
        value: warehouses?.value?.warehouse_name || '',
        onIconClick: () => functions.handleSelectWarehouse(null),
      }}
      // menu
      menuProps={{
        empty: warehouses?.list?.length <= 0 ? t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.NOT_FOUND_WAREHOUSE_EXPORT) : '',
      }}
      // search input in dropdown menu
      searchInputProps={{
        placeholder: t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.FIND_WAREHOUSE_EXPORT),
        // value: source.keyword,
        onChange: data => functions?.handleSearchListWarehouse(data?.value),
      }}
      style={{width: '24.5rem'}}
    >
      {warehouses?.list?.length > 0 &&
      warehouses?.list?.map(item => (
        <Option
          key={item?.id}
          className="giveback-product-filter-form__option-text"
          data-active={item?.id === warehouses?.value?.id}
          onClick={() => functions.handleSelectWarehouse(item)}
        >
          {item?.warehouse_name}
        </Option>
      ))}
    </AlternativeAutoComplete>
  )
}

export default InventoryInfoExport