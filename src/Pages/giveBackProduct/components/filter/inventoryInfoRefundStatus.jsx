import React from 'react';
import {AlternativeAutoComplete} from "../../../../common/form/autoComplete/_alternativeAutoComplete";
import {GIVEBACK_PRODUCT_FILTER_STATUS_REFUNDS} from "../../interfaces/contants";
import {Option} from "../../../../common/form/select/_option";
import styled from "styled-components";
import useHeaderGivebackProduct from "../../hooks/useHeaderGivebackProduct";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const InventoryInfoRefundStatus = () => {
  const {t} = useTranslation()
  const {filter, functions} = useHeaderGivebackProduct()
  const receivingState = filter?.receivingState
  return (
    <StyledGivebackProductRefundStatus>
      <AlternativeAutoComplete
        className="giveback-product-filter-form__input-wide"
        // main input
        inputProps={{
          categoryList: [], // menu list in category dropdown
          categoryValue: {name: t(DISPLAY_NAME_MENU.RETURN_ORDER_PAGE.REFUND_STATUS), value: ''}, // if not exist this value -> default category: categoryList[0]
          categoryWidth: 180,
          placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_STATUS),
          readOnly: true,
          value: t(receivingState?.value?.name) || '',
          onIconClick: () => functions.handleChangeStatus(null),
        }}
        // menu
        menuProps={{
          // empty: source.list.length <= 0 ? 'Không tìm thấy kho xuất hàng' : '',
        }}
        style={{width: '24.5rem'}}
      >
        {GIVEBACK_PRODUCT_FILTER_STATUS_REFUNDS?.map(item => (
          <Option
            key={item.value}
            className="giveback-product-filter-form__option-text"
            data-active={item.name === receivingState?.value?.name}
            onClick={() => functions.handleChangeStatus(item)}
          >
            {t(item.name)}
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledGivebackProductRefundStatus>
  )
}

export default InventoryInfoRefundStatus

const StyledGivebackProductRefundStatus = styled.div`
  .giveback-product-filter-form__input-wide {
    & .alternative-auto-complete__menu-header {
      display: none !important;
    }
    & .alternative-auto-complete__menu {
      padding: 12px 20px;
    }
  }
`
