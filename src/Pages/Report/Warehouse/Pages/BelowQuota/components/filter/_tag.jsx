import React from 'react';
import {OrderTag} from "../../../../../../refactorOrder/components/orderTags/_tag";
import {Text} from "../../../../../../../common/text";
import {THEME_SEMANTICS} from "../../../../../../../common/theme/_semantics";
import styled from "styled-components";
import useFilter from "../../hooks/useFilter";
import { useTranslation } from 'react-i18next'

const Tag = ({...props}) => {
  const {warehouse, filter} = useFilter()
  const {t} = useTranslation()
  return (
    <StyledReportTags {...props}>
      {warehouse?.active?.id && (
        <OrderTag
          onDelete={() => filter.filterDeleteAll()}
          style={{margin: '16px 16px 0 0'}}
        >
          {t('warehouse')}: {warehouse?.active?.warehouse_name}
        </OrderTag>
      )}
      {filter.shouldShowResetAll && (
        <Text
          as="b"
          color={THEME_SEMANTICS.delivering}
          lineHeight={28}
          style={{margin: '16px 16px 0 0', cursor: 'pointer'}}
          onClick={() => filter.filterDeleteAll()}
        >
          {t('general_reset_to_default')}
        </Text>
      )}
    </StyledReportTags>
  )
}

export default Tag

export const StyledReportTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`