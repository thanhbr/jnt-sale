import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const FilterWarehouse = () => {
  const {t} = useTranslation()
  const {data, functions} = useFilterInventoryInformation()

  return (
    <StyledFilterWarehouse>
      <AlternativeAutoComplete
        className="inventory-information-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: {name: t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE), value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 100,
          placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_WAREHOUSE),
          readOnly: true,
          value: data?.warehouses?.value?.length > 0 ? `${t(DISPLAY_NAME_MENU.GENERAL.SELECTED)} ${data?.warehouses?.value?.length}` : '',
          onIconClick: () => functions.onSelectedWareHouse(null),
        }}
        // menu
        menuProps={{
          empty: data?.warehouses?.list?.length <= 0 ? t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE_NOT_FOUND) : '',
          multipleChoices: true,
          onReset: () => functions.onSelectedWareHouse(null),
        }}
        // search input in dropdown menu
        searchInputProps={{
          placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_WAREHOUSE),
          // value: print.keyword,
          onChange: value => functions.onKeywordChange(value),
        }}
        // tab list <only use this prop for multiple choices>
        tabProps={{
          active: data?.warehouses?.tab,
          checkedNumber: data?.warehouses?.value?.length,
          onChange: () => functions.onTabChange(),
        }}
      >
        {(data?.warehouses?.list?.length > 0 && data?.warehouses?.tab === 'all') &&
        data?.warehouses?.list?.map(item => (
          <Option
            key={item.id}
            className="inventory-information-form__option-text"
            checked={!!data?.warehouses?.value?.find(find => find.id === item.id)}
            multipleChoices={true}
            data-active={item.id === data?.warehouses?.value?.id}
            onClick={() => functions.onSelectedWareHouse(item)}
          >
            {item.warehouse_name}
          </Option>
        ))}
        {(data?.warehouses?.list?.length > 0 && data?.warehouses?.tab === 'checked') &&
        data?.warehouses?.value?.map(item => (
          <Option
            key={item.id}
            className="inventory-information-form__option-text"
            checked={!!data?.warehouses?.value?.find(find => find.id === item.id)}
            multipleChoices={true}
            data-active={item.id === data?.warehouses?.value?.id}
            onClick={() => functions.onSelectedWareHouse(item)}
            >
            {item.warehouse_name}
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledFilterWarehouse>
  );
};

export default FilterWarehouse;


export const StyledFilterWarehouse = styled.div`
  .auto-complete__option.inventory-information-form__option-text {
    margin: 16px 0;
    cursor: pointer;
    font-size: 14px;
  }
`
