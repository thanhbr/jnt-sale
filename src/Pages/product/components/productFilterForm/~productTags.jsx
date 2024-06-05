import React from 'react';
import {OrderTag} from "../../../refactorOrder/components/orderTags/_tag";
import useProductFilterForm from "../../hooks/useProductFilterForm";
import {Text} from "../../../../common/text";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const ProductTags = () => {
  const { t } = useTranslation()
  const {filter, functions} = useProductFilterForm()
  return (
    <StyledOrderTags>
      {!!filter?.status?.active?.id && (
        <OrderTag
          onDelete={() => functions.deleteTag('status')}
          style={{marginTop: 16}}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.STATUS)}: {filter?.status?.active?.name}
        </OrderTag>
      )}
      {!!filter?.category_id?.active?.id && (
        <OrderTag
          onDelete={() => functions.deleteTag('category')}
          style={{marginTop: 16}}
        >
          {t(DISPLAY_NAME_MENU.PRODUCT_PAGE.GROUP_PRODUCT)}: {filter?.category_id?.active?.name}
        </OrderTag>
      )}
      {(!!filter?.category_id?.active?.id || !!filter?.status?.active?.id) && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{margin: '16px 0 12px 0', cursor: 'pointer'}}
          onClick={functions.handleDeleteAll}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.RESET_TO_DEFAULT)}
        </Text>
      )}
    </StyledOrderTags>
  );
};

export default ProductTags

export const StyledOrderTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`