import {AlternativeAutoComplete} from 'common/form/autoComplete/_alternativeAutoComplete'
import {CategoryAutoComplete} from 'common/form/autoComplete/_categoryAutoComplete'
import {Option} from 'common/form/autoComplete/_option'
import {useWareHouse} from "../../hooks/useWareHouse";
import styled from 'styled-components'
import {THEME_COLORS} from "../../../../common/theme/_colors";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import React from "react";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";
export const ProductWarehouse = () => {
    const { t } = useTranslation()
    const {warehouse} = useWareHouse()
    return (
        <StyleWareHouse>
            <AlternativeAutoComplete
                className="product-import-filter-form__input-wide"
                // main input
                inputProps={{
                    categoryList: [], // menu list in category dropdown
                    categoryValue: {name:DISPLAY_NAME_MENU.GENERAL.WAREHOUSE, value: ''}, // if not exist this value -> default category: categoryList[0]
                    categoryWidth: 100,
                    placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_WAREHOUSE),
                    readOnly: true,
                    value: warehouse.value?.name || '',
                    importText: true
                    // onIconClick: () => warehouse.onChange(null),
                }}
                // menu
                menuProps={{
                    empty: warehouse.list.length <= 0 ? t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE_NOT_FOUND) : '',
                }}
                // search input in dropdown menu
                searchInputProps={{
                    placeholder: t(DISPLAY_NAME_MENU.GENERAL.FIND_WAREHOUSE),
                    value: warehouse.keyword,
                    onChange: warehouse.onKeywordChange,
                }}
            >
                {warehouse.list.length > 0 &&
                warehouse.list.map(item => (
                    <Option
                        key={item.value}
                        className="product-import-filter-form__option-text"
                        data-active={item.value === warehouse.value?.value}
                        onClick={() => warehouse.onChange(item)}
                    >
                        {item.name}
                    </Option>
                ))}
            </AlternativeAutoComplete>
        </StyleWareHouse>

    )
}
const StyleWareHouse = styled.div`
  .product-import-filter-form{
    &__option-text{
      margin: 8px 0;
      cursor: pointer;
      font-size: 14px;
    }
  }

`