import React from 'react';
import {Option} from "../../../../common/form/autoComplete/_option";
import {AlternativeAutoComplete} from "../../createProduct/conponents/infoBasic/~alternativeAutoComplete";
import {FILTER_STATUS_PRODUCT_CONSTANTS} from "../../interfaces/~constants";
import {Text} from "../../../../common/text";
import styled from "styled-components";
import useProductFilterForm from "../../hooks/useProductFilterForm";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const FilterStatus = () => {
  const { t } = useTranslation()
  const {filter, functions} = useProductFilterForm()

  return (
    <StyledProductFilterStatusForm>
      <AlternativeAutoComplete
        className="product-filter-form__input-wide"
        inputProps={{
          categoryList: [],
          categoryValue: {name: t(DISPLAY_NAME_MENU.GENERAL.STATUS), value: ''},
          categoryWidth: 90,
          placeholder: t(DISPLAY_NAME_MENU.GENERAL.SELECT_STATUS),
          readOnly: true,
          value: filter?.status?.name || '',
          // onIconClick: () => functions?.onChangeStatus(null),
        }}
      >
        { FILTER_STATUS_PRODUCT_CONSTANTS?.map(item => (
          <Option
            key={item.value}
            className="product-filter-form__option-text"
            data-active={item.id === filter?.status?.id}
            onClick={() => functions?.onChangeStatus(item)}
          >
             <Text>{t(item.name)}</Text>
          </Option>
        ))}
      </AlternativeAutoComplete>
    </StyledProductFilterStatusForm>
  );
};

export default FilterStatus;


export const StyledProductFilterStatusForm = styled.div`
  max-width: 24.5rem;
  
  .alternative-auto-complete__menu-header {
    display: none !important;
  }
  
  .product-filter-form {
    &__option-text {
      margin: 12px 8px;
      cursor: pointer;
      &:hover span {
        color: rgb(229, 16, 29) !important;
      }
      &[data-active='true'] span{
        color: rgb(229, 16, 29) !important;
      }
    }
  }
`
