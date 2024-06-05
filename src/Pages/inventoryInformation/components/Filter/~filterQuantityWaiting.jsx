import React from 'react';
import {Select} from "../../../../common/form/select";
import {Option} from "../../../../common/form/select/_option";
import {Text} from "../../../../common/text";
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import {INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING} from "../../interfaces/~contants";
import styled from "styled-components";
import {useTranslation} from "react-i18next";

const FilterQuantityWaiting = () => {
  const {t} = useTranslation()
  const {data, functions} = useFilterInventoryInformation()
  return (
    <StyledFilterQuantityWaiting>
      <Select value={t(data?.filter?.quantityWaiting?.value?.name)}>
        {INVENTORY_INFORMATION_HEADER_QUANTITY_WAITING.map(item => (
          <Option
            className={`filter-quantity-waiting--text`}
            onClick={_ => functions.onChangeTypeQuantity(item)}
          >
            <Text className={`${(+data?.filter?.quantityWaiting?.value?.id === +item.id) && 'filter-quantity-waiting--text-active'}`}>{t(item.name)}</Text>
          </Option>
          )
        )}
      </Select>
    </StyledFilterQuantityWaiting>
  );
};

export default FilterQuantityWaiting;

export const StyledFilterQuantityWaiting = styled.div`
  margin-left: 8px;
  .filter-quantity-waiting {
    &--text {
      margin: 12px 0;
      cursor: pointer;
      &-active {
        color: rgb(229, 16, 29) !important;
      }
      & span:hover {
        color: rgb(229, 16, 29) !important;
      }
    }
  }
`
