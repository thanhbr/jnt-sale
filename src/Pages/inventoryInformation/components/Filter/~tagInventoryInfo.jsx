import React from 'react';
import useFilterInventoryInformation from "../../hooks/useFilterInventoryInformation";
import {OrderTag} from "../../../refactorOrder/components/orderTags/_tag";
import {THEME_SEMANTICS} from "../../../../common/theme/_semantics";
import {Text} from "../../../../common/text";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {DISPLAY_NAME_MENU} from "../../../../const/display_name_menu";

const TagInventoryInfo = (...props) => {
  const {t} = useTranslation()
  const {data, functions} = useFilterInventoryInformation()
  return (
    <StyledOrderTags {...props}>
      {data?.filter?.groupWarehouse?.activeValue?.length > 0 && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('warehouse')}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.WAREHOUSE)}: {data?.filter?.groupWarehouse?.activeValue?.map(item => {
                                                                              return item.warehouse_name
                                                                            })?.join(', ')}
        </OrderTag>
      )}
      { Object.keys(data?.filter?.quota?.activeNormType).length > 0 && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('quota')}
        >
          {t(data?.filter?.quota?.activeNormType?.name)}: {data?.filter?.quota?.activeValue || 0}
        </OrderTag>
      )}
      { Object.keys(data?.filter?.quantityWaiting?.activeValue).length > 0 && (
        <OrderTag
          onDelete={() => functions.filterTagDelete('quantity')}
        >
          {t(DISPLAY_NAME_MENU.WAREHOUSE_PRODUCT_PAGE.WAITING_EXPORT)}: {t(data?.filter?.quantityWaiting?.activeValue?.name)}
        </OrderTag>
      )}
      {data?.filter?.groupWarehouse?.activeValue?.length > 0 ||
      Object.keys(data?.filter?.quota?.activeNormType).length > 0 ||
        Object.keys(data?.filter?.quantityWaiting?.activeValue).length > 0 ? (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{marginBottom: 12, cursor: 'pointer'}}
          onClick={() => functions.handleDeleteTagAll()}
        >
          {t(DISPLAY_NAME_MENU.GENERAL.RESET_TO_DEFAULT)}
        </Text>
      ) : null}
    </StyledOrderTags>
  )
}

export default TagInventoryInfo;
const StyledOrderTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  li, b {
    margin-top: 16px;
  }
`