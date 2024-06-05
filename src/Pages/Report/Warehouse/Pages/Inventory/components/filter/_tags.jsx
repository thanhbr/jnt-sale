import React from 'react';
import {OrderTag} from "../../../../../../refactorOrder/components/orderTags/_tag";
import {Text} from "../../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../../common/theme/_semantics";
import styled from "styled-components";
import useFilterReportInventory from "../../hooks/useFilterReportInventory";
import { useTranslation } from 'react-i18next'

const Tags = ({...props}) => {
  const {warehouse, groupProduct, filter} = useFilterReportInventory()
  const {t} = useTranslation()
  return (
    <StyledReportTags {...props}>
      {/*{dateTime?.active?.value && (*/}
      {/*  <OrderTag*/}
      {/*    onDelete={() => filter.filterTagDelete('dateTime')}*/}
      {/*    style={{marginTop: -4}}*/}
      {/*  >*/}
      {/*    Ngày nhập kho: {dateTime?.active?.value}*/}
      {/*  </OrderTag>*/}
      {/*)}*/}
      {warehouse?.active?.id && (
      <OrderTag
        onDelete={() => filter.filterTagDelete('warehouse')}
        style={{marginTop: -4}}
      >
        {t('warehouse')}: {warehouse?.active?.warehouse_name}
      </OrderTag>
      )}
      {groupProduct?.active?.id && (
        <OrderTag
          onDelete={() => filter.filterTagDelete('groupProduct')}
          style={{marginTop: -4}}
        >
          {t('product_page_group_product')}: {groupProduct?.active?.name}
        </OrderTag>
      )}
      {filter.shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 18, cursor: 'pointer'}}
          onClick={() => filter.filterDeleteAll()}
        >
          {t('general_reset_to_default')}
        </Text>
       )}
    </StyledReportTags>
  )
}

export default Tags

export const StyledReportTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 16px;
`